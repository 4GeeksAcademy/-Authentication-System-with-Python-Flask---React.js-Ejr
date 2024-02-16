"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User , Evento
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import datetime

api = Blueprint('app', __name__)
# Allow CORS requests to this API
CORS(api)

# Setup the Flask-JWT-Extended extension



















# GET Mostrar todos los eventos proximos
@api.route('/events', methods=['GET'])
def get_users_attend_all_events():
    date = datetime.now()
    all_events = Evento.query.filter(Evento.fecha > date).all()
    results_events = list(map(lambda item: item.serialize(), all_events))
    
    response_body = {
        "msg": "Usuarios que asisten a todos los eventos",
        "results": results_events
    }

    return jsonify(response_body), 200


