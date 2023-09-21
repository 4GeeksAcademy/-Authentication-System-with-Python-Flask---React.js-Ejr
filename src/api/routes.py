"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Gallery, Comentario, Book
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

# LISTA TODOS LOS USUARIOS CREADOS
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
### AGREGAR COMENTARIO
@api.route('/comentarios', methods=['POST'])
@jwt_required()
def crear_comentario():
    #user_id = get_jwt_identity()  # ID del usuario autenticado
      
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

### VER TODOS LOS COMENTARIOS
@api.route('/comentarios', methods=['GET'])
def get_comentarios():
    comentarios = Comentario.query.all()  # Obtén todos los comentarios de la base de datos
    comentarios_list = [comentario.serialize() for comentario in comentarios]  # Serializa los comentarios
    return jsonify(comentarios_list), 200


# END POINT LIBRO
### AGREGAR LIBRO
@api.route('/registerBook', methods=['POST'])
def register_Book():
    print(request.get_json())
    title= request.json.get("title")
    author= request.json.get("author")
    cathegory= request.json.get("cathegory")
    number_of_pages= request.json.get("number_of_pages")
    description= request.json.get("description")
    type= request.json.get("type")
    price= request.json.get("price")
    photo= request.json.get("photo")    
    
 ## VALIDACIÓN LIBRO
    if not title:
        return jsonify({"error": "Title is required"}), 422
    
    if not author:
        return jsonify({"error": "Author is required"}), 422
    
    if not cathegory:
        return jsonify({"error": "Cathegory is required"}), 422
    
    if not number_of_pages:
        return jsonify({"error": "Number of pages is required"}), 422
    
    if not description:
        return jsonify({"error": "Description is required"}), 422
    
    if not type:
        return jsonify({"error": "Type is required"}), 422
    
    if not price:
        return jsonify({"error": "Price is required"}), 422
    
    if not photo:
        return jsonify({"error": "Photo is required"}), 422
        
 ## CREACION LIBRO         
    
    book = Book()
    book.title = title
    book.author = author
    book.cathegory = cathegory
    book.number_of_pages = number_of_pages
    book.description = description
    book.type = type
    book.price = price
    book.photo = photo
    book.save() 
    
    return jsonify({"succes": "Publiación de libro exitosa"}), 200

###LISTAR TODOS LOS LIBROS
@api.route('/libroVenta', methods=['GET'])
def get_book():
    books = Book.query.all()  
    book_list = [book.serialize() for book in books]  
    return jsonify(book_list), 200 

###LISTAR DETALLE POR LIBRO
@api.route('/detalle-libro/<int:id>', methods=['GET'])
def get_book_details(id):
    try:
        # Busca el libro en función del ID proporcionado
        book = Book.query.get(id)

        if book is None:
            # Si no se encuentra el libro, devuelve un código de estado 404 (no encontrado)
            return jsonify({'error': 'Libro no encontrado'}), 404

        # Convierte el libro encontrado en un formato serializable (por ejemplo, un diccionario)
        book_details = {
            'id': book.id,
            'title': book.title,
            'author': book.author,
            'cathegory': book.cathegory,
            'number_of_pages': book.number_of_pages,
            'description': book.description,
            'type': book.type,
            'price': book.price,
            'photo': book.photo
        }

        # Devuelve los detalles del libro como una respuesta JSON con un código de estado 200 (éxito)
        return jsonify(book_details), 200

    except Exception as e:
        # Maneja cualquier excepción que pueda ocurrir (por ejemplo, problemas de base de datos) y devuelve un error 500
        return jsonify({'error': str(e)}), 500