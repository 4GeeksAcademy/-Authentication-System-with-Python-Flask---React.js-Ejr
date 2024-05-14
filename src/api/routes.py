"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/login", methods=["POST"])
def login():
    mail = request.json.get("mail", None)
    password = request.json.get("password", None)
    user=User.query.filter_by(email=mail).first() #chequea si existe email
    if user is None: 
        return jsonify({"msg":"user doesn't exist"}),404
    if mail != user.email or password != user.password:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=mail)
    return jsonify(access_token=access_token)
