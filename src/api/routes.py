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

    elif data['partner'] == False:
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
