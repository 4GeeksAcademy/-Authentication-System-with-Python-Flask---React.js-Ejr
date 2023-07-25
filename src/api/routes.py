from flask import Flask, request, jsonify, Blueprint, jsonify
from api.models import db, Business_user, Offers, Trip, User, Post
from api.utils import APIException
from flask_bcrypt import bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager
from api.utils import generate_sitemap
from werkzeug.security import generate_password_hash, check_password_hash


api = Blueprint('api', __name__)

jwt = JWTManager()

  # Fonction d'initialisation de l'extension JWTManager avec l'application Flask
def initialize_jwt(api):
    jwt.init_app(api)

@api.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code
  

@api.route('/')
def sitemap():
    return generate_sitemap(api)

# Business_user routes
@api.route('/business_users', methods=['GET'])
def get_all_business_users():
    business_users = Business_user.query.all()
    serialized_users = [user.serialize() for user in business_users]
    return jsonify(serialized_users)

@api.route('/business_user/<int:user_id>', methods=['GET'])
def get_business_user(user_id):
    user = Business_user.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    return jsonify(user.serialize())


@api.route('/business_user/<int:user_id>', methods=['PUT'])
def update_business_user(user_id):
    user = Business_user.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    data = request.get_json()
    try:
        user.business_name = data['business_name']
        user.password = data['password']
        user.email = data['email']
        user.nif = data['nif']
        user.address = data['address']
        user.payment_method = data['payment_method']
        db.session.commit()
        return jsonify(user.serialize()), 200
    except KeyError:
        return jsonify({"message": "Invalid data provided"}), 400

@api.route('/business_user/<int:user_id>', methods=['DELETE'])
def delete_business_user(user_id):
    user = Business_user.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200

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
def delete_trip(trip_id):
    trip = Trip.query.get(trip_id)
    if not trip:
        return jsonify({"message": "Trip not found"}), 404

    db.session.delete(trip)
    db.session.commit()
    return jsonify({"message": "Trip deleted successfully"}), 200

# Token route
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


# Admin route   
@api.route('/admin', methods=['GET'])
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
@api.route('/admin/delete/<string:resource>/<int:resource_id>', methods=['DELETE'])
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

# # Update business profile
# @api.route('/business/profile', methods=['PUT'])
# @jwt_required()
# def update_business_profile():
#     try: 
#         current_business_id = get_jwt_identity()
#         business = Business_user.query.get(current_business_id)

#         if not business:
#             return jsonify({'error': 'Business user not found'}), 400
        
#         data = request.get_json()

#         # Update business profile data
#         business.business_name = data.get('business_name', business.business_name)
#         business.email = data.get('email', business.email)
#         business.nif = data.get('nif', business.nif)
#         business.address = data.get('address', business.address)
#         business.payment_method = data.get('payment_method', business.payment_method)

#         db.session.commit()

#         return jsonify({'message': 'Business profile updated successfully', 'business': business.serialize()}), 200
    
#     except Exception as e:
#         return jsonify({'error': 'Error in updating business profile' + str(e)}), 500
      
      

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

@api.route('/business-users', methods=['GET'])
def get_all_business_users():
    try:
        business_users = Business_user.query.all()
        serialized_business_users = [business_user.serialize() for business_user in business_users]
        return jsonify(business_users=serialized_business_users), 200

    except Exception as e:
        return jsonify({'error': 'Error retrieving business users: ' + str(e)}), 500

# Décorez la route pour obtenir un business_user par son ID
@api.route('/business-users/<int:business_user_id>', methods=['GET'])
def get_business_user(business_user_id):
    business_user = Business_user.query.get(business_user_id)
    if not business_user:
        return jsonify(message='Business user not found'), 404
    return jsonify(business_user.serialize())



