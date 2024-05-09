"""
Este módulo se encarga de iniciar el servidor API, cargar la base de datos y agregar los puntos finales.
"""

from flask import Flask, request, jsonify, url_for, Blueprint, redirect, url_for  # Importación de Flask y funciones relacionadas
from api.models import db, User, SecurityQuestion, Role, Permission, RolePermission  # Importación de los modelos de la base de datos
from api.utils import generate_sitemap, APIException  # Importación de funciones de utilidad y excepciones personalizadas
from flask_cors import CORS  # Importación de CORS para permitir solicitudes desde otros dominios
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity  # Importación de JWT para autenticación y autorización basada en tokens
from flask_bcrypt import generate_password_hash, check_password_hash  # Importación de bcrypt para encriptación de contraseñas
from datetime import timedelta  # Importación de timedelta para manejar intervalos de tiempo

#------------------verificar con david --------------------------------

from werkzeug.utils import secure_filename # importacion de secure_filename para manejar imagen



#------------------INICIALIZACION DE LA API----------------------------------------------------------------------------------

api = Blueprint('api', __name__)  # Creación de un Blueprint para agrupar las rutas relacionadas con la API
# Un Blueprint es una forma de organizar y estructurar las rutas de una aplicación Flask en grupos lógicos y modularizados. 
# Es una característica que permite dividir la aplicación en componentes más pequeños y reutilizables, 
# lo que facilita la gestión y mantenimiento del código.

# Allow CORS requests to this API
CORS(api)  # Habilitar CORS para permitir solicitudes cruzadas desde el frontend hacia la API

#-------ENCRIPTACION JWT------
#la inicialización de JWTManager está en la carpeta app.py despues de la declaración del servidor Flask
jwt = JWTManager()  # Inicialización del JWTManager para manejar la generación y verificación de tokens JWT



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


#-------------------CONSULTAR TODOS LOS USUARIOS--------------------------------------------------------------------------
@api.route('/users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        if not users:
            return jsonify({'message': 'No users found'}), 404
        
        response_body = [user.serialize() for user in users]
        return jsonify(response_body), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

#-------------------CONSULTAR UN USUARIO UNICO--------------------------------------------------------------------------

@api.route('/user', methods=['GET'])
@jwt_required() 
def get_user_by_email():
    try:

        current_user_id = get_jwt_identity() # Obtiene la id del usuario del token
        user = User.query.get(current_user_id) # Buscar al usuario por su ID
        if not user:
            return jsonify({'message': 'User not found'}), 404
        return jsonify(user.serialize()), 200 # Devolver los datos del usuario encontrado
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
#-------------------CREAR  USUARIOS PARA INTERFAL MASTER--------------------------------------------------------------------------
@api.route('/users', methods=['POST'])  # Define un endpoint para agregar un nuevo usuario mediante una solicitud POST a la ruta '/users'
def create_new_user():  # Define la función que manejará la solicitud
    try:  # Inicia un bloque try para manejar posibles excepciones
        data = request.json  # Obtén los datos JSON enviados en la solicitud
        if not data:  # Verifica si no se proporcionaron datos JSON
            return jsonify({'error': 'No data provided'}), 400  # Devuelve un error con código de estado 400 si no se proporcionaron datos

        if 'email' not in data:  # Verifica si 'email' no está presente en los datos JSON
            return jsonify({'error': 'Email is required'}), 400  # Devuelve un error con código de estado 400 si 'email' no está presente

        if 'username' not in data:  # Verifica si 'username' no está presente en los datos JSON
            return jsonify({'error': 'Username is required'}), 400  # Devuelve un error con código de estado 400 si 'username' no está presente

        if 'password' not in data:  # Verifica si 'password' no está presente en los datos JSON
            return jsonify({'error': 'Password is required'}), 400  # Devuelve un error con código de estado 400 si 'password' no está presente

        # Verifica si se proporcionan las preguntas y respuestas de seguridad en los datos JSON
        if 'security_questions' not in data or len(data['security_questions']) != 2:
            return jsonify({'error': 'Security questions and answers are required'}), 400
        
        if 'role' not in data:  # Verifica si 'password' no está presente en los datos JSON
            return jsonify({'error': 'role is required'}), 400  # Devuelve un error con código de estado 400 si 'password' no está presente

        existing_user = User.query.filter_by(email=data['email']).first()  # Busca un usuario en la base de datos con el mismo email
        if existing_user:  # Verifica si ya existe un usuario con el mismo email
            return jsonify({'error': 'Email already exists.'}), 409  # Devuelve un error con código de estado 409 si ya existe un usuario con el mismo email

        existing_username = User.query.filter_by(username=data['username']).first()  # Busca un usuario en la base de datos con el mismo username
        if existing_username:  # Verifica si ya existe un usuario con el mismo username
            return jsonify({'error': 'Username already exists.'}), 409  # Devuelve un error con código de estado 409 si ya existe un usuario con el mismo username

        # Búsqueda del rol especificado
        role = Role.query.filter_by(name=data['role']).first()
        if not role:
            return jsonify({'error': 'Role does not exist'}), 404
        
        password_hash = generate_password_hash(data['password']).decode('utf-8')

        # Crea un nuevo usuario con los datos proporcionados
        new_user = User(email=data['email'], password=password_hash, username=data['username'], name=data.get('name'), last_name=data.get('last_name'), is_active=True, role_id=role.id)
       
        # Agrega las preguntas y respuestas de seguridad al usuario
        for question_answer in data['security_questions']:
            new_question = SecurityQuestion(
                question=question_answer['question'],
                answer=question_answer['answer']
            )
            new_user.security_questions.append(new_question)

        db.session.add(new_user)  # Agrega el nuevo usuario a la sesión de la base de datos
        db.session.commit()  # Confirma los cambios en la base de datos
 
        return jsonify({'message': 'User created successfully'}), 201  # Devuelve un mensaje de éxito con el ID del nuevo usuario y un código de estado 201
   
    except Exception as e:  # Captura cualquier excepción que ocurra dentro del bloque try
        return jsonify({'error': 'Error in user creation: ' + str(e)}), 500  # Devuelve un mensaje de error con un código de estado HTTP 500 si ocurre una excepción durante el procesamiento

