"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Book, Gallery, Message, Comentario, Book
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, get_jwt_identity, create_access_token, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
from cloudinary.uploader import upload
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy


api = Blueprint('api', __name__)

# -----<listar todos los usuiarios >------------------------------------------------------>
@api.route('/usuarios', methods=['POST', 'GET'])
def home():
    users = User.query.all()
    users = list(map(lambda user: user.serialize(), users))

    return jsonify({
        "data": users
    }), 200

# LISTA TODOS LOS USUARIOS CREADOS
@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()  # Obtén todos los usuarios de la base de datos
    user_list = [user.serialize() for user in users]  # Serializa los usuarios en una lista de objetos JSON
    return jsonify(user_list), 200  # Devuelve la lista de usuarios en formato JSON con código de estado 200


# ------< registrar usuario >------------------------------------------------------------>

@api.route('/register', methods=['POST'])
def user_register():
    print(request.get_json())
    name = request.json.get("name")
    lastname = request.json.get("lastname")
    email = request.json.get("email")
    password = request.json.get("password")
    region = request.json.get("region")

# -------< validacion de usuario >------------------------------------------------------------
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

# -----< creacion de usuario --------------------------------------------------------------->

    user_found = User.query.filter_by(email=email).first()

    if user_found:
        return jsonify({"message": "email is not available"}), 400

    user = User()
    user.name = name
    user.lastname = lastname
    user.email = email
    user.password = generate_password_hash(password)
    user.region = region
    user.save()

    return jsonify({"succes": "Registro exitoso, por favor inicie sesión"}), 200


#-----< actualizar user >-----------------------------

@api.route('/update_user/<int:id>', methods=['PUT'])
@jwt_required()
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
        
