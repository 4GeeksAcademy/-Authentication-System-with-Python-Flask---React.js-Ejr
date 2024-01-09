"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Videogame
from api.utils import generate_sitemap, APIException
from flask_cors import CORS


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# TEST ROUTE
@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# GET ALL Videogames
@api.route('/videogames', methods=['GET'])
def get_all_Videogame():
    videogame = Videogame.query.all()
    if len(videogame) < 1:
        return jsonify({"msg": "not found"}), 404
    
    response_body = list(map(lambda item: item.serialize(), get_all_Videogame))
    
    return jsonify(response_body), 200

# CREATE VIDEOJUEGO
@api.route('/Videogame', methods=['POST'])
def save_videogame(videogame_id):
    name = request.json.get("name" ,None)
    pegi = request.json.get("pegi" ,None)
    year = request.json.get("year" ,None)

    new_videogame = Videogame(videogame_id = videogame_id)
    db.session.add(new_videogame)
    db.session.commit()

    return jsonify("Videojuego created"), 200