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













@api.route('/vehicle', methods=['GET'])
def get_all_vehicles():
    all_vehicles = Vehicle.query.all()
    all_vehicles_list = list(map(lambda item:item.serialize(), all_vehicles))
    if all_vehicles_list == []:
        return jsonify({"msg":"Vehicles not found"}), 404
    response_body = {
        "msg": "ok",
        "results": all_vehicles_list
    }
    return jsonify(response_body), 200