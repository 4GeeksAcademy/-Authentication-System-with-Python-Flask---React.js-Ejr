"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)

usersTable = [
        {
        "ID": "US-001",  "NAME": "Santino Cuevas", "RUT": "22.354.650-9", "ID PREVISION": "SD-001", "EMAIL": "santino.cuevas@gmail.com", "PASSWORD": "451cd6541w681f"
    },
    {
        "ID": "US-002",  "NAME": "Pablo Escovar", "RUT": "17.801.666-6", "ID PREVISION": "SD-002", "EMAIL": "pablo.escovar@gmail.com", "PASSWORD": "Dnfur651g81"
    }
    ]

doctorsTable = [
        {
        "ID": "MD-001",  "NAME": "Alberto Contreras", "RUT": "12.548.575-2", "ID ESPECIALIDAD": "SP-001", "EMAIL": "alberto.contreras@gmail.com", "PASSWORD": "zvb65168186"
    },
    {
        "ID": "MD-002",  "NAME": "Dolores Fuertes", "RUT": "11.522.222-0", "ID ESPECIALIDAD": "SP-002", "EMAIL": "dolores.fuertes@gmail.com", "PASSWORD": "fwewfe54684"
    }
    ]

@api.route('/mediGeeks/users/<user_id>', methods=['GET'])
def users_trials(user_id):
    
    print(user_id)
    for user in usersTable: 
        if user["ID"] == user_id:
           return jsonify(user), 200 

    return "Usuario no existe", 404

@api.route('/mediGeeks/doctors', methods=['POST', 'GET'])
def doctor_trials():
    
    if (request.method == "POST"):
        request_body = request.json
        doctorsTable.append(request_body)  
    return jsonify(doctorsTable), 200
