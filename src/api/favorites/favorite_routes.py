"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Electric, Acoustic, Classical, Favorites
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import CORS

favorite_bp = Blueprint('favorite', __name__)

# Allow CORS requests to this API
CORS(favorite_bp)


# Retrieve all user favorites
@favorite_bp.route('/user/favorites', methods=['GET'])
@jwt_required()
def get_all_favorites_of_user():
    email = get_jwt_identity()

    user_exists = User.query.filter_by(email=email).first()

    if user_exists is None: 
           return jsonify({"msg": "This user does not exist"}), 401

    # user_id = user_exists.id

    query_results = Favorites.query.all()

    # planet_exists = Planets.query.filter_by(id=planet_id).first()
    

    if query_results:
        results = list(map(lambda item: item.serialize(), query_results))
        print(results)
        return jsonify({"msg": "ok", "results": results}), 200
    
    else: 
        return jsonify({"msg": "this user has no favorites yet"}), 404
    

# Add favorite electric
@favorite_bp.route('/favorites/electric/<int:electric_id>', methods=['POST'])
@jwt_required()
def add_new_favorite_electric(electric_id):

    email = get_jwt_identity()
  

    user_exists = User.query.filter_by(email=email).first()

    if user_exists is None: 
           return jsonify({"msg": "This user does not exist"}), 401

    user_id = user_exists.id

    electric_exists = Electric.query.filter_by(id=electric_id).first()
    
    if electric_exists is None: 
           return jsonify({"msg": "This electric guitar does not exist"}), 401
    
    
    query_results = Favorites.query.filter_by(electric_id=electric_id, user_id=user_id).first()
    print(query_results)
    if query_results is None: 

            new_favorite = Favorites(electric_id=electric_id, user_id=user_id)
            new_electric = Electric.query.filter_by(id=electric_id).first()
            db.session.add(new_favorite)
            db.session.commit()

            response_body = {
                 "msg": "ok", 
                 "results": new_electric.serialize()
            }
            return jsonify(response_body), 200 

    else:
            return ({"msg": "this user already has this electric guitar as a favorite"}), 409


# Add favorite acoustic
@favorite_bp.route('/favorites/acoustic/<int:acoustic_id>', methods=['POST'])
@jwt_required()
def add_new_favorite_acoustic(acoustic_id):

    email = get_jwt_identity()
  

    user_exists = User.query.filter_by(email=email).first()

    if user_exists is None: 
           return jsonify({"msg": "This user does not exist"}), 401

    user_id = user_exists.id

    acoustic_exists = Electric.query.filter_by(id=acoustic_id).first()
    
    if acoustic_exists is None: 
           return jsonify({"msg": "This acoustic guitar does not exist"}), 401
    
    
    query_results = Favorites.query.filter_by(acoustic_id=acoustic_id, user_id=user_id).first()
    print(query_results)
    if query_results is None: 

            new_favorite = Favorites(acoustic_id=acoustic_id, user_id=user_id)
            new_acoustic = Acoustic.query.filter_by(id=acoustic_id).first()
            db.session.add(new_favorite)
            db.session.commit()

            response_body = {
                 "msg": "ok", 
                 "results": new_acoustic.serialize()
            }
            return jsonify(response_body), 200 

    else:
            return ({"msg": "this user already has this acoustic guitar as a favorite"}), 409
    

# Add favorite classical
@favorite_bp.route('/favorites/classical/<int:classical_id>', methods=['POST'])
@jwt_required()
def add_new_favorite_classical(classical_id):

    email = get_jwt_identity()
  

    user_exists = User.query.filter_by(email=email).first()

    if user_exists is None: 
           return jsonify({"msg": "This user does not exist"}), 401

    user_id = user_exists.id

    classical_exists = Classical.query.filter_by(id=classical_id).first()
    
    if classical_exists is None: 
           return jsonify({"msg": "This classical guitar does not exist"}), 401
    
    
    query_results = Favorites.query.filter_by(classical_id=classical_id, user_id=user_id).first()
    print(query_results)
    if query_results is None: 

            new_favorite = Favorites(classical_id=classical_id, user_id=user_id)
            new_classical = Classical.query.filter_by(id=classical_id).first()
            db.session.add(new_favorite)
            db.session.commit()

            response_body = {
                 "msg": "ok", 
                 "results": new_classical.serialize()
            }
            return jsonify(response_body), 200 

    else:
            return ({"msg": "this user already has this classical guitar as a favorite"}), 409
    

@favorite_bp.route('/favorites/<int:favorite_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite(favorite_id):
    email = get_jwt_identity()

    user_exists = User.query.filter_by(email=email).first()
    if user_exists is None: 
            return jsonify({"msg": "this user does not exist"})
    
    user_id = user_exists.id

    favorite_exists = Favorites.query.filter_by(id=favorite_id).first()
    if favorite_exists is None: 
            return jsonify({"msg": "this favorite does not exist"})
    

    query_results = Favorites.query.filter_by(id=favorite_id, user_id=user_id).first()

    if query_results: 
         
            db.session.delete(query_results)
            db.session.commit()
            return ({"msg": "ok, its deleted"}), 200

    else: 

           return ({"msg": "there is nothing to delete"}), 200