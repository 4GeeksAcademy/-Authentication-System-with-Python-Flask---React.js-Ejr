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
    

@api.route("/post", methods=['POST'])
def save_post():

    house = House(
        id = request.json.get("id", None),
        title = request.json.get("title", None),
        category = request.json.get("category", None),
        image_id = request.json.get("image_id", None),
        user_id = request.json.get("user_id", None),
        location = request.json.get("location", None),
        number_of_rooms = request.json.get("number_of_rooms", None),
        number_of_bathrooms = request.json.get("number_of_bathrooms", None),
        parking = request.json.get("parking", None),
        wifi = request.json.get("wifi", None),
        virified_account = request.json.get("virified_account", None),
        price = request.json.get("price", None)
    )

    db.session.add(house)
    db.session.commit()

    return jsonify(house.serialize()), 200

@api.route("/gethouses", methods=['GET'])
def getPosts():
    users = House.query.all()
    response = list(map(lambda user: user.serialize(), users))
    return jsonify({ "results": response }), 200