"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Game, Favorite_game, Friend_request, Friendship, Subscription, Session, Session_member
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy.sql import func
from flask_jwt_extended import JWTManager, create_access_token,jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt


api = Blueprint('api', __name__)

bcrypt = Bcrypt()
jwt = JWTManager()

# Allow CORS requests to this API
CORS(api)


""" GAME ENDPOINTS """

@api.route('/games_recommended/<int:number_games>', methods=['GET'])
def get_random_games(number_games):

    try:
        rows_count = db.session.query(func.count(Game.id)).scalar()
        if number_games > rows_count:
            return jsonify({"msg":"Your number of games requested is above the total number of games in our BD"}),400
        else:
            query_games = db.session.query(Game).order_by(func.random()).limit(number_games).all()
            serialize_games = [result.serialize() for result in query_games]        
            return jsonify(serialize_games),200       

    except Exception as err:   
        return jsonify({"error":"There was an unexpected error","msg":str(err)}),500

@api.route('/games/<int:id_game>', methods=['GET'])
def get_specific_game(id_game):

    try:
        query_game = db.session.query(Game).filter_by(id = id_game).first()
        if query_game is None:
            return jsonify({"msg":"There is no with that id"}),400    
        else:
            serialize_game = query_game.serialize()
            return jsonify(serialize_game),200

    except Exception as err:   
        return jsonify({"error":"There was an unexpected error","msg":str(err)}),500 

@api.route('/search_game', methods=['GET'])
def get_game_by_name():
    
    try:
        game_name = request.args.get("name")
        if game_name is None:
            return jsonify({"msg":"No game name was provided"}),400
        else:
            query_game = db.session.query(Game).filter(Game.name.ilike(f'%{game_name}%')).limit(4).all()
            serialize_game = [game.serialize() for game in query_game]
            return jsonify(serialize_game),200
    
    except Exception as err:
        return jsonify({"error":"There was an unexpected error","msg":str(err)}),500 

""" USER ENDPOINT """

@api.route("/users",methods=["POST"])

def post_new_user():
    data = request.get_json()
    required = {"username","email","password","first_name","last_name","age","discord_id","steam_id","schedule","description","region","gender","platform","type_game"}
    query_user = db.session.query(User).filter_by(username = data['username']).first()
    try:        
        for item in required:
            if item not in data or not data[item]:
                return jsonify({"msg":"Some required fields are missing or empty"}),400

        if query_user is not None:
            return jsonify({"msg":"User already exists"}),400

        else:            
            hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
            new_user = User(username = data["username"], email = data["email"],password = hashed_password, first_name = data["first_name"],last_name = data["last_name"], age = data["age"], discord_id = data["discord_id"], steam_id = data["steam_id"],schedule = data["schedule"], description = data["description"], region = data["region"], gender = data["gender"],platform = data["platform"], type_game = data["type_game"], user_type ="NORMAL")
            db.session.add(new_user)   
            db.session.commit()
            return jsonify({"msg":"User registered successfully"}),200        
       
    except Exception as err:
        return jsonify({"error":"There was an unexpected error","msg":str(err)}),500 













    

