from flask import Flask, request, jsonify, Blueprint, jsonify, redirect, url_for
from api.models import db, User, Business_user, Offers, Trip
from api.utils import APIException
from flask_bcrypt import bcrypt, Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager, unset_jwt_cookies



api = Blueprint('api', __name__)

jwt = JWTManager()

# Fonction d'initialisation de l'extension JWTManager avec l'application Flask
def initialize_jwt(api):
    jwt.init_app(api)

@api.route('/users', methods=['GET'])
def get_all_users():
    try:
        users = User.query.all()
        serialized_users = [user.serialize() for user in users]
        return jsonify(users=serialized_users), 200

    except Exception as e:
        return jsonify({'error': 'Error retrieving users: ' + str(e)}), 500

# Décorez la route pour obtenir un utilisateur par son ID
@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify(message='User not found'), 404
    return jsonify(user.serialize())

@api.route('/business_users', methods=['GET'])
def get_all_business_users():
    try:
        business_users = Business_user.query.all()
        serialized_business_users = [business_user.serialize() for business_user in business_users]
        return jsonify(business_users=serialized_business_users), 200

    except Exception as e:
        return jsonify({'error': 'Error retrieving business users: ' + str(e)}), 500

# Décorez la route pour obtenir un business_user par son ID
@api.route('/business_users/<int:business_user_id>', methods=['GET'])
def get_business_user(business_user_id):
    business_user = Business_user.query.get(business_user_id)
    if not business_user:
        return jsonify(message='Business user not found'), 404
    return jsonify(business_user.serialize())

@api.route('/business_user/<int:business_user_id>', methods=['DELETE'])
def delete_business_user(user_id):
    user = Business_user.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200


bcrypt = Bcrypt()

# Fonction d'initialisation de l'extension JWTManager avec l'application Flask
def initialize_jwt(api):
    jwt.init_app(api)

from sqlalchemy.exc import IntegrityError

