"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Influencers, Empresas, Favoritos
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/influencers/<int:id>', methods=['GET'])
def conseguir_influencers(id):
    influencer = Influencers.query.get(id)
    if influencer:
        return influencer.serialize()
    else:
        return jsonify({"mensaje":"usuario no existente"})

@api.route('/influencers/<int:id>', methods=['PUT'])
def modificar_influencers(id):
    influencer = Influencers.query.get(id)
    body = request.get_json()
    influencer.nombre = body["nombre"]
    influencer.email = body["email"]
    influencer.password = body["password"]
    influencer.apellidos = body["apellidos"]
    influencer.ig_user = body["ig_user"]
    influencer.categoria = body["categoria"]
    influencer.autonomia = body["autonomia"]
    influencer.ciudad = body["ciudad"]
    influencer.bio = body["bio"]
    if "post1" in body:
        influencer.post1 = body["post1"]
    if "post2" in body:
        influencer.post2 = body["post2"]
    if "post3" in body:
        influencer.post3 = body["post3"]
    if "post4" in body:
        influencer.post4 = body["post4"]
    if "post5" in body:
        influencer.post5 = body["post5"]
    if "post6" in body:
        influencer.post6 = body["post6"]
    db.session.commit()

    return jsonify({"message":"Informacion actualizada"})

@api.route('/empresas/<int:id>', methods=['GET'])
def conseguir_empresas(id):
    empresas = Empresas.query.get(id)
    if empresas:
        return empresas.serialize()
    else:
        return jsonify({"mensaje":"usuario no existente"})

@api.route('/empresas/<int:id>', methods=['PUT'])
def modificar_empresas(id):
    empresas = Empresas.query.get(id)
    body = request.get_json()
    empresas.nombre = body["nombre"]
    empresas.email = body["email"]
    empresas.password = body["password"]
    empresas.apellidos = body["apellidos"]
    empresas.razon_social = body["razon_social"]
    empresas.sector = body["sector"]
    empresas.autonomia = body["autonomia"]
    empresas.ciudad = body["ciudad"]
    empresas.bio = body["bio"]
    db.session.commit()

    return jsonify({"message":"Informacion actualizada"})

@api.route('/registro-empresas', methods=['POST'])
def registro_empresas():
    
    body = request.get_json()
    email_exists = Empresas.query.filter_by(email=body["email"])
    email_exists = list(map(lambda x: x.serialize(), email_exists))

    if email_exists:
        print("This user already exists")
    else:
        empresas = Empresas(email=body["email"], password=body["password"], apellidos=body["apellidos"], nombre=body["nombre"], razon_social=body["razon_social"], sector=body["sector"], autonomia = body["autonomia"], ciudad = body["ciudad"], bio = body["bio"])    
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
        influencers = Influencers(email=body["email"], password=body["password"], apellidos=body["apellidos"], nombre=body["nombre"], ig_user=body["ig_user"], categoria=body["categoria"], autonomia = body["autonomia"], ciudad = body["ciudad"], bio = body["bio"],post1=body["post1"])
        if "post2" in body:
            influencers.post2 = body["post2"]
        if "post3" in body:
            influencers.post3 = body["post3"]
        if "post4" in body:
            influencers.post4 = body["post4"]
        if "post5" in body:
            influencers.post5 = body["post5"]
        if "post6" in body:
            influencers.post6 = body["post6"]
        db.session.add(influencers)
        db.session.commit()
    
    print("POST recibido")
    response_body = {
        "message": "User created"
    }

    return jsonify(response_body), 200