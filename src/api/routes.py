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

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

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
    new_user = User(email=email, password=hashed_password, name=name, ...)
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
        access_token = create_access_token(identity=email)
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