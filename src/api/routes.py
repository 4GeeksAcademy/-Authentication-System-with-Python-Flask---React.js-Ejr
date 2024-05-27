"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, send_file
from api.models import db, User, Manager, Teacher, Course, Category, Orders, Trolley, Payment, Modules, Quizzes 
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash

import requests
import base64


from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, decode_token
from datetime import timedelta
from datetime import datetime
from flask_mail import Message
from app import mail
import os
import cloudinary
import cloudinary.uploader

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

#-----------------------CREACION DE USERS------------------------#
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

        # Enviar correo de bienvenida
        msg = Message('Welcome to Our Platform', recipients=[email])
        msg.body = f"Hello {name},\n\nThank you for signing up on our platform. We're excited to have you on board!"
        mail.send(msg)

        return jsonify({"message":"Student has been Created Successfully", "user_create": new_user.serialize()}), 201

    except Exception as err:
        return jsonify({"Error":"Error in User Creation: " + str(err)}), 500

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

        # Enviar correo de bienvenida
        msg = Message('Welcome to Our Platform, TEACHER', recipients=[email])
        msg.body = f"Hello {name},\n\nThank you for signing up on our platform. We're excited to have you on board!"
        mail.send(msg)

        return jsonify({"message": "Teacher has been Created Successfully", "teacher_create": new_teacher.serialize()}), 201
    except Exception as e:
        return jsonify({"Error": "Error posting teacher user", "error code": str(e)})

@api.route('/signup/manager', methods=['POST'])
def create_signup_manager():
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        is_manager = request.json.get('isManager')  
        name = request.json.get('name')
        last_name = request.json.get('lastName')
        number_document = request.json.get('numberDocument')  
        phone = request.json.get('phone')
        number_document = request.json.get('numberDocument')
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
            number_document=number_document,
            phone=phone,
            number_document=number_document,
            user_id=user_id,
            teacher_id=teacher_id
        )
        db.session.add(new_manager)
        db.session.commit()

        # Enviar correo de bienvenida
        msg = Message('Welcome to Our Platform, MANAGER', recipients=[email])
        msg.body = f"Hello {name},\n\nThank you for signing up on our platform. We're excited to have you on board!"
        mail.send(msg)
        
        return jsonify({"message": "Manager has been Created Successfully", "manager_create": new_manager.serialize()}), 201
    except Exception as e: 
        return jsonify({"Error": "Error in user manager creation" + str(e)}), 500



#-----------------------LOGIN DE USERS------------------------#
@api.route('/login/user', methods=['POST'])
def get_token_login_user():
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        if not email or not password:
            return jsonify({"Error": "Email and Password are required"}), 400
        
        # Buscar el usuario con ese correo
        login_user = User.query.filter_by(email=email).first()
        if not login_user:
            return jsonify({'Error': 'Invalid Email'}), 400

        # Obtener la contraseña desde la base de datos
        password_from_db = login_user.password

        # Verificar la contraseña
        true_or_false = check_password_hash(password_from_db, password)

        if true_or_false:
            expires = timedelta(days=1)
            user_id = login_user.id
            access_token = create_access_token(identity=user_id, expires_delta=expires)
            return jsonify({"access_token": access_token, "message": "Log In Successfully"}), 200
        else:
            return jsonify({"Error":"Invalid Password"}), 400
        
    except Exception as e:
        return jsonify({"Error": "User not exists in Data Base", "message": str(e)}), 500

@api.route('/login/teacher', methods=['POST'])
def get_token_login_teacher():
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        if not email or not password:
            return jsonify({"Error": "Email and Password are required"}), 400

        # Buscar el usuario con ese correo
        login_teacher = Teacher.query.filter_by(email=email).first()
        if not login_teacher:
            return jsonify({'Error': 'Invalid Email'}), 400

        # Obtener la contraseña desde la base de datos
        password_from_db = login_teacher.password

        # Verificar la contraseña
        true_or_false = check_password_hash(password_from_db, password)

        if true_or_false:
            expires = timedelta(days=1)
            teacher_id = login_teacher.id
            access_token = create_access_token(identity=teacher_id, expires_delta=expires)
            return jsonify({"access_token": access_token, "message": "Log In Successfully"}), 200
        else:
            return jsonify({"Error":"Invalid Password"}), 400
        
    except Exception as e:
        return jsonify({"Error": "Teacher not exists in Data Base" , "message": str(e)}), 500

 



