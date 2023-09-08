"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import *
from api.utils import generate_sitemap, APIException
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token


api = Blueprint('api', __name__)
#Agregado al boilerplate
app = Flask(__name__)
bcrypt = Bcrypt(app)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def createUser():
    data = request.get_json(force=True)
    email = data["email"].lower()
    if User.query.filter_by(email=email).first() is not None:
        return jsonify({"msg":"Email already registered"}), 400
    new_pet=User()
    new_pet.email = email
    secure_password = bcrypt.generate_password_hash((data["password"]), 10).decode("utf-8")
    new_pet.password = secure_password
    new_pet.dni = data["dni"]
    new_pet.name = data["name"]
    new_pet.lastname = data["lastname"]
    new_pet.is_active = True
    db.session.add(new_pet)
    db.session.commit()
    return jsonify({"msg": "User created successfully"}), 201

@api.route('/login', methods=["POST"])
def login_user():
    data = request.get_json(force=True)
    user = User.query.filter_by(email=data["email"]).first()
    if user is None:
        return jsonify({"msg": "Incorrect user or password"}), 401
    passwordCheck = bcrypt.check_password_hash(user.password, data["password"])
    if passwordCheck == False:
        return jsonify({"msg":"Wrong password"}), 401
    token = create_access_token(identity = data["dni"], additional_claims={"role":"admin"}) #cambiar por tipo de usuario de los modelos pendientes (Enum)
    return jsonify({"msg": "Login successful!", "token":token}),200

#AGREGAR EDAD A MODELO DE PETS
@api.route('/pets', methods=['POST'])
def createPet():
    data = request.get_json(force=True)
    owner_id = int(data["owner_id"])
    name = (data["name"].lower()).title()
    owner = Owner.query.filter_by(id=owner_id).first()
    if owner is None:
        return jsonify({"msg":"Invalid user id"}), 404
    if Pet.query.filter_by(owner_id = owner_id, name=name).first() is not None:
        return jsonify({"msg":"Name already registered for this user"}), 400
    size = (data["size"].lower()).title()
    new_pet=Pet()
    new_pet.name = name
    new_pet.size = size
    new_pet.category = (data["category"].lower()).title()
    new_pet.owner_id = owner_id
    db.session.add(new_pet)
    db.session.commit()
    return jsonify({"msg": "Pet added successfully"}), 201

@api.route('/pets/<int:pet_id>', methods=['GET', 'DELETE', 'PUT'])
def getPet(pet_id):
    if Pet.query.filter_by(id=pet_id).first() is None:
        return jsonify({"msg":"Pet does not exist on record"}), 404
    pet = Pet.query.get(pet_id)
    if request.method == 'GET':
        pet_data = {
            "id": pet.id,
            "name": pet.name,
            "size": pet.size,
            "category":pet.category,
            "owner_id":pet.owner_id,
            "bookings":pet.bookings
        }
        return jsonify(pet_data), 200
    if request.method == 'PUT':
        data = request.get_json(force=True)
        pet.name = (data["name"].lower()).title()
        pet.size = (data["size"].lower()).title()
        pet.category = (data["category"].lower()).title()
        db.session.commit()
        return jsonify({"msg":"Pet data updated"}), 200
    if request.method == 'DELETE':
        db.session.delete(pet)
        db.session.commit()
        return jsonify({"msg":"Pet removed from profile"}), 200
    
@api.route('/pets', methods=['GET'])
def getAllPets():
    pets = Pet.query.all()
    pets_data = [{"id": pet.id, "name": pet.name, "size": pet.size, "category": pet.category, "owner_id": pet.owner_id, "bookings": pet.bookings, "owner": [{"id": owner.id, "first_name": owner.first_name, "last_name": owner.last_name, "email": owner.email} for owner in Owner.query.filter_by(id=pet.owner_id)]}
                   for pet in pets]
    return jsonify(pets_data), 200