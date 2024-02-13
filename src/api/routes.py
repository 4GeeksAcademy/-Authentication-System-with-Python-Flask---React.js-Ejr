from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt(app)

api = Blueprint('api', __name__)

CORS(api)


@api.route('/signup', methods=['POST'])
def handle_signup():
    data = request.get_json()
    email = data["email"]

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "Este correo ya esta registrado."}), 400
    
    password = bcrypt.generate_password_hash(data["password"])
    user = User()

    user.email = email
    user.password = password
    user.is_active = True

    db.session.add(user)
    db.session.commit()

    return "Registro exitoso.", 200


@api.route('/login', methods=['POST'])
def handle_login():
    data = request.get_json()
    user = User.query.filter_by(username = data["username"]).first()

    if user is None:
        return jsonify({"error": "Usuario no encontrado."}), 404

    if not bcrypt.check_password_hash(user.password, data["password"]):
        return jsonify({"error": "Contraseña incorrecta."}), 401

    payload = {"username" : user.username, "rol": "usuario"}
    token = create_access_token(identity=user.id, additional_claims=payload)

    return jsonify({"token": token}), 200
    
