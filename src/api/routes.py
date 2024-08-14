"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
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

@api.route('/itineraries', methods=['GET'])
def get_itineraries():
    itineraries = Itinerary.query.all()
    itineraries = [itinerary.serialize() for itinerary in itineraries]
    if not itineraries:
        return jsonify({'msg': 'Data not found'}), 404

    return jsonify({'msg' : 'ok',
                    'itineraries': itineraries}), 200

@api.route('/itineraries/<int:id>', methods=['GET'])
def get_single_itinerary(id):
    itinerary = Itinerary.query.get(id)

    if not itinerary:
        return jsonify({'msg': 'Data not found'}), 404
    
    itinerary = itinerary.serialize()

    return jsonify({'msg': 'ok',
                    'itinerary': itinerary}), 200

@api.route('/itineraries', methods=['POST'])
def create_itinerary():
    data = request.json

    required_fields = ['author_id', 'title', 'description', 'duration', 'itinerary']
    missing_fields = [field for field in required_fields if field not in data or not data[field]]

    if missing_fields:
        return jsonify({'msg': f'Missing fields: {", ".join(missing_fields)}'}), 400

    new_itinerary = Itinerary(
        author_id = data['author_id'],
        title = data['title'].strip(),
        description = data['description'].strip(),
        duration = data['duration'],
        itinerary = data['itinerary'],
        images = data['images']
    )

    db.session.add(new_itinerary)
    db.session.commit()

    return jsonify({'msg': 'Itinerary created succesfully'}), 201
