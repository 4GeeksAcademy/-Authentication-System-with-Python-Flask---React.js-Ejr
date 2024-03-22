"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
import hashlib
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_cors import CORS 
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta

api = Blueprint('api', __name__)

# Allow CORS requests to this API
# CORS(api)
CORS(api, resources={r"/api/*": {"origins": "https://supreme-robot-wr7w9jrjxjr729jvv-3000.app.github.dev"}})



def add_cors_headers(response):
			
			response.headers['Access-Control-Allow-Origin'] = '*'
			response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'
			response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
			return response
		        
if __name__ == '__main__':
    api.run(debug=True)
			
		

# start of user related routes
@api.route('/signup', methods=['POST'])
def handle_signup():
    # Extract data from request
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    name = request.json.get("name", None)

    # Check if user already exists
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"msg": "User account already exists"}), 409

    # Hash password and create new user
    hashed_password = generate_password_hash(password)
    new_user = User(email=email, password=hashed_password, name=name )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User added successfully"}), 201

@api.route('/login', methods=['POST'])
def login():
    # Extract data from request
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    # Find user by email
    user = User.query.filter_by(email=email).first()
    if user and check_password_hash(user.password, password):
        # Correct password
        # access_token = create_access_token(identity=email)
        access_token = create_access_token(identity=email, expires_delta=timedelta(days=1))
        return jsonify(access_token=access_token, user=user.serialize()), 200
    else:
        # Incorrect email or password
        return jsonify({"msg": "Bad username or password"}), 401




@api.route('/private', methods=['GET'])
@jwt_required()
def handle_private():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()

    if user:
        return jsonify(user=user.serialize()), 200

    return jsonify({"msg": "User not found"}), 404