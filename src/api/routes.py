"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager
# from argon2 import PasswordHasher

api = Blueprint('api', __name__)
# generate sitemap with all your endpoints
#ph = PasswordHasher()

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


#we need to add more code to check if user exists and other
#degugging
@api.route('/user', methods=['POST', 'GET'])
def handle_user():
    if request.method == 'POST':
        body = request.get_json()
        if body == None:
            return "The request body is null", 400
        if 'email' not in body:
            return jsonify({"msg": "Add useremail"}), 401
        if 'password' == None:
            return jsonify({"msg": "Add user password"}), 401
        if 'is_active' not in body:
            return "Add user activity status", 400
        print(body)
        newUser = User(email=body["email"], password=body["password"], is_active=body["is_active"])
        db.session.add(newUser)
        db.session.commit()

        return 'User has been created', 200
    else:
        ##to get the user list from insomnia with a get
        users = User.query.all()
        users_list = list(map(lambda x: x.serialize(), users))

        return jsonify(users_list), 200

@api.route('/token', methods=['POST'])
def create_token():
    body = request.get_json()
    email = body["email"]
    password = body["password"]

    user = User.query.filter(User.email == body["email"]).first()

    if user is None:
        return jsonify({"msg": "Email is blank"}), 401
    if password is None:
        return jsonify({"msg": "Password is blank"}), 401
    if user.password != body["password"]:
        return "Failed auth", 401
    else:
        access_token = create_access_token(user.email)
        return jsonify({"access_token":access_token}), 200


    # try:
    #     ph.verify(user.password, body["password"])
    # except:
    #     return "Failed auth", 401
    # access_token = create_access_token(identity=user.id)
    # #access_token = create_access_token(identity=user.email)
    # return jsonify({"access_token": access_token}), 200
    

@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():

    current_user_id = get_jwt_identity()
    #user = User.query.get(current_user_id)
    user = User.query.filter_by(email=current_user_id).first()

    return jsonify({"msg": user.serialize()}), 200
