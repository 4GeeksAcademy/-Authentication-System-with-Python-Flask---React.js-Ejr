"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Platos, Pedidos, DetalleDePedidos, TokenBlockedList
from api.utils import generate_sitemap, APIException
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, get_jwt, get_jti

api = Blueprint('api', __name__)
app = Flask(__name__)
bcrypt = Bcrypt(app)

@api.route("/signup", methods=["POST"])
def user_create():
    data = request.get_json()
    print(data)
    new_user = User.query.filter_by(email=data["email"]).first()
    if (new_user is not None):
        return jsonify({
            "msg": "Email registrado"
        }), 400
    secure_password = bcrypt.generate_password_hash(
        data["password"], rounds=None).decode("utf-8")
    new_user = User(email=data["email"],
                    password=secure_password,
                    first_name=data["first_name"],
                    last_name=data["last_name"],
                    is_active=True)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 201

@api.route("/login", methods=["POST"])
def user_login():
    user_email = request.json.get("email")
    user_password = request.json.get("password")
    # Buscar al usuario por el correo
    user = User.query.filter_by(email=user_email).first()
    if user is None:
        return jsonify({"message": "User no found"}), 401
    
    # Verificar la clave
    if not bcrypt.check_password_hash(user.password, user_password):
        return jsonify({"message": "Wrong password"}), 401
    # Generar el Token
    access_token = create_access_token(identity=user.id)
    access_jti=get_jti(access_token)
    refresh_token=create_refresh_token(identity=user.id, additional_claims={"accessToken":access_jti})
    # Retornar el Token
    return jsonify({"accessToken": access_token, "refreshToken":refresh_token})

@api.route("/changepassword", methods=["POST"])
@jwt_required()
def change_password():
    new_password = request.json.get("password")
    user_id = get_jwt_identity()
    secure_password = bcrypt.generate_password_hash(new_password, rounds=None).decode("utf-8")
    user = User.query.get(user_id)
    user.password = secure_password
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "Clave actualizada"})

@api.route("/recoverypassword", methods=["POST"])
def recovery_password():
    user_email = request.json.get("email")
    user = User.query.filter_by(email=user_email).first()
    if user is None:
        return jsonify({"message": "user not found"}), 401
    # 1ro: Generar el token temporal para el cambio de clave
    access_token = create_access_token(
        identity=user.id, additional_claims={"type": "password"})
    return jsonify({"recoveryToken": access_token})
    # 2do: Enviar el token via email para el cambio de clave
    

@api.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def user_refresh():
    #Identificadores de tokens viejos
    jti_refresh = get_jwt()["jti"]
    jti_access= get_jwt()["accessToken"]
    #Bloquear los tokens viejos
    accessRevoked=TokenBlockedList(jti=jti_access)
    refreshRevoked=TokenBlockedList(jti=jti_refresh)
    db.session.add(accessRevoked)
    db.session.add(refreshRevoked)
    db.session.commit()
    #Generar nuevos tokens
    user_id=get_jwt_identity()
    access_token = create_access_token(identity=user_id)
    access_jti=get_jti(access_token)
    refresh_token=create_refresh_token(identity=user_id, additional_claims={"accessToken":access_jti})
    # Retornar el token
    return jsonify({"accessToken": access_token, "refreshToken":refresh_token})

@api.route('/logout', methods=['POST'])
@jwt_required()
def user_logout():
    jwt = get_jwt()["jti"]
    tokenBlocked = TokenBlockedList(jti = jwt)
    db.session.add(tokenBlocked)
    db.session.commit()
    return jsonify({"message": "Token revoked"})

@api.route('/helloprotected', methods=['GET'])
@jwt_required()
def hello_protected_get():
    user_id = get_jwt_identity()
    return jsonify({
        "userId": user_id,
        "message":"Hello protected route"
    })

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200