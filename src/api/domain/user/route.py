
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models.index import db, User, Roles
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager, get_jwt
import api.domain.user.controller as Controller
import api.handle_response as Response

api = Blueprint('api/user', __name__)


@api.route("/", methods= ["GET"])
def get_users():
    return Controller.get_users()

@api.route('/worker', methods=['POST'])
def create_user():
        body = request.get_json()
        new_user = Controller.create_user(body)   
        if isinstance(new_user, User):   
            return Response.response_ok(new_user.serialize(), "Usuario registrado correctamente!", 201)
        return new_user #para que recoja el error de la funcion validar_usuario

@api.route('/login', methods=['POST'])
def login_users():
    body = request.get_json()
    token = Controller.login_users(body)
    if token.get('token'):
        return jsonify(token), 200
    return jsonify(token), token['status']


@api.route('/profile', methods =['GET'])
@jwt_required()
def get_user_private():
    info_token = get_jwt()
    user = info_token['sub']
    user_response = Controller.get_user_private(user)
    if isinstance(user_response, User):   # si el nuevo usuario es una instancia del model USER (pertenece?) responde un serializado si no ,responde el mensaje de erro
        return jsonify(user_response.serialize()), 200
    return jsonify(user_response), user_response['status']



