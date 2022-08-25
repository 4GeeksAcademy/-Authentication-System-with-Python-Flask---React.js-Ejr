"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


#register new user
@api.route('/signup', methods=['POST'])
def sign_up():
    request_body = request.get_json()                                     #expected request body: {fullName: string, email: string, username: string, password: string}
    if request_body["username"].strip() == '' or request_body["password"].strip() == '' or request_body["fullName"].strip() == '' or request_body["email"].strip() == '':
        return jsonify('Error: empty field'), 400
    new_user = User(username = request_body["username"], password = request_body["password"], full_name = request_body["fullName"], email = request_body["email"])
    db.session.add(new_user)
    db.session.commit()
    return jsonify('User created'), 200

@api.route('/login', methods=['POST'])
def login():
    request_body = request.get_json()
    query = User.query.filter_by(username = request_body['username'], password = request_body['password']).first()
    if not query:
        return jsonify('Error: username not found'), 400
    user = query.serialize()
    access_token = create_access_token(identity=user['username'])
    return jsonify(access_token=access_token), 200