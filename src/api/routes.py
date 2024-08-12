"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# Crea una ruta para autenticar a tus usuarios y devolver los JWT.
# La función create_access_token() se utiliza para generar el JWT   
@api.route("/login", methods=["POST"])
def login():
    correo = request.json.get("correo", None)
    clave = request.json.get("clave", None)
    # Consulta si el usuario existe en la base de datos
    user_query = User.query.filter_by(correo=correo).first()

    # Verifica si el usuario existe y si la contraseña es correcta
    if correo != user_query.correo or clave != user_query.clave:
        return jsonify({"msg": "Correo o clave incorrectos"}), 401
    
    # Verifica si el usuario proporcionó ambos datos
    if not correo or not clave:
        return jsonify({"msg": "Correo y clave son requeridos"}), 400

    access_token = create_access_token(identity=user_query.id)
    return jsonify(access_token=access_token)

# Proteje una ruta con jwt_required, que expulsará las solicitudes
# sin un JWT válido presente.
@api.route("/perfil/usuario", methods=["GET"])
@jwt_required()
def protected():
    # Acceda a la identidad del usuario actual con get_jwt_identity
    current_user = get_jwt_identity()
    #Con la identidad del usuario podemos hacer consultas a User que retorne
    #una respuesta con la info del usuario que requieramos
    #Desde aquí deberiamos enviar toda la info del Usuario
    return jsonify(logged_in_as=current_user), 200
