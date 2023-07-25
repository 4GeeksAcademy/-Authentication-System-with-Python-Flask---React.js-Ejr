from flask import Flask, request, jsonify, Blueprint, jsonify
from api.models import db, Business_user, Offers, Trip
from api.utils import APIException
from flask_bcrypt import bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager
from api.utils import generate_sitemap




api = Blueprint('api', __name__)

jwt = JWTManager()

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

@api.route('/business_users', methods=['POST'])
def create_business_user():
    data = request.get_json()
    try:
        user = Business_user(
            business_name=data['business_name'],
            password=data['password'],
            email=data['email'],
            nif=data['nif'],
            address=data['address'],
            payment_method=data['payment_method']
        )
        db.session.add(user)
        db.session.commit()
        return jsonify(user.serialize()), 201
    except KeyError:
        return jsonify({"message": "Invalid data provided"}), 400

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
        email = request.json.get('email')
        password = request.json.get('password')

        if not email or not password:
            return jsonify({'error': 'Email and password are required.'}), 400
        
        # Check if the provided email exists in the Business_user table
        business_user = Business_user.query.filter_by(email=email).first()

        if business_user and bcrypt.check_password_hash(business_user.password, password):
            # Handle the scenario when the password is correct for the business user
            access_token = create_access_token(identity=business_user.id)
            return jsonify({'access_token': access_token}), 200

        return jsonify({'error': 'Incorrect Email or Password'}), 401
    
    except Exception as e:
        return jsonify({'error': 'An error occurred: ' + str(e)}), 500

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

# Update business profile
@api.route('/business/profile', methods=['PUT'])
@jwt_required()
def update_business_profile():
    try: 
        current_business_id = get_jwt_identity()
        business = Business_user.query.get(current_business_id)

        if not business:
            return jsonify({'error': 'Business user not found'}), 400
        
        data = request.get_json()

        # Update business profile data
        business.business_name = data.get('business_name', business.business_name)
        business.email = data.get('email', business.email)
        business.nif = data.get('nif', business.nif)
        business.address = data.get('address', business.address)
        business.payment_method = data.get('payment_method', business.payment_method)

        db.session.commit()

        return jsonify({'message': 'Business profile updated successfully', 'business': business.serialize()}), 200
    
    except Exception as e:
        return jsonify({'error': 'Error in updating business profile' + str(e)}), 500


