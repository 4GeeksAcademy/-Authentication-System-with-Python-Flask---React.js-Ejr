from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Group, UsersGroup, BlockedTokenList
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from flask_bcrypt import Bcrypt
from flask_mail import Mail, Message
from flask import url_for
from itsdangerous import URLSafeTimedSerializer
from werkzeug.security import check_password_hash
import os
import requests
import datetime

app = Flask(__name__)
bcrypt = Bcrypt(app)
mail = Mail(app)
api = Blueprint('api', __name__)


CORS(api)


serializer = URLSafeTimedSerializer(os.environ['SECRET_KEY'])


# Crear el token
def generate_password_reset_token(user_id):
    return serializer.dumps(user_id, salt='password-reset-salt')

# Expira en 1 hora (3600 segundos)
def verify_password_reset_token(token, max_age=3600):
    # Deserializar el token para ver el id del usuario
    try:
        user_id = serializer.loads(token, salt='password-reset', max_age=max_age)
        return user_id
    except Exception as e:
        return None
    
# Funcion para enviar el mail de recuperación 
def send_email_recovery_email(recipient_email, link):
    api_key = os.environ['API_KEY']
    domain = os.environ['DOMAIN']
    url = f"https://api.mailgun.net/v3/{domain}/messages"

    text = f"Click the link below to reset your password:\n{link}"

    payload = {
        "from": "keverapp@gmail.com",
        "to": recipient_email,
        "subject": "Kever password reset.",
        "text": text
    }

    response = requests.post(url, auth=("api", api_key), data=payload)

    if response.status_code == 200:
        print("Password reset email sent successfully.")
    else:
        print("Failed to send password reset email.")
    

# Alta a nuevo usuario
@api.route('/signup', methods=['POST'])
def create_user():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    username = data.get("username")
    profile_picture = data.get("profile_picture")

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "Este correo ya está registrado."}), 400

    new_user = User(
        email=email,
        password=bcrypt.generate_password_hash(password, 10).decode("utf-8"),
        username=username,
        profile_picture=profile_picture
    )

    db.session.add(new_user)
    db.session.commit()

    token = create_access_token(identity=new_user.id)

    return jsonify({"message": "Usuario creado exitosamente", "token": token}), 201

# Eliminar un usuario
@api.route('/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
   
    current_user_id = get_jwt_identity()

    current_user = User.query.get(current_user_id)

    if current_user.email != 'marinasmargara@gmail.com':
        return jsonify({"error": "You are not authorized to delete users"}), 403

    user_to_delete = User.query.get(user_id)

    if not user_to_delete:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user_to_delete)
    db.session.commit()

    return jsonify({"message": "User deleted successfully"}), 200


#Listar todos los usuarios
@api.route('/users', methods=['GET'])
def list_users():
    users = User.query.all()
    serialized_users = [user.serialize() for user in users]
    return jsonify(serialized_users), 200

# Login de usuario
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):

        user.is_active = True
        db.session.commit()
    
        token = create_access_token(identity=user.id)
        return jsonify({"message": "Inicio de sesión exitoso", "token": token}), 200
    else:
        return jsonify({"error": "Credenciales inválidas"}), 401

# Para cerrar sesión
@api.route('/logout', methods=['POST'])
@jwt_required()
def logout_user():
    payload = get_jwt()
    jti = payload['jti']
    exp = datetime.datetime.fromtimestamp(payload['exp'])
    blocked_token = BlockedTokenList(jti = jti, expires = exp)
    db.session.add(blocked_token)
    db.session.commit()
    return jsonify({"msg": "Sesión cerrada exitosamente."}), 200


# Link para recupero de contraseña
@api.route('/recovery', methods=['POST'])
def handle_password_recovery():
    data = request.get_json()
    email = data.get("email")
    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Usuario no encontrado"}), 404

    try:
        reset_token = generate_password_reset_token(user.id)
        reset_link = url_for('api.reset_password', token=reset_token, _external=True)

        msg = Message("Reestablecimiento de contraseña", sender="keverapp@gmail.com", recipients=[user.email])
        msg.body = f"Para reestablecer tu contraseña, sigue este enlace: {reset_link}"
        mail.send(msg)
    except Exception as error: 
        print(error)
        return jsonify({"error": "No se pudo enviar el correo."}), 500
    

    return jsonify({"message": "Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña."}), 200

# Resetear contraseña
@api.route('/reset_password/<token>', methods=['POST'])
def reset_password(token):
    user_id = verify_password_reset_token(token)
    if user_id is None:
        return jsonify({"error": "El token de restablecimiento de contraseña no es válido o ha caducado."}), 400

    data = request.get_json()
    new_password = data.get("new_password")

    # Actualizar la contraseña en la bdd
    user = User.query.get(user_id)
    user.password = bcrypt.generate_password_hash(new_password)
    db.session.commit()

    return jsonify({"message": "Contraseña restablecida exitosamente."}), 200

# Crear un nuevo grupo
@api.route('/groups', methods=['POST'])
@jwt_required()
def create_group_and_invite_users():
    current_user_id = get_jwt_identity()
    data = request.json
    name = data.get('name')
    description = data.get('description')
    profile_picture = data.get('profile_picture')
    emails = data.get('emails')

    if not name:
        return jsonify({"error": "Name is required"}), 400

    if emails is None:
        return jsonify({"error": "Emails field is required"}), 400

    nuevo_grupo = Group(name=name, description=description, profile_picture=profile_picture)
    user = User.query.get(current_user_id)

    db.session.add(nuevo_grupo)

    db.session.commit()

    admin_relation = UsersGroup(user_id=current_user_id, group_id=nuevo_grupo.id, admin=True)
    db.session.add(admin_relation)

    for email in emails:
        user = User.query.filter_by(email=email).first()

        if user: 
            nuevo_grupo.users.append(user)
        else:  
            return jsonify({"error": "Credenciales inválidas"}), 401

    db.session.commit()

    return jsonify({"message": "Group created successfully and invitations sent"}), 200

#Listar grupos existentes
@api.route('/groups', methods=['GET'])
def list_groups():
    groups = Group.query.all()
    serialized_groups = [group.serialize() for group in groups]  # Aquí corregido
    return jsonify(serialized_groups), 200

