"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Usuario
from api.utils import generate_sitemap, APIException
import os
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)



@api.route('/register', methods=['POST'])
def Usuario_add():
    request_body_usuario = request.get_json()

    nombre = request.json.get('nombre', None)
    apellido = request.json.get('apellido', None)
    telefono = request.json.get('telefono', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    direccion = request.json.get('direccion', None)

    if nombre is None:
        return 'Escriba su nombre', 400
    if apellido is None:
        return 'Escriba su apellido', 400
    if telefono is None:
        return 'Escriba su telefono', 400
    if email is None:
        return 'Escriba su email', 400
    if password is None:
        return 'Escriba su password', 400
    if direccion is None:
        return 'Escriba su direccion', 400

    usuario = Usuario.query.filter_by(email=email).first()

    if usuario:
        return jsonify({"msg": "User already exists"})
    else:
        new_usuario = Usuario(nombre=request_body_usuario['nombre'],
                              apellido=request_body_usuario['apellido'],
                              telefono=request_body_usuario['telefono'],
                              email=request_body_usuario['email'],
                              password=request_body_usuario['password'],
                              direccion=request_body_usuario['direccion'],
                              )
        db.session.add(new_usuario)
        db.session.commit()
        return jsonify({"msg": "User added successfully!"}), 200



@api.route('/usuario', methods=['GET'])
def Usuario_get():
    usuario = Usuario.query.all()
    usuario = list(map(lambda usuario: usuario.serialize(), usuario))
    return jsonify({"results": usuario})
