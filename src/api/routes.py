"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Pyme
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route('/pymeprovincia', methods=['GET'])
def pyme_provincia():
    provinciaID = request.json.get("provinciaID", None)
    
    provincias = Pyme.query.filter_by(id_provincia=provinciaID)

    provincia = list(map(lambda x: x.serialize(), provincias))

    return jsonify(provincia), 200

@api.route('/pyme', methods=['GET'])
def pyme():

    pymeID = request.json.get("pymeID", None)
    
    pymes = Pyme.query.filter_by(id=pymeID)

    pyme = list(map(lambda x: x.serialize(), pymes))

    return jsonify(pyme), 200