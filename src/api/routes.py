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


@api.route('/signup/user', methods=['POST'])
def create_signup_user():
    try:
        #Obtenermos los datos de los campos del body
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

    
        # Check if any required field is None or empty
        if email is None or password is None or is_teacher is None or name is None or last_name is None or username is None or number_document is None or phone is None or age is None or gender is None:
            return jsonify({"Error": "email, password, is_teacher, name, last_name, username, number_document, phone, age, gender, certificate_teacher, user_id are required"}), 400
        
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

        # Validar la longitud del correo electrónico
        if len(email) > 80:
            return jsonify({"Error": "Email too long"}), 400

        if not email or not password or not is_manager or not name or not last_name or not phone:
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
        return jsonify({"Error": "Error in user manager creation" + str(e)}), 500


@api.route('/login/user', methods=['POST'])
def get_token_login_user():
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        if not email or not password:
            return jsonify({"Error": "Email and Password are required"}), 400
        
        #buscamos el user con ese correo
        login_user = User.query.filter_by(email=request.json['email']).one()
        if not login_user:
            return jsonify({'Error': 'Invalid Email'}), 400
        

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
            return {"Error":"Invalid Password"}, 400
        
        
    except Exception as e:
        return jsonify({"Error": "User not exists in Data Base", "Msg": str(e)}), 500

@api.route('/login/manager', methods=['POST'])
def get_token_login_manager():
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        if not email or not password:
            return jsonify({"Error": "Email and Password are required"}), 400

        #buscamos el user con ese correo
        login_manager = Manager.query.filter_by(email=request.json['email']).one()

        if not login_manager:
            return jsonify({'Error': 'Invalid Email'}), 400

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
            return {"Error":"Invalid Password"}, 400
    except Exception as e:
        return jsonify({"Error": "Manager not exists in Data Base" , "Msg": str(e)}), 500

@api.route('/login/teacher', methods=['POST'])
def get_token_login_teacher():
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        if not email or not password:
            return jsonify({"Error": "Email and Password are required"}), 400

        #buscamos el user con ese correo
        login_teacher = Teacher.query.filter_by(email=request.json['email']).one()

        if not login_teacher:
            return jsonify({'Error': 'Invalid Email'}), 400

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
            return jsonify({"Error":"Invalid Password"}), 400
    except Exception as e:
        return jsonify({"Error": "Teacher not exists in Data Base" , "Msg": str(e)}), 500


@api.route('/view/user')
@jwt_required() #Decorador para requerir autenticacion con jwt
def show_view_user():
    current_token = get_jwt_identity() #obtiene la id del user del token
    if current_token:
        
        users = User.query.all()
        user_list = []
        for user in users:
            user_dict = {
                "id": user.id,
                "email": user.email,
                "isUser": user.is_user,
                "name": user.name,
                "lastName": user.last_name,
                "username": user.username,
                "numberDocument": user.number_document,
                "phone": user.phone,
                "age": user.age,
                "gender": user.gender
            }
            user_list.append(user_dict)


        return jsonify({"Access_to_User": user_list}), 200
        
    else:
        return jsonify({"Error": "Token invalid or not exits"}), 401

@api.route('/view/teacher')
@jwt_required() #Decorador para requerir autenticacion con jwt
def show_view_teacher():
    current_token = get_jwt_identity() #obtiene la id del user del token
    if current_token:
        
        users = User.query.all()
        user_list = []
        for user in users:
            user_dict = {
                "id": user.id,
                "email": user.email,
                "isUser": user.is_user,
                "name": user.name,
                "lastName": user.last_name,
                "username": user.username,
                "numberDocument": user.number_document,
                "phone": user.phone,
                "age": user.age,
                "gender": user.gender
            }
            user_list.append(user_dict)


        return jsonify({"Access_to_User": user_list}), 200
        
    else:
        return jsonify({"Error": "Token invalid or not exits"}), 401

@api.route('/view/manager')
@jwt_required() #Decorador para requerir autenticacion con jwt
def show_view_manager():
    current_token = get_jwt_identity() #obtiene la id del user del token
    if current_token:
        
        users = User.query.all()
        user_list = []
        for user in users:
            user_dict = {
                "id": user.id,
                "email": user.email,
                "isUser": user.is_user,
                "name": user.name,
                "lastName": user.last_name,
                "username": user.username,
                "numberDocument": user.number_document,
                "phone": user.phone,
                "age": user.age,
                "gender": user.gender
            }
            user_list.append(user_dict)

        teachers = Teacher.query.all()
        teacher_list = []
        for teacher in teachers:
            teacher_dict = {
                "id": teacher.id,
                "email": teacher.email,
                "is_teacher": teacher.is_teacher,
                "name": teacher.name,
                "lastName": teacher.last_name,
                "username": teacher.username,
                "numberDocument": teacher.number_document,
                "phone": teacher.phone,
                "age": teacher.age,
                "gender": teacher.gender,
                "certificateTeacher": teacher.certificate_teacher,
                "userId": teacher.user_id
            }
            teacher_list.append(teacher_dict)

        managers = Manager.query.all()
        manager_list = []
        for manager in managers:
            manager_dict = {
                "id": manager.id,
                "email": manager.email,
                "isManager": manager.is_manager,
                "name": manager.name,
                "lastName": manager.last_name,
                "phone": manager.phone,
                "userId": manager.user_id,
                "teacherId": manager.teacher_id
            }
            manager_list.append(manager_dict)

        return jsonify({"Access_to_User": user_list, "Access_to_Teacher": teacher_list, "Access_to_Manager": manager_list}), 200
        
    else:
        return jsonify({"Error": "Token invalid or not exits"}), 401

