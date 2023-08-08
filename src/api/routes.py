"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, Response
from src.api.models import db, User, Product, Order , OrderItems, Category, Size, ShoppingCart, ProductSizeStock, ProductsRating, ProductImage
from src.api.utils import generate_sitemap, APIException
from src.api.utils import save_new_product, update_product_by_id, update_category_by_id
from src.api.utils import check_is_admin_by_user_id
import bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# Auth routes
@api.route('/signup', methods=['POST'])
def signup():
    data = request.json

    if User.query.filter_by(email=data['email']).first():
        raise APIException(message='El usuario ya existe. Intente con otro correo electrónico.', status_code=409)
    
    if 'password' not in data or not data['password']:
        return jsonify({'message': 'El campo de contraseña es obligatorio.'}), 400


    # Encriptar la contraseña antes de guardarla en la base de datos
    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())

    new_user = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        password=hashed_password.decode('utf-8'),  # Decodificar el hash para almacenarlo como cadena
        address=data['address'],
        location=data['location'],
        payment_method=data['payment_method'],
    )

    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'Usuario creado exitosamente.'}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    if not email or not password:
        return jsonify({'message': 'Correo electrónico y contraseña son campos obligatorios.'}), 400

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        token = create_access_token(identity=user.id)
        return jsonify({'message': 'Inicio de sesión exitoso.', 'token': token , 'user':user.serialize()}), 200
    else:
        return jsonify({'message': 'Credenciales inválidas. Por favor, intenta de nuevo.'}), 401

@api.route('/validate-token', methods=['POST'])
@jwt_required()
def validate_token():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify(user.serialize())
# End auth routes

# User routes
@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    serialized_users = [user.serialize() for user in users]
    return jsonify(serialized_users), 200

@api.route('/user/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'Usuario no encontrado'}), 404
    return jsonify(user.serialize()), 200

@api.route('/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'Usuario no encontrado'}), 404

    data = request.json 
    user.first_name = data.get('firstName', user.first_name)
    user.last_name = data.get('lastName', user.last_name)
    user.email = data.get('email', user.email)
    user.address = data.get('address', user.address)
    user.location = data.get('location', user.location)
    user.payment_method = data.get('paymentMethod', user.payment_method)
    user.is_admin = data.get('isAdmin', user.is_admin)

    db.session.commit()
    return jsonify({'message': 'Usuario modificado exitosamente'}), 200

@api.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'Usuario no encontrado'}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'Usuario eliminado exitosamente'}), 200

@api.route('/users/favorites', methods=['GET'])
@jwt_required()
def get_favorite():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return [p.serialize() for p in user.favorites], 200

