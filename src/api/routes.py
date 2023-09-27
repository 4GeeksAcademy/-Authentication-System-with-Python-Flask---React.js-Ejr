"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from flask import Flask, request, jsonify, url_for, Blueprint, redirect
from api.models import db, User, Book, Gallery, Message, Book, Role
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, get_jwt_identity, create_access_token, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
from cloudinary.uploader import upload
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy


api = Blueprint('api', __name__)

# -----<listar todos los usuiarios >------------------------------------------------------>
@api.route('/users', methods=[ 'GET', 'POST'])
def home():
    
    users = User.query.all()
    users = list(map(lambda user: user.serialize_user(), users))

    return jsonify({
        "data": users
    }), 200
    
# -----< traer solo un usuario >----------------------->
@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify({
            "data": user.serialize_user()
        }), 200
    else:
        return jsonify({
            "message": "User not found"
        }), 404

# ------< registrar usuario >------------------------------------------------------------>

@api.route('/register', methods=['POST'])
def user_register():
    
    print(request.get_json())

    name= request.json.get("name")
    lastname= request.json.get("lastname")
    email= request.json.get("email")
    password= request.json.get("password")
    region= request.json.get("region")
    # photo = request.files['photo']

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
    
    # if not photo in request.files:
    #     return jsonify({"error": "photo is requare"}), 422

    # print(image.filename)

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
    # user.photo = photo
    roles = request.json.get('roles', [])
    
    
    if len(roles) > 0:
        for roles_id in roles:
            roles = Role.query.get(roles_id)
            user.roles.append(roles)

    user.save()

    return jsonify({"succes": "Registro exitoso, por favor inicie sesión"}), 200
    # return redirect('/')

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

# ------< BUSCAMOS AL USUARIO >------------------------------------->
    user = User.query.filter_by(email=email).first()
    
#------< si no existe el usuario >------------------------------------->
    if not user: 
        return jsonify({"error": "tu usuario o contraseña son incorrectos"}), 401
    
#------< validamos la contraseña >------------------------------------->
    if not check_password_hash(user.password, password):
        return jsonify({"error": "tu usuario o contraseña son incorrectos"}), 401 
    
        
    expires=datetime.timedelta(days=30)
    
    access_token = create_access_token(identity=user.id, expires_delta=expires)
    print(access_token)

    data = {
        "success": "inicio de sesion exitoso",
        "access_token": access_token,
        "type": "Bearer",
        "user": user.serialize_user()
    }


    return jsonify(data), 200


# -----< generando ruta privada, datos de usuario, perfil >---------------------------------------->
@api.route('/profile', methods=['GET', 'POST'])
@jwt_required()
def profile():

    id = get_jwt_identity()
    user = User.query.get(id)
    return jsonify({"msg": "ruta  privada", "user": user.serialize_user()
                    }), 200


    
    
    

#=======< ruta lista LIBRO >===========================================
@api.route('/books/<int:id>', methods=['POST'])
@jwt_required()
def post_book(id):
    data = request.get_json()
    id = get_jwt_identity()    # corregido sabado en CWeekend

    book = Book()
    book.title = data["title"] 
    book.author = data['author']
    book.cathegory = data['cathegory']
    book.number_of_pages = data['number_of_pages']
    book.description = data['description']
    book.sell_trade = data['sell_trade']
    book.price = data['price']
    book.cover = data['cover']
    book.user_book_id = id
    book.save()

    return jsonify({"message": "Book created", "book": book.serialize()}), 201

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
    book_id = request.form['book_id']
    # data = request.get_json()
    id = get_jwt_identity() 
    
    if not title:
        return jsonify({"msg": "debe agregar titulo"}), 400
    if not book_id:
        return jsonify({"msg": "debe agregar libro"}), 400

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
    gallery.user_id = id
    gallery.book_id = book_id

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

