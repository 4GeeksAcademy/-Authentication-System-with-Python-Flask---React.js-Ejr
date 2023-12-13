"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Patient, Specialist
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/patient_signup', methods=['POST', 'GET'])
def handle_hello():
    try:
        first_name = request.json.get('first_name')
        last_name = request.json.get('last_name')
        email = request.json.get('email')
        password = request.json.get('password')

    except Exception as error:
        return jsonify({"error": "Error in user creation" + str(error)}), 500

    response_body = {
        "message": "Patient creation success" 
    }

    return jsonify(response_body), 200
