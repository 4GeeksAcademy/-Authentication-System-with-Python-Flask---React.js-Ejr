"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, TokenBlockedList
from api.utils import generate_sitemap, APIException
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from datetime import datetime, timezone

api = Blueprint('api', __name__)
#estandar para toda la inicialización de bcrypt
app=Flask(__name__)
bcrypt = Bcrypt(app)

@api.route('/signup', methods=['POST'])
def create_user():
    #recibir correo y password
    email = request.json.get("email")
    password = request.json.get("password")
    name = request.json.get("name")
    #buscar usuario en la bd, que me traiga el primer resultado
    user = User.query.filter_by(email = email).first()
    #si existe el usuario mostrar error
    if user is not None:
        return jsonify({"message": "User already exist"}), 401
    #definir secure_password que se va a guardar en el campo de la bd
    secure_password = bcrypt.generate_password_hash(password, 10).decode("utf-8")
    #crear nuevo usuario a partir de esta data
    #new_user = User(email=data.email, password=data.password)
    new_user = User()
    new_user.email = email
    new_user.password = secure_password
    new_user.is_active = True
    new_user.name = name
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg":"Usuario registrado"}), 201

@api.route('/login', methods=['POST'])
def login_user():
    #recibir datos del cuerpo de la petición
    email = request.json.get("email")
    password = request.json.get("password")
    #verificación de la contraseña
    #ubicar usuario en la bd, que me traiga el primer resultado
    user = User.query.filter_by(email = email).first()
    #si no se encontró el usuario
    if user is None:
        return jsonify({"message": "User not found"}), 401
    #si la clave no es válida regresamos error
    #verificando el pass del usuario que me regresó de la bd (user.password)
    #con el password de la petición de json (password)
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"message": "Wrong password"}), 401
    #después de las validaciones enviar msje de confirmación, se genera el token
    #ya podemos verificar la clave encriptada a la hr de inicio de sesión
    #pasando contenido al token, id del usuario de la bd
    token = create_access_token(identity=user.id, additional_claims={"role":"organizador"})
    return jsonify({"message": "Login successful", "token":token}), 200

#utilizar intermediarios middlewares
#solo para usuarios autenticados
#para eso importar depurador de jwt_extended jwt_required
#para usuarios que tengan en el encabezado de la petición un token válido
@api.route('/helloprotected')
@jwt_required() #convierte la ruta en protegida
def hello_protected():
    #traer el subject de mi token (pasado anteriormente al hacer create_access_token identity=user.id)
    #en este caso el id del usuario obtenido de la bd
    user_id = get_jwt_identity()
    claims = get_jwt()
    #con la información del token, traer datos del usuario de la bd
    user = User.query.get(user_id)
    response = {
        "userId": user_id,
        "claims": claims,
        "isActive": user.is_active,
        "name": user.name,
        "address": user.address,
        "phone": user.phone,
    }
    return jsonify(response)

@api.route('/logout', methods=['POST'])
@jwt_required()
def user_logout():
    #obtener el jti del token que traemos en claims (get_jwt)
    jti= get_jwt()["jti"]
    now = datetime.now(timezone.utc)
    tokenBlocked = TokenBlockedList(token = jti, created_at = now)
    #guardarlo en la bd
    db.session.add(tokenBlocked)
    db.session.commit()
    return jsonify({"message": "User logged out"}), 200

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Excellent, the request was succesfull"
    }

    return jsonify(response_body), 200


