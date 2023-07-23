"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

    # REGISTER ENDPOINT
@api.route('/register', methods=['POST'])
def create_user():
    user_email= request.json.get('email', None)
    user_password = request.json.get('password', None)
    active_user = User.query.filter_by(email = user_email).first()
    if active_user:
        return jsonify({"Error": "Email already in use, try another one"}), 409
    new_user = User(email=user_email,password=user_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"Message": "User successfully created"})



# LOGIN ENDPOINT FOR USERS
@api.route('/login', methods=['POST'])
def login_user():
     user_email = request.json.get("email", None)
     user_password = request.json.get("password", None)
     user = User.query.filter_by(email = user_email, password = user_password).first()
     if user is None:
          return jsonify({"Error": "Wrong email or password"}), 401
     token = create_access_token(identity=user.id)
     return jsonify({"Response": "Successfully logged in", "token": token, "email": user.email}), 200


#GET ALL USERS
@api.route('/users', methods=['GET'])
def get_all_users():
    all_users = User.query.all()
    mapped_users = list(map(lambda index: index.serialize(), all_users))
    response_body=jsonify(mapped_users)
    return response_body, 200

#ACCESSING USERS PRIVATE PAGE

@api.route('/private', methods=['GET'])
@jwt_required()
def show_email():
    current_user_id = get_jwt_identity()
    user=User.query.get(current_user_id)
    return jsonify ({"email": user.email, "id": user.id, "response": "That is your data up there!"}), 200


