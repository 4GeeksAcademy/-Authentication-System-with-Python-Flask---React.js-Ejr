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

@api.route('/signup', methods=['POST'])
def handle_signup():
    request_body_user = request.get_json()
    print (request_body_user)
    user = User.query.filter_by(email=request_body_user["email"], password=request_body_user["password"]).first()
    
    if user:
        return jsonify({"message": "Email and password already exists"})
    new_user = User(email=request_body_user["email"], password=request_body_user["password"])
    print(new_user)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "New user added"}), 200

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password =data.get ('password')

    if not email or not password:
        return jsonify({"message": "Email and password are required"})
    user = User.query.filter_by(email=email, password=password).first()

    if not user:
        return jsonify({"message": "Email and password incorrect"})
    access_token = create_access_token(identity=user.id)

    return jsonify({"token": access_token, "user_id": user.id})


@api.route('/private', methods=['GET'])
@jwt_required()
def validate_token():
    
    current_user_id = get_jwt_identity()
    print(current_user_id)

    user = User.query.filter_by(id=current_user_id).first()
    if user is None:
        raise APIException("User not found", status_code=404)

    return jsonify("User authenticated"), 200