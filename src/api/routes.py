from flask import Blueprint, jsonify, request
from api.models import db, User
from models import db, User
from auth import token_required, permission_required
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

# Root Route
@api.route("/")
def root():
    return "Home" #aqui colocar el HOME  PAGE

# Get Single User by ID
@api.route("/users/<int:user_id>", methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify({"msg": user.serialize()}), 200
    else:
        return jsonify({"error": "User not found"}), 404

# Get All Users
@api.route("/users/", methods=['GET'])
def get_users():
    users = User.query.all()
    if users:
        return jsonify({"msg": [user.serialize() for user in users]}), 200
    else:
        return jsonify({"error": "User not found"}), 404

# Create New User
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

# Update Existing User
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

# Delete User
@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"status": "User deleted"}), 200
    else:
        return jsonify({"error": "User not found"}), 404

# Protected Routes

@api.route('/crear_curso', methods=['POST'])
@token_required
@permission_required('crear_curso')
def crear_curso(current_user):
    return jsonify({"message": "Curso creado exitosamente"})

@api.route('/ver_curso', methods=['GET'])
@token_required
@permission_required('ver_curso')
def ver_curso(current_user):
    return jsonify({"message": "Aquí están los cursos"})

# Authentication Routes

@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    user = User.query.filter_by(email=email).first()
    if user:
        if user.password == password:
            access_token = create_access_token(identity=user.id)
            if user.is_teacher:
                return jsonify({'success': True, 'user': user.serialize(), 'token': access_token, 'redirect': 'teacher_dashboard'}), 200
            else:
                return jsonify({'success': True, 'user': user.serialize(), 'token': access_token, 'redirect': 'student_dashboard'}), 200
        return jsonify({'success': False, 'msg': 'Combinación usuario/contraseña no es válida'}), 400
    return jsonify({'success': False, 'msg': 'El correo electrónico no tiene una cuenta asociada'}), 404

@api.route('/signup', methods=['POST'])
def signup():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    is_teacher = request.json.get('is_teacher', False)
    if not email or not password:
        return jsonify({'success': False, 'msg': 'Todos los campos son necesarios'}), 400

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({'success': False, 'msg': 'El correo electrónico ya tiene una cuenta, intenta iniciar sesión'}), 400

    new_user = User(email=email, password=password, is_teacher=is_teacher, is_active=True)
    db.session.add(new_user)
    db.session.commit()
    access_token = create_access_token(identity=new_user.id)
    if is_teacher:
        return jsonify({'success': True, 'user': new_user.serialize(), 'token': access_token, 'redirect': 'teacher_dashboard'}), 200
    else:
        return jsonify({'success': True, 'user': new_user.serialize(), 'token': access_token, 'redirect': 'student_dashboard'}), 200
