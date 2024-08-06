"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, WeeklyRoutine
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# @api.route("/create-token", methods=["POST"])
# def create_token():
#     email = request.json.get("email", None)
#     password = request.json.get("password", None)
#     if email != "test@test.com" or password != "test":
#         return jsonify({"msg": "Bad username or password"}), 401
#     access_token = create_access_token(identity=email)
#     return jsonify(access_token=access_token)

# @api.route('/register', methods=['POST'])
# def register():
#     data = request.get_json()
#     email = data.get('email')
#     password = data.get('password')

#     if not email or not password:
#         return jsonify({"error": "Email and password are required"}), 400

#     existing_user = User.query.filter_by(email=email).first()
#     if existing_user:
#         return jsonify({"error": "User already exists"}), 400

#     new_user = User(email=email, password=password, is_active=True)
#     db.session.add(new_user)
#     db.session.commit()

#     access_token = create_access_token(identity=new_user.email)
#     return jsonify(access_token=access_token, user=new_user.serialize()), 201

# @api.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     email = data.get('email')
#     password = data.get('password')

#     if not email or not password:
#         return jsonify({"error": "Email and password are required"}), 400

#     user = User.query.filter_by(email=email, password=password).first()
#     if not user:
#         return jsonify({"error": "Invalid email or password"}), 401

#     access_token = create_access_token(identity=user.email)
#     return jsonify(access_token=access_token, user=user.serialize()), 200

# @api.route('/users', methods=['GET'])
# def get_users():
#     users = User.query.all()
#     users_list = [user.serialize() for user in users]
#     return jsonify(users=users_list), 200

# @api.route('/protected', methods=['GET'])
# @jwt_required()
# def protected():
#     current_user = get_jwt_identity()
#     return jsonify(logged_in_as=current_user), 200

# @api.route('/profile', methods=['GET'])
# @jwt_required()
# def profile():
#     email = get_jwt_identity()
#     user = User.query.filter_by(email=email).first()
#     if not user:
#         return jsonify({"error": "User not found"}), 404
#     return jsonify(user=user.serialize()), 200

# GET WeeklyRoutine / TRAER RUTINA SEMANA
@api.route('/WeeklyRoutine/<int:user_id>', methods=['GET'])
def get_weekly_routine(user_id):
    weekly_routine = WeeklyRoutine.query.filter_by(user_id=user_id).first()
    if weekly_routine is None:
        return ({'error':'routine week not found'}), 404
    else:
        weekly_routine_serialized = weekly_routine.serialize()
        return jsonify(weekly_routine_serialized), 200

# CREAR USUARIO
@api.route('/user', methods=['POST'])
def post_user():
    user = request.get_json()
    user_by_email = User.query.filter_by(email=user['email']).first()

    if not isinstance(user['name'], str) or len(user['name'].strip()) == 0:
         return({'error':'"name" must be a string'}), 400
    if not isinstance(user['email'], str) or len(user['email'].strip()) == 0:
         return({'error':'"email" must be a string'}), 400
    if user_by_email:
        if user_by_email.email == user['email']:
            return jsonify('This email is already used'), 403
    if not isinstance(user['password'], str) or len(user['password'].strip()) == 0:
         return({'error':'"password" must be a string'}), 400

    user_created = User(name=user['name'], email=user['email'], password=user['password'])
    db.session.add(user_created)
    db.session.commit()
    return jsonify(user_created.serialize()), 200

# INICIAR SESION
@api.route('/login', methods=['POST'])
def login():

    user = request.get_json()

    if not isinstance(user['email'], str) or len(user['email'].strip()) == 0:
         return({'error':'"email" must be a string'}), 400
    if not isinstance(user['password'], str) or len(user['password'].strip()) == 0:
         return({'error':'"password" must be a string'}), 400

    user_db = User.query.filter_by(email=user['email'], password=user['password']).first()
    if user_db is None:
        return jsonify({"error":"incorrect credentials"}), 401
    
    access_token = create_access_token(identity=user['email'])
    return jsonify({"access_token":access_token, "logged":True}), 200