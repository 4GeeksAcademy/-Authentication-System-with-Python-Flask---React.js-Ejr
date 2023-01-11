"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)

usersTable = [
        {
        "ID": "US-001",  "NAME": "Santino Cuevas", "RUT": "22.354.650-9", "PREVISION": "SD-001", "EMAIL": "santino.cuevas@gmail.com", "PASSWORD": "451cd6541w681f"
    },
    {
        "ID": "US-002",  "NAME": "Pablo Escovar", "RUT": "17.801.666-6", "PREVISION": "SD-002", "EMAIL": "pablo.escovar@gmail.com", "PASSWORD": "Dnfur651g81"
    }
    ]


@api.route('/mediGeeks/users/', methods=['POST', 'GET'])
def first_triasl():
    
    return jsonify(usersTable), 200

@api.route('/mediGeeks/users/trial', methods=['POST', 'GET'])
def second_triasl():
    
    if (request.method == "POST"):
        request_body = request.json
        usersTable.append(request_body)
    return jsonify(usersTable), 200