bcrypt = Bcrypt()

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

        if existing_user or existing_business:
            return jsonify({'error': 'Email already exists.'}), 409

        # Si le champ 'name_business' est présent, c'est une inscription d'entreprise
        if 'name_business' in data:
            name_business = data.get('name_business')
            nif = data.get('nif')
            address = data.get('address')
            payment_method = data.get('payment_method')

            # Hacher le mot de passe et créer l'entreprise
            password_hash = generate_password_hash(password)
            new_business = Business_user(business_name=name_business, email=email, password=password_hash, nif=nif, address=address, payment_method=payment_method)
            db.session.add(new_business)
            db.session.commit()

            return jsonify({'message': 'Business created successfully', 'business': new_business.serialize()}), 200

        # Sinon, c'est une inscription d'utilisateur
        else:
            firstname = data.get('firstname')
            lastname = data.get('lastname')
            username = data.get('username')
            address = data.get('address')
            dni = data.get('dni')
            payment_method = data.get('payment_method')

            # Hacher le mot de passe et créer l'utilisateur
            password_hash = generate_password_hash(password)
            new_user = User(email=email, password=password_hash, firstname=firstname, lastname=lastname, username=username, address=address, dni=dni, payment_method=payment_method)
            db.session.add(new_user)
            db.session.commit()

            return jsonify(message='User created successfully', user=new_user.serialize()), 201

    except Exception as e:
        return jsonify({'error': 'Error in user/business creation: ' + str(e)}), 500




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
            password_db = user.password
            if bcrypt.check_password_hash(password_db, data["password"]):
                user_or_business = user


        # Vérifier si c'est une entreprise
        business = Business_user.query.filter_by(email=data['email']).first()
        if business:
            password_db = business.password
            if bcrypt.check_password_hash(password_db, data["password"]):
                user_or_business = business

        if not user_or_business:
            return jsonify({'error': 'User or Business not found or Incorrect password'}), 401

        access_token = create_access_token(identity=user_or_business.id)
        return jsonify({'access_token': access_token, 'user_or_business': user_or_business.serialize()}), 200

    except Exception as e:
        return jsonify({'error': 'Error in login: ' + str(e)}), 500


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



@api.route('/posts', methods=['GET'])
def get_all_posts():
    try:
        posts = Post.query.all()
        serialized_posts = [post.serialize() for post in posts]
        return jsonify(posts=serialized_posts), 200

    except Exception as e:
        return jsonify({'error': 'Error retrieving posts: ' + str(e)}), 500


@api.route('/posts', methods=['POST'])
@jwt_required()
def create_post():
    try:
        data = request.get_json()
        content = data.get('content')
        author_id = get_jwt_identity()  # Utilisateur authentifié avec JWT

        if not content:
            return jsonify({'error': 'Content is required.'}), 400

        new_post = Post(content=content, author_id=author_id)
        db.session.add(new_post)
        db.session.commit()

        return jsonify(message='Post created successfully', post=new_post.serialize()), 201

    except Exception as e:
        return jsonify({'error': 'Error in creating post: ' + str(e)}), 500

# Route pour supprimer un message (DELETE)
@api.route('/posts/<int:post_id>', methods=['DELETE'])
@jwt_required()
def delete_post(post_id):
    try:
        post = Post.query.get(post_id)

        if not post:
            return jsonify(message='Post not found'), 404

        # Vérifier si l'utilisateur authentifié est l'auteur du message
        current_user_id = get_jwt_identity()
        if post.author_id != current_user_id:
            return jsonify({'error': 'You are not allowed to delete this post.'}), 403

        db.session.delete(post)
        db.session.commit()

        return jsonify(message='Post deleted successfully'), 200

    except Exception as e:
        return jsonify({'error': 'Error in deleting post: ' + str(e)}), 500

# Route pour mettre à jour le contenu d'un message (PUT)
@api.route('/posts/<int:post_id>', methods=['PUT'])
@jwt_required()
def update_post(post_id):
    try:
        post = Post.query.get(post_id)

        if not post:
            return jsonify(message='Post not found'), 404

        # Vérifier si l'utilisateur authentifié est l'auteur du message
        current_user_id = get_jwt_identity()
        if post.author_id != current_user_id:
            return jsonify({'error': 'You are not allowed to update this post.'}), 403

        data = request.get_json()
        content = data.get('content')

        if not content:
            return jsonify({'error': 'Content is required.'}), 400

        post.content = content
        db.session.commit()

        return jsonify(message='Post updated successfully', post=post.serialize()), 200

    except Exception as e:
        return jsonify({'error': 'Error in updating post: ' + str(e)}), 500


