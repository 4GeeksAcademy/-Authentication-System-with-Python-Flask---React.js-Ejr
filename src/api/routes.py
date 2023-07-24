"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint


from api.models import db, User, Product, Brand, Model, Image, Favorites, Review, Garage, status


from api.utils import generate_sitemap, APIException

from sqlalchemy.exc import IntegrityError



import pandas as pd

from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

import cloudinary
from cloudinary.uploader import upload
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
    print(data)
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
    #print(data.get('images'))

    # Recupero la url
    for image_file in data.get('images', []):

        
        #upload_result = cloudinary.uploader.upload(image_file)
        if image_file:

            image = Image(image=image_file, user_id=user_id, product_id=product.id)
            db.session.add(image) 
            db.session.commit()

    
    Status = status (
        status = 'ONSALE',
        given_review_id = user_id,
        
    )
    db.session.add(Status)
    db.session.commit()

    product.status_id = Status.id
    db.session.commit()

 
 
    return jsonify({"message": "Your product has been successfully uploaded"}), 200


# @api.route('/search-by/<filter>', methods=['GET'])
# def search_by_filter(filter):

#     brand_id = request.args.get('brand_id')
#     vehicle_type = request.args.get('vehicle_type')

#     if filter == 'vehicle_type':
#         products = Product.query.filter_by(product_type=vehicle_type).all()

#     elif filter == 'brand_id':
#         products = Product.query.filter_by(brand_id=brand_id).all()

#     else:
#         products = Product.query.filter_by(product_type=vehicle_type, brand_id=brand_id).all()

#     serialized_products = [product.serialize() for product in products]
#     return jsonify(serialized_products)


# @api.route('/search-by/<filter>', methods=['GET'])
# def search_by_filter(filter):
    
#     brand_id = request.args.get('brand_id')  
#     vehicle_type = request.args.get('vehicle_type')  

#     if filter == 'vehicle_type':
#         products = Product.query.filter_by(product_type=vehicle_type).all()

#     elif filter == 'brand_id':
#         products = Product.query.filter_by(brand_id=brand_id).all()

#     else:
#         products = Product.query.filter_by(product_type=vehicle_type, brand_id=brand_id).all()


#     serialized_products = [product.serialize() for product in products]
#     return jsonify(serialized_products)




     


@api.route('/product/<int:productid>', methods=['GET'])
def get_product(productid):
    product = Product.query.get(productid)
    
    if product is None:
        return jsonify({'message': 'Product not found'}), 404
    
    
    serialized_product = product.serialize()
    return jsonify(serialized_product), 200




@api.route('/product/<int:productid>/edit', methods=['PUT'])
@jwt_required()
def update_product(productid):
    cloudinary.config(
        cloud_name=os.getenv('CLOUD_NAME'),
        api_key=os.getenv('API_KEY'),
        api_secret=os.getenv('API_SECRET')
    )

    current_user = get_jwt_identity()
    product = Product.query.get(productid)
    
    if product is None:
        return jsonify({'message': 'Product not found'}), 404
    
    if product.user_id != current_user:
        return jsonify({"message": "You're not authorized"})

    data = request.get_json()

    name = data.get('name')
    state = data.get('state')
    price = data.get('price')
    description = data.get('description')
    year = data.get('year')
    km = data.get('km')
    fuel = data.get('fuel')
    brand_id = data.get('brand_id')
    model_id = data.get('model_id')
    # product_type = data.get('product_type')
    images = data.get('images')

    if name:
        product.name = name
    if state:
        product.state = state.upper()
    if price:
        product.price = price
    if description:
        product.description = description
    if year:
        product.year = year
    if km:
        product.km = km
    if fuel:
        product.fuel = fuel.upper()
    # if product_type:
    #     product.product_type = product_type
    if brand_id:
        product.brand_id = brand_id
    if model_id:
        product.model_id = model_id

    try:
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({"message": "Error updating product"}), 500

    if images:
        #product.images.clear()  
        for image_url in images:  # Iterate through the list of image URLs directly
            if image_url:
                try:
                    # Here, you can directly use the image_url to create the Image object
                    image = Image(image=image_url, product_id=productid, user_id=current_user)
                    db.session.add(image)
                except Exception as e:
                    pass

        try:
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()
            return jsonify({"message": "Error updating product images"}), 500

    return jsonify({"message": "Product updated successfully"}), 200



