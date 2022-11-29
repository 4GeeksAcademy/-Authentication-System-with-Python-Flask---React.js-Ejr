"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)
# generate sitemap with all your endpoints

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#@api.route('/user', methods=['POST', 'GET'])
def getUsers():

    users = User.query.all()
    users_list = list(map(lambda x: x.serialize(), users))

    return jsonify(users_list), 200

@api.route('/user', methods=['POST', 'GET'])
def createUser():
    body = request.get_json()
    if body == None:
        return "The request body is null", 400
    if 'email' not in body:
        return "Add the user email", 400
    if 'password' not in body:
        return "Add user password", 400
    if 'is_active' not in body:
        return "Add user activity status", 400
    print(body)
    newUser = User(email=body["email"], password=body["password"], is_active=body["is_active"])
    db.session.add(newUser)
    db.session.commit()

    return 'User has been created', 200
