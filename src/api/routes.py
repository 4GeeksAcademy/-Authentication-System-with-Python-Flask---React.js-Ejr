"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, TokenBlockedList, Services, VehicleType
from api.utils import generate_sitemap, APIException
from api.sendmail import sendMail, recoveryPasswordTemplate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, get_jwt, get_jti
import json

# SDK de Mercado Pago
import mercadopago
# Agrega credenciales
sdk = mercadopago.SDK(
    "APP_USR-2815099995655791-092911-c238fdac299eadc66456257445c5457d-1160950667")

api = Blueprint('api', __name__)
app = Flask(__name__)
bcrypt = Bcrypt(app)


@api.route("/preference", methods=["POST"])
def preference():
    # body = json.loads(request.data)
    # "https://www.mercadopago.com.uy/checkout/v1/redirect?pref_id=1160950667-6722c9b6-33fd-4e57-8b03-aa932796f030"
    preference_data = {
        "items": [
            {
                "title": "Servicio StarWash",
                "quantity": 1,
                "unit_price": 75.76,
            }
        ],

        "back_urls": {
            "success": "https://amalia1501-opulent-zebra-449664g9xxj3j6j7-3000.preview.app.github.dev/",
            "failure": "https://amalia1501-opulent-zebra-449664g9xxj3j6j7-3000.preview.app.github.dev/",
            "pending": "https://amalia1501-opulent-zebra-449664g9xxj3j6j7-3000.preview.app.github.dev/"
        },

        "auto_return": "approved"
    }

    preference_response = sdk.preference().create(preference_data)
    preference = preference_response["response"]

    return preference


@api.route('/services', methods=['GET'])
def get_services():
    services = Services.query.all()
    return jsonify(services=[service.serialize() for service in services]), 200


@api.route('/book', methods=['GET'])
@jwt_required
def get_vehicle_types():
    vehicle_types = VehicleType.query.all()
    return jsonify(vehicle_types=[vehicle_type.serialize() for vehicle_type in vehicle_types]), 200


@api.route('/testdata', methods=['POST'])
def load_test_data():
    test_data = [
        VehicleType(name="Sedan"),
        VehicleType(name="Suv"),
        Services(name="Full Exterior Detail Sedan", description="Your car is your pride and joy, so you want to keep it in top condition. In fact, we know most of you spend a lot of time detailing your vehicle. But there are some things that can't be done with a sponge or cloth. That's why we've developed a full exterior service for your vehicle! We are probably not a good choice for you if you're seeking a quick and inexpensive way to have your car cleaned in Oregon. To deliver a higher standard of service and outcomes, we extend the wash procedure. We refer to it as our Full exterior detail. We'll wash the car to get rid of ordinary filth, bird droppings, and dust using the right washing, drying, and strategies to prevent significant surface scratches",
                 price="30", vehicle_type="1"),
        Services(name="Full Interior Cleaning Sedan", description="It’s not enough to simply look good. You need a clean, fresh smell that helps create a positive driving experience. This involves deep-cleaning techniques that sanitize upholstery, carpets, and surfaces for an immaculate finish. Interior detailing to a high standard requires preparation, hard work, and a standardized process. Interior car detailing in general will help your car look great and operate at the highest level. When you’re considering taking your car to have it detailed, think about what you’ll get in return. Not only will you be rewarded with a clean car interior that looks nice, but you’ll also be maintaining your car so that it continues to be in the best possible shape.",
                 price="50", vehicle_type="1"),
        Services(name="Engine Cleaning Sedan", description="Engine cleaning is a task that needs to be done regularly. If you want to keep your car running smoothly and enjoy a long lifespan, it is important that you clean its engine bay regularly. The engine bay is where the most vital parts of your car are located and yet it is one of the most neglected areas when it comes to cleaning. If you have ever wondered why this area gets so dirty, here’s why: Engine oil and other fluids leak out of these parts onto the ground where they collect dirt, dust, grime, and other debris. If these parts are not cleaned regularly then they can cause damage to other components in your car such as electrical connections which can lead to expensive repairs later on down the line.",
                 price="60", vehicle_type="1"),
        Services(name="Ceramic Coating Sedan", description="Ceramic coating has become a popular option for car owners looking to protect their vehicle's paint and improve its appearance.This innovative solution promises to deliver long-lasting protection against the elements, making it an appealing option for car enthusiasts and daily drivers alike. In this article, we'll explore the benefits of ceramic coating, as well as some of the myths surrounding this technology",
                 price="25", vehicle_type="1"),
        Services(name="Paint Correction Services Sedan", description="Paint correction is a great way to make your car look brand new, paint correction can help remove up to 70 - 75% of swirls and scratches.",
                 price="25", vehicle_type="1"),
        Services(name="Full Exterior Detail Suv", description="Your car is your pride and joy, so you want to keep it in top condition. In fact, we know most of you spend a lot of time detailing your vehicle. But there are some things that can't be done with a sponge or cloth. That's why we've developed a full exterior service for your vehicle! We are probably not a good choice for you if you're seeking a quick and inexpensive way to have your car cleaned in Oregon. To deliver a higher standard of service and outcomes, we extend the wash procedure. We refer to it as our Full exterior detail. We'll wash the car to get rid of ordinary filth, bird droppings, and dust using the right washing, drying, and strategies to prevent significant surface scratches",
                 price="40", vehicle_type="2"),
        Services(name="Full Interior Cleaning Suv", description="It’s not enough to simply look good. You need a clean, fresh smell that helps create a positive driving experience. This involves deep-cleaning techniques that sanitize upholstery, carpets, and surfaces for an immaculate finish. Interior detailing to a high standard requires preparation, hard work, and a standardized process. Interior car detailing in general will help your car look great and operate at the highest level. When you’re considering taking your car to have it detailed, think about what you’ll get in return. Not only will you be rewarded with a clean car interior that looks nice, but you’ll also be maintaining your car so that it continues to be in the best possible shape.",
                 price="60", vehicle_type="2"),
        Services(name="Engine Cleaning Suv", description="Engine cleaning is a task that needs to be done regularly. If you want to keep your car running smoothly and enjoy a long lifespan, it is important that you clean its engine bay regularly. The engine bay is where the most vital parts of your car are located and yet it is one of the most neglected areas when it comes to cleaning. If you have ever wondered why this area gets so dirty, here’s why: Engine oil and other fluids leak out of these parts onto the ground where they collect dirt, dust, grime, and other debris. If these parts are not cleaned regularly then they can cause damage to other components in your car such as electrical connections which can lead to expensive repairs later on down the line.",
                 price="70", vehicle_type="2"),
        Services(name="Ceramic Coating Suv", description="Ceramic coating has become a popular option for car owners looking to protect their vehicle's paint and improve its appearance.This innovative solution promises to deliver long-lasting protection against the elements, making it an appealing option for car enthusiasts and daily drivers alike. In this article, we'll explore the benefits of ceramic coating, as well as some of the myths surrounding this technology",
                 price="35", vehicle_type="2"),
        Services(name="Paint Correction Services Suv", description="Paint correction is a great way to make your car look brand new, paint correction can help remove up to 70 - 75% of swirls and scratches.",
                 price="35", vehicle_type="2"),
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
                "msg": "Email registrado"
            }
        ), 400
    secure_password = bcrypt.generate_password_hash(
        data["password"], rounds=None).decode("utf-8")
    print(new_user is None)
    new_user = User(email=data["email"], password=secure_password, is_active=True, first_name=data["first_name"], last_name=data["last_name"], city=data["city"],
                    country=data["country"], zip_code=data["zip_code"], address_one=data["address_one"], address_two=data["address_two"], phone=data["phone"])
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 201

