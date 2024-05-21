"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Electric, Acoustic, Classical
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

guitar_bp = Blueprint('guitar', __name__)

# Allow CORS requests to this API
CORS(guitar_bp)

# Retrieve all electric guitars
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

# Retrieve all acoustic guitars
@guitar_bp.route('/acoustic-guitars', methods=['GET'])
def get_acoustic_guitars():
    query_results = Acoustic.query.all()
    results = list(map(lambda item: item.serialize(), query_results))

    if results == []:
        return jsonify("no acoustic guitars in the database"), 404
    
    response_body = {
        "msg": "ok",
        "results": results
    }
    
    return jsonify(response_body), 200

# Retrieve all classical guitars
@guitar_bp.route('/classical-guitars', methods=['GET'])
def get_classical_guitars():
    query_results = Classical.query.all()
    results = list(map(lambda item: item.serialize(), query_results))

    if results == []:
        return jsonify("no classical guitars in the database"), 404
    
    response_body = {
        "msg": "ok",
        "results": results
    }
    
    return jsonify(response_body), 200

# Retrieve a specific electric guitar model with dynamic URL
@guitar_bp.route('/electric/<int:electric_id>', methods=['GET'])
def get_one_electric(electric_id):

    query_result = Electric.query.filter_by(id=electric_id).first()
    if query_result is None:
        return jsonify({"msg": "there is no electric guitar matching the ID provided"}), 404
    
    response_body = {
        "msg": "ok",
        "id": query_result.id,
        "results": query_result.serialize()
    }
    return jsonify(response_body), 200

# Retrieve a specific acoustic guitar model with dynamic URL
@guitar_bp.route('/acoustic/<int:acoustic_id>', methods=['GET'])
def get_one_acoustic(acoustic_id):

    query_result = Electric.query.filter_by(id=acoustic_id).first()
    if query_result is None:
        return jsonify({"msg": "there is no acoustic guitar matching the ID provided"}), 404
    
    response_body = {
        "msg": "ok",
        "id": query_result.id,
        "results": query_result.serialize()
    }
    return jsonify(response_body), 200

# Retrieve a specific classical guitar model with dynamic URL
@guitar_bp.route('/classical/<int:classical_id>', methods=['GET'])
def get_one_classical(classical_id):

    query_result = Electric.query.filter_by(id=classical_id).first()
    if query_result is None:
        return jsonify({"msg": "there is no classical guitar matching the ID provided"}), 404
    
    response_body = {
        "msg": "ok",
        "id": query_result.id,
        "results": query_result.serialize()
    }
    return jsonify(response_body), 200

# Create new guitar
@guitar_bp.route('/new-electric-guitar', methods=['POST'])
def add_new_electric_guitar():
    data = request.json

    electric_exists = Electric.query.filter_by(model=data["model"]).first()
    
    if electric_exists is None: 

            new_electric_guitar = Electric(
                model=data["model"], 
                color=data["color"], 
                image=data["image"], 
                manufacturer=data["manufacturer"], 
                pickups=data["pickups"], 
                price=data["price"], 
                scale=data["scale"], 
                )
            db.session.add(new_electric_guitar)
            db.session.commit()
            return ({"msg": "ok, a new electric guitar has been added to the database"}), 200

       

    else:
            return ({"msg": "this electric guitar is already included in the database"}), 409