@api.route('/signup/user', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        print(data)
        email = data.get('email')
        print(email)
        password = data.get('password')
        username = data.get('username')
        firstname = data.get('firstname')
        lastname = data.get('lastname')
        address = data.get('address')
        dni = data.get('dni')
        payment_method = data.get('payment_method')

        # Vérifier si l'email et le mot de passe sont fournis
        if not email or not password:
            return jsonify({'error': 'Email and password are required.'}), 400

        # Vérifier si l'utilisateur existe déjà
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({'error': 'Email already exists.'}), 409

        # Hacher le mot de passe et créer l'utilisateur
        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(
            email=email,
            password=password_hash,
            username=username,
            firstname=firstname,
            lastname=lastname,
            address=address,
            dni=dni,
            payment_method=payment_method,
            is_admin=False  # Vous pouvez définir la valeur par défaut pour is_admin ici
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify(message='User created successfully', user=new_user.serialize()), 201

    except IntegrityError as e:
        db.session.rollback()  # Annuler l'opération en cas de violation de contrainte unique
        return jsonify({'error': 'Error in user creation: ' + str(e)}), 409

    except Exception as e:
        db.session.rollback()  # Annuler l'opération en cas d'autres erreurs
        return jsonify({'error': 'Error in user creation: ' + str(e)}), 500


@api.route('/signup/business_user', methods=['POST'])
def create_business_user():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        # Vérifier si l'email et le mot de passe sont fournis
        if not email or not password:
            return jsonify({'error': 'Email and password are required.'}), 400

        # Vérifier si l'email existe déjà pour une entreprise
        existing_business = Business_user.query.filter_by(email=email).first()

        if existing_business:
            return jsonify({'error': 'Email already exists.'}), 409

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

    except Exception as e:
        return jsonify({'error': 'Error in business_user creation: ' + str(e)}), 500


@api.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()

        if not data.get("email") or not data.get("password"):
            return jsonify({'error': 'Email and password are required.'}), 400

        user_or_business = None

        # Vérifier si c'est un utilisateur
        user = User.query.filter_by(email=data['email']).first()
        if user:
            password_hash = user.password
            if bcrypt.check_password_hash(password_hash, data["password"]):
                user_or_business = user

        # Vérifier si c'est une entreprise
        business = Business_user.query.filter_by(email=data['email']).first()
        if business:
            password_hash = business.password
            if bcrypt.check_password_hash(password_hash, data["password"]):
                user_or_business = business

        if not user_or_business:
            return jsonify({'error': 'User or Business not found or Incorrect password'}), 401

        access_token = create_access_token(identity=user_or_business.id)
        return jsonify({'access_token': access_token, 'user_or_business': user_or_business.serialize()}), 200

    except Exception as e:
        return jsonify({'error': 'Error in login: ' + str(e)}), 500

@api.route('/logout', methods=['POST'])
@jwt_required()  # Requires authentication with a valid JWT token
def logout():
    unset_jwt_cookies()  # Remove JWT token from the client

    return redirect(url_for('/signup')) 


@api.route('/private')
@jwt_required()
def private():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if user:
        return jsonify({'message': 'Welcome to the private area!', 'user': user.serialize()})
    else:
        business = Business_user.query.get(current_user_id)
        if business:
            return jsonify({'message': 'Welcome to the private area!', 'business': business.serialize()})
        else:
            return jsonify({'error': 'Unauthorized'}), 401


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
        user.address = data.get('address', user.address)
        user.dni = data.get('dni', user.dni)
        user.payment_method = data.get('payment_method', user.payment_method)

        db.session.commit()

        return jsonify({'message': 'User profile updated successfully', 'user': user.serialize()}), 200

    except Exception as e:
        return jsonify({'error': 'Error in updating user profile: ' + str(e)}), 500


@api.route('/business_user/<int:business__id>', methods=['PUT'])
@jwt_required()
def update_business_profile(business_id):
    try:
        business_user = Business_user.query.get(business_id)

        if not business_user:
            return jsonify({'error': 'Business not found'}), 404

        data = request.get_json()

        # Update business profile data
        business_user.business_name = data.get('name_business', business_user.business_name)
        business_user.email = data.get('email', business_user.email)
        business_user.nif = data.get('nif', business_user.nif)
        business_user.address = data.get('address', business_user.address)
        business_user.payment_method = data.get('payment_method', business_user.payment_method)

        db.session.commit()

        return jsonify({'message': 'Business user profile updated successfully', 'business': business_user.serialize()}), 200

    except Exception as e:
        return jsonify({'error': 'Error in updating business user profile: ' + str(e)}), 500


@api.route('/token', methods=['POST'])
def get_token():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'error': 'Email and password are required.'}), 400

        user_or_business = None

        # Vérifier si c'est un utilisateur
        user = User.query.filter_by(email=email).first()
        if user:
            password_db = user.password
            if bcrypt.check_password_hash(password_db, password):
                user_or_business = user

        # Vérifier si c'est une entreprise
        business = Business_user.query.filter_by(email=email).first()
        if business:
            password_db = business.password
            if bcrypt.check_password_hash(password_db, password):
                user_or_business = business

        if not user_or_business:
            return jsonify({'error': 'User or Business not found or Incorrect password'}), 401

        access_token = create_access_token(identity=user_or_business.id)
        return jsonify({'access_token': access_token, 'user_or_business': user_or_business.serialize()}), 200

    except Exception as e:
        return jsonify({'error': 'Error in token generation: ' + str(e)}), 500

        # Trip routes
@api.route('/offers', methods=['GET'])
def get_all_offers():
    offers = Offers.query.all()
    serialized_offers = [offer.serialize() for offer in offers]
    return jsonify(serialized_offers)

@api.route('/offer/<int:offer_id>', methods=['GET'])
def get_offer(offer_id):
    offer = Offers.query.get(offer_id)
    if not offer:
        return jsonify({"message": "Offer not found"}), 404
    return jsonify(offer.serialize())