#-----------------------RESET PASSWORD DE USERS------------------------#
@api.route('/forgot-password/user', methods=['POST'])
def forgot_password_user():
    email = request.json.get('email')
    if not email:
        return jsonify({"Error": "Email is required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"Error": "User not found"}), 404

    reset_token = create_access_token(identity=user.id, expires_delta=timedelta(hours=1))
    frontend_url = os.getenv('FRONTEND_URL')  
    reset_link = f"{frontend_url}/ResetPassword/token"  # Construir el enlace completo

    msg = Message('Password Reset Request', recipients=[email])
    msg.body = f"To reset your password, click the following link: {reset_link}"
    mail.send(msg)

    return jsonify({"message": "Password reset link sent", "access_token": reset_token}), 200

# Ruta para resetear la contraseña
@api.route('/reset-password/user/<token>', methods=['POST'])
def reset_password_user(token):
    try:
        decoded_token = decode_token(token)
        user_id = decoded_token['sub']
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({"Error": "Invalid or expired token"}), 400

        new_password = request.json.get('password')
        if not new_password:
            return jsonify({"Error": "Password is required"}), 400

        user.password = generate_password_hash(new_password)
        db.session.commit()

        msg = Message('Password Reset Successful', recipients=[user.email])
        msg.body = "Your password has been successfully reset."
        mail.send(msg)

        return jsonify({"message": "Password reset successful"}), 200
    except Exception as e:
        return jsonify({"Error": f"An error occurred: {str(e)}"}), 500


@api.route('/forgot-password/teacher', methods=['POST'])
def forgot_password_teacher():
    email = request.json.get('email')
    if not email:
        return jsonify({"Error": "Email is required"}), 400

    teacher = Teacher.query.filter_by(email=email).first()
    if not teacher:
        return jsonify({"Error": "User not found"}), 404

    reset_token = create_access_token(identity=teacher.id, expires_delta = timedelta(hours=1))
    frontend_url = os.getenv('FRONTEND_URL')  
    reset_link = f"{frontend_url}/ResetPassword/token/"  # Construir el enlace completo

    msg = Message('Password Reset Request', recipients=[email])
    msg.body = f"To reset your password, click the following link: {reset_link}"
    mail.send(msg)

    return jsonify({"message": "Password reset link sent", "access_token": reset_token}), 200

# Ruta para resetear la contraseña
@api.route('/reset-password/teacher/<token>', methods=['POST'])
def reset_password_teacher(token):
    try:
        decoded_token = decode_token(token)
        teacher_id = decoded_token['sub']
        teacher = Teacher.query.get(teacher_id)
        
        if not teacher:
            return jsonify({"Error": "Invalid or expired token"}), 400

        new_password = request.json.get('password')
        if not new_password:
            return jsonify({"Error": "Password is required"}), 400

        teacher.password = generate_password_hash(new_password)
        db.session.commit()

        msg = Message('Password Reset Successful', recipients=[teacher.email])
        msg.body = "Your password has been successfully reset."
        mail.send(msg)

        return jsonify({"message": "Password reset successful"}), 200
    except Exception as e:
        return jsonify({"Error": f"An error occurred: {str(e)}"}), 500


@api.route('/forgot-password/manager', methods=['POST'])
def forgot_password_manager():
    email = request.json.get('email')
    if not email:
        return jsonify({"Error": "Email is required"}), 400

    manager = Manager.query.filter_by(email=email).first()
    if not manager:
        return jsonify({"Error": "User not found"}), 404

    reset_token = create_access_token(identity=manager.id, expires_delta=timedelta(hours=1))
    frontend_url = os.getenv('FRONTEND_URL')  
    reset_link = f"{frontend_url}/ResetPassword/token/"  # Construir el enlace completo

    msg = Message('Password Reset Request', recipients=[email])
    msg.body = f"To reset your password, click the following link: {reset_link}"
    mail.send(msg)

    return jsonify({"message": "Password reset link sent", "access_token": reset_token}), 200

# Ruta para resetear la contraseña
@api.route('/reset-password/manager/<token>', methods=['POST'])
def reset_password_manager(token):
    try:
        decoded_token = decode_token(token)
        manager_id = decoded_token['sub']
        manager = Manager.query.get(manager_id)
        
        if not manager:
            return jsonify({"Error": "Invalid or expired token"}), 400

        new_password = request.json.get('password')
        if not new_password:
            return jsonify({"Error": "Password is required"}), 400

        manager.password = generate_password_hash(new_password)
        db.session.commit()

        msg = Message('Password Reset Successful', recipients=[manager.email])
        msg.body = "Your password has been successfully reset."
        mail.send(msg)

        return jsonify({"message": "Password reset successful"}), 200
    except Exception as e:
        return jsonify({"Error": f"An error occurred: {str(e)}"}), 500



#-----------------------GET USERS------------------------#
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


        return jsonify({"access_to_user": user_list, "message": "Access to Student Successfully"}), 200
        
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

        return jsonify({"access_to_user": user_list, "access_to_teacher": teacher_list, "message": "Access to Teacher Successfully"}), 200
        
    else:
        return jsonify({"Error": "Token invalid or not exits"}), 401

@api.route('/view/manager')
@jwt_required()  # Decorador para requerir autenticación con jwt
def show_view_manager():
    current_token = get_jwt_identity()  # obtiene la id del user del token
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
                "numberDocument": manager.number_document,
                "userId": manager.user_id,
                "teacherId": manager.teacher_id
            }
            manager_list.append(manager_dict)

        return jsonify({
            "access_to_user": user_list,
            "access_to_teacher": teacher_list,
            "access_to_manager": manager_list,
            "message": "Access to Manager User Successfully"
        }), 200
        
    else:
        return jsonify({"Error": "Token invalid or not exits"}), 401


#-------------------DELETE USER--------------------#
@api.route('/view/manager/teacher/<int:teacher_id>', methods=['DELETE'])
def delete_user(user_id):
    current_token = get_jwt_identity()
    if not current_token:
        return jsonify({"Error": "Token invalid or not no exists"}), 401
    
    user = User.query.get(user_id)
    if not user:
        return jsonify({"Error": "User not found"}), 404
    
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": f"User with ID {user.id} deleted succesfully"}), 200


#---------------------UPDATE USER----------------------#
@api.route('/view/manager/user/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    current_token = get_jwt_identity()
    if not current_token:
        return jsonify({"Error": "Token invalid or not exists"}), 401

    user = User.query.get(user_id)
    if not user:
        return jsonify({"Error": "User not found"}), 404

    data = request.get_json()
    user.email = data.get('email', user.email)
    user.is_user = data.get('isUser', user.is_user)
    user.name = data.get('name', user.name)
    user.last_name = data.get('lastName', user.last_name)
    user.username = data.get('username', user.username)
    user.number_document = data.get('numberDocument', user.number_document)
    user.phone = data.get('phone', user.phone)
    user.age = data.get('age', user.age)
    user.gender = data.get('gender', user.gender)

    db.session.commit()
    return jsonify({"message": f"User with ID {user.id} updated successfully"}), 200


#------------------DELETE TEACHER------------------#
@api.route('/view/manager/teacher/<int:teacher_id>', methods=['DELETE'])
@jwt_required()
def delete_teacher(teacher_id):
    current_token = get_jwt_identity()  # Obtiene ID del usuario del Token
    if not current_token:
        return jsonify({"Error": "Token invalid or not exists"}), 401

    teacher = Teacher.query.get(teacher_id)
    if not teacher:
        return jsonify({"Error": "Teacher not found"}), 404

    db.session.delete(teacher)
    db.session.commit()
    return jsonify({"message": f"Teacher with ID {teacher.id} deleted successfully"}), 200


#--------------------UPDATE TEACHER--------------------#
@api.route('/view/manager/teacher/<int:teacher_id>', methods=['PUT'])
@jwt_required()
def update_teacher(teacher_id):
    current_token = get_jwt_identity()
    if not current_token:
        return jsonify({"Error": "Token invalid or not exists"}), 401

    teacher = Teacher.query.get(teacher_id)
    if not teacher:
        return jsonify({"Error": "Teacher not found"}), 404

    data = request.get_json()
    teacher.email = data.get('email', teacher.email)
    teacher.is_teacher = data.get('isTeacher', teacher.is_teacher)
    teacher.name = data.get('name', teacher.name)
    teacher.last_name = data.get('lastName', teacher.last_name)
    teacher.username = data.get('username', teacher.username)
    teacher.number_document = data.get('numberDocument', teacher.number_document)
    teacher.phone = data.get('phone', teacher.phone)
    teacher.age = data.get('age', teacher.age)
    teacher.gender = data.get('gender', teacher.gender)
    teacher.certificate_teacher = data.get('certificateTeacher', teacher.certificate_teacher)
    teacher.user_id = data.get('userId', teacher.user_id)

    db.session.commit()
    return jsonify({"message": f"Teacher with ID {teacher.id} updated successfully"}), 200


#-----------------------COURSES------------------------#
@api.route('/create/courses', methods=['POST'])
def post_courses():
    try:
        
        title =  request.json.get('title')
        category_title = request.json.get('categoryTitle')
        modules_length = request.json.get('modulesLength')
        certificate = request.json.get('certificate') 
        price = request.json.get('price')

        #Verificacion de campos vacios
        if not title or not category_title or not modules_length or not certificate or not price:
            return({"Error":"title, category_title, modules_length, certificate and price are required"}), 400
        
        #Verificacion de existencia de titulo en la base de datos
        existing_course = Course.query.filter_by(title=title).first()
        if existing_course:
            return jsonify({"Error":"Title already exists."}), 409
        
        
        course = Course(title=title, category_title=category_title, modules_length=modules_length, certificate=certificate, price=price)
        db.session.add(course)
        db.session.commit()
        return jsonify({"message":"Course has been Create Successfully", "Course": course.serialize()}), 200

    except Exception as err:
        return jsonify({"Error":"Error in Course Creation:" + str(err)}), 500
    

@api.route('/view/courses')
def get_courses():
    try:
        courses = Course.query.all()
        course_list = [course.serialize() for course in courses]

        return jsonify({"access_to_courses": course_list, "message": "Access to Course List Successfully"}), 200

    except Exception as err:
        return jsonify({"Error": "Error fetching courses", "errorFetching": str(err)}), 500
    

@api.route('/viewManager/courses', methods=['PUT'])
def update_course():
    try:
        data = request.get_json()
        course_id = data.get('course_id')
        updated_data = data.get('updated_data')

        course = Course.query.get(course_id)
        
        if course:
            for key, value in updated_data.items():
                setattr(course, key, value)
            db.session.commit()
            return jsonify({"message": "Course updated successfully"}), 200
        else:
            return jsonify({"Error": "Course not found"}), 404
    
    except Exception as err:
        return jsonify({"Error": "Error in fetching courses: " + str(err)}), 500


@api.route('/view/courses/<int:course_id>', methods=['PUT'])
def put_courses(course_id):
    try:
        course = Course.query.get(course_id)
        if not course:
            return jsonify({"Error": "Course not found"}),404
        
        updated_data = request.json
        for key, value in updated_data.items():
            setattr(course, key, value)
        db.session.commit()
        return jsonify({"message": "Course updated successfully.", "Course": course.serialize()}), 200
    
    except Exception as err:
        return jsonify({"Error": "Error in updating course: " + str(err)}), 500


@api.route('/view/courses/<int:course_id>', methods=['DELETE'])
def delete_courses(course_id):
    try:
        course = Course.query.get(course_id)

        if not course:
            return jsonify({"Error": "Course not found"}), 404
        
        db.session.delete(course)
        db.session.commit()
        return jsonify({"message": "Course delete succesfully."}), 200
    
    except Exception as err:
        return jsonify({"Error": "Error in deleting course: " + str(err)}), 500


#-----------------------MODULES------------------------#
@api.route('/module/course', methods=['POST'])
def post_module():
    try:
        course_id = request.json.get('courseId')  
        description_content = request.json.get('descriptionContent')
        type_file = request.json.get('typeFile')
        title = request.json.get('title')
        video_id = request.json.get('videoId')
        type_video = request.json.get('typeVideo')
        text_id = request.json.get('textId')
        type_text = request.json.get('typeText')
        image_id = request.json.get('imageId')
        type_image = request.json.get('typeImage')
        total_video = request.json.get('totalVideo')

        if not course_id or not description_content or not type_file or not title or not video_id or not type_video or not text_id or not type_text or not image_id or not type_image or not total_video:
            return {"Error": "courseId, descriptionContent, typeFile, title, videoId, typeVideo, textId, typeText, imageId, typeImage and totalVideo  are required"}, 400

        
        existing_course = Course.query.filter_by(id=course_id).first()
        if not existing_course:
            return jsonify({"Error": "Course does not exist."}), 404

        module = Modules(course_id=course_id, description_content=description_content,  type_file=type_file, title=title, video_id=video_id, type_video=type_video, text_id=text_id, type_text=type_text, image_id=image_id, type_image=type_image,total_video=total_video )
        db.session.add(module)
        db.session.commit()
        return jsonify({"message": "Module created successfully", "Module": module.serialize()}), 201

    except Exception as err:
        return jsonify({"Error": "Error in module Creation: " + str(err)}), 500

@api.route('/module/course/', methods=['GET'])
def get_modules():
    try:
        modules = Modules.query.all()
        if not modules:
            return jsonify({"Error": "No modules found"}), 404
        
        serialized_modules = [module.serialize() for module in modules]
        return jsonify({"message": "Module created successfully", "Modules": serialized_modules}), 200
    
    except Exception as err:
        return jsonify({"Error": "Error in fetching modules: " + str(err)})

@api.route('/module/course/<int:module_id>', methods=['DELETE'])
def delete_module(module_id):
    try:
        module = Modules.query.get(module_id)
        if not module:
            return jsonify({"Error": "Module does no exist"}), 404
        
        db.session.delete(module)
        db.session.commit()

        return jsonify({"message": "Module deleted successfully"}), 200
    
    except Exception as err:
        return jsonify({"Error": "Error in module deletion: " + str(err)}), 500


#-----------------------PAYMENT------------------------#
@api.route('/payment/courses', methods=['POST'])
def create_payment_course():
    try:
        data = request.get_json()
        new_payment = Payment(
            date=data.get('date'),
            title_course=data.get('titleCourse'),
            pad_amount=data.get('padAmount'),
            type_payment=data.get('typePayment'),
            user_id=data.get('user_id'),
            manager_id=data.get('manager_id')
        )
        db.session.add(new_payment)
        db.session.commit()
        return jsonify({"message": "Payment for course created successfully", "payment_id": new_payment.id}), 201
    except Exception as err:
        return jsonify({"Error": f"Error creating payment for course: {str(err)}"}), 500

        
@api.route('/payment/courses', methods=['GET'])
def get_all_payments_courses():
    try:
        payments = Payment.query.all()
        serialized_payments = [payment.serialize() for payment in payments]
        return jsonify({"payments": serialized_payments}), 200
    except Exception as err:
        return jsonify({"Error": f"Error fetching payments for courses: {str(err)}"}), 500


#-----------------------QUIZZES------------------------#
@api.route('/module/quizzes', methods=['POST'])
def post_quizzes():

    try:
        question_title = request.json.get('questionTitle')
        answer_teacher = request.json.get('answerTeacher')
        answer_user = request.json.get('answerUser')
        approved = request.json.get('approved')
        approval_percentage_user = request.json.get('approvalPercentageUser')
        approval_percentage_number = request.json.get('approvalPercentageNumber')
        approval_percentage = request.json.get('approvalPercentage')
        module_id = request.json.get('moduleId')

        if not question_title or not answer_teacher or not answer_user or not approved or not approval_percentage_user or not approval_percentage_number or not approval_percentage or not module_id:
            return {"Error": "questionTitle, answer, answerTeacher, answerUser, approved, approvalPercentageUser, approvalPercentageNumber, approvalPercentage and moduleId are required"}, 400
        
        existing_module = Modules.query.filter_by(id=module_id).first()
        if not existing_module:
            return jsonify({"Error": "Module does not exist."}), 404
        
        quiz = Quizzes(question_title=question_title, answer_teacher=answer_teacher, answer_user=answer_user, approved=approved, approval_percentage_user=approval_percentage_user, approval_percentage_number=approval_percentage_number, approval_percentage=approval_percentage, module_id=module_id)
        db.session.add(quiz)
        db.session.commit()
        return jsonify({"message": "Quiz created successfully", "Quiz": quiz.serialize()}), 201
    
    except Exception as err:
        return jsonify({"Error": "Error in quiz creation: ", "fetching error": str(err)}), 500


@api.route('/module/quizzes', methods=['GET'])
def get_quizzes():
    try:
        quizzes = Quizzes.query.all()

        if not quizzes:
            return jsonify({"message": "No quiz found"}), 404
        
        serialized_quizzes = [quiz.serialize() for quiz in quizzes]
        return jsonify({"Quiz": serialized_quizzes}), 200
    
    except Exception as err:
        return jsonify({"Error": "Error in fetching quizzes: " + str(err)})  
        
        
#----------------------TROLLEY------------------------#           
@api.route('/trolley/courses', methods=['POST'])
def add_course_to_trolley():
    try:
        data = request.json

        course_id = data.get('course_id')
        user_id = data.get('user_id')
        manager_id = data.get('manager_id')

        if not course_id or not user_id or not manager_id:
            return jsonify({"error": "Course ID, User ID, and Manager ID are required"}), 400
        
        course = Course.query.get(course_id)
        if not course:
            return jsonify({"error": "Course not found"}), 404
        
        current_date = datetime.now().strftime('%Y-%m-%d')
        new_order = Orders(
            user_id=user_id,
            manager_id=manager_id,
            payment_id=None,
            title_order=course.title,
            price=course.price,
            date=current_date
        )
        db.session.add(new_order)
        db.session.commit()

        new_trolley_entry = Trolley(order_id=new_order.id)
        db.session.add(new_trolley_entry)
        db.session.commit()
        return jsonify({"message": "Course added to trolley succesfully", "order_id": new_order.id}), 201
    
    except Exception as e:
        return jsonify({"Error": "An error ocurred", "erro fetching": {str(e)}}), 500


#----------------------ORDER------------------------#           
@api.route('/order/courses', methods=['POST'])
def add_order_to_trolley():
    try:
        data = request.json
        title_order = data.get('titleOrder')
        price = data.get('price')
        total = data.get('total')
        user_id = data.get('userId')

        if not title_order or not price or not total or not user_id:
            return jsonify({"Error": "titleOrder, price, total and userId are required"}), 400
        
        user = User.query.filter_by(id=user_id).first()
        if not user:
            return jsonify({"Error": "User ID does not exist"}), 404
        
        current_date = datetime.now().strftime('%Y-%m-%d')
        new_order = Orders(
            user_id=user_id,
            title_order=title_order,
            price=price,
            total=total,
            date=current_date
        )
        
        # Verificación de existencia del título de la orden en la base de datos
        existing_order = Orders.query.filter_by(title_order=title_order).first()
        if existing_order:
            return jsonify({"Error": "Order already exists."}), 409

        db.session.add(new_order)
        db.session.commit()

        return jsonify({"message": "It has been to create an Order successfully", "order": new_order.serialize()}), 201
    
    except Exception as e:
        return jsonify({"Error": "An error occurred", "error_fetching": str(e)}), 500

@api.route('/trolley/courses', methods=['GET'])
def get_orders():
    try:
        trolleys = Trolley.query.all()
        serialized_trolley = [trolley.serialize() for trolley in trolleys]
        return jsonify(serialized_trolley), 200
    except Exception as e:
        return jsonify({"Error": "An error occurred while fetching trolleys", "error_details": str(e)}), 500
    

#----------------------CARGA DE DOCUMENTO------------------------# 
# Definir la ruta de la carpeta de carga
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')
# Asegúrate de que la carpeta 'uploads' exista
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


@api.route('/upload', methods=['POST'])
def upload_file():
    try:
        if 'file' not in request.files:
            return jsonify({'Error': 'No file part'}), 400
        
        file = request.files['file'] 
        if file.filename == '':
            return jsonify({'Error': 'No selected file'}), 400
        
        if file:
            file_path = os.path.join(UPLOAD_FOLDER, file.filename)
            file.save(file_path)
            file_info = {
                'filename': file.filename,
                'content_type': file.content_type,
                'size': os.path.getsize(file_path),
                'path': file_path
            }
            return jsonify({'message': 'File uploaded successfully', 'file': file_info}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
