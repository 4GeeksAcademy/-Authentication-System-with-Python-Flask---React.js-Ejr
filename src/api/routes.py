"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
#import os
from flask import Flask, request, jsonify, url_for, Blueprint, json
from api.models import db, User, Playa, Montana, Mi_pasaporte
from api.utils import generate_sitemap, APIException
#from flask_swagger import swagger
#from flask_cors import CORS
#from admin import setup_admin
import datetime
#from werkzeug.security import generate_password_hash, check_password_hash
#from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)
#CORS(api)
#jwt = JWTManager(api)

@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    list_users = list(map(lambda x: x.serialize(), users))
    return jsonify(list_users), 200