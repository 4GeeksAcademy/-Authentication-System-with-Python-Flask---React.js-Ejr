"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200





@api.route('/users', methods=['POST'])
def create_user():
    data = request.json

    if not data:
        raise APIException("No data provided", status_code=400)

    email = data.get('email')
    username = data.get('username')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    password = data.get('password')

    if not email or not username or not first_name or not last_name or not password:
        raise APIException("Missing required fields", status_code=400)

    # Check if the user already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        raise APIException("User already exists", status_code=400)

    # Create a new user
    new_user = User(
        email=email,
        username=username,
        first_name=first_name,
        last_name=last_name,
        password=password
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201


