"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/token", methods=["GET", "POST"])
def token():
    body = request.get_json()
    user = User.query.filter_by(email=body['email']).first()
    #print(user)
    #Si no se coloca el first entrega un arreglo con 1 dato, con first entrega el dato solo
    if(user):
        #Validacion de usuario
        if(user.password== body['password']):
            #Valida, otorga token
            #expiracion = datetime.timedelta(minutes=1)
            token = create_access_token(identity=body['email'])
            return jsonify({
                "email": body['email'],
                "password": body['password'],
                "token": token
            })
        else:
            return jsonify({"mensaje": 'usuario o contraseña erroneo'})
    else:
        return jsonify({"mensaje": 'user no existe'})
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)