"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Vehicle, FavoriteVehicle, MyVehicleInRent
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager 

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/signup', methods=['POST'])
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user_exist = User.query.filter_by(email=email).first()
    if user_exist is None: 
        new_user = User(
            email=email, 
            password=password
        )
        db.session.add(new_user)
        db.session.commit()
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "User has already exist"}), 400













































































































@api.route('/favorite/vehicle/<int:vehicle_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite_vehicle(vehicle_id): 
    email = get_jwt_identity()
    user_exist = User.query.filter_by(email=email).first()
    user_id = user_exist.id
    vehicle_exist = Vehicle.query.filter_by(id=vehicle_id).first()
    if vehicle_exist is None:
        return jsonify({"msg": "This vehicle doesn't exist"}), 400
    else:
        favorite_vehicle_to_delete = FavoriteVehicle.query.filter_by(vehicle_id=vehicle_id, user_id=user_id).first()
        if favorite_vehicle_to_delete:
            db.session.delete(favorite_vehicle_to_delete)
            db.session.commit()
            return jsonify({"msg": "Vehicle deleted to favorites"}), 200
        else:  
            return ({"msg": "This vehicle doesn't exist in favorites"}), 400