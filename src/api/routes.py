from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from flask_bcrypt import Bcrypt
from flask_mail import Mail, Message
from itsdangerous import URLSafeTimedSerializer

app = Flask(__name__)
bcrypt = Bcrypt(app)
mail = Mail(app)
api = Blueprint('api', __name__)

CORS(api)

SECRET_KEY = "a7418a26bb534e638f15127acc89f7f1"

serializer = URLSafeTimedSerializer(SECRET_KEY)

# Crear el token
def generate_password_reset_token(user_id):
    return serializer.dumps(user_id, salt='password-reset-salt')

# Expira en 1 hora (3600 segundos)
def verify_password_reset_token(token, max_age=3600):
    # Deserializar el token para ver el id del usuario
    try:
        user_id = serializer.loads(token, salt='password-reset-salt', max_age=max_age)
        return user_id
    except Exception as e:
        return None


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
    
@api.route('/recovery', methods=['POST'])
def handle_password_recovery():
    data = request.get_json()
    email = data.get("email")
    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Usuario no encontrado"}), 404

    reset_token = generate_password_reset_token(user.id)
    reset_link = url_for('reset_password', token=reset_token, _external=True)

    # El mail desde el cual se envia no existe, debe ser reemplazado por uno real
    msg = Message("Reestablecimiento de contraseña", sender="no-reply@kever.com", recipients=[user.email])
    msg.body = f"Para resetear tu contraseña, sigue este enlace: {reset_link}"
    mail.send(msg)

    return jsonify({"message": "Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña."}), 200


@api.route('/reset_password/<token>', methods=['POST'])
def reset_password(token):
    user_id = verify_password_reset_token(token)
    if user_id is None:
        return jsonify({"error": "El token de restablecimiento de contraseña no es válido o ha caducado."}), 400

    data = request.get_json()
    new_password = data.get("new_password")

    # Actualizar la contraseña en la bd
    user = User.query.get(user_id)

    if user is None:
        return jsonify({"error": "Usuario no encotnrado"}), 404
    
    user.password = bcrypt.generate_password_hash(new_password)
    db.session.commit()

    return jsonify({"message": "Contraseña restablecida exitosamente."}), 200
