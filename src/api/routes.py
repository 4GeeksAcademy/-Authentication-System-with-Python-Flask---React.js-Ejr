"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from src.api.models import db, User, Product, Order
from src.api.utils import generate_sitemap, APIException
import bcrypt
import jwt

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
    
    # Verificar si se proporcionó la contraseña
    if 'password' not in data or not data['password']:
        return jsonify({'message': 'El campo de contraseña es obligatorio.'}), 400


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
        return jsonify({'message': 'Inicio de sesión exitoso.', 'token': token , 'user':user.serialize()}), 200
    else:
        return jsonify({'message': 'Credenciales inválidas. Por favor, intenta de nuevo.'}), 401

# Ruta para cerrar sesión (logout)
@api.route('/logout')
def logout():
    # Para cerrar sesión con JWT, simplemente se omite el token en el cliente.
    return jsonify({'message': 'Cierre de sesión exitoso.'}), 200

@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    serialized_users = [user.serialize() for user in users]
    return jsonify(serialized_users), 200

@api.route('/user/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'Usuario no encontrado'}), 404
    return jsonify(user.serialize()), 200

@api.route('/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'Usuario no encontrado'}), 404

    data = request.json 
    user.first_name = data.get('firstName', user.first_name)
    user.last_name = data.get('lastName', user.last_name)
    user.email = data.get('email', user.email)
    user.address = data.get('address', user.address)
    user.location = data.get('location', user.location)
    user.payment_method = data.get('paymentMethod', user.payment_method)
    user.is_admin = data.get('isAdmin', user.is_admin)

    db.session.commit()
    return jsonify({'message': 'Usuario modificado exitosamente'}), 200

# Ruta para eliminar un usuario por su ID
@api.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'Usuario no encontrado'}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'Usuario eliminado exitosamente'}), 200

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200