"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
# from flask_cors import CORS, cross_origin
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash       ## Nos permite manejar tokens por authentication (usuarios)    
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity   #from models import Person
import datetime

api = Blueprint('api', __name__)


@api.route('/hash', methods=['POST', 'GET'])
def handle_hash():
    
    expiracion = datetime.timedelta(days=3)
    access_token = create_access_token(identity='mortega@4geeks.co', expires_delta=expiracion)
    response_token = {
        "users": "Manu",
        "token": access_token
    }

    return jsonify(response_token), 200

@api.route('/login', methods=['POST'])
def login():
    
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email:
        return jsonify({"msg":"Email required"}), 400

    if not password:
        return jsonify({"msg":"Password required"}), 400
    
    user = User.query.filter_by(email=email).first()
    print(user)

    if not user:
        return jsonify({"msg": "The email is not correct",
        "status": 401
        
        }), 401

    expiracion = datetime.timedelta(days=3)
    access_token = create_access_token(identity=user.email, expires_delta=expiracion)

    data = {
        "user": user.serialize(),
        "token": access_token,
        "expires": expiracion.total_seconds()*1000,
        "userId": user.id,
        "email": user.email
    }


    return jsonify(data), 200

@api.route('/register', methods=['POST'])
def register():
    
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    email_query = User.query.filter_by(email=email).first()
    if email_query:
        return "This email has been already taken", 401

    user = User()
    user.email = email
    user.password = password
    print(user)
    db.session.add(user)
    db.session.commit()


    expiracion = datetime.timedelta(days=3)
    access_token = create_access_token(identity=user.email, expires_delta=expiracion)

    response_token = {
        "msg": "Added successfully",
        "email": user.email,
        "userId":user.id,
        "token": access_token
    }
  
    return jsonify(response_token), 200


@api.route('/servicio-registrados/<int:id_servicio_registrados>', methods=['POST', 'GET'])
def servicio_individual(id_servicio_registrados):
        if request.method == 'GET':
            pass

        if request.method == 'POST':
            id_user= request.json.get('id_user')
            username= request.json.get('username')
            tipo_membresia = request.json.get('tipo_membresia')
            category = request.json.get('category')
            subcategory = request.json.get('subcategory')
            tipo_cobro = request.json.get('tipo_cobro')
            valor = request.json.get('valor')
            name_servicio = request.json.get('name_servicio')
            descrip_servicio = request.json.get('descrip_servicio')
            duracion = request.json.get('duracion')
            revision = request.json.get('revision')
            proceso = request.json.get('proceso')
            experiencia = request.json.get('experiencia')
            portafolio = request.json.get('portafolio')
            merit = request.json.get('merit')
            

            if not id_users:
                return jsonify({"msg":"user_id esta vacio"}), 400
            if not username:
                return jsonify({"msg":"user nombre esta vacio"}), 400
            if not tipo_membresia:
                return jsonify({"msg":"el tipo_membresia esta vacio"}), 400
            if not category:
                return jsonify({"msg":"el category de servicio esta vacio"}), 400
            if not subcategory:
                return jsonify({"msg":"el subcategory de servicio esta vacio"}), 400
            if not tipo_cobro:
                return jsonify({"msg":"tipo de cobro esta vacio"}), 400
            if not valor:
                return jsonify({"msg":"el valor de servicio esta vacio"}), 400
            if not name_servicio:
                return jsonify({"msg":"el nombre de servicio esta vacio"}), 400
            if not descrip_servicio:
                return jsonify({"msg":"el descripcion de servicio esta vacio"}), 400
            if not revision:
                return jsonify({"msg":"el revision de servicio esta vacio"}), 400
            if not experiencia:
                return jsonify({"msg":"su experiencia esta vacio"}), 400 
            

        servicio_registrados = Servicio_registrados()
        servicio_registrados.id = request.json.get("id", None)
        servicio_registrados.username = request.json.get("username", None)
        servicio_registrados.tipo_membresia = request.json.get("tipo_membresia", None)
        servicio_registrados.category = request.json.get("category", None)
        servicio_registrados.subcategory = request.json.get("subcategory", None)
        servicio_registrados.tipo_cobro = request.json.get("tipo_cobro", None)
        servicio_registrados.valor = request.json.get("valor", None)
        servicio_registrados.name_servicio = request.json.get("name_servicio", None)
        servicio_registrados.descrip_servicio = request.json.get("descrip_servicio", None)
        servicio_registrados.duracion = request.json.get("duracion", None)
        servicio_registrados.revision = request.json.get("revision", None)
        servicio_registrados.proceso = request.json.get("proceso", None)
        servicio_registrados.experiencia = request.json.get("experiencia", None)
        servicio_registrados.portafolio = request.json.get("portafolio", None)
        servicio_registrados.merit = request.json.get("merit", None)
        
        db.session.add(servicio_registrados)
        db.session.commit()

        return jsonify({
            "msg": "me he guardado exitosamente",
            "name_servicio":"name_servicio"
            }), 200


