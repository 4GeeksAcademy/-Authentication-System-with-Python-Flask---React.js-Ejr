"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException



api = Blueprint('api', __name__)

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    name = data['name']
    email = data['email']
    # we still need to hash the password to encrypt it
    password = data['password']

    if name is None:
        return "Please add a name to your request", 400
    if email is None:
        return "Please add a email to your request", 400
    if password is None:
        return "Please add a password to your request", 400

    chk_user = User.query.filter_by(email=email).first()

    if chk_user:
        return "User already exists. Please sign in to your account or create a new user.", 409


    user = User(name=name, email=email, password=password, is_active=True)

    db.session.add(user)
    db.session.commit()

    response = {
        'status': 'success',
        'message': 'User created successfully'
    }

    return jsonify(response), 200


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']

    # we still need to hash the password to encrypt it
    password = data['password']

    if email is None:
        return "Please add a email to your request", 400
    if password is None:
        return "Please add a password to your request", 400

    user = User.query.filter_by(email=email).first()

    if user is None:
        return "This user does not exist.", 404
    if user.password != password:
        return"Incorrect password", 400
    
    # we stillk need to add jwt-extended to the project and tto this route to create a token
    response = {
        'message': 'User logged in successfully',
        'user': user.serialize()
    }

    return jsonify(response), 200



