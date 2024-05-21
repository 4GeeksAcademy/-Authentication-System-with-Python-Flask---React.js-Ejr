"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Electric
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

guitar_bp = Blueprint('guitar', __name__)

# Allow CORS requests to this API
CORS(guitar_bp)


# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200

@guitar_bp.route('/electric-guitars', methods=['GET'])
def get_electric_guitars():
    query_results = Electric.query.all()
    results = list(map(lambda item: item.serialize(), query_results))

    if results == []:
        return jsonify("no electric guitars in the database"), 404
    
    response_body = {
        "msg": "ok",
        "results": results
    }
    
    return jsonify(response_body), 200