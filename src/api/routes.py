"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def sign_in():
    body = request.json
    if body is None:
        return jsonify({"message" : "Please provide a valid email and password!"}), 400
    email = body["email"]
    password = body["password"]
    user = User.query.filter_by(email = email).first()
    if user is None:
        return jsonify({"message" : "Email does not exist in our database"}),404
    if user.password != password:
        return jsonify({"message" : "Wrong password"}),401
    
    access_token = create_access_token(identity=email)

    response_body = {
        "message": "You successfully signed in your account","access_token": access_token
    }

    return jsonify(response_body), 200



@api.route('/sign-up', methods=['POST'])
def sign_up():
    body = request.json
    if body is None:
        return jsonify({"message" : "Please provide a valid email and password!"}), 400
    email = body["email"]
    password = body["password"]
    check_user = User.query.filter_by(email = email).first()
    if check_user:
        return jsonify({"message" : "This user already exist"}),409
    new_user = User(emali = email, password = password, is_active = True)
    db.session.add(new_user)
    db.session.commit()

    response_body = {
        "message": "Account successfully created",
    }

    return jsonify(response_body), 201

@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    # Access the identity of the current user with get_jwt_identity
    user_email = get_jwt_identity()
    response_body = {
        "message": f"Logged in as: {user_email} Secret view. shhhh it's a secret"
    }
    return jsonify(response_body), 200
