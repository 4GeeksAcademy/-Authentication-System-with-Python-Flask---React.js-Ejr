"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product, Favorites, Review, Garage
from api.utils import generate_sitemap, APIException


import pandas as pd

from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


app = Flask(__name__)



api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200



@api.route('car-brands', methods=['GET'])
def get_car_brands():
    cars_data = pd.read_csv('/workspaces/Watacar_v2/src/api/brands-and-models/cars-2020.csv')
    brands = cars_data['make'].unique().tolist()
    return jsonify(brands)

@api.route('car-models', methods=['GET'])
def get_car_models():
    cars_data = pd.read_csv('/workspaces/Watacar_v2/src/api/brands-and-models/cars-2020.csv')
    models = cars_data['model'].unique().tolist()
    return jsonify(models)


@api.route('moto-brands', methods=['GET'])
def get_moto_brands():
    moto_data = pd.read_csv('/workspaces/Watacar_v2/src/api/brands-and-models/motorcycles-2020.csv')
    brands = moto_data['Make'].unique().tolist()
    return jsonify(brands)

@api.route('moto-models', methods=['GET'])
def get_moto_models():
    moto_data = pd.read_csv('/workspaces/Watacar_v2/src/api/brands-and-models/motorcycles-2020.csv')
    models = moto_data['Model'].unique().tolist()
    return jsonify(models)

@api.route('/configuration', methods=['GET'])
@jwt_required()
def configuration():
    current_user = get_jwt_identity()
    user=User.query.filter_by(id=current_user).first()
    response_body = {
        "data": user.serialize()
    }

    return jsonify(response_body), 200


@api.route('/configuration', methods=['PUT'])
@jwt_required()
def update_configuration():
    current_user = get_jwt_identity()
    user = User.query.get(current_user)
    if user is None:
        return jsonify({"message": "User not found"}), 404

    data = request.get_json()
    full_name = data.get('full_name')
    email = data.get('email')
    document_type = data.get('document_type')
    document_number = data.get('document_number')
    address = data.get('address')
    phone = data.get('phone')

    if full_name:
        user.full_name = full_name
    if email:
        user.email = email
    if document_type:
        user.document_type = document_type
    if document_number:
        user.document_number = document_number
    if address:
        user.address = address
    if phone:
        user.phone = phone

    try:
        db.session.commit()
        return jsonify({"message": "User updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error updating user"}), 500

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return jsonify({"message": "Error: email y contraseña requeridos"}), 400
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return("El usuario no es correcto"), 400
    token = create_access_token(identity=user.id)
    return jsonify({"token": token}), 200



@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    full_name = data.get('full_name')
    email = data.get('email')
    password = data.get('password')
    document_type = data.get('document_type')
    document_number = data.get('document_number')
    address = data.get('address')
    role = data.get('role')
    phone = data.get('phone')

    register = User(full_name = full_name, email=email, password=password, document_type=document_type, document_number=document_number, address=address, role=role, phone=phone)
    print(register)

    if register is None:
        return jsonify({"message" : "Complete the fields!"}), 400
    
    db.session.add(register)
    db.session.commit()

    return jsonify({"message" : "Signed up successfully!"}), 200

@api.route('/profile/onsale', methods=['GET'])
@jwt_required()
def getProducts():
    current_user = get_jwt_identity()
    products = Product.query.filter(Product.user_id == current_user).all()
    response_body = {
        "data": [product.serialize() for product in products]
    }
    return jsonify(response_body), 200

@api.route('/profile/favorites', methods=['POST'])
@jwt_required()
def saveFavorites():
    current_user = get_jwt_identity()
    data = request.get_json()
    product_id = data.get("product_id")

    usuario = User.query.get(current_user)
    producto = Product.query.get(product_id)

    if not producto:
        return jsonify({"mensaje": "Producto no encontrado"}), 404

    favorite = Favorites(user_id=usuario.id, product_id=producto.id)
    db.session.add(favorite)
    db.session.commit()

    return jsonify({"mensaje": "Producto guardado como favorito"}), 200

@api.route('/profile/favorites', methods=['GET'])
@jwt_required()
def getFavorites():
    current_user = get_jwt_identity()

    usuario = User.query.get(current_user)
    if not usuario:
        return jsonify({"mensaje": "Usuario no encontrado"}), 404

    favorites = Favorites.query.filter_by(user_id=usuario.id).all()

    response = []
    for favorite in favorites:
        product = Product.query.get(favorite.product_id)
        response.append({
            "product_id": product.id,
            "name": product.name,
            "description": product.description,
            "price": product.price,
            "year": product.year,
            "km": product.km
        })

    return jsonify(response), 200

@api.route('/profile/favorites/<int:product_id>', methods=['PUT'])
@jwt_required()
def removeFavorite(product_id):
    current_user = get_jwt_identity()

    usuario = User.query.get(current_user)
    producto = Product.query.get(product_id)

    if not producto:
        return jsonify({"mensaje": "Producto no encontrado"}), 404

    favorite = Favorites.query.filter_by(user_id=usuario.id, product_id=producto.id).first()

    if not favorite:
        return jsonify({"mensaje": "El producto no está marcado como favorito"}), 404

    db.session.delete(favorite)
    db.session.commit()

    return jsonify({"mensaje": "Producto desmarcado como favorito"}), 200

@api.route('/profile/reviews', methods=['POST'])
@jwt_required()
def addReview():
    current_user = get_jwt_identity()
    data = request.get_json()
    product_id = data.get("product_id")
    stars = str(data.get("stars"))  # Convertir a cadena
    comment = data.get("comment")

    user = User.query.get(current_user)
    product = Product.query.get(product_id)

    if not product:
        return jsonify({"mensaje": "Producto no encontrado"}), 404

    recived_user = User.query.get(product.user_id)

    review = Review(given_review_id=user.id, recived_review_id=recived_user.id, product_id=product.id, stars=stars, comment=comment)
    db.session.add(review)
    db.session.commit()

    return jsonify({"mensaje": "Reseña agregada correctamente"}), 200







@api.route('/profile/reviews', methods=['GET'])
@jwt_required()
def getReviews():
    current_user = get_jwt_identity()

    reviews = Review.query.filter_by(given_review_id=current_user).all()
    if not reviews:
        return jsonify({"mensaje": "No se encontraron reseñas"}), 404

    review_list = []
    for review in reviews:
        stars = review.stars.value    
        product = Product.query.get(review.product_id)

        review_data = {
            "product_id": review.product_id,
            "stars": int(stars),
            "comment": review.comment,
            "given_review_id": review.given_review_id,
            "product_name": product.name,
            "recived_review_id": review.recived_review_id,
            "recived_user_id": review.recived_review_id
        }
        review_list.append(review_data)

    return jsonify(review_list), 200



@api.route('/garages', methods=['GET'])

def getGarages():
    garages = Garage.query.all()
    if not garages:
        return jsonify({"mensaje": "No se econtrón ningún garage"}), 404

    garages_list = []
 
    for garage in garages:
        garage_data = {
            "name": garage.name,
            "web": garage.web,
            "phone": garage.phone,
            "address": garage.address,
            "description": garage.description,
            "cif": garage.cif,
            "image_id": garage.image_id,
            "product_id": garage.product_id,
            "user_id": garage.user_id
        }
    garages_list.append(garage_data)

    return jsonify(garages_list), 200