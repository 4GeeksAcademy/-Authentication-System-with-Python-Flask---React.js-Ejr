"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from models import db
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector  will see the GET request"
#     }

#     return jsonify(response_body), 200


# ///////////////////////////////////////////////////////////////////////////////////////////// post en /users
@api.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    phone_number = data.get('phone_number')
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400
    
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"error": "User already exists"}), 400
    
    new_user = User(email=email, password=password, name=name , phone_number=phone_number)
    db.session.add(new_user)
    db.session.commit()

    response_body = new_user.serialize()
    return jsonify(response_body), 201
# ///////////////////////////////////////////////////////////////////////////////////////////// get a /users con id
@api.route('/users<int:user_id>', methods=['GET'])
def get_user(user_id):
    user_query=User.query.filter_by(user_id=user_id).first()
    if user_query:
        response_body={
            "msg": "Resultado exitoso" , 
            "result": user_query.serialize()
        }
        return jsonify(response_body), 200
    else:
        response_body={
           "msg": "No existe" 
        }
        return jsonify(response_body), 404
# ///////////////////////////////////////////////////////////////////////////////////////////// get a /cars con id
@api.route('/cars<int:car_id>', methods=['GET'])
def get_cars(car_id):
    car_query=Car.query.filter_by(car_id=car_id).first()
    if car_query:
        response_body={
            "msg": "Resultado exitoso" , 
            "result": car_query.serialize()
        }
        return jsonify(response_body), 200
    else:
        response_body={
           "msg": "Car no exist" 
        }
        return jsonify(response_body), 404
    
# ///////////////////////////////////////////////////////////////////////////////////////////// post a /cars 
@api.route('/cars', methods=['POST'])
def create_car():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    car_model = data.get('car_model')
    license_plate = data.get('license_plate')
    if not car_model or not license_plate:
        return jsonify({"error": "car model and license plate are required"}), 400
    new_car = Car(car_model=car_model, license_plate=license_plate)
    db.session.add(new_car)
    db.session.commit()

    response_body = new_car.serialize()
    return jsonify(response_body), 201
# ///////////////////////////////////////////////////////////////////////////////////////////// post a /comments 
@api.route('/comments', methods=['POST'])
def create_comment():
    data = request.get_json()
    comment = data.get('comment')
    new_comment = Comment(comment=comment)
    db.session.add(new_comment)
    db.session.commit()

    response_body = new_comment.serialize()
    return jsonify(response_body), 201

# ///////////////////////////////////////////////////////////////////////////////////////////// post a /services 
@api.route('/services', methods=['POST'])
def create_service():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    name = data.get('name')
    description = data.get('description')
    duration = data.get('duration')
    max_appointments = data.get('max_appointments')
    appointments = data.get('appointments')

    new_service = Service(name=name, description = description, duration = duration, max_appointments = max_appointments, appointments = appointments)
    db.session.add(new_service)
    db.session.commit()

    response_body = new_service.serialize()
    return jsonify(response_body), 201
# ///////////////////////////////////////////////////////////////////////////////////////////// get a /services 
@api.route('/services', methods=['GET'])
def get_services():
    services_query=Services.query.all()
    services_list=list(map(lambda service:service.serialize(),services_query))
    return jsonify(services_list)