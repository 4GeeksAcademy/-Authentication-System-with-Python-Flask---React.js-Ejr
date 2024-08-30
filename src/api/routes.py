from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required
import os

import stripe #plataforma de pago. Para instalar el paquete de Stripe, tuve que poner: pip install stripe ,en la consola Backend y: npm install @stripe/react-stripe-js @stripe/stripe-js ,en el Fronted
from api.models import db, User, Curso, Profesor, Alumno, Videos, Matricula, Pagos

# Crear el Blueprint para la API
api = Blueprint('api', __name__)

@api.route('/')
def root():
    return "Home"

@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify({"msg": user.serialize()}), 200
    else:
        return jsonify({"error": "User not found"}), 404

@api.route('/users/', methods=['GET'])
def get_users():
    users = User.query.all()
    if users:
        return jsonify({"msg": [user.serialize() for user in users]}), 200
    else:
        return jsonify({"error": "User not found"}), 404

# @api.route('/users', methods=['POST'])
# def create_user():
#     data = request.get_json()
#     if not data or 'id' not in data or 'name' not in data or 'telefono' not in data:
#         return jsonify({"error": "Invalid data"}), 400
#     user_id = data['id']
#     if User.query.get(user_id):
#         return jsonify({"error": "User already exists"}), 400
#     new_user = User(id=user_id, name=data['name'], telefono=data['telefono'])
#     db.session.add(new_user)
#     db.session.commit()
#     return jsonify({"status": "User created", "user": new_user.serialize()}), 201

@api.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    if not data or 'name' not in data or 'telefono' not in data:
        return jsonify({"error": "Invalid data"}), 400
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    user.name = data['name']
    user.telefono = data['telefono']
    db.session.commit()
    return jsonify({"status": "User updated", "user": user.serialize()}), 200

@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"status": "User deleted"}), 200
    else:
        return jsonify({"error": "User not found"}), 404


# Rutas protegidas por JWT
@api.route('/cursos', methods=['POST'])
#@jwt_required() AUN NO SE SI HACE FALTA
def crear_curso():
    title = request.json.get('title', None)
    portada = request.json.get('portada', None)
    resumen = request.json.get('resumen', None)
    categoria = request.json.get('categoria', None)
    nivel = request.json.get('nivel', None)
    idioma = request.json.get('idioma', None)
    if not title or not portada or not resumen or not categoria or not nivel or not idioma:
        return jsonify({'success': False, 'msg': 'Todos los campos son necesarios'}), 400
    curso = Curso.query.filter_by(title=title).first()
    if curso:
        return jsonify({'success': False, 'msg': 'El curso ya existe, intenta otro título'}), 400
    new_curso = Curso(title=title, portada=portada, resumen=resumen, categoria=categoria, nivel=nivel,idioma=idioma)
    db.session.add(new_curso)
    db.session.commit()
    return jsonify({'success': True, 'curso': new_curso.serialize()}), 200

@api.route('/cursos/<int:curso_id>', methods=['GET'])
#@jwt_required() AUN NO SE SI HACE FALTA
def get_curso(curso_id):
    curso = Curso.query.get(curso_id)
    if curso:
        return jsonify({"msg": curso.serialize()}), 200
    else:
        return jsonify({"error": "Curso not found"}), 404

@api.route('/cursos', methods=['GET'])
#@jwt_required() AUN NO SE SI HACE FALTA
def get_cursos():
    cursos = Curso.query.all()
    if cursos:
        return jsonify({"msg": [curso.serialize() for curso in cursos]}), 200
    else:
        return jsonify({"error": "Cursos not found"}), 404

# @api.route('/login', methods=['POST'])
# def login():
#     print("Request JSON:", request.json)
#     email = request.json.get('email')
#     password = request.json.get('password')
#     user = User.query.filter_by(email=email).first()
#     if user:
#         if user.password == password:
#             access_token = create_access_token(identity=user.id)
#             return jsonify({'success': True, 'user': user.serialize(), 'token': access_token}), 200
#         return jsonify({'success': False, 'msg': 'Combinación usuario/contraseña no es válida'}), 400
#     return jsonify({'success': False, 'msg': 'El correo electrónico no tiene una cuenta asociada'}), 404

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'success': False, 'msg': 'Email y contraseña son requeridos'}), 400

    user = User.query.filter_by(email=email).first()
    
    if user and user.password == password:
        # Crear un token de acceso
        access_token = create_access_token(identity=user.id)
        return jsonify({
            'success': True,
            'user': user.serialize(),
            'token': access_token
        }), 200
    
    return jsonify({'success': False, 'msg': 'Combinación usuario/contraseña no es válida'}), 401

# @api.route('/signup', methods=['POST'])
# def signup():

#     email = request.json.get('email', None)
#     password = request.json.get('password', None)
#     type = request.json.get('type', None)
#     if not email or not password or not type or type is None:
#         return jsonify({'success': False, 'msg': 'Todos los campos son necesarios'}), 400
#     user = User.query.filter_by(email=email).first()
#     if user:
#         return jsonify({'success': False, 'msg': 'El correo electrónico ya tiene una cuenta, intenta iniciar sesión'}), 400
#     new_user = User(email=email, password=password, is_active=True)
#     db.session.add(new_user)
#     db.session.commit()
#     access_token = create_access_token(identity=new_user.id)
#     if type == 'alumno':
#         #crear registro en tabla de alumno con este id como user
#         print(type)
#         return jsonify({'success': True, 'user': new_user.serialize(), 'token': access_token}), 200
#     if type== 'profesor':
#         #crear registro en tabla de profesor con este id como user
#         print(type)
#         return jsonify({'success': True, 'user': new_user.serialize(), 'token': access_token}), 200

@api.route('/signup', methods=['POST'])
def create_user2():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    is_teacher = data.get('is_teacher', False)
    
    if not email or not password:
        return jsonify({"error": "Email and password are required."}), 400
    
    new_user = User(email=email, password=password, is_teacher=is_teacher)
    
    # Add the new user to the session and commit
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify(new_user.serialize()), 201
  
 #Pago con API stripe   
#El backend maneja la creación del PaymentIntent y devuelve el client_secret.
stripe.api_key = os.getenv("STRIPE_PRIVATE") #establece la clave secreta de Stripe, esencial para realizar operaciones seguras con la API de Stripe.

@api.route('/create-payment', methods=['POST']) #copiado del repositorio codespace de JaviSeigle
def create_payment():
    try: # Recibe los datos de la cantidad y moneda.
        data = request.json
        #PODEMOS PASAR TODOS LOS ELEMENTOS QUE PERMITA EL OBJETO DE PAYMENTINTENT.CREATE 
        intent = stripe.PaymentIntent.create(
            amount=data['amount'], # se deberia de calcular el precio en el back, no recibirse del front
            currency=data['currency'],
            automatic_payment_methods={
                'enabled': True
            }
        )
        return jsonify({
            'clientSecret': intent['client_secret'] #Devuelve el client_secret del PaymentIntent, que es necesario en el frontend para confirmar el pago.
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})