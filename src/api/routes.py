"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def add_users():

    request_body_user = request.get.json
    new_user = User(
        email = request_body_user['email'], password = request_body_user['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify('Se ha añadido usario: ', request_body_user), 200