@api.route('/users/favorites/<int:product_id>', methods=['POST'])
@jwt_required()
def add_favorite(product_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    product = Product.query.get(product_id)
    if product is None:
        raise APIException(message='Producto no encontrado', status_code=404)
    user.favorites.append(product)
    db.session.commit()
    return [p.serialize() for p in user.favorites], 200

@api.route('/users/favorites/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite(product_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    product = Product.query.get(product_id)
    if product is None:
        raise APIException(message='Producto no encontrado', status_code=404)
    user.favorites.remove(product)
    db.session.commit()
    return [p.serialize() for p in user.favorites], 200
# Endp user routes

# Order routes
@api.route('/orders/<int:user_id>', methods=['GET'])
def obtener_ordenes_usuario(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({'error': 'Usuario no encontrado'}), 404

    ordenes_activas = Order.query.filter_by(user_id=user_id, status='activa').all()

    ordenes_confirmadas = OrderItems.query.filter_by(order_id=user_id).all()

    if not ordenes_activas and not ordenes_confirmadas:
        return jsonify({'message': 'No se encontraron órdenes para el usuario'}), 200

    ordenes_confirmadas_data = []
    for orden_confirmada in ordenes_confirmadas:
        orden_confirmada_data = {
            'order_id': orden_confirmada.order_id,
            'product': orden_confirmada.product.serialize(),
            'quantity': orden_confirmada.quantity
        }
        ordenes_confirmadas_data.append(orden_confirmada_data)
    response = {
        'ordenes_activas': [orden.serialize() for orden in ordenes_activas],
        'ordenes_confirmadas': ordenes_confirmadas_data
    }
    return jsonify(response), 200

@api.route('/orders/<int:user_id>/neworder', methods=['POST'])
def crear_orden_confirmada(user_id):
    # Obtener los datos de la orden confirmada enviados en la solicitud
    data = request.get_json()

    # Verificar que se hayan proporcionado los datos necesarios
    if not data or 'product_id' not in data or 'quantity' not in data:
        return jsonify({'error': 'Datos incompletos para crear la orden confirmada'}), 400

    # Buscar el producto en la base de datos por su ID
    product = Product.query.get(data['product_id'])

    if not product:
        return jsonify({'error': 'Producto no encontrado'}), 404

    # Crear una nueva orden confirmada en la tabla Order
    nueva_orden = Order(user_id=user_id, status='confirmada')
    db.session.add(nueva_orden)
    db.session.commit()

    # Crear un nuevo registro en la tabla OrderItems con la información de la orden confirmada
    orden_item = OrderItems(order_id=nueva_orden.id, product_id=product.id, quantity=data['quantity'])
    db.session.add(orden_item)
    db.session.commit()

    # Devolver la información de la nueva orden confirmada creada
    response = {
        'message': 'Nueva orden confirmada creada exitosamente',
        'order_id': nueva_orden.id,
        'product': product.serialize(),
        'quantity': data['quantity']
    }
    return jsonify(response), 201

@api.route('/orders/<int:user_id>/<int:orden_id>', methods=['DELETE'])
def borrar_orden_activa(user_id, orden_id):
    # Busca la orden activa en la base de datos
    orden = Order.query.filter_by(id=orden_id, user_id=user_id, status='activa').first()

    if not orden:
        # Si la orden activa no se encuentra, devuelve un mensaje de error
        return jsonify({'error': 'Orden activa no encontrada'}), 404

    # Si la orden activa existe, la eliminamos de la base de datos
    db.session.delete(orden)
    db.session.commit()

    # Devuelve una respuesta exitosa con un mensaje
    return jsonify({'message': 'Orden activa eliminada exitosamente'}), 200

@api.route('/orders/<int:user_id>/<int:orden_id>', methods=['POST'])
def actualizar_orden_activa(user_id, orden_id):
    # Busca la orden activa en la base de datos
    orden = Order.query.filter_by(id=orden_id, user_id=user_id, status='activa').first()

    if not orden:
        # Si la orden activa no se encuentra, devuelve un mensaje de error
        return jsonify({'error': 'Orden activa no encontrada'}), 404

    # Obtener los datos de la orden actualizados enviados en la solicitud
    data = request.get_json()

    # Verificar que se hayan proporcionado los datos necesarios
    if not data or 'productos' not in data:
        return jsonify({'error': 'Datos incompletos para actualizar la orden activa'}), 400

    # Eliminar los productos actuales de la orden
    orden.products.clear()

    # Agregar los nuevos productos a la orden
    for producto_id in data['productos']:
        producto = Product.query.get(producto_id)
        if producto:
            orden.products.append(producto)

    # Guardar los cambios en la base de datos
    db.session.commit()

    # Devolver una respuesta exitosa con un mensaje
    return jsonify({'message': 'Orden activa actualizada exitosamente'}), 200
# End order routes

# Product routes
@api.route('/products', methods=['GET'])
def all_products():
    products = Product.query.all()
    return jsonify([p.serialize() for p in products]), 200

@api.route('/products/<int:product_id>', methods=['GET'])
def get_product_by_id(product_id):
    product = Product.query.get(product_id)
    if product is None:
        raise APIException(message='Product not found', status_code=404)
    return jsonify(product.serialize()), 200

@api.route('/products', methods=['POST'])
@jwt_required()
def create_product():
    request_body = request.get_json()
    current_user_id = get_jwt_identity()
    check_is_admin_by_user_id(current_user_id) 
    product = save_new_product(request_body)
    return jsonify(product.serialize()), 200

@api.route('/products/<int:product_id>/images', methods=['GET'])
def get_product_images(product_id):
    product = Product.query.get(product_id)
    if product is None:
        raise APIException(message='Product not found', status_code=404)
    return jsonify(product.serialize_sorted_images()), 200

@api.route('/products/<int:product_id>/images/<int:image_id>', methods=['GET'])
def get_product_image_by_id(product_id, image_id):
    product = Product.query.get(product_id)
    if product is None:
        raise APIException(message='Product not found', status_code=404)
    product_image = ProductImage.query.get(image_id)
    if product_image is None:
        raise APIException(message='Product image not found', status_code=404)
    if product_image.product_id != product_id:
        raise APIException(message='Product image not found', status_code=404)
    
    return jsonify(product_image.serialize()), 200

@api.route('/products/<int:product_id>/images', methods=['POST'])
@jwt_required()
def upload_product_image(product_id):
    request_body = request.get_json()
    current_user_id = get_jwt_identity()
    check_is_admin_by_user_id(current_user_id)
    product = Product.query.get(product_id)
    if product is None:
        raise APIException(message='Product not found', status_code=404)
    if 'image_url' not in request_body:
        raise APIException(message='Image URL is required', status_code=422)
    if 'order' not in request_body:
        raise APIException(message='Order is required', status_code=422)
    product_image = ProductImage(image_url=request_body['image_url'], order=request_body['order'], product=product)
    db.session.add(product_image)
    db.session.commit()
    return jsonify(product_image.serialize()), 200

@api.route('/products/<int:product_id>/images/<int:product_image_id>', methods=['PUT'])
@jwt_required()
def update_product_image(product_id, product_image_id):
    request_body = request.get_json()
    current_user_id = get_jwt_identity()
    check_is_admin_by_user_id(current_user_id)
    product = Product.query.get(product_id)
    if product is None:
        raise APIException(message='Product not found', status_code=404)
    product_image = ProductImage.query.get(product_image_id)
    if product_image is None:
        raise APIException(message='Product image not found', status_code=404)
    if product_image.product_id != product_id:
        raise APIException(message='Product image not found', status_code=404)
    if 'image_url' in request_body:
        product_image.image_url = request_body['image_url']
    if 'order' in request_body:
        product_image.order = request_body['order']
    db.session.commit()
    return jsonify(product_image.serialize()), 200

@api.route('/products/<int:product_id>/images/<int:product_image_id>', methods=['DELETE'])
@jwt_required()
def delete_product_image(product_id, product_image_id):
    current_user_id = get_jwt_identity()
    check_is_admin_by_user_id(current_user_id)
    product = Product.query.get(product_id)
    if product is None:
        raise APIException(message='Product not found', status_code=404)
    product_image = ProductImage.query.get(product_image_id)
    if product_image is None:
        raise APIException(message='Product image not found', status_code=404)
    if product_image.product_id != product_id:
        raise APIException(message='Product image not found', status_code=404)
    db.session.delete(product_image)
    db.session.commit()
    return Response(status=204)

@api.route('/products/clothing', methods=['GET'])
def get_clothing_products():
    products = Product.query.filter_by(category_id=1)
    return jsonify([p.serialize() for p in products]), 200

@api.route('/products/accessories', methods=['GET'])
def get_accessories_accesories():
    products = Product.query.filter_by(category_id=2)
    return jsonify([p.serialize() for p in products]), 200

@api.route('/products/shoes', methods=['GET'])
def get_accessories_shoes():
    products = Product.query.filter_by(category_id=3)
    return jsonify([p.serialize() for p in products]), 200

@api.route('/products/<int:product_id>', methods=['PUT'])
@jwt_required()
def update_product(product_id):
    request_body = request.get_json()
    current_user_id = get_jwt_identity()
    check_is_admin_by_user_id(current_user_id) 
    updated_product = update_product_by_id(product_id, request_body)
    return jsonify(updated_product.serialize()), 200

@api.route('/products/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    current_user_id = get_jwt_identity()
    check_is_admin_by_user_id(current_user_id) 
    product = Product.query.get(product_id)
    if len(product.sizes_quantity) > 0:
        for size in product.sizes_quantity:
            db.session.delete(size)
    if product is None:
        raise APIException(message='Product not found', status_code=404)
    db.session.delete(product)
    db.session.commit()
    return Response(status=204)

@api.route('/products/<int:product_id>/rating', methods=['GET'])
def get_product_rating(product_id):
    product = Product.query.get(product_id)
    if product is None:
        raise APIException(message='Product not found', status_code=404)
    return jsonify(product.serialize_rating()), 200

@api.route('/products/<int:product_id>/rating', methods=['POST'])
@jwt_required()
def create_product_rating(product_id):
    request_body = request.get_json()
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    product = Product.query.get(product_id)
    if product is None:
        raise APIException(message='Product not found', status_code=404)
    
    if request_body.get('rating') is None:
        raise APIException(message='Rating is required', status_code=422)
    
    # check if rating already exists
    for rating in product.users_ratings:
        if rating.user_id == current_user_id:
            raise APIException(message='You already rated this product', status_code=400)
    
    # chekcs is the user have a completed order with the product
    for order in user.orders:
        if order.status != 'completed':
            continue
        for order_item in order.products:
            if order_item.product.id == product_id:
                rating = ProductsRating(user=user, product=product, rating=request_body['rating'])
                db.session.add(rating)
                db.session.commit()
                return jsonify(rating.serialize()), 200

    raise APIException(message='You need to buy the product to rate it', status_code=400)

@api.route('/products/<int:product_id>/rating', methods=['PUT'])
@jwt_required()
def update_product_rating(product_id):
    request_body = request.get_json()
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    product = Product.query.get(product_id)
    if product is None:
        raise APIException(message='Product not found', status_code=404)
    if request_body.get('rating') is None:
        raise APIException(message='Rating is required', status_code=422)
    
    rating = ProductsRating.query.filter_by(user=user, product=product).first()
    if rating is None:
        raise APIException(message='You need to rate the product first', status_code=400)
    
    rating.rating = request_body['rating']
    db.session.commit()
    return jsonify(rating.serialize()), 200

@api.route('/products/<int:product_id>/rating', methods=['DELETE'])
@jwt_required()
def delete_product_rating(product_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    product = Product.query.get(product_id)
    if product is None:
        raise APIException(message='Product not found', status_code=404)
    
    rating = ProductsRating.query.filter_by(user=user, product=product).first()
    if rating is None:
        raise APIException(message='You need to rate the product first', status_code=400)
    
    db.session.delete(rating)
    db.session.commit()
    return Response(status=204)
# End product roues

# Category routes
@api.route('/categories', methods=['GET'])
def all_categories():
    categories = Category.query.all()
    return jsonify([c.serialize() for c in categories]), 200

@api.route('/categories/<int:category_id>', methods=['GET'])
def get_category_by_id(category_id):
    category = Category.query.get(category_id)
    if category is None:
        raise APIException(message='Category not found', status_code=404)
    return jsonify(category.serialize()), 200

@api.route('/categories', methods=['POST'])
@jwt_required()
def create_category():
    request_body = request.get_json()
    current_user_id = get_jwt_identity()
    check_is_admin_by_user_id(current_user_id) 
    if 'name' not in request_body:
        raise APIException(message='Name is required', status_code=422)
    if 'id' not in request_body:
        raise APIException(message='ID is required', status_code=422)

    # Checks is the category exists by the name or id
    category = Category.query.filter_by(name=request_body['name']).first()
    if category is not None:
        raise APIException(message='Category already exists', status_code=409)
    category = Category.query.filter_by(id=request_body['id']).first()
    if category is not None:
        raise APIException(message='Category ID already exists', status_code=409)
    
    category = Category(id=request_body['id'], name=request_body['name'])
    db.session.add(category)
    db.session.commit()
    
    return jsonify(category.serialize()), 200

@api.route('/categories/<int:category_id>', methods=['PUT'])
@jwt_required()
def update_category(category_id):
    request_body = request.get_json()
    current_user_id = get_jwt_identity()
    check_is_admin_by_user_id(current_user_id) 
    updated_character = update_category_by_id(category_id, request_body)
    return jsonify(updated_character.serialize()), 200

@api.route('/categories/<int:category_id>', methods=['DELETE'])
@jwt_required()
def delete_category(category_id):
    current_user_id = get_jwt_identity()
    check_is_admin_by_user_id(current_user_id) 
    category = Category.query.get(category_id)
    if category is None:
        raise APIException(message='Category not found', status_code=404)
    db.session.delete(category)
    db.session.commit()
    return Response(status=204)
# End category routes

# Size routes
@api.route('/sizes', methods=['GET'])
def all_sizes():
    sizes = Size.query.all()
    return jsonify([s.serialize() for s in sizes]), 200

@api.route('/sizes/<int:size_id>', methods=['GET'])
def get_size_by_id(size_id):
    size = Size.query.get(size_id)
    if size is None:
        raise APIException(message='Size not found', status_code=404)
    return jsonify(size.serialize()), 200

@api.route('/sizes', methods=['POST'])
@jwt_required()
def create_size():
    request_body = request.get_json()
    current_user_id = get_jwt_identity()
    check_is_admin_by_user_id(current_user_id) 
    if 'name' not in request_body:
        raise APIException(message='Name is required', status_code=422)
    
    # Checks is the size exists by the name
    size = Size.query.filter_by(name=request_body['name']).first()
    if size is not None:
        raise APIException(message='Size already exists', status_code=409)
    
    size = Size(name=request_body['name'].upper())
    db.session.add(size)
    db.session.commit()
    
    return jsonify(size.serialize()), 200

@api.route('/sizes/<int:size_id>', methods=['PUT'])
@jwt_required()
def update_size(size_id):
    request_body = request.get_json()
    current_user_id = get_jwt_identity()
    check_is_admin_by_user_id(current_user_id) 
    size = Size.query.get(size_id)
    if size is None:
        raise APIException(message='Size not found', status_code=404)
    
    if 'name' in request_body:
        size.name = request_body['name'].upper()
    db.session.commit()
    return jsonify(size.serialize()), 200

@api.route('/sizes/<int:size_id>', methods=['DELETE'])
@jwt_required()
def delete_size(size_id):
    current_user_id = get_jwt_identity()
    check_is_admin_by_user_id(current_user_id) 
    size = Size.query.get(size_id)
    if size is None:
        raise APIException(message='Size not found', status_code=404)
    db.session.delete(size)
    db.session.commit()
    return Response(status=204)
# End size routes

# Cart routes
@api.route('/cart', methods=['GET'])
@jwt_required()
def get_cart():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify([p.serialize() for p in user.shopping_cart]), 200

@api.route('/cart', methods=['POST'])
@jwt_required()
def add_to_cart():
    current_user_id = get_jwt_identity()
    request_body = request.get_json()
    user = User.query.get(current_user_id)
    if 'product_id' not in request_body:
        raise APIException(message='Value product_id is missing', status_code=422)
    product = Product.query.get(request_body['product_id'])
    if product is None:
        raise APIException(message='Product not found', status_code=404)
    if 'size_id' not in request_body:
        raise APIException(message='Value size_id is missing', status_code=422)
    if 'quantity' not in request_body:
        raise APIException(message='Value quantity is missing', status_code=422)
    if request_body['quantity'] < 1:
        raise APIException(message='Quantity must be greater than 0', status_code=422)
    
    size = Size.query.get(request_body['size_id'])
    if size is None:
        raise APIException(message='Size not found', status_code=404)
    product_size_stock = ProductSizeStock.query.filter_by(product=product, size=size).first()
    if product_size_stock.stock < request_body['quantity']:
        raise APIException(message='Not enough stock', status_code=409, payload={'stock': product_size_stock.stock})
    
   # Checks if the product is already in the cart
    product_in_cart = ShoppingCart.query.filter_by(product=product, size=size, user=user).first()
    if product_in_cart is not None:
        product_in_cart.quantity = request_body['quantity']
        db.session.commit()
        return jsonify([p.serialize() for p in user.shopping_cart]), 200
    else:
        new_item_cart = ShoppingCart(quantity=request_body['quantity'], product=product, size=size, user=user)
        db.session.add(new_item_cart)
        db.session.commit()
        return jsonify([p.serialize() for p in user.shopping_cart]), 200
  
@api.route('/cart/<int:product_id>/size/<int:size_id>', methods=['DELETE'])
@jwt_required()
def delete_from_cart(product_id, size_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    product = Product.query.get(product_id)
    if product is None:
        raise APIException(message='Product not found', status_code=404)
    size = Size.query.get(size_id)
    if size is None:
        raise APIException(message='Size not found', status_code=404)
    product_in_cart = ShoppingCart.query.filter_by(product=product, size=size, user=user).first()
    if product_in_cart is None:
        raise APIException(message='Product not found in cart', status_code=404)
    db.session.delete(product_in_cart)
    db.session.commit()
    return Response(status=204)
# End cart routes