@api.route('/offers', methods=['POST'])
@jwt_required()
def create_offer():
    data = request.get_json()
    try:
        offer = Offers(
            trip_id=data['trip_id'],
            business_id=data['business_id'],
            normal_user_price=data['normal_user_price'],
            medium_user_price=data['medium_user_price'],
            high_user_price=data['high_user_price'],
            premium_user_price=data['premium_user_price']
        )
        db.session.add(offer)
        db.session.commit()
        return jsonify(offer.serialize()), 201
    except KeyError:
        return jsonify({"message": "Invalid data provided"}), 400

@api.route('/offer/<int:offer_id>', methods=['PUT'])
@jwt_required()
def update_offer(offer_id):
    offer = Offers.query.get(offer_id)
    if not offer:
        return jsonify({"message": "Offer not found"}), 404

    data = request.get_json()
    try:
        offer.trip_id = data['trip_id']
        offer.business_id = data['business_id']
        offer.normal_user_price = data['normal_user_price']
        offer.medium_user_price = data['medium_user_price']
        offer.high_user_price = data['high_user_price']
        offer.premium_user_price = data['premium_user_price']
        db.session.commit()
        return jsonify(offer.serialize()), 200
    except KeyError:
        return jsonify({"message": "Invalid data provided"}), 400

@api.route('/offer/<int:offer_id>', methods=['DELETE'])
@jwt_required()
def delete_offer(offer_id):
    offer = Offers.query.get(offer_id)
    if not offer:
        return jsonify({"message": "Offer not found"}), 404

    db.session.delete(offer)
    db.session.commit()
    return jsonify({"message": "Offer deleted successfully"}), 200

    
# Trip routes
@api.route('/trip', methods=['GET'])
def get_all_trips():
    trips = Trip.query.all()
    serialized_trips = [trip.serialize() for trip in trips]
    return jsonify(serialized_trips)

@api.route('/trip/<int:trip_id>', methods=['GET'])
def get_trip(trip_id):
    trip = Trip.query.get(trip_id)
    if not trip:
        return jsonify({"message": "Trip not found"}), 404
    return jsonify(trip.serialize())

@api.route('/trip', methods=['POST'])
@jwt_required()
def create_trip():
    data = request.get_json()
    try:
        trip = Trip(
            country=data['country'],
            city=data['city'],
            activities=data['activities']
        )
        db.session.add(trip)
        db.session.commit()
        return jsonify(trip.serialize()), 201
    except KeyError:
        return jsonify({"message": "Invalid data provided"}), 400

        
@api.route('/trip/<int:trip_id>', methods=['PUT'])
@jwt_required()
def update_trip(trip_id):
    trip = Trip.query.get(trip_id)
    if not trip:
        return jsonify({"message": "Trip not found"}), 404


    data = request.get_json()
    try:
        trip.country = data['country']
        trip.city = data['city']
        trip.activities = data['activities']
        db.session.commit()
        return jsonify(trip.serialize()), 200
    except KeyError:
        return jsonify({"message": "Invalid data provided"}), 400

@api.route('/trip/<int:trip_id>', methods=['DELETE'])
@jwt_required()
def delete_trip(trip_id):
    trip = Trip.query.get(trip_id)
    if not trip:
        return jsonify({"message": "Trip not found"}), 404

    db.session.delete(trip)
    db.session.commit()
    return jsonify({"message": "Trip deleted successfully"}), 200

    # Admin route   
@api.route('/admin_user', methods=['GET'])
@jwt_required()
def admin_dashboard():
    is_admin = get_jwt_identity().get('is_admin', False)
    if is_admin:
        users = Business_user.query.all()
        trips = Trip.query.all()
        return jsonify({
            'users': [user.serialize() for user in users],
            'trips': [trip.serialize() for trip in trips]
        }), 200
    else:
        return jsonify({'error': 'Unauthorized'}), 401

# Admin can delete users and trips
@api.route('/admin_user/delete/<string:resource>/<int:resource_id>', methods=['DELETE'])
@jwt_required()
def delete_resource(resource, resource_id):
    is_admin = get_jwt_identity().get('is_admin', False)
    if is_admin:
        if resource == 'users':
            resource_instance = Business_user.query.get(resource_id)
        elif resource == 'trips':
            resource_instance = Trip.query.get(resource_id)
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