@api.route('delete_user/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_user(id):
    user = User.query.get(id)
    user.delete()
    
    return jsonify({"msg": "User has been deleted", "user": {}}), 200


#-----< Login User >------------------------------------------------------------------->
@api.route('/login', methods=['POST'])
def login():
    
    data = request.get_json()
        
    email = request.json.get("email")
    password = request.json.get("password")

# ------< validacion usuario, datos ingresados >------#
    if not email:
        return jsonify({"error": "email is requare"}), 422

    if not password:
        return jsonify({"error": "password is requare"}), 422

# ------< BUSCAMOS AL USUARIO
    user = User.query.filter_by(email=email).first()


# ------< SI NO EXISTE EL USUARIO >--------------------------
    if not user:
        return jsonify({"error": "tu usuario o contraseña son incorrectos"}), 401

# ------< LAVIDAMOS LA CONTRASEÑA >--------------------------
    
    
 #------< VALIDAMOS LA CONTRASEÑA
    if not check_password_hash(user.password, password):
        return jsonify({"error": "tu usuario o contraseña son incorrectos"}), 401
#-----< creacion de token >---------------------------------

    access_token = create_access_token(identity=user.id)
    print(access_token)

    data = {
        "success": "inicio de sesion exitoso",
        "access_token": access_token,
        "type": "Bearer",
        "user": user.serialize()
    }

    return jsonify(data), 200


# -----< generando ruta privada, datos de usuario, perfil >---------------------------------------->

@api.route('/profile', methods=['GET'])
@api.route('/profile', methods=['GET'])
@jwt_required()
def profile():

    id = get_jwt_identity()
    user = User.query.get(id)
    return jsonify({"message": "ruta  privada", "user": user.serialize()}), 200


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

    return jsonify({"message": "Book created"}), 201

@api.route('/books', methods=['GET'])
@jwt_required()
def get_books():
    if request.method == 'GET':
        books = Book.query.all()
        books = list(map(lambda books: books.serialize(), books))
        
        return jsonify({
                "data": books
            }), 200

@api.route('/books/<int:id>', methods=['PUT'])
@jwt_required()
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
    
    return jsonify({"message": "book updated", "book": book.serialize()})

@api.route('/books/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_book(id):
    book= Book.query.get(id)
    book.delete_book()
    
    book.delete()
    
    return jsonify({"message": "book deleted", "book": {}}), 200
    
# ------------<  cloudinary >------------------------------------------------------------

#-------------< CARGAR IMAGENES >-------------------------------------------------
@api.route('/image_upload', methods=['POST'])
@jwt_required()  
def upload_image_route():

    title = request.form['title']

    if not title:
        return jsonify({"msg": "debe agregar titulo"}), 400

    image = request.files['image']
    
    if not 'image' in request.files:
        return jsonify({"msg": " la imagen es requerida"}), 400

# -----< ahora hago un "fetch" a Cloudinary para agregar un archivo en la capeta galleries >-----
    
    public_id = image.filename
    resp = upload(image, folder='galleries', public_id=public_id)

    if not resp:
        return jsonify({'msg': "error al cargar imagen"}), 400

    print(resp)

    gallery = Gallery()
    gallery.title = title
    gallery.image = resp['secure_url']
    gallery.public_id = public_id

    gallery.save()

    return jsonify(gallery.serialize()), 201






@api.route('/image_get', methods=['GET'])
@jwt_required()
def image():
    if request.method == 'GET':
        gallery = Gallery.query.all()
        gallery = list(map(lambda image: image.serialize(), gallery))
        
        return jsonify({
                "data": gallery
            }), 200
        
#===================================================================================        
@api.route('/image_update/<int:id>', methods=['PUT'])
@jwt_required()
def image_update(id):
    gallery = Gallery.query.get(id)
    if not gallery:
        return jsonify({"msg": "Gallery no encontrada"}), 404
    
    
    title = request.form['title']

    if not title:
        return jsonify({"msg": "debe agregar titulo"}), 400

    image = request.files['image']
    
    if not 'image' in request.files:
        return jsonify({"msg": " la imagen es requerida"}), 400
    
    public_id = image.filename

    resp = upload(image, folder='galleries', public_id=gallery.public_id)

    if not resp:
        return jsonify({'msg': "error al cargar imagen"}), 400

    print(resp)

    gallery.title = title
    gallery.image = resp['secure_url']

    gallery.update()

    return jsonify(gallery.serialize()), 201
    
    
    
    
    
    
#-----< MENSAJES >-----------------------------------------------------------------------------------------
# el modelo solo pide: el mensaje, el id del que envia, y el id dl que recibe

@api.route("/messages", methods=['GET', 'POST'])
@api.route("/messages/<int:id>", methods=['GET','POST'])
@jwt_required()
def messages(id = None):
    if request.method == 'GET':
        
        if id is not None:
            message = Message.query.get(id)
            if not message:
                return jsonify({"msg": "Message not found"}), 404
            return jsonify(message.serialize()), 200
        else: 
            messages = Message.query.all()
            messages = list(map(lambda msg: msg.selialize(), messages))
            return jsonify({'data' : messages}), 200
            
    if request.method == 'POST':
        message = request.json.get('message')
        user_from_id = request.json.get('user_from_id')
        user_to_id = request.json.get('user_to_id')
        msg = Message()
        msg.message = message
        msg.user_from_id = user_from_id
        msg.user_to_id= user_to_id
        
        msg.save()
        
        return jsonify(msg.serialize()), 201
@api.route('/messages_update/<int:id>', methods=['PUT'])
@jwt_required()
def message_update(id):
    
    data = request.get_json()
    
    message = Message.query.get(id)
    
    message.message = data["message"] if "message" in data else message.message
    message.user_from_id = data["user_from_id"] if "user_from_id" in data else message.user_from_id
    message.user_to_id = data["user_to_id"] if "user_to_id" in data else message.user_to_id
    
    message.update()
    
    return jsonify({
        "msg": "mensaje actualizado", "mensaje": message.serialize()
    }), 200

    
@api.route('messages_delete/<int:id>', methods=['DELETE'])
@jwt_required()
def message_delete(id):
    message = Message.query.get(id)
    message.delete()
    
    return jsonify({"msg": "Message has been deleted", "Message": {}}), 200


            #message = Message().find_by_id(id=id, user_id=current_identity.user["sub"])
# def send_message():
#     if request.method != "POST":
#         return {"status":"fail","message":"bad method"},500
#     message=request.form["message"]
#     receiverId=request.form["receiverID"]
#     print("Message:",message,"Receiver ID:",receiverId,type(receiverId))

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