"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Beer
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/search_beers', methods=['GET'])
def search_beers():
    query = request.args.get('query', '')
    if not query:
        return jsonify([]), 404 #Agregar codigo de estado

    results = Beer.query.filter(Beer.name.ilike(f'%{query}%')).all()
    #Agregar este chequeo
    if results == []: 
        return jsonify({"msg": "No existen cervezas"}), 404 

    beers = [{
        "id": beer.id,
        "name": beer.name,
        "bjcp_style": beer.bjcp_style,
        "IBUs": beer.IBUs,
        "volALC": beer.volALC,
        "description": beer.description,
        "picture_of_beer_url": beer.picture_of_beer_url
    } for beer in results]

    return jsonify(beers), 200
