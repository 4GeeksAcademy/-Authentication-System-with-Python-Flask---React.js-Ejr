"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Walker, Owner
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/walkers', methods=['GET'])
def get_walkers():

    walkers = Walker.query.all()
    walkers_serialized = list(map(lambda x: x.serialize(), walkers))

    response_body = {
        'results': walkers_serialized
    }
    return jsonify(response_body), 200

@api.route('/walkers/<int:walker_id>', methods=['GET'])
def get_walker(walker_id):

    if walker_id < 1:
        raise APIException('El id no es válido', status_code=400)

    walker = Walker.query.get(walker_id)

    if walker == None:
        raise APIException('Este caminador no existe', status_code=400)

    response_body = {
        'results': walker.serialize()
    }
    return jsonify(response_body), 200

@api.route('/owners', methods=['GET'])
def get_owners():

    owners = Owner.query.all()
    owners_serialized = list(map(lambda x: x.serialize(), owners))

    response_body = {
        'results': owners_serialized
    }
    return jsonify(response_body), 200

@api.route('/owners/<int:owner_id>', methods=['GET'])
def get_owner(owner_id):

    if owner_id < 1:
        raise APIException('El id no es válido', status_code=400)

    owner = Owner.query.get(owner_id)

    if owner == None:
        raise APIException('Este dueño no existe', status_code=400)

    response_body = {
        'results': owner.serialize()
    }
    return jsonify(response_body), 200

