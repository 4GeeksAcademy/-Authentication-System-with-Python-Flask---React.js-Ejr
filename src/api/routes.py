"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User , Evento
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required


api = Blueprint('app', __name__)
# Allow CORS requests to this API
CORS(api)

# Setup the Flask-JWT-Extended extension


# POST Para hacer login


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user_query = User.query.filter_by(email = email).first()
    if user_query is None:
        return jsonify({"msg": "Correo no existe"}), 401
    if email != user_query.email or password != user_query.password:
        return jsonify({"msg": "Bad email or password"}), 401
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)