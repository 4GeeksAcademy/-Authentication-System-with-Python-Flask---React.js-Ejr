"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from flask import Flask, request, jsonify, url_for, Blueprint
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from werkzeug.security import generate_password_hash, check_password_hash
from flask_bcrypt import Bcrypt
import os

from api.models import db, User
from api.utils import generate_sitemap, APIException




api = Blueprint('api', __name__)
app = Flask(__name__)
jwt = JWTManager(app)
secret_key = os.urandom(24).hex()
app.config['JWT_SECRET_KEY'] = secret_key



bcrypt = Bcrypt(app)

CORS(api)


@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data["email"]
    repetido = User.query.filter_by(email=email).first()

    if repetido: 
        return jsonify({"error":"correo registrado"}), 400
    
    password = bcrypt.generate_password_hash(data["password"]).decode('utf-8')

    user = User(email=email,password=password,first_name=data["first_name"],last_name=data["last_name"],phone=data["phone"],location=data["location"],is_active=True)
    
    db.session.add(user)
    db.session.commit()   

    return jsonify({"mensaje":"registro exitoso"})

@api.route("/login", methods=["POST"])
def user_login():
    data = request.get_json()
    
    if data["email"] is None:
        return jsonify({"message":"the email is required"}), 400

    user = User.query.filter_by(email=data["email"]).first()
    if user is None:
        return jsonify({"error":"Usuario no encontrado"}), 404
    
    if not data["password"]:
        return jsonify({"message":"Credenciales incorrectas"}), 401

    if bcrypt.check_password_hash(user, data["password"]):
        payload = {
            "email": user.email, 
            "first_name": user.first_name, 
            "last_name": user.last_name,
            "phone": user.phone, 
            "location": user.location, 
            "nivel": "user"}
        token = create_access_token(identity=user.id, additional_claims=payload)
        return jsonify({"token": token})
    else:
        return jsonify({"message": "Credenciales incorrectas"}), 401


@api.route("/private", methods=["GET"])
@jwt_required()

def private():
    return jsonify({"message":"acceso permitido"}), 200
