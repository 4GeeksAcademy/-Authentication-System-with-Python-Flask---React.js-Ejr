"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint

from api.models import db, User, Product, Brand, Model, Image, Favorites, Review

from api.utils import generate_sitemap, APIException


import pandas as pd

from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

import cloudinary
import cloudinary.uploader
import os
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)



api = Blueprint('api', __name__)



@api.route('upload-car', methods=['POST'])
@jwt_required()
def upload_car():
    current_user = get_jwt_identity()
    cloudinary.config(cloud_name = os.getenv('CLOUD_NAME'), api_key=os.getenv('API_KEY'), 
    api_secret=os.getenv('API_SECRET'))
    
    
    data = request.get_json()

    user = User.query.get(current_user)

    name = data.get('name')
    state = data.get('state')
    price = data.get('price')
    description = data.get('description')
    year = data.get('year') 
    km = data.get('km')
    fuel = data.get('fuel')
    brand = data.get('brand')
    model = data.get('model')

    product_type = data.get('product_type')
    user_id = user.id

    if name is None:
        return jsonify({"message": "Name is required"}), 400

    product = Product(
        name=name, state=state, price=price, description=description,
        year=year, km=km, fuel=fuel, brand_id=brand, model_id=model,
        product_type=product_type ,user_id=user_id 
    ) 
    db.session.add(product)
    db.session.commit()

    # Recupero la url
    for image_file in data.get('images', []):
        upload_result = cloudinary.uploader.upload(image_file)
        image = Image(image=upload_result['secure_url'], user_id=user_id, product_id=product.id)
        db.session.add(image)
        db.session.commit()
 
 
    return jsonify({"message": "Your product has been successfully uploaded"}), 200


 
@api.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    serialized_products = [product.serialize() for product in products]
    return jsonify(serialized_products), 200


# @api.route('car-models/<string:brand>', methods=['GET'])
# def get_car_models(brand):
#     df = pd.read_csv('/workspaces/Watacar_v2/src/api/brands-and-models/cars-2020.csv')
#     models =  df.loc[df['make'] == brand, 'model'].tolist()
#     #gpt recomienda crear un diccionario
#     model_dictionary = [{'name': model, 'selected': False}for model in models]
#     return jsonify(model_dictionary)

@api.route('/car-brands', methods=['GET'])
def obtener_brands():
    brands = Brand.query.filter_by(vehicle_type='CAR').all()

    brand_list = []
    for brand in brands:
        brand_data = brand.serialize()
        brand_list.append(brand_data)

    return jsonify(brand_list)


@api.route('/moto-brands', methods=['GET'])
def get_moto_brands():
    brands = Brand.query.filter_by(vehicle_type='MOTO').all()

    brand_list = []
    for brand in brands:
        brand_data = brand.serialize()
        brand_list.append(brand_data)

    return jsonify(brand_list)




@api.route('/car-models', methods=['GET'])
def get_models():
    brand_id = request.args.get('brandId')
    
    if brand_id and brand_id.isdigit():
        models = Model.query.filter_by(brand_id=int(brand_id)).all()
    else:
        models = Model.query.all()

    model_list = [model.serialize() for model in models]
    return jsonify(model_list)



@api.route('/car-models/<int:id>', methods=['GET'])
def get_model(id):
    model = Model.query.get(id)
    if model:
        model_data = model.serialize()
        return jsonify(model_data)
    else:
        return jsonify({'message': 'Model not found'}), 404
    

@api.route('/car-types/<int:modelId>', methods=['GET'])
def get_types_by_model(modelId):
    model = Model.query.get(modelId)
    if model:
        return jsonify({"type": model.type})
    else:
        return jsonify({'message': 'Model not found'}), 404
    





@api.route('/moto-brands', methods=['GET'])
def get_brands():
    brands = Brand.query.all()

    lista_brands = []
    for brand in brands:
        data_brand = brand.serialize()
        lista_brands.append(data_brand)

    return jsonify(lista_brands)


@api.route('/moto-models', methods=['GET'])
def get_moto_models():
    brand_id = request.args.get('brandId')
    if brand_id:
        models = Model.query.filter_by(brand_id=brand_id).all()
    else:
        models = Model.query.all()

    array_models = [model.serialize() for model in models]
    return jsonify(array_models)


@api.route('/moto-models/<int:id>', methods=['GET'])
def get_moto_model(id):
    model = Model.query.get(id)
    if model:
        data_model = model.serialize()
        return jsonify(data_model)
    else:
        return jsonify({'mensaje': 'model not found!'}), 404
    

@api.route('/moto-types/<int:modelId>', methods=['GET'])
def get_moto_type(modelId):
    model = Model.query.get(modelId)
    if model:
        return jsonify({"tipo": model.tipo})
    else:
        return jsonify({'mensaje': 'type not found!'}), 404








# @api.route('car-brands', methods=['GET'])
# def get_brand():
#     brands = set()
#     df = pd.read_csv('/workspaces/Watacar_v2/src/api/brands-and-models/cars-2020.csv')

