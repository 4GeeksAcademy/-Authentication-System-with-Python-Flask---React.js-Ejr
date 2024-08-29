from flask import request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, User, PartnerProfile, UserProfile, Payment, CommentsEvents, CommentsVenue, Events, Favorites, Venue
from api.utils import APIException
from flask import Blueprint

api = Blueprint('api', __name__)

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('username')
    partner = data.get('partner')
    is_active = data.get('is_active')
    
    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    # Verifica si el usuario ya existe
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"message": "User already exists"}), 400

    # Crea un nuevo usuario
    new_user = User(email=email, password=password, username=name, partner=partner, is_active=is_active)  # Aquí podrías querer hashear la contraseña
    db.session.add(new_user)
    db.session.commit()

    if data['partner'] == True:
        new_partner_profile = PartnerProfile(users=[new_user])  
        db.session.add(new_partner_profile)

    else:
        new_user_profile = UserProfile(users=[new_user])  
        db.session.add(new_user_profile)

    db.session.commit()  


    # Crea un token JWT
    access_token = create_access_token(identity=new_user.id)

    return jsonify({"token": access_token, "user": new_user.serialize()}), 200

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    # Verifica las credenciales del usuario
    user = User.query.filter_by(email=email, password=password).first()  # Aquí podrías querer comparar la contraseña hasheada
    if not user:
        return jsonify({"message": "Invalid email or password"}), 401

    # Crea un token JWT
    access_token = create_access_token(identity=user.id)

    return jsonify({"token": access_token, "user": user.serialize()}), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    return jsonify({"message": f"Welcome {user.email}!"}), 200

@api.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()
    if not user:
        return jsonify({"message": "User not found"}), 404
    data = request.get_json()
    user.username = data.get("username",user.username)
    user.email = data.get("email", user.email)
    user.user_profile.city = data.get("city", user.user_profile.city)
    user.user_profile.address = data.get("address", user.user_profile.address)
    user.user_profile.country = data.get("country", user.user_profile.country)
    user.user_profile.event_style = data.get("eventStyle", user.user_profile.event_style)
    db.session.merge(user)
    db.session.commit()
    return jsonify({"message": f"Welcome {user.email}!"}), 200

@api.route('/profile', methods=['GET'])
@jwt_required()
def get_user_profile():
    current_user_id = get_jwt_identity()
    
    # Se asume que el `current_user_id` corresponde al ID en la tabla `User`.
    user = User.query.filter_by(id=current_user_id).first()

    if not user:
        return jsonify({"message": "User not found"}), 404
    
   
    # Serializa solo el perfil del usuario
    user_profile_data = user.user_profile.serialize()

    return jsonify(user_profile_data), 200

@api.route('/change-password', methods=['PUT'])
@jwt_required()
def change_password():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    data = request.get_json()
    current_password = data.get("currentPassword")
    new_password = data.get("newPassword")

    # Verificar si la contraseña actual es correcta (asumiendo que las contraseñas están en texto plano)
    if user.password != current_password:  # Aquí deberías estar utilizando hashing de contraseñas
        return jsonify({"message": "Current password is incorrect"}), 400

    # Actualizar la contraseña
    user.password = new_password  # Asegúrate de hashear la nueva contraseña
    db.session.commit()

    return jsonify({"message": "Password updated successfully"}), 200