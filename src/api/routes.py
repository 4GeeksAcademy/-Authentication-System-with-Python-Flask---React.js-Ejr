
import os
from flask import Flask, request, jsonify, url_for, Blueprint, render_template
from api.models import db, User, Message, Inmueble, Imagen
from api.utils import generate_sitemap, APIException
from api.inmuebles_handler import Inmuebles_Handler
from api.publicar_handler import Publicar_Handler
from api.user_handler import User_Handler
import cloudinary
from cloudinary import uploader
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
# from mapbox import Geocoder;

api = Blueprint('api', __name__)

# create the object
consulta_inmuebles = Inmuebles_Handler()
user_handler = User_Handler()
publicar_inmuebles = Publicar_Handler()

#register new user
@api.route('/signup', methods=['POST'])
def sign_up():
    request_body = request.get_json()               #expected request body: {fullName: string, email: string, username: string, password: string}
    try:                                     
        response = user_handler.signup(request_body)
        return response
    except APIException as err:
        return jsonify(err.message), err.status_code


@api.route('/login', methods=['POST'])
def login():
    request_body = request.get_json()
    try:
        response = user_handler.login(request_body)
        return jsonify(response)
    except APIException as err:
        return jsonify(err.message), err.status_code



@api.route('/getmessages', methods=['GET'])
@jwt_required()
def get_messages():
    current_user_id = get_jwt_identity()
    response = user_handler.get_messages(current_user_id)
    return jsonify(response), 200


@api.route('/send-message', methods=['POST'])
def send_message():
    request_body = request.get_json()
    try:
        response = user_handler.send_message(request_body)
        return jsonify(response),200
    except APIException as err:
        return jsonify(err.message), err.status_code



@api.route('/getlistings', methods=['GET'])
@jwt_required()
def get_listings():
    current_user_id = get_jwt_identity()
    response = user_handler.get_listings(current_user_id)
    return jsonify(response), 200


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
    response = user_handler.edit_user(request_body, current_user_id)
    return jsonify(response), 200

@api.route('/delete', methods=['DELETE'])
@jwt_required()
def delete_user():
    current_user_id = get_jwt_identity()
    response = user_handler.delete_user(current_user_id)
    return jsonify(response), 200

@api.route('/properties', methods=['POST'])
def getInmuebles():

    # -------------- VALIDACION DEL BODY --------------------------------------------------------
    body_inmo = request.get_json()
    if body_inmo is None:
        raise APIException('error: body is empty', status_code=403)
    if body_inmo["operacion"]== "todas":
        raise APIException('error: operation was not selected', status_code=405)

    # # ------------- PROCESAMIENTO DEL REQUEST CON EXTRACCION DE LA BD--------------------------
    response = consulta_inmuebles.filterInmuebles(body_inmo)
    return response, 200

@api.route('/publicar', methods=['POST'])
def pubInmuebles():

    # -------------- VALIDACION DEL BODY --------------------------------------------------------
    body_request = request.get_json()
    fotos_request = list(body_request["fotos"])
    if body_request is None:
        raise APIException('error: body is empty', status_code=403)
    if body_request["pub_operacion"]== "todas":
        raise APIException('error: operation was not selected', status_code=405)

    # # ------------- PROCESAMIENTO DEL REQUEST CON EXTRACCION DE LA BD--------------------------
    response = publicar_inmuebles.registerInmuebles(body_request, fotos_request)
    
    return jsonify(response), 200