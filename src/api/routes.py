"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Game, Favorite
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


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

@api.route('/user/<int:id>', methods=['POST', 'GET', 'DELETE', 'PATCH'])
def one_user(req, id):     
    if req.method =='POST':
        #add a user into database
        if req.body.name and req.body.email and req.body.password:
            #IF USER NAME ALREADY EXISTS THEN RETURN "USERNAME ALREADY EXISTS", 400 SOMETHING RESEARCH @TODO
            #IF len() THEN RETURN "PASSWORD IS INCORRECT", 400 SOMETHING @TODO
            db.session.add(one_user)
            db.session.commit()
            return jsonify("User Has Been Created."), 200
        else:
            return jsonify("Please use valid Email/Password"), 405
        
    elif req.method == 'GET':
            get_user = User.query.filter_by(id = id).first() #.first returns the first encounter of that id
            return jsonify(get_user), 200
    

    elif req.method == 'DELETE':
            delete_user= User.query.filter_by(id = id).delete()
            return jsonify(delete_user), 200
    #elif req.method == 'PUT':
            #edit_user = User.query.filter_by(id = id)
              

# @api.route('/games', methods=['GET'])        
# def all_games():

#     req.body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(req.body), 200

@api.route('/login', methods=['POST'])
def login():
     email = request.json.get('email', None)
     login = request.json.get('password', None)

# @api.route('/signup', methods=['POST'])

# @api.route('/favorites', methods=['POST'])

# @api.route('/games)
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
