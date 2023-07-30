"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Movie, Actor, Director
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required


api = Blueprint('api', __name__)


# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200

@api.route("/current_user", methods = ["GET"])
@jwt_required()
def current_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({"user": user.serialize()})

@api.route('/users/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    current_user_id = get_jwt_identity()
    if current_user_id != user_id:
        return jsonify({"msg": "Cannot update another user's profile"}), 403

    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    user = User.query.get(user_id)
    if user is None:
        return jsonify({"msg": "User not found"}), 404

    name = request.json.get('name', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if name is not None:
        user.name = name
    if email is not None:
        user.email = email
    if password is not None:
        user.set_password(password)

    db.session.commit()
    return jsonify(user.serialize()), 200


@api.route('/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    current_user_id = get_jwt_identity() 
    if current_user_id != user_id:
        return jsonify({"msg": "Cannot delete another user's profile"}), 403

    user = User.query.get(user_id)
    if user is None:
        return jsonify({"msg": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"msg": "User deleted"}), 200







@api.route('/signup', methods=['POST'])
def create_new_user():
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

    access_token = create_access_token(identity=new_user.id)

    return jsonify({"token": access_token, "msg": "User created", "id": new_user.id}), 201





@api.route('/login', methods=['POST'])
def login():

    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400
        
    user = User.query.filter_by(email=email).first()

    if user is None or not user.check_password(password):
        return jsonify({"msg": "Invalid email or password"}), 401
    
    access_token = create_access_token(identity=user.id)

    return jsonify({"token": access_token, "user": user.serialize()}), 200




    
