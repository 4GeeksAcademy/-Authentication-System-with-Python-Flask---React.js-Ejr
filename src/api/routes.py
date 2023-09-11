"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, get_jwt_identity, create_access_token, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
import datetime


api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


#------< registrar usuario >-------------#

@api.route('/register', methods=['POST'])

def user_register():
    name= request.json.get("name")
    lastname= request.json.get("lastname")
    email= request.json.get("email")
    password= request.json.get("password")
    region= request.json.get("region")
    
#-------< validacion de usuario >-------#
    if not name:
        return jsonify({"error": "name is requare"}), 422
    
    if not lastname:
        return jsonify({"error": "username is requare"}), 422
    
    if not email:
        return jsonify({"error": "email is requare"}), 422
    
    if not password:
        return jsonify({"error": "password is requare"}), 422
    
    if not region:
        return jsonify({"error": "region is requare"}), 422
    
    
    #-----< creacion de usuario ------------------------------------------->
    
    user_Faund = User.query.filter_by(email=email).first()
    
    if user_Faund:
        return jsonify({"message": "username is not available"}), 400
    
    user = User()
    user.name = name
    user.lastname = lastname
    user.email = email
    user.password = generate_password_hash(password)
    user.region = region
    user.save()
    
    return jsonify({"succes": "Registro exitoso, por favor inicie sesión"}), 200



@api.route('/login', methods=['POST'])
def login():
    
    email= request.json.get("email")
    password= request.json.get("password")
  
#------< validacion de usuario, de datos ingresados >------#

    if not email:
        return jsonify({"error": "email is requare"}), 422
    
    if not password:
        return jsonify({"error": "password is requare"}), 422

#------< BUSCAMOS AL USUARIO
    user = User.query.filter_by(email=email).first()
   
    
#------< SI NO EXISTE EL USUARIO
    if not user: 
        return jsonify({"error": "tu usuario o contraseña son incorrectos"}), 401
    
#------< LAVIDAMOS LA CONTRASEÑA
    if not check_password_hash(user.password, password):
        return jsonify({"error": "tu usuario o contraseña son incorrectos"}), 401 
        

    
    access_token = create_access_token(identity=user.id)
    print(access_token)
    data = {
        # "success": "inicio de sesion exitoso",
        "access_token": access_token,
        "type": "Bearer",
        "user": user.serialize()
    }


    return jsonify(data), 200


# generando ruta privada

@api.route('/profile', methods=['POST'])
@jwt_required()
def profile():
    
    id = get_jwt_identity()
    user = User.query.get(id)
    return jsonify({"message": "ruta  privada", "user": user.email}), 200

#-----<ruta libro----->#

@api.route('/books', methods=['GET'])
def books_route():
    response_libro ={
        "mesage": "libro encontrado, sos un krac!"
    }
    
    return jsonify(response_libro), 200


@api.route('/upload', methods=['POST'])
def upload_image_toute():
    response_upload = {
        "mesage": "imagen cargada con exito"
    }
    return jsonify(response_upload)