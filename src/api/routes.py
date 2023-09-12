"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Favorite,Component,Plan,Payment
from api.utils import generate_sitemap, APIException
import json
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



@api.route('/signup', methods=['POST'])
def signup_user():
    body = json.loads(request.data)
    # pw_hash = current_app.bcrypt.generate_password_hash(body["password"]).decode('utf-8')

    new_user = User(
        name = body["name"],
        last_name = body["last_name"],
        email = body["email"],
        password = body["password"],
        is_active= body["is_active"],

    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "usuario creado"}), 200 


@api.route('/login', methods=['POST'])
def login_user():
    body = json.loads(request.data)

    email=body["email"]
    password = body["password"]
    
    user = User.query.filter_by(email=email).first()

    if user is None: 
        return jsonify({"msg": "not found"}), 404
    
    if email !=user.email or password != user.password:
        return jsonify({"msg": "email or password are incorrect"}), 401 
    
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200

    
    
