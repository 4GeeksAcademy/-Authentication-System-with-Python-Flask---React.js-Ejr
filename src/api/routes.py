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
  
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user_exist = User.query.filter_by(email=email).first()
    if user_exist is None:
        return jsonify({"msg": "Email doesn't exist"}), 404
    if email != user_exist.email or password != user_exist.password:
        return jsonify({"msg": "Bad email or password"}), 401
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token),200    
      
@api.route('/vehicle', methods=['POST'])
def add_vehicle():
    marca_modelo = request.json.get("marca_modelo")
    matricula = request.json.get("matricula")
    motor = request.json.get("motor")
    tipo_cambio = request.json.get("tipo_cambio")
    asientos = request.json.get("asientos")
    precio = request.json.get("precio")

    if not (marca_modelo and matricula and motor and tipo_cambio and asientos and precio):
        return jsonify({"msg": "Todos los campos son obligatorios."}), 400
    existing_vehicle = Vehicle.query.filter_by(matricula=matricula).first()
    if existing_vehicle:
        return jsonify({"msg": "El vehículo con esta matrícula ya existe"}), 400

    new_vehicle = Vehicle(
        marca_modelo=marca_modelo,
        matricula=matricula,
        motor=motor,
        tipo_cambio=tipo_cambio,
        asientos=asientos,
        precio=precio
    )
    db.session.add(new_vehicle)
    db.session.commit()
    return jsonify({"msg": "El vehículo ha sido creado correctamente"}), 200
  
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
  
@api.route('/vehicle/<int:vehicle_id>', methods=['GET'])
def get_one_vehicle(vehicle_id):
    vehicle = Vehicle.query.get(vehicle_id)
    if vehicle is None:
        return jsonify({"msg":"Vehicle doesn't exist"}), 404
    return jsonify(vehicle.serialize()), 200
  
@api.route('/user/vehicle/<int:vehicle_id>', methods=['DELETE'])
@jwt_required()
def delete_vehicle_in_rent(vehicle_id):
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
        rent_vehicle_to_delete = MyVehicleInRent.query.filter_by(vehicle_id=vehicle_id, user_id=user_id).first()
        if rent_vehicle_to_delete:
            db.session.delete(rent_vehicle_to_delete)
            db.session.commit()
            return jsonify({"msg": "Vehicle deleted to rent"}), 200
        else:  
            return ({"msg": "This vehicle doesn't exist in rent"}), 400
  
@api.route("/favorite/vehicle/<int:vehicle_id>", methods=["POST"])
@jwt_required()
def create_favorite_vehicle(vehicle_id):
    email = get_jwt_identity()
    user_exist = User.query.filter_by(email=email).first()
    user_id = user_exist.id
    vehicle_exist = Vehicle.query.filter_by(id=vehicle_id).first()
    if vehicle_exist is None:
        return ({"msg": "This vehicle doesn't exist"}), 400
    else:
        exist_favorite_vehicle = FavoriteVehicle.query.filter_by(vehicle_id=vehicle_id, user_id=user_id).first()
        if exist_favorite_vehicle is None:
            new_favorite_vehicle = FavoriteVehicle(vehicle_id= vehicle_id, user_id=user_id)
            db.session.add(new_favorite_vehicle)
            db.session.commit()
            return jsonify({"msg": "El vehiculo se añadió a favoritos"}), 201
        else:
            return jsonify({'msg': 'El vehiculo ya lo tienes en favoritos.'}), 400
          
@api.route('/user/favorites', methods=['GET'])
def get_all_favorites():
    email =  get_jwt_identity()
    user_exist = User.query.filter_by(email=email).first()
    user_id = user_exist.id
    all_favorites = FavoriteVehicle.query.filter_by(user_id=user_id).all()
    all_favorites_list = list(map(lambda item: item.serialize(), all_favorites))
   
    if all_favorites_list == []:
        return jsonify({"msg":"There are not favorites"}), 404
    
    response_body = {
        "msg": "ok",
        "results": [
            all_favorites_list,
        ]
    }    
    return jsonify(response_body), 200
  
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
