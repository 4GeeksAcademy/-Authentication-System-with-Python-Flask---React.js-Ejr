"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Gallery, Comentario
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, get_jwt_identity, create_access_token, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
from cloudinary.uploader import upload
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy 




api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message"
    }

    return jsonify(response_body), 200

# TODOS LOS USUARIOS CREADOS
@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()  # Obtén todos los usuarios de la base de datos
    user_list = [user.serialize() for user in users]  # Serializa los usuarios en una lista de objetos JSON
    return jsonify(user_list), 200  # Devuelve la lista de usuarios en formato JSON con código de estado 200


#------< registrar usuario >-------------#

@api.route('/register', methods=['POST'])
def user_register():
    print(request.get_json())
    name= request.json.get("name")
    lastname= request.json.get("lastname")
    email= request.json.get("email")
    password= request.json.get("password")
    region= request.json.get("region")
    
 #-------< validacion de usuario >-------#
    if not name:
        return jsonify({"error": "name is requare"}), 422
    
    if not lastname:
        return jsonify({"error": "username is requare"}), 422
    
    if not email:
        return jsonify({"error": "email is requare"}), 422
    
    if not password:
        return jsonify({"error": "password is requare"}), 422
    
    if not region:
        return jsonify({"error": "region is requare"}), 422
    
    
    #-----< creacion de usuario ------------------------------------------->
    
    user_Faund = User.query.filter_by(email=email).first()
    
    if user_Faund:
        return jsonify({"message": "username is not available"}), 400
    
    user = User()
    user.name = name
    user.lastname = lastname
    user.email = email
    user.password = generate_password_hash(password)
    user.region = region
    user.save()
    
    return jsonify({"succes": "Registro exitoso, por favor inicie sesión"}), 200



@api.route('/login', methods=['POST'])
def login():
    
    email= request.json.get("email")
    password= request.json.get("password")
  
 #------< validacion de usuario, de datos ingresados >------#

    if not email:
        return jsonify({"error": "email is requare"}), 422
    
    if not password:
        return jsonify({"error": "password is requare"}), 422

 #------< BUSCAMOS AL USUARIO
    user = User.query.filter_by(email=email).first()
   
    
 #------< SI NO EXISTE EL USUARIO
    if not user: 
        return jsonify({"error": "tu usuario o contraseña son incorrectos"}), 401
    
 #------< VALIDAMOS LA CONTRASEÑA
    if not check_password_hash(user.password, password):
        return jsonify({"error": "tu usuario o contraseña son incorrectos"}), 401 
           
    access_token = create_access_token(identity=user.id)
    print(access_token)
    data = {
        # "success": "inicio de sesion exitoso",
        "access_token": access_token,
        "type": "Bearer",
        "user": user.serialize()
    }
    return jsonify(data), 200


# generando ruta privada

@api.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    
    id = get_jwt_identity()
    user = User.query.get(id)
    return jsonify({"message": "ruta  privada", "user": user.email}), 200

#-----<ruta libro----->#

@api.route('/books', methods=['GET'])
def books_route():
    response_libro ={
        "mesage": "libro encontrado, sos un krac!"
    }
    
    return jsonify(response_libro), 200





@api.route('/upload', methods=['POST'])
def upload_image_route():
    
    
    title=request.form['title']
    
    
    if not title:
        return jsonify({"msg": "debe agregar titulo"}), 400
    
    image = request.files['image']
    if not 'image' in request.files:
        return jsonify({"msg":" la imagen es requerida"}), 400
        
    
    #-----< ahora hago un "fetch" a Cloudinary >-----
    public_id=image.filename
    resp=upload(image, fordel='galleries',public_id='public_id')
    
    if not resp:
        return jsonify({'msg': "error al cargar imagen"}), 400
    
    print(resp)
    
    gallery = Gallery()
    gallery.title = title
    gallery.image = resp['secure_url']
    gallery.public_id = public_id 

    gallery.save()
    
    return jsonify(gallery.serialize()), 201

# END POINT COMENTARIOS
## AGREGAR COMENTARIO
@api.route('/comentarios', methods=['POST'])
@jwt_required()
def crear_comentario():
    user_id = get_jwt_identity()  # ID del usuario autenticado
      
    #book_id = request.json.get("book_id")
    comentario = request.json.get("comentario")
    
    #if not book_id:
    #    return jsonify({"error": "book_id is required"}), 422
    
    if not comentario:
        return jsonify({"error": "comentario is required"}), 422
    
    comentario_obj = Comentario()
    #comentario_obj.book_id = book_id
    #comentario_obj.user_id = user_id
    comentario_obj.comentario = comentario
    comentario_obj.save()
    
    return jsonify({"message": "Comentario creado con éxito"}), 201

# VER TODOS LOS COMENTARIOS
@api.route('/comentarios', methods=['GET'])
def get_comentarios():
    comentarios = Comentario.query.all()  # Obtén todos los comentarios de la base de datos
    comentarios_list = [comentario.serialize() for comentario in comentarios]  # Serializa los comentarios
    return jsonify(comentarios_list), 200