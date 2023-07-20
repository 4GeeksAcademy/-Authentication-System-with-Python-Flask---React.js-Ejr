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

from flask import Flask, request, jsonify

app = Flask(__name__)


destinations_data = [
    {'id': 1, 'name': 'New York City', 'country': 'United States', 'description': 'The city that never sleeps'},
    {'id': 2, 'name': 'Paris', 'country': 'France', 'description': 'The city of love and lights'},
    {'id': 3, 'name': 'Tokyo', 'country': 'Japan', 'description': 'A vibrant and futuristic metropolis'}
]

@app.route('/api/destinations', methods=['GET'])
def search_destinations():
    search_query = request.args.get('query')

    if not search_query:
        return jsonify({'error': 'Please provide a search query.'}), 400

    
    matching_destinations = [
        destination for destination in destinations_data
        if search_query.lower() in destination['name'].lower()
    ]

    return jsonify({'results': matching_destinations}), 200

@app.route('/api/destination/<int:destination_id>', methods=['GET'])
def get_destination(destination_id):
    
    destination = next((d for d in destinations_data if d['id'] == destination_id), None)

    if not destination:
        return jsonify({'error': 'Destination not found.'}), 404

    return jsonify(destination), 200

@app.route('/api/destinations', methods=['POST'])
def save_destination():
    data = request.get_json()
    name = data.get('name')
    country = data.get('country')
    description = data.get('description')

    if not name or not country:
        return jsonify({'error': 'Name and country are required fields.'}), 400

    
    new_destination_id = max(d['id'] for d in destinations_data) + 1

    new_destination = {
        'id': new_destination_id,
        'name': name,
        'country': country,
        'description': description
    }

    destinations_data.append(new_destination)

    return jsonify({'message': 'Destination saved successfully.', 'new_destination': new_destination}), 201

if __name__ == '__main__':
    app.run()
