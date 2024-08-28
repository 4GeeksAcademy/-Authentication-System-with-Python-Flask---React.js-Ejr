from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required
from api.models import db, User

# Crear el Blueprint para la API
api = Blueprint('api', __name__)

@api.route("/")
def root():
    return "Home"

@api.route("/users/<int:user_id>", methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify({"msg": user.serialize()}), 200
    else:
        return jsonify({"error": "User not found"}), 404

@api.route("/users/", methods=['GET'])
def get_users():
    users = User.query.all()
    if users:
        return jsonify({"msg": [user.serialize() for user in users]}), 200
    else:
        return jsonify({"error": "User not found"}), 404

@api.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    if not data or 'id' not in data or 'name' not in data or 'telefono' not in data:
        return jsonify({"error": "Invalid data"}), 400
    user_id = data['id']
    if User.query.get(user_id):
        return jsonify({"error": "User already exists"}), 400
    new_user = User(id=user_id, name=data['name'], telefono=data['telefono'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"status": "User created", "user": new_user.serialize()}), 201

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
@api.route('/profesor', methods=['POST'])
@jwt_required()
def crear_curso():
    return jsonify({"message": "Curso creado exitosamente"})

@api.route('/ver_curso', methods=['GET'])
@jwt_required()
def ver_curso():
    return jsonify({"message": "Aquí están los cursos"})

@api.route('/login', methods=['POST'])
def login():
    print("Request JSON:", request.json)
    email = request.json.get('email')
    password = request.json.get('password')
    user = User.query.filter_by(email=email).first()
    if user:
        if user.password == password:
            access_token = create_access_token(identity=user.id)
            return jsonify({'success': True, 'user': user.serialize(), 'token': access_token}), 200
        return jsonify({'success': False, 'msg': 'Combinación usuario/contraseña no es válida'}), 400
    return jsonify({'success': False, 'msg': 'El correo electrónico no tiene una cuenta asociada'}), 404


@api.route('/signup', methods=['POST'])
def signup():

    email = request.json.get('email', None)
    password = request.json.get('password', None)
    type = request.json.get('type', None)
    if not email or not password or not type or type is None:
        return jsonify({'success': False, 'msg': 'Todos los campos son necesarios'}), 400
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({'success': False, 'msg': 'El correo electrónico ya tiene una cuenta, intenta iniciar sesión'}), 400
    new_user = User(email=email, password=password, is_active=True)
    db.session.add(new_user)
    db.session.commit()
    access_token = create_access_token(identity=new_user.id)
    if type == 'alumno':
        #crear registro en tabla de alumno con este id como user
        print(type)
        return jsonify({'success': True, 'user': new_user.serialize(), 'token': access_token}), 200
    if type== 'profesor':
        #crear registro en tabla de profesor con este id como user
        print(type)
        return jsonify({'success': True, 'user': new_user.serialize(), 'token': access_token}), 200
