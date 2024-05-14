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

        
        if not email or not password or not is_user or not name or not last_name or not username or not number_document or not phone or not age or not gender:
            return({"Error":"Email, password, is_user, name, last_name, username, number_document, phone, age and gender are required"}), 400
        
        
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"Error":"Email already exists."}), 409
        
       
        password_hash = generate_password_hash(password)

       
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
    

@api.route('/signup/teacher', methods=['POST'])
def create_signup_teacher():
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        is_teacher = request.json.get('isTeacher')
        name = request.json.get('name')
        last_name = request.json.get('lastName')
        username = request.json.get('username')
        number_document = request.json.get('numberDocument')
        phone = request.json.get('phone')
        age = request.json.get('age')
        gender = request.json.get('gender')
        certificate_teacher = request.json.get('certificateTeacher')
        user_id = request.json.get('userId')

       
        print(f"email: {email}, password: {password}, is_teacher: {is_teacher}, name: {name}, last_name: {last_name}, username: {username}, number_document: {number_document}, phone: {phone}, age: {age}, gender: {gender}, certificate_teacher: {certificate_teacher}")

        
        if email is None or password is None or is_teacher is None or name is None or last_name is None or username is None or number_document is None or phone is None or age is None or gender is None or certificate_teacher is None or user_id is None:
            return jsonify({"Error": "email, password, is_teacher, name, last_name, username, number_document, phone, age, gender, certificate_teacher and user_id are required"}), 400
        
        existing_teacher = Teacher.query.filter_by(email=email).first()
        if existing_teacher:
            return jsonify({"Error": "Email already exists"}), 409
        
        password_hash = generate_password_hash(password)

        new_teacher = Teacher(
            email=email,
            password=password_hash,
            is_teacher=is_teacher,
            name=name,
            last_name=last_name,
            username=username,
            number_document=number_document,
            phone=phone,
            age=age,
            gender=gender,
            certificate_teacher=certificate_teacher,
            user_id=user_id
        )
        db.session.add(new_teacher)
        db.session.commit()
        return jsonify({"Message": "Teacher Created Successfully", "teacher_create": new_teacher.serialize()}), 201
    except Exception as e:
        return jsonify({"error": "Error posting teacher user" + str(e)})

    

@api.route('/signup/manager', methods=['POST'])
def create_signup_manager():
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        is_manager = request.json.get('isManager')  
        name = request.json.get('name')
        last_name = request.json.get('lastName')  
        phone = request.json.get('phone')
        user_id = request.json.get('userId')  
        teacher_id = request.json.get('teacherId')  

        
        if len(email) > 80:
            return jsonify({"Error": "Email too long"}), 400

       
        print("Valores de los parámetros antes de la inserción en la base de datos:")
        print("Email:", email)
        print("Password:", password)
        print("Is Manager:", is_manager)
        print("Name:", name)
        print("Last Name:", last_name)
        print("Phone:", phone)
        print("User ID:", user_id)
        print("Teacher ID:", teacher_id)

        if not email or not password or not is_manager or not name or not last_name or not phone or not user_id or not teacher_id:
            return jsonify({"msg": "email, password, is_manager, name, last_name, phone, user_id and teacher_id are required"})
        
        existing_manager = Manager.query.filter_by(email=email).first()
        if existing_manager:
            return jsonify({"msg": "Email already exists"}), 409
        
        password_hash = generate_password_hash(password)

        new_manager = Manager(
            email=email,
            password=password_hash,
            is_manager=is_manager,
            name=name,
            last_name=last_name,
            phone=phone,
            user_id=user_id,
            teacher_id=teacher_id
        )
        db.session.add(new_manager)
        db.session.commit()
        
        return jsonify({"msg": "manager has been created successfully", "manager_create": new_manager.serialize()}), 201
    except Exception as e: 
        return jsonify({"Error": "Error in user creation" + str(e)}), 500
