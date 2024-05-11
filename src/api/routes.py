"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity
import re

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def new_user():
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        name = request.json.get('name')
        age = request.json.get('age')
        region = request.json.get('region')
        timezone = request.json.get('timezone')
        languages = request.json.get('languages')
        image = request.json.get('image')
        xbox = request.json.get('xbox')
        psn = request.json.get('psn')
        steam = request.json.get('steam')
        google_play = request.json.get('google_play')
        nintendo = request.json.get('nintendo')
        epic_id = request.json.get('epic_id')
        bio = request.json.get('bio')
        gender = request.json.get('gender')
        admin = request.json.get('admin')

        if not email.strip() or not password.strip():
            return jsonify({"message": "Missing required fields: email or password"}), 400
    
        if not email or not email or not password:
            return jsonify({"message": "Missing required fields: email or password"}), 400
        
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({'error': 'Email already exists.'}), 409

        hashed_password = generate_password_hash(password)

        new_user = User(
            email = email,
            password = hashed_password,
            name = name,
            age = age,
            region = region,
            timezone = timezone,
            languages = languages,
            image = image,
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