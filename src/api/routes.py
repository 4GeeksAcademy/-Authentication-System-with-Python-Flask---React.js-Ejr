"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, House, Image, Booking, Favorites
from api.utils import generate_sitemap, APIException
# from flask_jwt_extended import create_access_token
# from flask_jwt_extended import get_jwt_identity
# from flask_jwt_extended import jwt_required
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from datetime import datetime

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


# endpoint login

@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user_query = User.query.filter_by(email=email).first()
    print (email, password)

    if user_query is None:
        return {"msg": "Este email no existe"}, 404

    if email != user_query.email or password != user_query.password:
        return {"msg": "Email o contraseña incorrectos"}, 404

    access_token = create_access_token(identity=email)

    response_body = {
        "access_token": access_token,
        "user": user_query.serialize()
    }   

    return jsonify(response_body), 200


# endpoint registrarse signup

@api.route('/signup', methods=['POST'])
def crear_registro():
    request_body = request.get_json(force=True)
    

    users = User.query.filter_by(email=request_body["email"]).first()
    if users is not None:
        return jsonify({"msg":"ya existe"}), 404
    
    nuevo_usuario = User(
        name = request.json.get("name", None),
        lastname = request.json.get("lastname", None),
        phone_number = request.json.get("phone_number", None),
        email = request.json.get("email", None),
        password = request.json.get("password", None),
        is_admin = request.json.get("is_admin", None),
        account_creation_date = datetime.now()
    )

    db.session.add(nuevo_usuario)
    db.session.commit()

    return jsonify(nuevo_usuario.serialize()),200
    


# Ruta protegida de favoritos

@api.route("/usuario/favorito", methods=["GET"])
@jwt_required()
def protected():
    # Accede a la identidad del usuario con get_jwt_identity
    current_user_email = get_jwt_identity()

    user= User.query.filter_by(email=current_user_email).first()
    favoritos=Favorites.query.filter_by(user_id = user.id).all()
    response = list(map(lambda favoritos: favoritos.serialize(), favoritos))
    if response == []:
        return jsonify({"msg": "El usuario no tiene favoritos ingresados"})


    return jsonify({"results": response}), 200


# # Obtener todos los Favoritos

# @api.route('/favoritos', methods=['GET'])
# def obtener_favoritos():

# # Hago una consulta a la tabla favoritos para que traiga todos los favoritos
#     favoritos_query =Favorites.query.all ()


# # mapeamos para  convertir el array en un array de objetos

#     results = list(map(lambda item: item.serialize(), favoritos_query))
#     print(results)

# #    respondo si no hay favoritos 
#     if results == [] :
#         return jsonify ({"msg":"No hay favoritos"}), 404

#     response_body = {
#         "msg": "Hola, aquí están tus casas favoritas ",
#         "results": results
#     }

#     return jsonify(response_body), 200