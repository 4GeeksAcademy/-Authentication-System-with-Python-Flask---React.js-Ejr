"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint, abort
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route("/token", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


@api.route('/user', methods=['GET'])
def get_users():

    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200


@api.route('/user/<string:item_id>', methods=['GET'])
def get_user(item_id):

    user = User.query.get(item_id)
    if user is None:
        abort(404)
    return jsonify(user.serialize()), 200


@api.route('/user', methods=['POST'])
def create_user():

    newUser = User(email=request.json["email"],
                   password=request.json["password"],
                   name=request.json["name"],
                   lastname=request.json["lastname"]
                   )
    db.session.add(newUser)
    db.session.commit()

    return jsonify(newUser.serialize())