@api.route('/delete-image/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_image(id):
        
    try:
        # cloudinary.uploader.destroy(id)
        
        image = Image.query.filter_by(id=id).first()
        if image:
            db.session.delete(image)
            db.session.commit()

        return jsonify({"message": "Imagen eliminada correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error al eliminar la imagen"}), 500






 
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

@api.route('/profile/products/<state>', methods=['GET'])
@jwt_required()
def get_products_by_status(state):
    current_user = get_jwt_identity()
    products = Product.query.filter(Product.user_id == current_user).all()
    
    product_status = status.query.filter_by(status=state)
    if product_status:
        ListProducts = [status.product[0].serialize() for status in product_status if status.product and status.product[0].user_id==current_user]
        return jsonify(ListProducts), 200

    return jsonify([]), 200

@api.route('/profile/changed/<state>', methods=['GET'])
@jwt_required()
def get_products_by_status_changed(state):
    current_user = get_jwt_identity()
    
    product_status = status.query.filter_by(status=state)
    if product_status:
        ListProducts = [status.product[0].serialize() for status in product_status if status.product and status.given_review_id==current_user]
        return jsonify(ListProducts), 200

    return jsonify([]), 200

@api.route('/profile/products/<int:product_id>/<new_status>', methods=['PUT'])
@jwt_required()
def update_product_status(product_id, new_status):
    current_user = get_jwt_identity()
    product = Product.query.filter_by(id=product_id).first()
    if product:
        status_obj = status.query.filter_by(id=product.status_id).first()
        if status_obj:
            status_obj.status = new_status
            db.session.commit()
            return jsonify({'message': 'Product status updated successfully'}), 200
    return jsonify({'message': 'Product not found or invalid status'}), 404

@api.route('/profile/products/<int:product_id>/<new_status>/status', methods=['PUT'])
@jwt_required()
def update_product_status_user(product_id, new_status):
    current_user = get_jwt_identity()
    product = Product.query.filter_by(id=product_id).first()
    if product:
        status_obj = status.query.filter_by(id=product.status_id).first()
        if status_obj:
            status_obj.status = new_status
            status_obj.given_review_id = current_user
            db.session.commit()
            return jsonify({'message': 'Product status updated successfully'}), 200
    return jsonify({'message': 'Product not found or invalid status'}), 404

@api.route('/car-brands', methods=['GET'])
def obtener_brands():
    brands = Brand.query.filter_by(vehicle_type='COCHE').all()

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

@api.route('all-brands', methods=['GET'])
def get_all_brands():
    brands = Brand.query.all()

    brand_list = []
    for brand in brands:
        brand_data = brand.serialize()
        brand_list.append(brand_data)
    
    return jsonify(brand_list)


@api.route('/search-by-moto', methods=['GET'])
def filter_by_moto():
    # Obtener los productos que son de tipo "MOTO"
    products = Product.query.filter_by(product_type='MOTO').all()

    # Unir la tabla de productos con la tabla de estado usando la función join()
    onsale_products = Product.query.join(status).filter(status.status == 'ONSALE').all()

    # Filtrar los productos que están en estado "ONSALE"
    onsale_motos = [product for product in products if product in onsale_products]

    serialized_products = [product.serialize() for product in onsale_motos]
    return jsonify(serialized_products)

@api.route('/search-by-car', methods=['GET'])
def filter_by_car():
    # Obtener los productos que son de tipo "COCHE"
    products = Product.query.filter_by(product_type='COCHE').all()

    # Unir la tabla de productos con la tabla de estado usando la función join()
    onsale_products = Product.query.join(status).filter(status.status == 'ONSALE').all()

    # Filtrar los productos que son de tipo "COCHE" y están en estado "ONSALE"
    onsale_cars = [product for product in products if product in onsale_products]

    serialized_products = [product.serialize() for product in onsale_cars]
    return jsonify(serialized_products)


@api.route('/search-by-price', methods=['GET'])
def filter_by_price():
    # Obtener los productos con precio menor a 20000
    products = Product.query.filter(Product.price < 20000).all()

    # Filtrar los productos que están en estado "ONSALE"
    onsale_products = Product.query.join(status).filter(status.status == 'ONSALE').all()

    onsale_price = [product for product in products if product in onsale_products]


    serialized_products = [product.serialize() for product in onsale_price]
    return jsonify(serialized_products)


@api.route('/search-by-km', methods=['GET'])
def filter_by_km():
    # Obtener los productos con kilometraje menor a 20000
    products = Product.query.filter(Product.km < 20000).all()
    onsale_products = Product.query.join(status).filter(status.status == 'ONSALE').all()

    onsale_km = [product for product in products if product in onsale_products]

    # Filtrar los productos que están en estado "ONSALE"
  

    serialized_products = [product.serialize() for product in onsale_km]
    return jsonify(serialized_products)



@api.route('/search-by/filter', methods=['GET'])
def search_by_filter():
    brand_id = request.args.get('brand_id')
    vehicle_type = request.args.get('vehicle_type')
    min_price = request.args.get('min_price')
    max_price = request.args.get('max_price')
    min_year = request.args.get('min_year')
    max_year = request.args.get('max_year')
    min_km = request.args.get('min_km')
    max_km = request.args.get('max_km')

    # Filtrar por marca y tipo de vehículo si se proporcionan
    if brand_id and brand_id != "null":
        products = Product.query.filter_by(product_type=vehicle_type, brand_id=brand_id)
    else:
        products = Product.query.filter_by(product_type=vehicle_type)

    # Filtrar por precio mínimo y máximo si se proporcionan
    if min_price is not None:
        products = products.filter(Product.price >= float(min_price))
    if max_price is not None:
        products = products.filter(Product.price <= float(max_price))
    if min_year is not None:
        products = products.filter(Product.year >= float(min_year))
    if max_year is not None:
        products = products.filter(Product.year <= float(max_year))
    if min_km is not None:
        products = products.filter(Product.km >= float(min_km))
    if max_km is not None:
        products = products.filter(Product.km <= float(max_km))  # Utiliza 'max_km' para el filtro máximo de kilómetros

    products = products.all()

    serialized_products = [product.serialize() for product in products]
    return jsonify(serialized_products)



@api.route('brands', methods=['GET'])
def get_brands():
    brands = Brand.query.all()
    serialized_brands = [brand.serialize() for brand in brands]
    return jsonify(serialized_brands), 200




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
    





# @api.route('/moto-brands', methods=['GET'])
# def get_moto_brands():
#     brands = Brand.query.all()

#     lista_brands = []
#     for brand in brands:
#         data_brand = brand.serialize()
#         lista_brands.append(data_brand)

#     return jsonify(lista_brands)


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
    




@api.route('/configuration/garage', methods=['PUT'])
@jwt_required()
def update_garage_configuration():
    current_user = get_jwt_identity()
    garage = Garage.query.filter(Garage.user_id == current_user).first()
    if garage is None:
        return jsonify({"message": "No existe el Taller que buscas"}), 404
    
    data = request.get_json()
    garage.name = data.get('name')
    garage.mail = data.get('mail')
    garage.web = data.get('web')
    garage.phone = data.get('phone')
    garage.address = data.get('address')
    garage.description = data.get('description')
    garage.cif = data.get('cif')
    garage.image_id = data.get('image_id')
    garage.product_id = data.get('product_id')
    garage.user_id = data.get('user_id')
    print(garage.serialize())
    try:
       
        db.session.commit()
        return jsonify({"message": "Se ha actualizado correctamente el Taller"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": Exception}), 500



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



@api.route('/products/<state>', methods=['GET'])
def get_all_products_by_status(state):
    product_status = status.query.filter_by(status=state).all()
    if product_status:
        ListProducts = [status.product[0].serialize() for status in product_status if status.product]
        return jsonify(ListProducts), 200
    return jsonify([]), 200


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
    comment = data.get("comment")

    user = User.query.get(current_user)
    product = Product.query.get(product_id)

    if not product:
        return jsonify({"mensaje": "Producto no encontrado"}), 404

    recived_user = User.query.get(product.user_id)

    review = Review(given_review_id=user.id, recived_review_id=recived_user.id, product_id=product.id, comment=comment)
    db.session.add(review)
    db.session.commit()

    return jsonify({"mensaje": "Reseña agregada correctamente"}), 200



@api.route('/profile/reviews', methods=['GET'])
@jwt_required()
def getReviews():
    current_user = get_jwt_identity()

    reviews = Review.query.filter_by(recived_review_id=current_user).all()
    
    review_list = []
    for review in reviews:   
        product = Product.query.get(review.product_id)

        review_data = {
            "product_id": review.product_id,
            "comment": review.comment,
            "given_review_id": review.given_review_id,
            "product_name": product.name,
            "recived_review_id": review.recived_review_id,
            "recived_user_id": review.recived_review_id
        }
        review_list.append(review_data)

    return jsonify(review_list), 200


@api.route('/profile/garage', methods=['GET'])
@jwt_required()
def getMyGarage():
    current_user = get_jwt_identity()
    garage = Garage.query.filter_by(user_id=current_user).first()

    if not garage:
        return jsonify({"mensaje": "No se encontró tu taller"}), 404
    
    
    garage_data = {
        "name": garage.name,
        "web": garage.web,
        "phone": garage.phone,
        "mail": garage.mail,
        "address": garage.address,
        "description": garage.description,
        "cif": garage.cif,
        "image_id": garage.image_id,
        "product_id": garage.product_id,
        "user_id": garage.user_id
    }

    return jsonify(garage_data), 200



@api.route('/garages', methods=['GET'])
def getGarages():
    garages = Garage.query.all()
    if not garages:
        return jsonify({"mensaje": "No se econtrón ningún garage"}), 500

    garages_list = []
 
    for garage in garages:
        garage_data = {
            "name": garage.name,
            "web": garage.web,
            "phone": garage.phone,
            "mail": garage.mail,
            "address": garage.address,
            "description": garage.description,
            "cif": garage.cif,
            "image_id": garage.image_id,
            "product_id": garage.product_id,
            "user_id": garage.user_id
        }
    garages_list.append(garage_data)

    return jsonify(garages_list), 200


@api.route('/create-garage', methods=['POST'])
@jwt_required()
def createGarage():
    current_user = get_jwt_identity()

    # Verificar si el garaje ya existe para el usuario actual
    existing_garage = Garage.query.filter_by(user_id=current_user).first()
    if existing_garage:
        return jsonify({"mensaje": "Ya existe un garaje asociado a este usuario"}), 400

    try:
        data = request.json
        name = data.get("name")
        mail = data.get("mail")
        phone = data.get('phone')
        cif = data.get('cif')
        address = data.get('address')
        web = data.get('web')
        description = data.get('description')
        image_id = data.get('image_id')
        user_id = data.get('user_id')

        if not all([name, mail, phone, address, cif]):
            return jsonify({"mensaje": "No se han completado todos los campos requeridos (nombre, email, teléfono, dirección, descripción o cif)"}), 400

        # Crear el nuevo garaje
        new_garage = Garage(
            name=name,
            mail=mail,
            phone=phone,
            cif=cif,
            address=address,
            description=description,
            web=web,
            image_id=image_id,
            user_id=current_user
        )
        print(new_garage.serialize())
        print(db.session.add(new_garage))
        db.session.add(new_garage)
        db.session.commit()

        return jsonify({"mensaje": "Garaje creado exitosamente"}), 200

    except Exception as e:
        print(e)
        # Capturar cualquier excepción y devolver una respuesta de error
        return jsonify({"mensaje": f"Error al crear el garaje: {str(e)}"}), 500


#@api.route('/get-images', methods=['GET'])
#def get_images():
    #hacer get de las imágenes. pasar el id de la imagen, apra la imagen del taller

