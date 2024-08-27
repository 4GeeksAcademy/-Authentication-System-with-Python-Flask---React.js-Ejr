"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Game, Favorite
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, JWTManager

api = Blueprint('api', __name__)



@api.route('/users', methods=['GET'])
def all_users():
    users = User.query.all()
    response_body = list(map(lambda user: user.serialize(), users ))

    #lambda user: user.serialize()

    # Python does it from the end to beginning kind of
    # Serialization refers to the process of converting a data object (e.g., Python objects, Tensorflow models) into a format that allows us to store or transmit the data and then recreate the object when needed using the reverse process of deserialization.
    #lambda is the same as keyword function or in python we say def myFunction
    #What follows after is the same as a paramater in this ex: user
    #list function is turning it into an array [my records are inside of here]
    #map function is iterating through every single record from our users variable that we queried from our database

    return jsonify(response_body), 200

@api.route('/edit-user', methods=['PATCH'])
@jwt_required()
def edit_user():
    """
    Edits the currently logged-in user.
    Request Body:
    {
    email: String (optional)
    password: String (optional)
    name: String (optional)
    }
    """
    #python convention called a doc string
    # get_jwt_identity() grabs the id out of the JWT (this is set on line 69)
    current_user = get_jwt_identity()
    # We take that ID, and grab the user from the database.
    edit_user = User.query.filter_by(id = current_user).first()

    # For each of email, name, and password we see if that exists in the request body,
    # and if it does, we overwrite that on the edit_user object.
    edit_user.email = request.json.get("email", edit_user.email) #The default says that if the key doesn't exist in the object then default to the original
    edit_user.name = request.json.get("name", edit_user.name)
    edit_user.password = request.json.get("password", edit_user.password)

    # Now we take the edited user object, and merge the changes back into the database.
    db.session.merge(edit_user) #merge tells the database session you want to exist and merge into the DB
    db.session.commit()
    # Finally, we refresh the user object, serialize it, and send it back to the frontend with changes.
    db.session.refresh(edit_user)
    return jsonify(edit_user.serialize()), 200

 
    # elif req.method == 'GET':
    #         get_user = User.query.filter_by(id = id).first() #.first returns the first encounter of that id
    #         return jsonify(get_user), 200


@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    if None in [email,password]:
        return jsonify("Please provide valid credentials"), 400
    user = User.query.filter_by(email = email, password = password).first()
    if user is None:
         return jsonify("Username NOT found"), 404
    # if user doesn't exist we need to return a message saying the information is wrong and a 400 response

    token = create_access_token(identity = user.id)
    return jsonify({"user_email": user.email, "token": token})

@api.route('/user', methods=['GET']) #THIS WILL BE A PRIVATE ROUTE TO RENDER USER'S INFORMATION AS WELL AS SAVED GAMES
@jwt_required()
def get_user():
    current_user = get_jwt_identity()
    get_user = User.query.filter_by(id=current_user).first()
    
    return jsonify(get_user.serialize()), 200

@api.route('/user-delete', methods=['DELETE'])
@jwt_required()
def delete_user():
    current_user = get_jwt_identity()
    delete_user = User.query.filter_by(id = current_user).first()
    db.session.delete(delete_user)
    db.session.commit()
    return "", 204



@api.route('/signup', methods=['POST'])
def sign_up():
    req_email = request.json.get('email', None)
    req_password = request.json.get('password', None)
    req_name = request.json.get('name', None)

    if "@" not in req_email:
        return jsonify("Please enter a valid email"), 400
    if len(req_password) < 8:
        return jsonify("Password must be 8 characters long")

    already_exists = User.query.filter_by(email = req_email).first() # return either None or a User
    
    if already_exists: 
        return jsonify("User already exists"), 403
    else:
        new_user = User(email = req_email, password = req_password, name = req_name, is_active = True)
        db.session.add(new_user)
        db.session.commit()
        return jsonify("New User created"), 200
    # {
    #     "nam": "Andres",
    #     "password": "123456789",
    #     "email": 'andres@gmail.com'
    # } 

@api.route('/favorites', methods=['POST'])
@jwt_required()
def add_favorite_game():
    current_user = get_jwt_identity()
    get_user = User.query.filter_by(id = current_user).first()
    #find what game the user is trying to add as their favorite
    #create a variable that with grab the id from the request body and assign it to a game in our model
    req_game_id = request.json.get('game_id', None)
    if req_game_id is None:
        return jsonify("Please, provide a valid game id"),400
    game = Game.query.filter_by(id = req_game_id).first()
    if game is None:
        return jsonify("Game not found"),404
    # game = {
        #     "id" : 1,
        #     "name": "Andres Games",
        #     "category": "Out of category for me"
        #   }
    #merging 3 models User, Game, Favorite
    new_favorite_game = Favorite(game_id = game.id, user_id = get_user.id)
    db.session.add(new_favorite_game)
    db.session.commit()
    return jsonify({"added_favorite" : new_favorite_game.serialize()}),200

# EXAMPLE OF REQUEST STRUCTURE BEING SENT TO THIS ENDPOINT
    # {
    #     "game_id": "2"
    # }
@api.route('/favorite_delete', methods=['DELETE'])
@jwt_required()
def delete_favorite():
    current_user = get_jwt_identity()
    favorite_id= request.json.get("favorite_id")
    if favorite_id is None:
        return jsonify("Please, provide a valid game id"),400
    delete_favorite= Favorite.query.filter_by(id = favorite_id, user_id = current_user).first()
    db.session.delete(delete_favorite)
    db.session.commit()
    return "", 204

@api.route('/games', methods=['GET'])
def all_games():
    games = Game.query.all()
    response_body = list(map(lambda game: game.serialize(), games ))

    return jsonify(response_body), 200





















# {'email': andres@test.com, 'password': "notmyactual" }
# 
# 
# fetchGames: () => {
#   fetch('https://obscure-telegram-jjrp5j7x5px4cqpgj-3001.app.github.dev/games', methods=['GET'])
#       .then((res) => res.json())
#       .then((data) => {
            # if (data.category === "action") {setStore({actionGames : [store.actionGames, ...data.game]})}
            # else if (data.category === "rpg") {}
# })
# }
