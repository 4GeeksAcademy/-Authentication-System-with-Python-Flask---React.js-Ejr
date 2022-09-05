"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Inmueble, Imagen, Message
from api.utils import generate_sitemap, APIException
from api.inmuebles_handler import Inmuebles_Handler

api = Blueprint('api', __name__)

# create the object
consulta_inmuebles = Inmuebles_Handler()

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