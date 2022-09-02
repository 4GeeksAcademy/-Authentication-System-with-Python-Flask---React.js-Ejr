"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint, render_template
from api.models import db, User, Message, Inmueble, Imagen
from api.utils import generate_sitemap, APIException
import cloudinary
from cloudinary import uploader
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


#register new user
@api.route('/signup', methods=['POST'])
def sign_up():
    request_body = request.get_json()                                     #expected request body: {fullName: string, email: string, username: string, password: string}
    if request_body["username"].strip() == '' or request_body["password"].strip() == '' or request_body["fullName"].strip() == '' or request_body["email"].strip() == '':
        return jsonify('Error: empty field'), 400
    new_user = User(username = request_body["username"], password = request_body["password"], full_name = request_body["fullName"], email = request_body["email"])
    db.session.add(new_user)
    db.session.commit()
    return jsonify('User created'), 200



@api.route('/login', methods=['POST'])
def login():
    request_body = request.get_json()
    query = User.query.filter_by(username = request_body['username'], password = request_body['password']).first()
    if not query:
        return jsonify('Error: username not found'), 400
    user = query.serialize()
    access_token = create_access_token(identity=user['id'])
    response = {"access_token": access_token, "user":user}
    return jsonify(response), 200



@api.route('/getmessages', methods=['GET'])
@jwt_required()
def get_messages():
    current_user_id = get_jwt_identity()
    messages = list(Message.query.filter_by(recipient_id = current_user_id))
    response = []
    for message in messages:
        list_item = message.serialize()
        response.append(list_item)
    return jsonify(response)



@api.route('/getlistings', methods=['GET'])
@jwt_required()
def get_listings():
    current_user_id = get_jwt_identity()
    listings = list(Inmueble.query.filter_by(user_id = current_user_id))
    response = []
    for listing in listings:
        list_item = listing.serialize()
        response.append(list_item)
    return jsonify(response)


@api.route("/upload", methods=['POST'])
def upload_file():
  cloudinary.config(cloud_name = os.getenv('CLOUD_NAME'), api_key=os.getenv('API_KEY'), 
    api_secret=os.getenv('API_SECRET'))
  upload_result = None
  if request.method == 'POST':
    file_to_upload = request.files['file']
    if file_to_upload:
      upload_result = cloudinary.uploader.upload(file_to_upload, folder = "luxury-estate")
    return jsonify(upload_result)


@api.route('/update', methods=['POST'])
@jwt_required()
def edit_user():
    current_user_id = get_jwt_identity()
    request_body = request.get_json()
    user = User.query.filter_by(id = current_user_id).first()
    updated = False
    if len(request_body["full_name"].strip()) != 0 and user.username != request_body["full_name"]:
        user.full_name = request_body["full_name"]
        updated = True
    if len(request_body["email"].strip()) != 0 and user.username != request_body["email"]:
        user.email = request_body["email"]
        updated = True
    if len(request_body["password"].strip()) != 0 and user.username != request_body["password"]:
        user.password = request_body["password"]
        updated = True
    if updated:
        db.session.commit()
        return jsonify("Updated user succesfully"), 200
    return jsonify("Nothing to update"), 200