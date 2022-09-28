"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)

#Registro
@api.route('/registro', methods=['GET','POST'])
def registro(correo):

    correo = request.get_json('correo')
    nombre = request.get_json('nombre')
    apellido = request.get_json('apellido')
    contrasena = request.get_json('contrasena')
    telefono = request.get_json('telefono')
    user = User.query.filter_by(correo=correo).first()
    
    if(user):
        return jsonify({
            "mensaje": "Usuario ya registrado"
        }),200
    
    else:
        user.correo = correo
        user.nombre = nombre
        user.apellido = apellido
        user.contrasena = contrasena
        user.telefono = telefono
        db.session.add()
        db.session.commit()

        return jsonify({
            "Mensaje" : "El usuario ha sido registrado exitosamente"
        })

    

    """info = request.get_json()
    info_serializada = list(map( lambda user : user.serialize(), info))
    print(info)

    return jsonify({
        "mensaje" : "Informacion de usuarios",
        "user" : info_serializada,
    })"""

    """return jsonify({
        "nombre": body['nombre'] ,
        "apellido": body['apellido'] ,
        "correo": body['correo'] ,
        "telefono": body['telefono'] ,
    }), 200"""

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

"""@api.route('/favorito/user/<int:id_user>', methods=['POST'])
def favorito():
    body = reqeust.get_json() #rcibir los datos del usuario

    nuevo_favorito = Favorito(user=[])



    response_body = {
        "message": "Favorito del usuario"
    }

    return jsonify(response_body), 200"""