"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Usuario, Empresa, Casino
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


@api.route('/registro', methods=['POST'])
def Empresa_add():
    request_body_empresa = request.get_json()

    nombre_empresa = request.json.get('nombre_empresa', None)
    encargado_empresa = request.json.get('encargado_empresa', None)
    cantidad_trabajadores = request.json.get('cantidad_trabajadores', None)
    telefono = request.json.get('telefono', None)
    email_empresa = request.json.get('email_empresa', None)
    password = request.json.get('password', None)
    direccion_empresa = request.json.get('direccion_empresa', None)

    if nombre_empresa is None:
        return 'Escriba el nombre de empresa', 400
    if encargado_empresa is None:
        return 'Escriba el nombre del encargado de la empresa', 400
    if cantidad_trabajadores is None:
        return 'Escriba la cantidad de trabajadores de la empresa', 400
    if telefono is None:
        return 'Escriba el telefono de la empresa', 400
    if email_empresa is None:
        return 'Escriba el email de empresa', 400
    if password is None:
        return 'Escriba su password', 400
    if direccion_empresa is None:
        return 'Escriba la direccion de la empresa', 400

    empresa = Empresa.query.filter_by(email_empresa=email_empresa).first()

    if empresa:
        return jsonify({"msg": "Esta empresa se encuentra registrada"})
    else:
        new_empresa = Empresa(nombre_empresa=request_body_empresa['nombre_empresa'],
                              encargado_empresa=request_body_empresa['encargado_empresa'],
                              cantidad_trabajadores=request_body_empresa['cantidad_trabajadores'],
                              telefono=request_body_empresa['telefono'],
                              email_empresa=request_body_empresa['email_empresa'],
                              password=request_body_empresa['password'],
                              direccion_empresa=request_body_empresa['direccion_empresa'],
                              )
        db.session.add(new_empresa)
        db.session.commit()
        return jsonify({"msg": "¡Se registró la empresa con éxito!"}), 200



@api.route('/registro-casino', methods=['POST'])
def Casino_add():
    request_body_casino = request.get_json()

    nombre = request.json.get('nombre', None)
    telefono = request.json.get('telefono', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    direccion = request.json.get('direccion', None)

    if nombre is None:
        return 'Escriba el nombre del casino', 400
    if telefono is None:
        return 'Escriba el telefono del casino', 400
    if email is None:
        return 'Escriba el email del casino', 400
    if password is None:
        return 'Escriba el password del casino', 400
    if direccion is None:
        return 'Escriba la direccion del casino', 400

    casino = Casino.query.filter_by(email=email).first()

    if casino:
        return jsonify({"msg": "Este casino ya se encuentra registrado"})
    else:
        new_casino = Casino(nombre=request_body_casino['nombre'],
                              telefono=request_body_casino['telefono'],
                              email=request_body_casino['email'],
                              password=request_body_casino['password'],
                              direccion=request_body_casino['direccion'],
                              )
        db.session.add(new_casino)
        db.session.commit()
        return jsonify({"msg": "¡Se registró el casino con éxito!"}), 200



@api.route('/login/user', methods=['POST'])
def login_usuario():
    body = request.get_json()

    email = request.json.get('email',None)
    password = request.json.get('password', None)

    usuario = Usuario.query.filter_by(email=email, password = password).first()
    if not usuario:
        return jsonify({"msg":"Usuario/Contraseña no coinciden"}), 400

    access_token  = create_access_token(identity=usuario.email)

    data ={
        "user": usuario.serialize(),
        "access_token":access_token
    }

    return jsonify(data), 200


@api.route('/login/empresa', methods=['POST'])
def login_empresa():
    body = request.get_json()

    email_empresa = request.json.get('email_empresa',None)
    password = request.json.get('password', None)

    empresa = Empresa.query.filter_by(email_empresa=email_empresa, password = password).first()
    if not empresa:
        return jsonify({"msg":"Empresa/Contraseña no coinciden"}), 400

    access_token  = create_access_token(identity=empresa.email_empresa)

    data ={
        "empresa": empresa.serialize(),
        "access_token":access_token
    }

    return jsonify(data), 200


@api.route('/login/casino', methods=['POST'])
def login_casino():
    body = request.get_json()

    email = request.json.get('email',None)
    password = request.json.get('password', None)

    casino = Casino.query.filter_by(email=email, password = password).first()
    if not casino:
        return jsonify({"msg":"Casino/Contraseña no coinciden"}), 400

    access_token  = create_access_token(identity=casino.email)

    data ={
        "casino": casino.serialize(),
        "access_token":access_token
    }

    return jsonify(data), 200


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200



@api.route('/usuario', methods=['GET'])
def Usuario_get():
    usuario = Usuario.query.all()
    usuario = list(map(lambda usuario: usuario.serialize(), usuario))
    return jsonify({"results": usuario})
