"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)

#Registro
@api.route('/registro', methods=['GET','POST'])
def registro():

    body= request.get_json()

    return jsonify({
        "nombre": body['nombre'] ,
        "apellido": body['apellido'] ,
        "correo": body['correo'] ,
        "telefono": body['telefono'] ,
    }), 200

#Inicio de Sesion
@api.route('/login', methods=['GET', 'POST'])
def login():

    body = request.get_json()
    #user = User.query.filter_by(correo=body['correo']).first()
    #print(user)

    return jsonify({
        "correo": body['correo'] ,
        "contrasena": body['contrasena'] ,
    }), 200     
   

#Token y Autenticacion
@api.route('/private', methods=['GET','POST'])
def autenticacion():

    response_body = {
        "message": "Autenticacion"
    }

    return jsonify(response_body), 200

@api.route('/recovery', methods=['GET','POST'])
def recovery():

    response_body = {
        "message": "Se hara la recuperacion o cambio de contraseña"
    }

    return jsonify(response_body), 200

@api.route('/home', methods=['GET','POST'])
def home():

    response_body = {
        "message": "Ruta que usuaremos para el scraping de las casas"
    }

    return jsonify(response_body), 200