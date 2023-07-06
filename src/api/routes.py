"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product, Brand, Model
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


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# @api.route('car-models/<string:brand>', methods=['GET'])
# def get_car_models(brand):
#     df = pd.read_csv('/workspaces/Watacar_v2/src/api/brands-and-models/cars-2020.csv')
#     models =  df.loc[df['make'] == brand, 'model'].tolist()
#     #gpt recomienda crear un diccionario
#     model_dictionary = [{'name': model, 'selected': False}for model in models]
#     return jsonify(model_dictionary)


@api.route('/car-brands', methods=['GET'])
def obtener_brands():
    brands = Brand.query.all()

    brand_list = []
    for brand in brands:
        brand_data = brand.serialize()
        brand_list.append(brand_data)

    return jsonify(brand_list)


@api.route('/car-models', methods=['GET'])
def get_models():
    brand_id = request.args.get('brandId')
    if brand_id:
        models = Model.query.filter_by(brand_id=brand_id).all()
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


#     return jsonify(list(brands)) # Funciona, renderiza solo las marcas SIN repetirse


@api.route('/car-brand-models/<brand>', methods=['GET'])
def get_brand_models(brand):
    df = pd.read_csv('/workspaces/Watacar_v2/src/api/brands-and-models/cars-2020.csv')
    
    filtered_df = df[df['make'] == brand]
    models = filtered_df['model'].tolist()
    return jsonify(models)




# @api.route('upload-car', methods=['POST'])
# def upload_car():

#     data = request.get_json()
    
#     title = data.get('name')
#     state = data.get('state')
#     price = data.get('price')
#     description = data.get('description')
#     year = data.get('year')
#     km = data.get('km')
#     fuel = data.get('fuel')
#     brand = data.get('brand_id')
#     model = data.get('model_id')
#     images = data.get('images')
#     user_id = data.get('user_id')

#     product = Product(name = title, state = state, price = price, description = description,
#                      year = year, km = km, fuel = fuel, brand_id = brand, model_id = model,
#                      images = images, user_id = user_id)
    
#     


#     if not name:
#         return jsonify({"message" : "Complete the fields"}), 400

#     db.session.add(upload)
#     db.session.commit()

#     return jsonify({"message" : "Your product has been successfully uploaded"}), 200






@api.route('/configuration', methods=['GET'])
@jwt_required()
def configuration(current_user):
    current_user = get_jwt_identity()
    user=User.query.filter_by(current_user).first()
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


@api.route("/upload", methods=['POST'])
@cross_origin()
def upload_file():
  app.logger.info('in upload route')

  cloudinary.config(cloud_name = os.getenv('CLOUD_NAME'), api_key=os.getenv('API_KEY'), 
    api_secret=os.getenv('API_SECRET'))
  upload_result = None
  if request.method == 'POST':
    file_to_upload = request.files['file']
    app.logger.info('%s file_to_upload', file_to_upload)
    if file_to_upload:
      upload_result = cloudinary.uploader.upload(file_to_upload)
      app.logger.info(upload_result)
      return jsonify(upload_result)

