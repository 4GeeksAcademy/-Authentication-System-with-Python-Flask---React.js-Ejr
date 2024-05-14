"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Manager, Teacher, Course, Orders, Payment, Modules, Request 
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_bcrypt import bcrypt, generate_password_hash, check_password_hash 
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
import re

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup/user', methods=['POST'])
def create_signup_user():
    try:
        #Obtenermos los datos de los campo del body
        email =  request.json.get('email')
        password = request.json.get('password')
        is_user = request.json.get('isUser')
        name = request.json.get('name') 
        last_name = request.json.get('lastName')
        username = request.json.get('username')
        number_document = request.json.get('numberDocument')
        phone = request.json.get('phone')
        age = request.json.get('age')
        gender = request.json.get('gender')

        #Verificacion de campos vacios
        if not email or not password or not is_user or not name or not last_name or not username or not number_document or not phone or not age or not gender:
            return({"Error":"Email, password, is_user, name, last_name, username, number_document, phone, age and gender are required"}), 400
        
        #Verificacion de existencia de email en la base de datos
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"Error":"Email already exists."}), 409
        
        #Password encriptada
        password_hash = generate_password_hash(password)

        #User con password encriptada
        new_user = User(
            email=email,
            password=password_hash,
            is_user=is_user,
            name=name,
            last_name=last_name,
            username=username,
            number_document=number_document,
            phone=phone,
            age=age,
            gender=gender
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"Message":"User Created Successfully", "user_create": new_user.serialize()}), 201

    except Exception as err:
        return jsonify({"Error":"Error in User Creation:" + str(err)}), 500

@api.route('/login/user', methods=['POST'])
def get_token_login_user():
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        if not email or not password:
            return jsonify({"error": "Email and Password are required"}), 400
        #buscamos el user con ese correo
        login_user = User.query.filter_by(email=request.json['email']).one()
        if not login_user:
            return jsonify({'error': 'invalid email'}), 400
        password_from_db = login_user.password
        hashed_password_hex = password_from_db
        hashed_password_bin = bytes.fromhex(hashed_password_hex[2:])
        true_or_false = check_password_hash(hashed_password_bin, password)
        if true_or_false:
            expires = timedelta(days=1)
            user_id = login_user.id
            access_token = create_access_token(identity=user_id, expires_delta=expires)
            return jsonify({"access_token": access_token}), 200
        else:
            return {"error":"Clave incorrecta"}, 400
    except Exception as e:
        return jsonify({"error": "Error in user:" + str(e)}), 500

@api.route('/login/manager', methods=['POST'])
def get_token_login_manager():
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        if not email or not password:
            return jsonify({"error": "Email and Password are required"}), 400
        #buscamos el user con ese correo
        login_manager = User.query.filter_by(email=request.json['email']).one()
        if not login_manager:
            return jsonify({'error': 'invalid email'}), 400
        password_from_db = login_manager.password
        hashed_password_hex = password_from_db
        hashed_password_bin = bytes.fromhex(hashed_password_hex[2:])
        true_or_false = check_password_hash(hashed_password_bin, password)
        if true_or_false:
            expires = timedelta(days=1)
            user_id = login_manager.id
            access_token = create_access_token(identity=user_id, expires_delta=expires)
            return jsonify({"access_token": access_token}), 200
        else:
            return {"error":"Clave incorrecta"}, 400
    except Exception as e:
        return jsonify({"error": "Error in user:" + str(e)}), 500

@api.route('/login/teacher', methods=['POST'])
def get_token_login_teacher():
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        if not email or not password:
            return jsonify({"error": "Email and Password are required"}), 400
        #buscamos el user con ese correo
        login_teacher = User.query.filter_by(email=request.json['email']).one()
        if not login_teacher:
            return jsonify({'error': 'invalid email'}), 400
        password_from_db = login_teacher.password
        hashed_password_hex = password_from_db
        hashed_password_bin = bytes.fromhex(hashed_password_hex[2:])
        true_or_false = check_password_hash(hashed_password_bin, password)
        if true_or_false:
            expires = timedelta(days=1)
            user_id = login_teacher.id
            access_token = create_access_token(identity=user_id, expires_delta=expires)
            return jsonify({"access_token": access_token}), 200
        else:
            return {"error":"Clave incorrecta"}, 400
    except Exception as e:
        return jsonify({"error": "Error in user:" + str(e)}), 500