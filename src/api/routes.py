"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Pyme, TiposUsuario, Provincias, Cantones, TiposServicio
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route('/pymeprovincia', methods=['GET'])
def pyme_provincia():
    provinciaID = request.json.get("provinciaID", None)
    
    provinciasQuery = Pyme.query.filter_by(id_provincia=provinciaID)

    provincias = list(map(lambda x: x.serialize(), provinciasQuery))

    return jsonify(provincias), 200

@api.route('/pyme', methods=['GET'])
def pyme():

    pymeID = request.json.get("pymeID", None)
    
    pymesQuery = Pyme.query.filter_by(id=pymeID)

    pyme = list(map(lambda x: x.serialize(), pymesQuery))

    return jsonify(pyme), 200

@api.route('/provincia', methods=['GET'])
def provincia():

    provinciaID = request.json.get("provinciaID", None)
    
    provinciaQuery = Provincias.query.filter_by(id=provinciaID)

    provincia = list(map(lambda x: x.serialize(), provinciaQuery))

    return jsonify(provincia), 200

@api.route('/canton', methods=['GET'])
def canton():

    cantonID = request.json.get("cantonID", None)
    
    cantonQuery = Cantones.query.filter_by(id=cantonID)

    canton = list(map(lambda x: x.serialize(), cantonQuery))

    return jsonify(canton), 200

@api.route('/tiposservicio', methods=['GET'])
def tiposservicio():

    tiposservicioID = request.json.get("tiposservicioID", None)
    
    tiposservicioQuery = TiposServicio.query.filter_by(id=tiposservicioID)

    tiposservicio = list(map(lambda x: x.serialize(), tiposservicioQuery))

    return jsonify(tiposservicio), 200

@api.route('/provincias', methods=['GET'])
def provincias():

    provinciasQuery = Provincias.query.all()
    
    provincias = list(map(lambda x: x.serialize(), provinciasQuery))

    return jsonify(provincias), 200