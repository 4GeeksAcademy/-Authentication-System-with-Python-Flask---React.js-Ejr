"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
import os


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/signup', methods=['POST'])
def signup():
    data = request.json
    

    if not data:
        return jsonify({'message': 'Datos de usuario no proporcionados'}), 400

    # Lógica de registro de usuario aquí

    return jsonify({'message': 'Usuario registrado exitosamente'}), 201



@api.route("/login", methods=["POST"])
def user_login():
    data = request.json
    
    if data.get("email", None) is None:
        return jsonify({"message":"the email is required"}), 400


    user = User.query.filter_by(email=data["email"]).one_or_none()
    if user is not None:
        # validar la contraseña
        result = check_password_hash(user.password, f'{data["password"]}{user.salt}')
       

        if result: 
            #generar el token
            token = create_access_token(identity=user.email)

            return jsonify({"token":token}),201
        else:
            return jsonify({"message":"Credenciales incorrectas"}),400 
    else:
        return jsonify({"message":"Credenciales incorrectas"}),400 
