"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS 
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

#Create flask app
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


@api.route('/hello', methods=['POST', 'GET'])

#TO PROTECT THE ROUTE USE JWT REQUIRED ***************

def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the Google Inspector, and you will see the GET request"
    }

    return jsonify(response_body), 200
    
#SignUp Route 

@api.route('/signup', methods=['POST'])
def signup():
    data = request.json  
    # Process the data (e.g., store it in a database)

    return jsonify({'message': 'Signup successful'})

#Event Route 

@api.route('/create-event', methods=['POST'])
def create_event():
    data = request.json

    # Event model with appropriate fields (name, description, location, date, price, image)

    new_event = Event(
        name=data['name'],
        description=data['description'],
        location=data['location'],
        date=data['date'],
        price=data['price'],
        image=data['image']
    )

    # Save to database or perform any required actions
    # For example: db.session.add(new_event)
    #               db.session.commit()

    return jsonify({'message': 'Event created successfully'}), 201