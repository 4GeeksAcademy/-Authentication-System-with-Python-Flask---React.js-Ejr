"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import  get_hash
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity

 
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
def create_user():
    email = request.json.get("email")
    username = request.json.get("username")
    password = request.json.get("password")
    secure_password = get_hash(
        password)
    
    new_user = User()
    new_user.email = email
    new_user.username = username
    new_user.password = secure_password
    new_user.is_active = True
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User created"}), 201


@api.route('/login', methods=['POST'])
def login_user():
  
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    found_user = User.query.filter_by(email=email, password=get_hash(password)).one_or_none()

    if found_user is None:
        return "email or password incorrect", 400
    
    token = create_access_token(identity=email)
    return jsonify(token=token)

@api.route("/private", methods=["GET"])
@jwt_required()
def protected():
   
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@api.route("/get-hash", methods=["POST"])
def handle_get_hash():
    to_hash = request.json.get("string")
    return get_hash(to_hash)

@api.route('/users', methods=['GET'])
def handle_get_users():
   all_users = User.query.all()
   all_users = list(map(lambda item: item.serialize(), all_users))
   results = all_users

   if not results:
       return jsonify({"msg": "There are no users "}), 404

   response_body = {
       "results": results
   }

   return jsonify(response_body), 200