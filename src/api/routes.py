"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, TokenBlockedList, ServicesSedan, ServicesSuv, VehicleSuv, VehicleSedan
from api.utils import generate_sitemap, APIException
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt

api = Blueprint('api', __name__)
app=Flask(__name__)
bcrypt=Bcrypt(app)



@api.route('/testdata', methods=['POST'])
def load_test_data():
    test_data = [
        ServicesSedan(name="Aspirado Sedan", description="Aspirado interno", price="30"),
        ServicesSedan(name="Lavado Sedan", description="Lavado externo", price="50"),
        ServicesSuv(name="Aspirado Suv", description="Aspirado interno", price="60"),
        ServicesSuv(name="Lavado Suv", description="Lavado externo", price="80"),
        VehicleSedan(name="Sedan"),
        VehicleSuv(name="Suv")

    ]

    created_services = []
    for service in test_data:
        db.session.add(service)
        created_services.append(service)

    db.session.commit()
    return jsonify(services=[service.serialize() for service in created_services]), 201


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# Para registrarse
@api.route('/register', methods=["POST"])
def user_create():
    data = request.get_json()
    print(data)
    new_user = User.query.filter_by(email=data["email"]).first()
    if (new_user is not None):
        return jsonify(
            {
                "msg":"Email registrado"
            }
        ),400
    secure_password=bcrypt.generate_password_hash(data["password"],rounds=None).decode("utf-8")
    print (new_user is None)
    new_user = User(email=data["email"], password=secure_password, is_active=True, first_name=data["first_name"], last_name=data["last_name"], city=data["city"], country=data["country"], zip_code=data["zip_code"], address_one=data["address_one"], address_two=data["address_two"], phone=data["phone"])
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 201

# Para iniciar sesión
@api.route("/login", methods=["POST"])
def user_login():
    user_email = request.json.get("email")
    user_password = request.json.get("password")
    #Buscar usuario por correo
    user=User.query.filter_by(email=user_email).first()
    if user is None:
        return jsonify({"Message":"User not found"}), 401
    
    #Verificar la clave
    if not bcrypt.check_password_hash(user.password,user_password):
        return jsonify({"message":"Wrong password"}), 401
    #Generar el token
    access_token=create_access_token(identity=user.id)
    #Retornar el token
    return jsonify({"accessToken":access_token})

@api.route("/helloprotected", methods=["GET"])
@jwt_required()
def hello_protected_get():
    user_id=get_jwt_identity()
    return jsonify({"userId":user_id, "message":"Hello protected route"})

@api.route("/logout", methods=["POST"])
@jwt_required()
def user_logout():
    jwt = get_jwt()["jti"]
    tokenBlocked = TokenBlockedList(jti=jwt)
    db.session.add(tokenBlocked)
    db.session.commit()
    return jsonify({"msg":"Token revoked"})