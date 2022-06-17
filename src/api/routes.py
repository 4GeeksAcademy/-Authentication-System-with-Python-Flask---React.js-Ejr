"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Influencers, Empresas, Favoritos
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/registro-empresas', methods=['POST'])
def registro_empresas():
    
    body = request.get_json()
    email_exists = Empresas.query.filter_by(email=body["email"])
    email_exists = list(map(lambda x: x.serialize(), email_exists))

    if email_exists:
        print("This user already exists")
    else:
        empresas = Empresas(email=body["email"], password=body["password"], apellidos=body["apellidos"], nombre=body["nombre"], razon_social=body["razon_social"], sector=body["sector"], pais = body["pais"], ciudad = body["ciudad"], bio = body["bio"])    
        db.session.add(empresas)
        db.session.commit()
    
    print("POST recibido")
    response_body = {
        "message": "User created"
    }

    return jsonify(response_body), 200

@api.route('/registro-influencers', methods=['POST'])
def registro_influencers():
    
    body = request.get_json()
    email_exists = Influencers.query.filter_by(email=body["email"])
    email_exists = list(map(lambda x: x.serialize(), email_exists))

    if email_exists:
        print("This user already exists")
    else:
        influencers = Influencers(email=body["email"], password=body["password"], apellidos=body["apellidos"], nombre=body["nombre"], ig_user=body["ig_user"], categoria=body["categoria"], pais = body["pais"], ciudad = body["ciudad"], bio = body["bio"])    
        db.session.add(influencers)
        db.session.commit()
    
    print("POST recibido")
    response_body = {
        "message": "User created"
    }

    return jsonify(response_body), 200