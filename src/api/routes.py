"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Baby
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#[GET] Listar todos los bebes que hay en la base de datos.
@api.route('/all_babies', methods=['GET'])
def get_all_babies():
    bebe = Baby.query.all()
    aux = list(map(lambda x: x.serialize(), bebe))
    return jsonify({'msg': 'OK', 'data': aux}), 200   

#[GET] Muestra la información de un solo bebe según su id.
@api.route('/one_baby/<int:id>', methods=['GET'])
def get_one_baby(id):
    bebe = Baby.query.get(id)
    return jsonify({'msg': 'OK', 'bebe': bebe.serialize()}), 200

#[GET] Muestra la información de un solo bebe según su nombre.
@api.route('/one_baby_by_name/<string:name>', methods=['GET'])
def get_one_baby_by_name(name):
    baby=Baby.query.filter_by(name=name).first()
    if baby is None:
        return jsonify({'msg': 'Baby not found'}), 404
    return jsonify({'msg': 'OK', 'data': baby.serialize()}), 200

#[PUT] Editar los datos de un bebe
@api.route('/edit_baby/<int:id>', methods=['PUT'])
def edit_baby(id):
    baby = Baby.query.get(id)
    if baby is None:
        return jsonify({'msg': 'Baby not found'}), 404
        
    data = request.json
    baby.name = data['name']
    baby.gender = data['gender']
    baby.age = data['age']
    baby.height = data['height']
    baby.weigth = data['weigth']
    #baby.avatar_path = data['avatar_path']

    db.session.commit()
    return jsonify({'msg': 'Datos del bebe editado', 'data': baby.serialize()}), 200    
    
