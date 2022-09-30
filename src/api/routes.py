"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity 
import datetime

api = Blueprint('api', __name__)

#Registro
@api.route('/registro', methods=['POST'])
def registro():

    body = request.get_json()
    correo = body['correo']
    nombre = body['nombre']
    apellido = body['apellido']
    contrasena = body['contrasena']
    telefono = body['telefono']
    user = User.query.filter_by(correo=correo).first()
    
    if(user):
        return jsonify({
            "mensaje": "Usuario ya registrado"
        }),200
    
    else:
        new_user = User()
        new_user.correo = correo
        new_user.nombre = nombre
        new_user.apellido = apellido
        new_user.contrasena = contrasena
        new_user.telefono = telefono
        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            "Mensaje" : "El usuario ha sido registrado exitosamente"
        })

#Inicio de Sesion
@api.route('/login', methods=['GET', 'POST'])
def login():

    if request.method =='GET':
        all_user = User.query.all()
        all_user = list( map( lambda x : x.serialize(), all_user))

        return jsonify(all_user), 200

    else:
        body = request.get_json()
        if body is None:
            return "Ingresa tu correo y contraseña para continuar", 400
        if 'correo' not in body:
            return "Ingresar correo", 400
        if 'contrasena' not in body:
            return 'Ingresar contraseña', 400
    #
        one_user = User.query.filter_by(correo=body["correo"]).first()
        if one_user:
            if(one_user.contrasena == body['contrasena']):
                #validacion de contraseña para creacion de token
                expira = datetime.timedelta(minutes=5)
                token_acceso = create_access_token(identity=one_user.correo, expires_delta=expira)
                info ={ 
                    "info_user" : one_user.serialize(),
                    "token" : token_acceso,
                    "expiracion" : expira.total_seconds()
                }

                return(jsonify(info))
            else:
                return(jsonify({"mensaje": False}))
        else:
            return(jsonify({"mensaje":"Correo no se encuentra registrado"}))


    """ correo = request.get_json('correo')
    contrasena = request.get_json('contrasena')
    user = User.query.filter_by(correo=correo,contrasena=contrasena).first()
    
    
    if(user):
        return jsonify({
       "Mensaje" : "Bienvenido usuario" ,
    }), 200     
    
    else:
        return jsonify({
            "mensaje" : "Redireccionar al formulario de registro"
        })"""

#Token y Autenticacion
@api.route('/private', methods=['GET','POST'])
@jwt_required()
def autenticacion():

   if request.method == 'GET':
        token = get_jwt_identity()
        return jsonify({"success": "Acceso a espacio privado concedido", "usuario": token}), 200

@api.route('/recovery', methods=['GET','POST'])
def recovery():

    response_body = {
        "Mensaje": "Se hara la recuperacion o cambio de contraseña"
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
    body = reqeust.get_json() #recibir los datos del usuario

    nuevo_favorito = Favorito()



    response_body = {
        "message": "Favorito del usuario"
    }

    return jsonify(response_body), 200"""