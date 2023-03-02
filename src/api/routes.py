"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/signup", methods=["POST"])
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
   
    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return "The user already exists", 400

    new_user = User(email=email, password=password)
    
    db.session.add(new_user)    
    db.session.commit()

    response_body = "You have created an user"
    return jsonify(response_body), 200

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
   
    existing_user = User.query.filter_by(email=email).first()

    if existing_user.password != password or existing_user.email != email:
        response_body = "Invalidad credentials"
        return jsonify(response_body), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200
