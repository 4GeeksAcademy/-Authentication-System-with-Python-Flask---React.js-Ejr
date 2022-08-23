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
    request_body = request.get_json()                                                       #expected request body: {username: string, password: string}
    if request_body["username"].strip() == '' or request_body["password"].strip() == '':
        return jsonify('Error: username/password empty'), 400
    new_user = User(username = request_body['username'], password = request_body['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify('User created'), 200