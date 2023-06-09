"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def handle_signup():
    request_data=request.get_json(force=True)

    # verifica si el email esta en la base de datos

    if db.session.query(User).filter(User.email == request_data['email']).first():

    #db.session conecta con la base de datos y query hace una busqueda en la tabla de datos User

        return jsonify({"message": "Este email ya está registrado en la base de datos"}), 400

    if db.session.query(User).filter(User.user_name == request_data['user_name']).first():

        return jsonify({"message": "El usuario ya está registrado"}), 400

    #si ha pasado estas dos condiciones sin hacer los if, crea un usuario

    new_user = User(
        user_name=request_data['user_name'],
        email=request_data['email'],
        profile_img = None,
        password=request_data['password'],
        first_name=request_data['first_name'],
        last_name=request_data['last_name'],
        description = None,
        is_grandparent=request_data['is_grandparent']
    ) 
    db.session.add(new_user)
    db.session.commit()

    return jsonify('Se ha añadido usario: ', request_data), 200

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    email = body['email']
    password = body['password']

    print(body)

    user = User.query.filter_by(email=email, password=password).first()

    if user == None:
        return jsonify({"msg": "User or password does not exist!"}), 401

    access_token = create_access_token(identity=user.serialize())

    response_body = {
        "msg": "Token created successfully",
        "token": access_token,
        "email": email
    }

    return jsonify(response_body), 200