#     brand_column_index = 1

#     for _, row in df.iterrows():
#         brand_name = row.get('name')
#         if brand_name:
#             brand = Brand.query.filter_by(name=brand_name).first()
#             if brand is None:
#                 brand = Brand(name=brand_name)
#                 db.session.add(brand)
#                 db.session.commit()
#                 brands.add(brand_name)


#     return jsonify(list(brands)) # Funciona, renderiza solo las brands SIN repetirse


# @api.route('/car-brand-models/<brand>', methods=['GET'])
# def get_brand_models(brand):
#     df = pd.read_csv('/workspaces/Watacar_v2/src/api/brands-and-models/cars-2020.csv')
    
#     filtered_df = df[df['make'] == brand]
#     models = filtered_df['model'].tolist()
#     return jsonify(models)


@api.route('/post-brands', methods=['POST']) # SUBIR brands
def post_brands():
    data = request.get_json()

    if 'brands' in data:
        brands = data['brands']
        created_brands = []

        for brand_data in brands:
            if 'name' in brand_data:
                name = brand_data['name']
                new_brand = Brand(name=name)
                db.session.add(new_brand)
                created_brands.append(new_brand)
            else:
                return jsonify({'error': 'Nombre de brand no proporcionado'}), 400

        db.session.commit()
        return jsonify([brand.serialize() for brand in created_brands]), 201
    else:
        return jsonify({'error': 'Lista de brands no proporcionada'}), 400
    

@api.route('/post-brand', methods=['POST'])
def post_brand():
    data = request.get_json()

    if 'brands' in data:
        brands = data['brands']
        created_brands = []

        for brand_data in brands:
            if 'name' in brand_data and 'vehicle_type' in brand_data:
                name = brand_data['name']
                vehicle_type = brand_data['vehicle_type'].upper()  # Convertir a mayúsculas

                if vehicle_type == 'MOTO' or vehicle_type == 'COCHE' or vehicle_type == 'CAR':  # Validar valor del vehicle_type
                    new_brand = Brand(name=name, vehicle_type=vehicle_type)
                    db.session.add(new_brand)
                    created_brands.append(new_brand)
                else:
                    return jsonify({'error': 'Tipo de vehículo no válido'}), 400
            else:
                return jsonify({'error': 'Datos de marca incompletos'}), 400

        db.session.commit()
        return jsonify([brand.serialize() for brand in created_brands]), 201
    else:
        return jsonify({'error': 'Lista de marcas no proporcionada'}), 400






@api.route('/post-moto-brands', methods=['POST']) # SUBIR marcas de moto 
def post_moto_brands():
    data = request.get_json()

    if 'brands' in data:
        brands = data['brands']
        created_brands = []

        for brand_data in brands:
            if 'name' in brand_data:
                name = brand_data['name']
                new_brand = Brand(name=name)
                db.session.add(new_brand)
                created_brands.append(new_brand)
            else:
                return jsonify({'error': 'Nombre de brand no proporcionado'}), 400

        db.session.commit()
        return jsonify([brand.serialize() for brand in created_brands]), 201
    else:
        return jsonify({'error': 'Lista de brands no proporcionada'}), 400
    


@api.route('/post-models', methods=['POST'])
def post_models():
    data = request.get_json()

    if 'models' in data:
        models = data['models']
        created_models = []

        for model_data in models:
            if 'model' in model_data and 'brand_id' in model_data:
                model = model_data['model']
                brand_id = model_data['brand_id']

                new_model = Model(model=model, brand_id=brand_id)
                db.session.add(new_model)
                created_models.append(new_model)
            else:
                return jsonify({'error': 'data de model incompletos'}), 400

        db.session.commit()
        return jsonify([model.serialize() for model in created_models]), 201
    else:
        return jsonify({'error': 'Lista de models no proporcionada'}), 400
    

@api.route('/post-moto-models', methods=['POST'])
def post_moto_models():
    data = request.get_json()

    if 'models' in data:
        models = data['models']
        created_models = []

        for model_data in models:
            if 'model' in model_data and 'brand_id' in model_data:
                model = model_data['model']
                brand_id = model_data['brand_id']

                new_model = Model(model=model, brand_id=brand_id)
                db.session.add(new_model)
                created_models.append(new_model)
            else:
                return jsonify({'error': 'data de model incompletos'}), 400

        db.session.commit()
        return jsonify([model.serialize() for model in created_models]), 201
    else:
        return jsonify({'error': 'Lista de models no proporcionada'}), 400










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
    
@api.route('/configuration/password', methods=['PUT'])
@jwt_required()
def update_password():
    current_user = get_jwt_identity()
    user = User.query.get(current_user)
    if user is None:
        return jsonify({"message": "User not found"}), 404

    data = request.get_json()
    password = data.get('password')

    if password:
        user.password = password

    try:
        db.session.commit()
        return jsonify({"message": "Password updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error updating password"}), 500

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

