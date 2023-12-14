"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import secrets
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Patient, Specialist
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from jwt.exceptions import ExpiredSignatureError
from flask_jwt_extended import  JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
import logging

api = Blueprint('api', __name__)


# Allow CORS requests to this API
CORS(api)
app=Flask(__name__)
secret_keys=secrets.token_hex(32)
app.config["JWT_SECRET_KEY"]= secret_keys
jwt= JWTManager(app)
bcrypt=Bcrypt(app)





@api.route('/hello', methods=[ 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200



