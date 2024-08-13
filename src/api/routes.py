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
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(users), 200

@api.route('/user/<int:id>', methods=['POST', 'GET', 'DELETE', 'PATCH'])
def one_user(req, id):     
    if req.method =='POST':
        #add a user into database
        if req.body.user_name and req.body.password:
            #IF USER NAME ALREADY EXISTS THEN RETURN "USERNAME ALREADY EXISTS", 400 SOMETHING RESEARCH @TODO
            #IF PASSWORD IS INCORRECT THEN RETURN "PASSWORD IS INCORRECT", 400 SOMETHING @TODO
            return jsonify("User Has Been Created."), 200
        else:
            return jsonify("Please use valid Email/Password"), 405
    elif req.method == 'GET':
            get_user = User.query.filter_by(id = id).first() #.first returns the first encounter of that id
            return jsonify(get_user), 200
    elif req.method == 'DELETE':
            delete_user= User.query.filter_by(id = id).delete()
            return jsonify(delete_user), 200
    #elif req.method == 'PATCH':
        #edits individual user
            #return  

# @api.route('/games', methods=['GET'])        
# def all_games():

#     req.body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(req.body), 200