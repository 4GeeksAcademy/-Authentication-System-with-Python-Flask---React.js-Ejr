"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Electric, Favorites
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

favorite_bp = Blueprint('favorite', __name__)

# Allow CORS requests to this API
CORS(favorite_bp)


####### OBTENER TODOS LOS FAVORITOS DE UN USUARIO ######
@favorite_bp.route('/user/favorites', methods=['GET'])
# @jwt_required()
def get_all_favorites_of_user():
    # email = get_jwt_identity()

    # user_exists = User.query.filter_by(email=email).first()

    # if user_exists is None: 
    #        return jsonify({"msg": "This user does not exist"}), 401

    # user_id = user_exists.id

    query_results = Favorites.query.all()

    # planet_exists = Planets.query.filter_by(id=planet_id).first()
    

    if query_results:
        results = list(map(lambda item: item.serialize(), query_results))
        print(results)
        return jsonify({"msg": "ok", "results": results}), 200
    
    else: 
        return jsonify({"msg": "this user has no favorites yet"}), 404