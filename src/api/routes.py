"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Business_user, Post, Favorites, Review, Offers, Trip, Admin
from api.utils import generate_sitemap, APIException
from flask_bcrypt import bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager
from sqlalchemy.orm.exc import NoResultFound


api = Blueprint('api', __name__)

jwt = JWTManager()

# Fonction d'initialisation de l'extension JWTManager avec l'application Flask
def initialize_jwt(api):
    jwt.init_app(api)

@api.route('/token', methods=['POST'])
def get_token():
    try:
        email = request.json.get('email')
        password = request.json.get('password')

        if not email or not password:
            return jsonify({'error': 'Email and password are required.'}), 400

        try:
            # Check if the provided email exists in the User table
            login_user = User.query.filter_by(email=email).one()
            password_db_user = login_user.password
            user_password_correct = bcrypt.check_password_hash(password_db_user, password)
        except NoResultFound:
            user_password_correct = False

        try:
            # Check if the provided email exists in the Business_user table
            login_business = Business_user.query.filter_by(email=email).one()
            password_db_business = login_business.password
            business_password_correct = bcrypt.check_password_hash(password_db_business, password)
        except NoResultFound:
            business_password_correct = False

        if user_password_correct and not business_password_correct:
            user_id = login_user.id
            access_token = create_access_token(identity=user_id)
            return jsonify({'access_token': access_token}), 200

        elif business_password_correct and not user_password_correct:
            # Handle the scenario when the password is correct for the business user
            business_user_id = login_business.id
            access_token = create_access_token(identity=business_user_id)
            return jsonify({'access_token': access_token}), 200

        else:
            return jsonify({'error': 'Incorrect Password'}), 401

    except Exception as e:
        return jsonify({'error': 'An error occurred: ' + str(e)}), 500


# # Admin route   
# @api.route('/admin', methods=['GET'])
# @jwt_required()
# def admin_dashboard():
#     is_admin = get_jwt_identity()['is_admin']
#     if is_admin:
#         users = User.query.all()
#         business = Business_user.query.all()
#         return jsonify({
#             'users': [user.serialize() for user in users],
#             'business_users': [business.serialize() for business in business]
#         }), 200
#     else:
#         return jsonify({'error': 'Unauthorized'}), 401


# admin can delete users and companies
@api.route('/admin/delete/<string:resource>/<int:resource_id>', methods=['DELETE'])
@jwt_required()
def delete_resource(resource, resource_id):
    is_admin = get_jwt_identity()['is_admin']
    if is_admin:
        if resource == 'users':
            resource_instance = User.query.get(resource_id)
        elif resource == 'companies':
            resource_instance = Business_user.query.get(resource_id)
        else:
            return jsonify({'error': 'Invalid resource type'}), 400

        if resource_instance:
            db.session.delete(resource_instance)
            db.session.commit()
            return jsonify({'message': f'{resource[:-1].capitalize()} deleted successfully'}), 200
        else:
            return jsonify({'error': f'{resource[:-1].capitalize()} not found'}), 404
    else:
        return jsonify({'error': 'Unauthorized'}), 401


@api.route('/business/<int:business_id>', methods=['PUT'])
@jwt_required()
def update_business_profile(business_id):
    try:
        business = Business_user.query.get(business_id)

        if not business:
            return jsonify({'error': 'Business not found'}), 404

        data = request.get_json()

        # Update business profile data
        business.name_business = data.get('name_business', business.name_business)
        business.email = data.get('email', business.email)
        business.nif = data.get('nif', business.nif)
        business.address = data.get('address', business.address)
        business.payment_method = data.get('payment_method', business.payment_method)

        db.session.commit()

        return jsonify({'message': 'Business profile updated successfully', 'business': business.serialize()}), 200

    except Exception as e:
        return jsonify({'error': 'Error in updating business profile: ' + str(e)}), 500



