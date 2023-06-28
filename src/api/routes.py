"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
import pandas as pd


api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('car-brands', methods=['GET'])
def get_car_brands():
    cars_data = pd.read_csv('/workspaces/Watacar_v2/src/api/brands-and-models/cars-2020.csv')
    brands = cars_data['make'].unique().tolist()
    return jsonify(brands)

@api.route('car-models', methods=['GET'])
def get_car_models():
    cars_data = pd.read_csv('/workspaces/Watacar_v2/src/api/brands-and-models/cars-2020.csv')
    models = cars_data['model'].unique().tolist()
    return jsonify(models)


@api.route('moto-brands', methods=['GET'])
def get_moto_brands():
    moto_data = pd.read_csv('/workspaces/Watacar_v2/src/api/brands-and-models/motorcycles-2020.csv')
    brands = moto_data['Make'].unique().tolist()
    return jsonify(brands)

@api.route('moto-models', methods=['GET'])
def get_moto_models():
    moto_data = pd.read_csv('/workspaces/Watacar_v2/src/api/brands-and-models/motorcycles-2020.csv')
    models = moto_data['Model'].unique().tolist()
    return jsonify(models)