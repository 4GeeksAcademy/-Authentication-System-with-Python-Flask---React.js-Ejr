"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Room, Games
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity
from datetime import timedelta
import re


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)
bcrypt = Bcrypt()

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def new_user():
    try:
        sign_up_data = request.json
        print("Datos recibidos en la solicitud:", sign_up_data)

        email = request.json.get('email')
        password = request.json.get('password')
        username = request.json.get('username')
        first_name = request.json.get('firstName')
        last_name = request.json.get('lastName')
        age = request.json.get('age')
        region = request.json.get('region')
        timezone = request.json.get('timezone')
        languages = request.json.get('languages')
        xbox = request.json.get('xbox')
        psn = request.json.get('psn')
        steam = request.json.get('steam')
        google_play = request.json.get('googlePlay')
        nintendo = request.json.get('nintendo')
        epic_id = request.json.get('epicId')
        bio = request.json.get('bio')
        gender = request.json.get('gender')
        admin = request.json.get('admin')
    
        # Convierte una variable de valor (" ") a booleano
        if admin is not None:
            admin = bool(admin)

        # Las imagenes trabajan en formato Binary. Por los momento lo dejamos como none
        # if image == '': 
        #     image = None

        if not email.strip() or not password.strip():
            return jsonify({"message": "Missing required fields: email or password"}), 400
    
        if not email or not password:
            return jsonify({"message": "Missing required fields: email or password"}), 400
        
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({'error': 'Email already exists.'}), 409

        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

        print("ESTE ES PASSWORD HASHEADO: ",hashed_password)

        new_user = User(
            email = email,
            password = hashed_password,
            username = username,
            first_name = first_name,
            last_name = last_name,
            age = age,
            region = region,
            timezone = timezone,
            languages = languages,
            xbox = xbox,
            psn = psn,
            steam = steam,
            google_play = google_play,
            nintendo = nintendo,
            epic_id = epic_id,
            bio = bio,
            gender = gender,
            admin = admin
            )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User created successfully", "user": new_user.serialize()}), 201
    
    except Exception as e:
        print(str(e))
        return jsonify({"message": "Failed to create user", "error": str(e)}), 500
    

@api.route('/login', methods=['POST'])
def get_token():
    
    def validate_email(email):
        pattern = r'^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$'
        return re.match(pattern, email)
    
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Email and password are required.'}), 400
        
        if not validate_email(email):
            return jsonify({'error': 'Invalid email format.'}), 404
        
        login_user = User.query.filter_by(email=request.json['email']).one()

        if not login_user:
            return jsonify({'error': 'email/user not found.'}), 404
        

        true_o_false = bcrypt.check_password_hash(login_user.password, password)
        
        # Si es verdadero generamos un token y lo devuelve en una respuesta JSON:
        if true_o_false:
            expires = timedelta(hours=1)  # pueden ser "hours", "minutes", "days","seconds"
            user_id = login_user.id
            access_token = create_access_token(identity=user_id, expires_delta=expires)
            time_zone = getattr(login_user, 'time_zone', None)
            data_to_return = {
                'token':access_token, 
                'admin': login_user.admin,
                'email': login_user.email,
                'username': login_user.username,
                'first_name': login_user.first_name,
                'last_name': login_user.last_name,
                'age': login_user.age,
                'region': login_user.region,
                'time_zone': time_zone,
                'languages': login_user.languages,
                'xbox': login_user.xbox,
                'psn': login_user.psn,
                'steam': login_user.steam,
                'google_play': login_user.google_play,
                'nintendo': login_user.nintendo,
                'epic_id': login_user.epic_id,
                'bio': login_user.bio,
                'gender': login_user.gender,
            }
            return jsonify(data_to_return), 200
        else:
            return {"Error":"Contraseña  incorrecta"},404
    
    except Exception as e:
        return {"Error":"El email proporcionado no corresponde a ninguno registrado: " + str(e)}, 500

@api.route('/home', methods=['GET'])
def get_current_rooms():
    try:
        current_rooms = Room.query.all()
        serialized_rooms = []

        for room in current_rooms:
            participants = []
            for participant in room.room_participants:
                participants.append({
                    "participant_id": participant.user.id,
                    "participant_name": participant.user.name,
                    "confirmed": participant.confirmed
                })

            serialized_room = {
                "game_name": room.game.name,
                "room_name": room.room_name,
                "game_description": room.description,
                "host_name": room.user.name,
                "date": room.date,
                "time": room.time,
                "platform": room.platform,
                "mood": room.mood,
                "participants": participants  
            }
            serialized_rooms.append(serialized_room)

        return jsonify(serialized_rooms)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/create_room', methods=['POST'])
@jwt_required()  # Esta decoración asegura que el usuario esté autenticado con un token JWT válido
def create_room():
    try:
        # Extraer datos del token JWT para obtener la identidad del usuario
        current_user_id = get_jwt_identity()
        
        # Obtener los datos de la solicitud JSON
        room_data = request.json
        
        # Crear una nueva instancia de Room con los datos proporcionados
        new_room = Room(
            user_id=current_user_id,  # Asignar al usuario actual como el anfitrión de la sala
            date=room_data.get('date'),
            time=room_data.get('time'),
            room_name=room_data.get('room_name'),
            game_id=room_data.get('game_id'),
            platform=room_data.get('platform'),
            description=room_data.get('description'),
            mood=room_data.get('mood'),
            room_size=room_data.get('room_size')
        )
        
        # Agregar la nueva sala a la base de datos y confirmar la transacción
        db.session.add(new_room)
        db.session.commit()
        
        return jsonify({"message": "Room created successfully", "room": new_room.serialize()}), 201
    
    except Exception as e:
        return jsonify({"message": "Failed to create room", "error": str(e)}), 500
    

@api.route('/create_game', methods=['POST'])
@jwt_required()
def create_game():
    try:
        # Obtener el ID de usuario del token de acceso
        current_user_id = get_jwt_identity()

        # Verificar si el usuario es admin
        current_user = User.query.get(current_user_id)
        if not current_user or not current_user.admin:
            return jsonify({"error": "Only admins can create games."}), 403

        game_data = request.json
        print("Datos recibidos en la solicitud:", game_data)

        name = game_data.get('name')

        if not name:
            return jsonify({"error": "Missing required field: name"}), 400

        existing_game = Games.query.filter_by(name=name).first()
        if existing_game:
            return jsonify({'error': 'Game already exists.'}), 409

        new_game = Games(
            name=name
        )

        db.session.add(new_game)
        db.session.commit()

        return jsonify({"message": "Game created successfully", "game": new_game.serialize()}), 201
    
    except Exception as e:
        print(str(e))
        return jsonify({"message": "Failed to create game", "error": str(e)}), 500

