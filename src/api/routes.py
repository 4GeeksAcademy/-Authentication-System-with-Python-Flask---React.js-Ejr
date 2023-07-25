"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from src.api.models import db, User, Product, Order
from src.api.utils import generate_sitemap, APIException
import bcrypt

from src import app

api = Blueprint('api', __name__)



# La clave secreta para firmar los tokens JWT
api.secret_key = 'Our_Unique_Proyect'

# Función para generar un token JWT
def generate_token(user_id):
    payload = {'user_id': user_id}
    token = jwt.encode(payload, api.secret_key, algorithm='HS256')
    return token

# Ruta para el registro de usuarios (signup)
@api.route('/signup', methods=['POST'])
def signup():
    data = request.json

    # Verificar si el usuario ya existe por su dirección de correo electrónico
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'El usuario ya existe. Intente con otro correo electrónico.'}), 409

    # Encriptar la contraseña antes de guardarla en la base de datos
    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())

    # Crear un nuevo usuario
    new_user = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        password=hashed_password.decode('utf-8'),  # Decodificar el hash para almacenarlo como cadena
        address=data['address'],
        location=data['location'],
        payment_method=data['payment_method'],
    )

    # Agregar el usuario a la base de datos
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Usuario creado exitosamente.'}), 201

# Ruta para el inicio de sesión de usuarios (login)
@api.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        # Generar un token JWT y devolverlo en la respuesta
        token = generate_token(user.id)
        return jsonify({'message': 'Inicio de sesión exitoso.', 'token': token}), 200
    else:
        return jsonify({'message': 'Credenciales inválidas. Por favor, intenta de nuevo.'}), 401

# Ruta para cerrar sesión (logout)
@api.route('/logout')
def logout():
    # Para cerrar sesión con JWT, simplemente se omite el token en el cliente.
    return jsonify({'message': 'Cierre de sesión exitoso.'}), 200



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200