@api.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()

        if not data.get("email") or not data.get("password"):
            return jsonify({'error': 'Email and password are required.'}), 400

        user_or_business = None
        is_admin = False

        # Vérifier si c'est un utilisateur
        user = User.query.filter_by(email=data['email']).first()
        if user:
            password_db = user.password
            if bcrypt.check_password_hash(password_db, data["password"]):
                user_or_business = user
                is_admin = user.is_admin

        # Vérifier si c'est une entreprise
        business = Business_user.query.filter_by(email=data['email']).first()
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

# Route de login spéciale pour l'administrateur
@api.route('/admin/login', methods=['POST'])
def admin_login():
    try:
        data = request.get_json()

        if not data.get("email") or not data.get("password"):
            return jsonify({'error': 'Email and password are required.'}), 400

        # Vérifier si l'administrateur existe
        admin = Admin.query.filter_by(email=data['email']).first()
        if admin:
            password_db = admin.password
            if bcrypt.check_password_hash(password_db, data["password"]):
                access_token = create_access_token(identity=admin.id, is_admin=True)
                return jsonify({'access_token': access_token, 'admin': admin.serialize()}), 200

        return jsonify({'error': 'Admin not found or Incorrect password'}), 401

    except Exception as e:
        return jsonify({'error': 'Error in admin login: ' + str(e)}), 500

@api.route('/signup', methods=['POST'])
def create_user_or_business():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        # Vérifier si l'email et le mot de passe sont fournis
        if not email or not password:
            return jsonify({'error': 'Email and password are required.'}), 400

        # Vérifier si l'email existe déjà pour un utilisateur ou une entreprise
        existing_user = User.query.filter_by(email=email).first()
        existing_business = Business_user.query.filter_by(email=email).first()

        if existing_user:
            return jsonify({'error': 'Email already exists for a user.'}), 409

        if existing_business:
            return jsonify({'error': 'Email already exists for a business.'}), 409

        # Si le champ 'name_business' est présent, c'est une inscription d'entreprise
        if 'name_business' in data:
            name_business = data.get('name_business')
            nif = data.get('nif')
            address = data.get('address')
            payment_method = data.get('payment_method')

            # Hacher le mot de passe et créer l'entreprise
            password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
            new_business = Business_user(business_name=name_business, email=email, password=password_hash, nif=nif, address=address, payment_method=payment_method)
            db.session.add(new_business)
            db.session.commit()

            return jsonify({'message': 'Business created successfully', 'business': new_business.serialize()}), 201

        # Sinon, c'est une inscription d'utilisateur
        else:
            firstname = data.get('firstname')
            lastname = data.get('lastname')
            username = data.get('username')
            Address = data.get('Address')
            dni = data.get('dni')
            location = data.get('location')
            payment_method = data.get('payment_method')

            # Hacher le mot de passe et créer l'utilisateur
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
        login_business = Business_user.query.get(current_user)
        if login_business:
            return jsonify({'message': 'Welcome to the private area!', 'business': login_business.serialize()})
        else:
            return jsonify({'error': 'Unauthorized'}), 401
        
        # Update user profil
@api.route('/user/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user_profile(user_id):
    try:
        user = User.query.get(user_id)

        if not user:
            return jsonify({'error': 'User not found'}), 404

        data = request.get_json()

        # Update user profile data
        user.username = data.get('username', user.username)
        user.firstname = data.get('firstname', user.firstname)
        user.lastname = data.get('lastname', user.lastname)
        user.Address = data.get('Address', user.Address)
        user.dni = data.get('dni', user.dni)
        user.location = data.get('location', user.location)
        user.payment_method = data.get('payment_method', user.payment_method)

        db.session.commit()

        return jsonify({'message': 'User profile updated successfully', 'user': user.serialize()}), 200

    except Exception as e:
        return jsonify({'error': 'Error in updating user profile: ' + str(e)}), 500


@api.route('/user/profile', methods=['GET'])
@jwt_required()
def get_user_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify({'user': user.serialize()}), 200



@api.route('/business/profile', methods=['GET'])
@jwt_required()
def get_business_profile():
    business_id = get_jwt_identity()
    business = Business_user.query.get(business_id)

    if not business:
        return jsonify({'error': 'Business not found'}), 404

    return jsonify({'business': business.serialize()}), 200

