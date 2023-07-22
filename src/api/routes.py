"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, Blueprint
from flask_migrate import Migrate
from flask_cors import CORS
from utils import APIException
from models import db, User, Review, Post, Favorites
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, unset_jwt_cookies


api = Blueprint('api', __name__)

bcrypt = Bcrypt()
db = SQLAlchemy()
jwt = JWTManager()

@api.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()

        if not data.get("email") or not data.get("password"):
            return jsonify({'error': 'Email and password are required.'}), 400
        
        user_or_business = None
        is_admin = False

        # Check if user
        user = User.query.filter_by(email=data['email']).first()
        if user:
            password_db = user.password
            if bcrypt.check_password_hash(password_db, data["password"]):
                user_or_business = user
                is_admin = user.is_admin

        # Check if company
        business = Business.query.filter_by(email=data['email']).first()
        if business:
            password_db = business.password
            if bcrypt.check_password_hash(password_db, data["password"]):
                user_or_business = business

        if not user_or_business:
            return jsonify({'error': 'User or Business not found or Incorrect password'}), 401
        
        access_token = create_access_token(identity=user_or_business.id, is_admin=is_admin)
        return jsonify({'access_token': access_token, 'user_or_business': user_or_business.serialize()}), 200

    except Exception as e:
        return jsonify({'error': 'Error in login: ' + str(e)}), 500

# Signup route
@api.route('/signup', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'error': 'Email and password are required.'}), 400

        if 'nif' in data:
            # Handle business signup
            name_business = data.get('name_business')
            nif = data.get('nif')
            address = data.get('address')
            payment_method = data.get('payment_method')

            exisnifg_business = Business.query.filter_by(email=email).first()
            if exisnifg_business:
                return jsonify({'error': 'Email already exists for a business.'}), 409

            password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
            new_business = Business(name_business=name_business, email=email, password=password_hash, nif=nif, address=address, payment_method=payment_method)
            db.session.add(new_business)
            db.session.commit()

            return jsonify({'message': 'business created successfully', 'business': new_business.serialize()}), 201
        else:
            # Handle user signup
            firstname = data.get('firstname')
            lastname = data.get('lastname')
            username = data.get('username')
            Address = data.get('Address')
            dni = data.get('dni')
            location = data.get('location')
            payment_method = data.get('payment_method')

            exisnifg_user = User.query.filter_by(email=email).first()
            if exisnifg_user:
                return jsonify({'error': 'Email already exists for a user.'}), 409

            password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
            new_user = User(email=email, password=password_hash, firstname=firstname, lastname=lastname, username=username, Address=Address, dni=dni, location=location, payment_method=payment_method)
            db.session.add(new_user)
            db.session.commit()

            return jsonify({'message': 'User created successfully', 'user': new_user.serialize()}), 201

    except Exception as e:
        return jsonify({'error': 'Error in user/business creation: ' + str(e)}), 500


# Private route
@api.route('/private')
@jwt_required()
def private():
    current_user = get_jwt_identity()
    login_user = User.query.get(current_user)

    if login_user:
        return jsonify({'message': 'Welcome to the private area!', 'user': login_user.serialize()})
    else:
        login_business = Business.query.get(current_user)
        if login_business:
            return jsonify({'message': 'Welcome to the private area!', 'business': login_business.serialize()})
        else:
            return jsonify({'error': 'Unauthorized'}), 401