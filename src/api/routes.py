"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, json
from api.models import db, User, Pymes, Mi_pasaporte
from api.utils import generate_sitemap, APIException
import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS, cross_origin
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

CORS(api) # This will enable CORS for all routes

#bloque de GET's
@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    list_users = list(map(lambda x: x.serialize(), users))
    return jsonify(list_users), 200

@api.route('/users/<int:user_id>',methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        raise APIException('este usuario no existe en la base de datos', status_code=404)
    userjson = user.serialize()
    return jsonify(userjson), 200
#------------------------------------------------------------------------------------------------
@api.route('/pymes', methods=['GET'])
def get_pymes():
    pymes = Pymes.query.all()
    list_pymes = list(map(lambda x: x.serialize(), pymes))
    return jsonify(list_pymes), 200

@api.route('/pymes/<int:pymes_id>', methods=['GET'])
def get_pymes_id(pymes_id):
    pymes = Pymes.query.get(pymes_id)
    if pymes is None:
        raise APIException('El pymes no existe', status_code=404)
    pymesjson = pymes.serialize()
    return jsonify(pymesjson), 200
#------------------------------------------------------------------------------------------------
@api.route('/mi_pasaporte', methods=['GET'])
def get_todos_los_elementos():
    all_elements = Mi_pasaporte.query.all()
    list_elements = list(map(lambda x: x.serialize(), all_elements))
    return jsonify(list_elements)

@api.route('/mi_pasaporte/<int:user_id>', methods=['GET'])
@jwt_required()
def get_un_elemento(user_id):
    all_elements = Mi_pasaporte.query.all()
    list_elements = list(map(lambda x: x.serialize(), all_elements))
    list_usuario = list(filter(lambda x: x['user_id'] == user_id, list_elements))
    return jsonify(list_usuario)

@api.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    if request.method == 'GET':
        token = get_jwt_identity()
        return jsonify({"success": "Acceso a espacio privado", "usuario": token}), 200

#bloque de POST's
@api.route('users/mi_pasaporte/', methods=['POST'])
@jwt_required()
def agregar_mi_pasaporte():
    request_body = request.get_json()
    mi_pasaporte = Mi_pasaporte(user_id = request_body["user_id"], name = request_body["name"], tipo_pymes = request_body["tipo_pymes"])
    db.session.add(mi_pasaporte)
    db.session.commit()
    return jsonify({"msg": "el favorito se ha agregado con exito"}), 200

@api.route('/pymes', methods=['POST'])
def agregar_pymes():
    request_body = request.get_json()
    pymes = Pymes(name = request_body["name"], descripcion = request_body["descripcion"], provincia = request_body["provincia"], telefono = request_body["telefono"], email = request_body["email"], horario = request_body["horario"], imagen = request_body["imagen"], logo = request_body["logo"], info_adicional = request_body["info_adicional"], link_youtube = request_body["link_youtube"], sitio_web = request_body["sitio_web"], tipo = request_body["tipo"], categoria = request_body["categoria"], id_osm = request_body["id_osm"])
    db.session.add(pymes)
    db.session.commit()
    return jsonify({"msg": "el pymes se ha agregado con exito"}), 200

@api.route('/registro', methods=["POST"])
def registro():
    if request.method == 'POST':
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        nombre_completo = request.json.get("nombre_completo", None)
        respuesta_de_seguridad = request.json.get("respuesta_de_seguridad", None)

        if not email:
            return jsonify({"msg": "el email es requerido, por favor ingreselo"}), 400
        if not password:
            return jsonify({"msg": "la contraseña es requerida, por favor ingresela"}), 400
        if not nombre_completo:
            return jsonify({"msg": "el nombre completo es requerido, por favor ingreselo"}), 400
        if not respuesta_de_seguridad:
            return jsonify({"msg": "la respuesta de seguridad es requerida, por favor ingresela"}), 400

        user = User.query.filter_by(email=email).first()
        if user:
            return jsonify({"msg": "el email ya existe"}), 400

        hashed_password = generate_password_hash(password)
        user = User(email=email, password = hashed_password, nombre_completo = nombre_completo, respuesta_de_seguridad = respuesta_de_seguridad)
        print(password, hashed_password)

        db.session.add(user)
        db.session.commit()

        return jsonify({"exito!": "gracias, su regristro fue exitoso", "status": "true"}), 200

@api.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        email = request.json.get("email", None)
        password = request.json.get("password", None)

        if not email:
            return jsonify({"msg": "el email es requerido, por favor ingreselo"}), 400
        if not password:
            return jsonify({"msg": "la contraseña es requerida, por favor ingresela"}), 400

        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"msg": "Usuario o contraseña incorrecta"}), 401

        if not check_password_hash(user.password, password):
            return jsonify({"msg": "Usuario o contraseña incorrecta"}), 401

        # crear el token
        expiracion = datetime.timedelta(days=1)
        access_token = create_access_token(identity=user.email, expires_delta=expiracion)

        data = {
            "user": user.serialize(),
            "token": access_token,
            "expires": expiracion.total_seconds()*1000
        }

        return jsonify(data), 200

#bloque de metodo DELETE
@api.route('/mi_pasaporte/<int:user_id>/<name>', methods=['DELETE'])
@jwt_required()
def borrar_mi_pasaporte(user_id, name):
    favorito = Mi_pasaporte.query.filter_by(user_id = user_id, name = name).first()
    if favorito is None:
        raise APIException('favorito no encontrado', status_code=404)
    db.session.delete(favorito)
    db.session.commit()
    return jsonify({"msg": "el favorito se elimino con exito"}),200