# @api.route("/messages", methods=['GET', 'POST'])
# @api.route("/messages/<int:id>", methods=['GET','POST'])
# @jwt_required()
# def messages(id=None):
#     current_user = get_jwt_identity()
#     if request.method == 'GET':
#         if id is not None:
#             message = Message.query.filter_by(id=id, user_from_id=current_user).first()
#             if not message:
#                 return jsonify({"msg": "No hay mensajes"}), 404
#             return jsonify(message.serialize())
#         else: 
#             messages = Message.query.filter_by(user_from_id=current_user)
#             messages = list(map(lambda msg: msg.serialize(), messages))
            
#             return jsonify(messages)
        
#     if request.method == 'POST':
#         message = request.json.get('message')
#         user_from_id = request.json.get('user_from_id')
#         user_to_id = request.json.get('user_to_id')
#         msg = Message()
#         msg.message = message
#         msg.user_from_id = user_from_id
#         msg.user_to_id= user_to_id
        
#         msg.save()
        
#         return jsonify(msg.serialize()), 201
    
# @api.route('/messages_update/<int:id>', methods=['PUT'])
# @jwt_required()
# def message_update(id):
    
#     data = request.get_json()
    
#     message = Message.query.get(id)
    
#     message.message = data["message"] if "message" in data else message.message
#     message.user_from_id = data["user_from_id"] if "user_from_id" in data else message.user_from_id
#     message.user_to_id = data["user_to_id"] if "user_to_id" in data else message.user_to_id
    
#     message.update()
    
#     return jsonify({
#         "msg": "mensaje actualizado", "mensaje": message.serialize()
#     }), 200

    
# @api.route('messages_delete/<int:id>', methods=['DELETE'])
# @jwt_required()
# def message_delete(id):
#     message = Message.query.get(id)
#     message.delete()
    
#     return jsonify({"msg": "Message has been deleted", "Message": {}}), 200

#message = Message().find_by_id(id=id, user_id=current_identity.user["sub"])
# def send_message():
#     if request.method != "POST":
#         return {"status":"fail","message":"bad method"},500
#     message=request.form["message"]
#     receiverId=request.form["receiverID"]
#     print("Message:",message,"Receiver ID:",receiverId,type(receiverId))


#-----< mensajes >------------------------------------------------------>
@api.route('/messages', methods=['GET'])
def get_all_messages():
    messages = Message.query.all()
    serialized_messages = [message.serialize() for message in messages]

    return jsonify(serialized_messages), 200

@api.route('/messages/<int:message_id>', methods=['GET'])
def get_message(message_id):
    message = Message.query.get(message_id)

    if message:
        return jsonify(message.serialize()), 200
    else:
        return jsonify({"message": "Message not found"}), 404

@api.route('/messages', methods=['POST'])
def create_message():
    data = request.get_json()

    message = Message(
        message=data['message'],
        user_from_id=data['user_from_id'],
        user_to_id=data['user_to_id']
    )

    message.save()

    return jsonify(message.serialize()), 201

@api.route('/messages/<int:message_id>', methods=['PUT'])
def update_message(message_id):
    message = Message.query.get(message_id)

    if not message:
        return jsonify({"message": "Message not found"}), 404

    data = request.get_json()

    message.message = data['message']
    message.user_from_id = data['user_from_id']
    message.user_to_id = data['user_to_id']

    message.update()

    return jsonify(message.serialize()), 200

@api.route('/messages/<int:message_id>', methods=['DELETE'])
def delete_message(message_id):
    message = Message.query.get(message_id)

    if not message:
        return jsonify({"message": "Message not found"}), 404

    message.delete()

    return jsonify({"message": "Message deleted"}), 200



#-----< mensajes recibidos >----------------------------------------> 
@api.route('/users/<int:user_id>/received_messages', methods=['GET'])
def get_received_messages(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    
    received_messages = Message.query.filter_by(user_to_id=user_id).all()
    serialized_messages = [message.serialize() for message in received_messages]
    
    return jsonify(serialized_messages), 200

#-----< mensajes enviados >----------------------------------------->
@api.route('/users/<int:user_id>/sent_messages', methods=['GET'])
def get_sent_messages(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    
    sent_messages = Message.query.filter_by(user_to_id=user_id).all()
    serialized_messages = [message.serialize() for message in sent_messages]
    
    return jsonify(serialized_messages), 200
