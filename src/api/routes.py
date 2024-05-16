"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, JWTManager,get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

#Ruta para crear nuevo usuario
@api.route("/crear_usuario", methods =["POST"])
def crear_usuario():
    #Recogeremos en email = el contenido con el que se rellene el apartado email. Si este contenido está vacío lo guardaremos como None
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Si no se introduci email o contraseña
    if not email or not password:
        return jsonify({"msg": "Correo y contraseña son requeridos"}), 400

    #Verificamos si el usuario ya existe en la base de datos
    user = User.query.filter_by(email=email,password=password).first()
    if user:
        return jsonify ({"msg":"Este usuario ya existe"}), 401
    
    #Creamos un usuario con el email y la contraseña proporcionados
    user_new = User(email=email,password=password)

    #Añadimos el nuevo usuario a la base de datos
    db.session.add(user_new)
    #Guardamos los cambios
    db.session.commit()
    #Una vez añadido y guardado el nuevo usuario nos devolverá el siguiente mensaje
    return jsonify({"msg":"Usuario creado"}), 200

#Ruta para iniciar sesión
@api.route("/iniciar_sesion", methods =["POST"])
def create_token():

    # Obtiene el email y la contraseña del body de la solicitud
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Verifica si el usuario existe y la contraseña es correcta
    user = User.query.filter_by(email=email,password=password).first()
    if user is None or user.password != password:
        return jsonify({"msg":"Usuario no encontrado o contraseña incorrecta"}), 401
    
    # Crea un token de acceso para el usuario
    access_token = create_access_token(identity = user.id)
    return jsonify({"token":access_token,"user.id":user.id}), 200

@api.route("/protected" , methods = ["GET"])
@jwt_required()
def protected():
    # Obtiene la identidad del usuario actual a partir del token
    current_user_id = get_jwt_identity()
    # Obtiene el usuario de la base de datos
    user = User.query.get(current_user_id)
    if user is None:
        return APIException("Usuario no encontrado", status_code = 404)
    return jsonify("Usuario autenticado"),200