@api.route('/favoritos', methods=["GET, POST"])
def add_favoritos():
        if request.method == 'GET':
            pass

        if request.method == 'POST':
            id_user= request.json.get(id_user)
            id_servicio_registrados= request.json.get(id_servicio_registrados)
            name_servicio= request.json.get(name_servicio)

            if not id_user:
                return jsonify({"msg":"user id esta vacio"}), 400
            if not id_servicio_registrados:
                return jsonify({"msg":"servicio id esta vacio"}), 400
            if not name_servicio:
                return jsonify({"msg":"el nombre de servicio esta vacio"}), 400

        favoritos = Favoritos()
        favoritos.id_users = request.json.get("id_users", None)
        favoritos.id_servicio_registrados = request.json.get("id_servicio_registrados", None)
        favoritos.name_servicio= request.json.get("name_servicio", None)

        db.session.add(favoritos)
        db.session.commit()

#  id = db.Column(db.Integer, primary_key=True, nullable=False)
#     id_servicios_prestados = db.Column(db.Integer, db.ForeignKey('servicios_prestados.id'), nullable=False)
#     id_servicio_registrados = db.Column(db.Integer, db.ForeignKey('servicio_registrados.id'), nullable=False)
#     text_comment = db.Column(db.String(250), nullable=True)
#     evaluacion = db.Column(db.Integer, nullable=True)

@api.route('/comentarios', methods=["POST"])
def addComment():  
        if request.method == 'POST':
            if not request.is_json:
                return jsonify({"msg": "El body o contenido esta vacio"}), 400

        # id_servicios_prestados= request.json.get(id_servicios_prestados)
        # id_servicio_registrados= request.json.get(id_servicio_registrados)
        # text_comment= request.json.get(text_comment)
        # evaluacion= request.json.get(evaluacion)

        # if not id_servicios_prestados:
        #     return jsonify({"msg":"id_servicios_prestados esta vacio"}), 400
        # if not id_servicio_registrados:
        #     return jsonify({"msg":"id_servicio_registrados esta vacio"}), 400
        # if not text_comment:
        #     return jsonify({"msg":"el texto del comentario esta vacio"}), 400
        # if not evaluacion:
        #     return jsonify({"msg":"la evaluacion esta vacia"}), 400

            comentarios = Comentarios()
            comentarios.id_servicios_prestados = request.json.get("id_servicios_prestados", None)
            comentarios.id_servicio_registrados = request.json.get("id_servicio_registrados", None)
            comentarios.text_comment= request.json.get("text_comment", None)
            comentarios.evaluacion= request.json.get("evaluacion", None)

            db.session.add(comentarios)
            db.session.commit()

# @api.route('/listComentarios', methods=["GET"])
# def listComments ():  
#     return jsonify({"Comentarios": Comentarios.get_all_comentarios()})


       