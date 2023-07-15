"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Car, Saved
from api.utils import generate_sitemap, APIException
import requests
from flask_jwt_extended import JWTManager,create_access_token

api = Blueprint('api', __name__)
# api.config["JWT_SECRET_KEY"] = "super-secret"  # Change this "super secret" with something else!
# jwt = JWTManager(api)


# GET ALL THE CARS FROM OUR DATABASE
@api.route('/cars', methods=['GET'])
def get_cars():

    cars = Car.query.all()
    request_body = list(map(lambda x:x.serialize(), cars))

    return jsonify(request_body), 200

# GET ALL THE USERS FROM OUR DATABASE
@api.route('/users', methods=['GET'])
def get_users():

    users = User.query.all()
    request_body = list(map(lambda x:x.serialize(), users))

    return jsonify(request_body), 200


# FUNCTION TO FETCH CAR INFORMATION
def fetch_car_data(model):
    headers= {
        "X-RapidAPI-Key": "091b26d511msh9e1b3d4bf95fde1p1b1d59jsncc7949986be6",
        "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com"
    }

    querystring = {"model":model, "year":"2022", "limit":"1"}

    url = f"https://cars-by-api-ninjas.p.rapidapi.com/v1/cars"

    response = requests.get(url, headers=headers, params=querystring)
    if response.status_code == 200:
        cars_data = response.json()
        return cars_data
    else:
        # Handle error if the request fails
        print(f"Error: {response.status_code}")

# ROUTE TO STORE CARS DATA INTO OUR API
@api.route('/cars', methods=['POST'])
def add_car():
        model = request.json.get('model')
        car_data = fetch_car_data(model)
        if car_data is not None:
             year=car_data[0]['year'],
             brand=car_data[0]['make'],
             car_name=car_data[0]['model'],
             car_type=car_data[0]['class'],
             engine=car_data[0]['displacement'],
             transmission=car_data[0]['transmission'],
             car = Car(year=year, brand=brand, car_name=car_name, car_type=car_type, engine=engine, transmission=transmission)
             db.session.add(car)
             db.session.commit()
             return jsonify({"this is the car's data": car.serialize()}), 200
        else:
            return jsonify({'error': 'Failed to retrieve car information'}), 500


@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # Query your database for username and password
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        # the user was not found on the database
        return jsonify({"msg": "Bad username or password"}), 401

    # create a new token with the user id inside
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })
