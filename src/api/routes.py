"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask import current_app
from api.models import db, User, Pyme, TiposUsuario, Provincias, Cantones, TiposServicio
from api.utils import generate_sitemap, APIException

from werkzeug.security import generate_password_hash, check_password_hash       ## Nos permite manejar tokens por authentication (usuarios)    
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity   #from models import Person
import datetime

import jwt
#from flask import current_app

api = Blueprint('api', __name__)

#api = Flask(__name__)
#app.config["MONGO_URI"] = "mongodb://localhost:27017/testdb"

#jwt = JWTManager(api)

#jwt = JWTManager(api)

#def app_context():
#    with app.app_context():
#        yield

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route('/pymeprovincia', methods=['POST'])
def pyme_provincia():
    provinciaID = request.json.get("provinciaID", None)
    
    provinciasQuery = Pyme.query.filter_by(id_provincia=provinciaID)

    provincias = list(map(lambda x: x.serialize(), provinciasQuery))

    return jsonify(provincias), 200

@api.route('/pyme', methods=['POST'])
def pyme():

    pymeID = request.json.get("pymeID", None)
    
    pymesQuery = Pyme.query.filter_by(id=pymeID)

    pyme = list(map(lambda x: x.serialize(), pymesQuery))

    return jsonify(pyme), 200

@api.route('/provincia', methods=['POST'])
def provincia():

    provinciaID = request.json.get("provinciaID", None)
    
    provinciaQuery = Provincias.query.filter_by(id=provinciaID)

    provincia = list(map(lambda x: x.serialize(), provinciaQuery))

    return jsonify(provincia), 200

@api.route('/canton', methods=['POST'])
def canton():

    cantonID = request.json.get("cantonID", None)
    
    cantonQuery = Cantones.query.filter_by(id=cantonID)

    canton = list(map(lambda x: x.serialize(), cantonQuery))

    return jsonify(canton), 200

@api.route('/tiposservicio', methods=['POST'])
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

@api.route('/cantones', methods=['GET'])
def cantones():

    cantonesQuery = Cantones.query.all()
    
    cantones = list(map(lambda x: x.serialize(), cantonesQuery))

    return jsonify(cantones), 200

@api.route('/servicios', methods=['GET'])
def servicios():

    serviciosQuery = TiposServicio.query.all()
    
    servicios = list(map(lambda x: x.serialize(), serviciosQuery))

    return jsonify(servicios), 200

@api.route('/login', methods=['POST'])
def login():
    #print("Ok")
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email:
        return jsonify({"msg":"Email required"}), 400

    if not password:
        return jsonify({"msg":"Password required"}), 400
    
    user = User.query.filter_by(email=email).first()
    #contrasena = User.query.filter_by(contrasena=password).first()
    #print(user)

    if not user or password != user.contrasena:
        return jsonify({"msg": "La información de login es incorrecta",
        "status": 401
        
        }), 401

    #expiracion = datetime.timedelta(hours=2)
    #access_token = create_access_token(identity=user.email, expires_delta=expiracion)

    data = {
        #"user": user.serialize(),
        #"token": access_token,
        #"expires": expiracion.total_seconds()*1000,
        "userId": user.email,
        "tipoUsuario": user.tipo
    }

    return jsonify(data), 200

@api.route('/register', methods=['POST'])
def register():

    email = request.json.get("email", None)
    contrasena = request.json.get("contrasena", None)

    if not email:
        return jsonify({"msg":"Email required"}), 400

    usuarioNuevo = User(email=email, contrasena=contrasena, activo=True, id_tipo=2)
    db.session.add(usuarioNuevo)
    db.session.commit()

    return jsonify("Registro correcto"), 200

    #data = {
        #"user": user.serialize(),
        #"token": access_token,
        #"expires": expiracion.total_seconds()*1000,
        #"userId": user.email
    #}


    