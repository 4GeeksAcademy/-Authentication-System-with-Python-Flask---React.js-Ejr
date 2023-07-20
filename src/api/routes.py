"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Car, Saved
from api.utils import generate_sitemap, APIException
import requests
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token


api = Blueprint('api', __name__)


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

        existing_car = Car.query.filter_by(car_name=model).first()
        if existing_car:
             return jsonify({"Message": "Car exists on database already"}), 400

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

# Route to create user
@api.route("/createuser", methods=['POST'])
def add_user():
     body= request.get_json()
     if "email" not in body: return jsonify ("mising email"), 400

     user= User.query.filter_by(email=body["email"]).first()
     if user:
          return jsonify("user alredy exists"), 409
     if "firstName" not in body: return jsonify ("mising firstName"), 400
     if "phoneNumber" not in body: return jsonify ("phoneNumber"), 400
     if "password" not in body: return jsonify ("password"), 400

     newUser= User(
          email = body["email"],
          first_name = body["firstName"],
          phone_number = body["phoneNumber"],
          password = generate_password_hash(body["password"])
     )
     db.session.add(newUser)
     db.session.commit()
     return jsonify("successfully created new user"), 201


