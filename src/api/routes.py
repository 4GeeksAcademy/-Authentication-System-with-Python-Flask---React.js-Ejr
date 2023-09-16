"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Book, Gallery
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, get_jwt_identity, create_access_token, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
from cloudinary.uploader import upload
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy


api = Blueprint('api', __name__)

# -----<listar todos los udiarios >----------------------------------
@api.route('/usuarios', methods=['POST', 'GET'])
def home():
    users = User.query.all()
    users = list(map(lambda user: user.serialize(), users))

    return jsonify({
        "data": users
    }), 200


# ------< registrar usuario >-------------------------------------------

@api.route('/register', methods=['POST'])
def user_register():
    print(request.get_json())
    name = request.json.get("name")
    lastname = request.json.get("lastname")
    email = request.json.get("email")
    password = request.json.get("password")
    region = request.json.get("region")

# -------< validacion de usuario >-------#
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

# -----< creacion de usuario ------------------------------------------->

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

@api.route('/update/<int:id>', methods=['PUT'])
# @jwt_required()
def update_user(id):
    data = request.get_json()
    
    user = User.query.get(id)
    user.name = data["name"] if data['name'] else user.name
    user.lastname = data["lastname"] if data['lastname'] else user.lastname
    user.email = data["email"] if data['email'] else user.email
    user.password = data["password"] if data['password'] else user.password
    user.region = data["region"] if data['region'] else user.region
    user.update()
    
    return jsonify({
        "msg": "User updated", "user":user.serialize()
    }), 200
    
    
@api.route('delete/<int:id>', methods=['DELETE'])
# @jwt_required()
def delete_user(id):
    user = User.query.get(id)
    user.delete()
    
    return jsonify({"msg": "User has been deleted", "user": {}}), 200


@api.route('/login', methods=['POST'])
def login():
    # data = request.get_json()
    email = request.json.get("email")
    password = request.json.get("password")

# ------< validacion usuario, datos ingresados >------#
    if not email:
        return jsonify({"error": "email is requare"}), 422

    if not password:
        return jsonify({"error": "password is requare"}), 422

# ------< BUSCAMOS AL USUARIO
    user = User.query.filter_by(email=email).first()


# ------< SI NO EXISTE EL USUARIO
    if not user:
        return jsonify({"error": "tu usuario o contraseña son incorrectos"}), 401

# ------< LAVIDAMOS LA CONTRASEÑA
    if not check_password_hash(user.password, password):
        return jsonify({"error": "tu usuario o contraseña son incorrectos"}), 401

    access_token = create_access_token(identity=user.id)
    # print(access_token)
    data = {
        # "success": "inicio de sesion exitoso",
        "access_token": access_token,
        "type": "Bearer",
        "user": user.serialize()
    }

    return jsonify(data), 200


# -----< generando ruta privada >---------------------------------------->

@api.route('/profile', methods=['POST'])
@jwt_required()
def profile():

    id = get_jwt_identity()
    user = User.query.get(id)
    return jsonify({"message": "ruta  privada", "user": user.email}), 200


#=======< ruta lista LIBRO >===========================================
@api.route('/books', methods=['POST'])
def post_book():
    data = request.get_json()

    book = Book()
    book.title = data["title"] 
    book.author = data['author']
    book.cathegory = data['cathegory']
    book.number_of_pages = data['number_of_pages']
    book.description = data['description']
    book.price = data['price']
    book.photo = data['photo']
    book.save()

    return jsonify({"message": "Book created"})



@api.route('/books', methods=['GET'])
# @jwt_required()
def get_books():
    if request.method == 'GET':
        books = Book.query.all()
        books = list(map(lambda book: book.serialize(), books))
        
        return jsonify({
                "data": books
            }), 200


@api.route('/books/<int:id>', methods=['PUT'])
# @jwt_required()
def update_book(id):
    data = request.get_json()
    
    book = Book.query.get(id)
    book.title = data["title"] if data['title'] else book.title
    book.author = data['author']  if data['author'] else book.author
    book.cathegory = data['cathegory'] if data['cathegory'] else book.cathegory
    book.number_of_pages = data['number_of_pages'] if data['number_of_pages'] else book.number_of_pages
    book.description = data['description'] if data['description'] else book.description
    book.price = data['price'] if data['price'] else book.price
    book.photo = data['photo'] if data['photo'] else book.photo
    book.update()
    
    return jsonify({"message": "book updated", "book": book.serielize()})
    



# ------------< ruta cargar imagen en cloudinary >--------------------------------------

#-------------< CARGAR IMAGENES >-------------------------------------------------
@api.route('/upload', methods=['POST'])
def upload_image_route():

    title = request.form['title']

    if not title:
        return jsonify({"msg": "debe agregar titulo"}), 400

    image = request.files['image']
    if not 'image' in request.files:
        return jsonify({"msg": " la imagen es requerida"}), 400

    # -----< ahora hago un "fetch" a Cloudinary para agregar un archivo en la capeta galleries >-----
    public_id = image.filename
    resp = upload(image, fordel='galleries', public_id='public_id')

    if not resp:
        return jsonify({'msg': "error al cargar imagen"}), 400

    print(resp)

    gallery = Gallery()
    gallery.title = title
    gallery.image = resp['secure_url']
    gallery.public_id = public_id

    gallery.save()

    return jsonify(gallery.serialize()), 201
