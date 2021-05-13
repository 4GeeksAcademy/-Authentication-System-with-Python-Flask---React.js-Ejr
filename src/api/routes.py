"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from flask import current_app
from api.models import db, User, Pyme, TiposUsuario, Provincias, Cantones, TiposServicio
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash       ## Nos permite manejar tokens por authentication (usuarios)    
import datetime


api = Blueprint('api', __name__)

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
    usuario = request.json.get("usuario", None)
    contrasena = request.json.get("contrasena", None)

    #hashed_password = generate_password_hash(password)
    #user.password = hashed_password

    user = User.query.filter_by(email=usuario, contrasena=contrasena).first()

    if user is None:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=user.id)

    data = {
            "user": user.email,
            "token": access_token,
            #"expires": expiracion.total_seconds()*1000,
            "userId": user.id,
            "idTipo":user.id_tipo
            #"username": user.username
        }


    return jsonify(data), 200

    return jsonify(access_token=access_token)

@api.route('/UsuarioNuevo', methods=['POST'])
@jwt_required()
def UsuarioNuevo():

    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()

    if user is not None:

        email = request.json.get("email", None)
        contrasena = request.json.get("contrasena", None)
        token = request.json.get("token", None)

        if not email:
            return jsonify({"msg":"Email required"}), 400

        hashed_password = generate_password_hash(contrasena)
        contrasena = hashed_password

        user = User()
        user.email = email
        user.contrasena = contrasena
        user.activo = True
        user.id_tipo = 2

        #usuarioNuevo = User(email=email, contrasena=contrasena, activo=True, id_tipo=2)
        db.session.add(user)
        db.session.commit()

        return jsonify("Registro correcto"), 200
    else:
        return jsonify({"msg": "Token invalid or expired"}), 401

@api.route('/actualizapyme', methods=['POST'])
@jwt_required()
def ActualizaPyme():

    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()
    user_has_pyme = Pyme.query.filter_by(id_user=current_user_id).first()
    
    if user_has_pyme:
        return jsonify({"msg": "User has an existing PYME registered"}), 401

    if user is not None:

        provincia = request.json.get("provincia", None)
        canton = request.json.get("canton", None)
        nombrePyme = request.json.get("nombrePyme", None)
        tipoServicio = request.json.get("tipoServicio", None)
        telefono = request.json.get("telefono", None)
        otrasSenas = request.json.get("otrasSenas", None)
        instagram = request.json.get("instagram", None)
        facebook = request.json.get("facebook", None)

        pyme = Pyme()
        pyme.nombre = nombrePyme
        pyme.id_provincia = provincia
        pyme.id_canton = canton
        pyme.id_tiposServicio = tipoServicio
        pyme.id_user = current_user_id
        pyme.otrassenas = otrasSenas
        pyme.telefono = telefono
        pyme.facebook = facebook
        pyme.instagram = instagram
        pyme.Imagen = "Test String"

        db.session.add(pyme)
        db.session.commit()

        return jsonify("Registro correcto"), 200
    else:
        return jsonify({"msg": "Token invalid or expired"}), 401
    