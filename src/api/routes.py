"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity



api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data['email']

    # Verifica si el correo electrónico ya está en uso
    repetido = User.query.filter_by(email=email).first()
    if repetido:
        return jsonify({'message': 'Email already in use'}), 409

    # Verifica si se proporcionó una contraseña
    if 'password' not in data or not data['password']:
        return jsonify({'message': 'Password is required'}), 400

    # Encripta la contraseña antes de almacenarla en la base de datos
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    # Crea un nuevo usuario
    new_user = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=email,
        password=hashed_password,
        phone=data['phone'],
        location=data['location']
    )

    # Agrega el nuevo usuario a la base de datos
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        token = create_access_token(identity=user.id)
        return jsonify({'message': 'Successful login', 'token': token, 'user': user.serialize()}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401
    
    

@api.route("/private", methods=["GET"])
@jwt_required()
def handle_private():
    
    return jsonify({"message": "Acceso permitido"}), 200
