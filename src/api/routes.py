"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

# JWT authentication
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import datetime

api = Blueprint('api', __name__)

# user registration
@api.route("/userregistration", methods=['POST','GET'])
def register_user():

    #envia usuario
    username = request.json.get("username", None)
    fullname = request.json.get("fullname", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # envio incorrecto
    if email is None:
        return jsonify({"msg": "Please provide a valid email."}), 400
    if password is None:
        return jsonify({"msg": "Please provide a valid password."}), 400
    
    # envio correctamente
    user = User.query.filter_by(username=username, password=password).first()

    if user:
        # case user not found in db
        return jsonify({"msg": "User already exists."}), 401
    else:
        new_user = User()
        new_user.username = username
        new_user.fullName = fullname
        new_user.email = email
        new_user.password = password
        new_user.is_Admin = True

        db.session.add(new_user)
        db.session.commit()
    return jsonify({"msg": "User account was successfully created."}), 200

@api.route("/clientregistration", methods=['POST','GET'])
def register_client():

    #envia usuario
    username = request.json.get("username", None)
    fullname = request.json.get("fullname", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # envio incorrecto
    if email is None:
        return jsonify({"msg": "Please provide a valid email."}), 400
    if password is None:
        return jsonify({"msg": "Please provide a valid password."}), 400
    
    # envio correctamente
    user = User.query.filter_by(username=username, password=password).first()

    if user:
        # case user not found in db
        return jsonify({"msg": "User already exists."}), 401
    else:
        new_user = User()
        new_user.username = username
        new_user.fullName = fullname
        new_user.email = email
        new_user.password = password
        new_user.is_Admin = True

        db.session.add(new_user)
        db.session.commit()
    return jsonify({"msg": "User account was successfully created."}), 200

@api.route("/sellerregistration", methods=['POST','GET'])
def register_seller():

    #envia usuario
    username = request.json.get("username", None)
    fullname = request.json.get("fullname", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # envio incorrecto
    if email is None:
        return jsonify({"msg": "Please provide a valid email."}), 400
    if password is None:
        return jsonify({"msg": "Please provide a valid password."}), 400
    
    # envio correctamente
    user = User.query.filter_by(username=username, password=password).first()

    if user:
        # case user not found in db
        return jsonify({"msg": "User already exists."}), 401
    else:
        new_user = User()
        new_user.username = username
        new_user.fullName = fullname
        new_user.email = email
        new_user.password = password
        new_user.is_Admin = True

        db.session.add(new_user)
        db.session.commit()
    return jsonify({"msg": "User account was successfully created."}), 200

# user log in
@api.route("/login", methods=["POST","GET"])
def login():
        email = request.json.get("email", None)
        password = request.json.get("password", None)

        # user validation step
        if email is None:
            return jsonify({"error": "Please provide a valid email."}), 400
        if password is None:
            return jsonify({"error": "Please provide a valid password."}), 400
        
        user = User.query.filter_by(email=email, password=password).first()

        if user is None:
            return jsonify({"error": "Invalid email or password."}), 401 
        elif user.password != password:
            return jsonify({"error": "User or password not found."}), 401
        else:
            print(user)
            # pass user id as parameter to generate a new token
            access_token = create_access_token(identity=user.id)
            return jsonify({ "token": access_token, "user_id": user.id }), 200

