"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
# from flask_jwt_extended import JWTManager, create_access_token

api = Blueprint('api', __name__)


# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def create_user():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    name = request.json.get('name', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    confirm_password = request.json.get('confirm_password', None)

    if not name or not email or not password or not confirm_password:
        return jsonify({"msg": "Missing name, email or password or confirm_password"}), 400

    if password != confirm_password:
        return jsonify({"msg": "Password and confirm_password do not match"}), 400

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"msg": "User already exists"}), 400

    new_user = User(name=name, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created", "id": new_user.id}), 201


@api.route('/login', methods=['POST'])
def login():

    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if user is None or not user.check_password(password):
        return jsonify({"msg": "Invalid email or password"}), 401
    
# falta añadir token