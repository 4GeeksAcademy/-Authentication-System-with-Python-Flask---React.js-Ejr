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

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def handle_signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email = email).first()
    if user:
        return jsonify({"msg": "User account already exists"})
    newUser = User(email = email, password = password)
    db.session.add(newUser)
    db.session.commit()
    return jsonify("Added User"), 200




    
@api.route('/login', methods=['POST'])
def login():
    body = request.get_json ( force = True)
    email = body['email']
    password = hashlib.sha256(body['password'].encode("utf-8")).hexdigest()
    print(password)
    new_user = User(email = email, password = password)
    db.session.add(new_user)
    db.session.commit()
    access_token = create_access_token(identity = email)
    return jsonify(access_token = access_token)


@api.route('/private', methods=['GET'])
@jwt_required()
def handle_private():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if user is None:
        return jsonify({"msg": "Please login"})
    else:
        return jsonify({"user_id": user.id, "email":user.email}), 200