# Para iniciar sesión


@api.route("/login", methods=["POST"])
def user_login():
    user_email = request.json.get("email")
    user_password = request.json.get("password")
    # Buscar usuario por correo
    user = User.query.filter_by(email=user_email).first()
    if user is None:
        return jsonify({"Message": "User not found"}), 401

    # Verificar la clave
    if not bcrypt.check_password_hash(user.password, user_password):
        return jsonify({"message": "Wrong password"}), 401
    # Generar el token
    access_token = create_access_token(identity=user.id)
    access_jti=get_jti(access_token)
    refresh_token=create_refresh_token(identity=user.id, additional_claims={"accessToken":access_jti})
    # Retornar el token
    return jsonify({"accessToken": access_token, "refreshToken":refresh_token})

@api.route("/changepassword", methods=["POST"])
@jwt_required()
def change_password():
    new_password=request.json.get("password")
    user_id=get_jwt_identity()
    secure_password = bcrypt.generate_password_hash(
        new_password, rounds=None).decode("utf-8")
    user=User.query.get(user_id)
    user.password=secure_password
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg":"clave actualizada"})

@api.route("/recoverypassword", methods=["POST"])
def recovery_password():
    user_email=request.json.get("email")
    user = User.query.filter_by(email=user_email).first()
    if user is None:
        return jsonify({"Message": "User not found"}), 401
    # 1 Generar ek token temporal para el cambio de clave
    access_token = create_access_token(
        identity=user.id, additional_claims={"type":"password"})
    #return jsonify({"recoveryToken":access_token})
    # 2 Enviar el enlace con el token via email para el cambio de clave
    if recoveryPasswordTemplate(access_token, user_email):
        return jsonify({"msg":"Correo enviado"})
    else:
        return jsonify({"msg":"Correo no enviado"}), 401

@api.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def user_refresh():
    #Identificadores de tokens viejos
    jti_refresh = get_jwt()["jti"]
    jti_access=get_jwt()["accessToken"]
    #Bloquear los tokens viejos
    accessRevoked=TokenBlockedList(jti=jti_access)
    refreshRevoked=TokenBlockedList(jti=jti_refresh)
    db.session.add(accessRevoked)
    db.session.add(refreshRevoked)
    db.session.commit()
    # Generar nuevos tokens
    user_id=get_jwt_identity()
    access_token = create_access_token(identity=user_id)
    access_jti=get_jti(access_token)
    refresh_token=create_refresh_token(identity=user_id, additional_claims={"accessToken":access_jti})
    # Retornar el token
    return jsonify({"accessToken": access_token, "refreshToken":refresh_token})

@api.route("/helloprotected", methods=["GET"])
@jwt_required()
def hello_protected_get():
    user_id = get_jwt_identity()
    return jsonify({"userId": user_id, "message": "Hello protected route"})


@api.route("/logout", methods=["POST"])
@jwt_required()
def user_logout():
    jwt = get_jwt()["jti"]
    tokenBlocked = TokenBlockedList(jti=jwt)
    db.session.add(tokenBlocked)
    db.session.commit()
    return jsonify({"msg": "Token revoked"})

