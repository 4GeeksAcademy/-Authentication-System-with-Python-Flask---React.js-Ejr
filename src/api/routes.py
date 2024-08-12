from flask import Blueprint, jsonify, request
from api.models import db, User

api = Blueprint('api', __name__)

@api.route("/")
def root():
    return "Home"

@api.route("/users/<int:user_id>", methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify({"msg" : user.serialize()}), 200
    else:
        return jsonify({"error": "User not found"}), 404
    

@api.route("/users/", methods=['GET'])
def get_users():
    users = User.query.all()
    if users:
        return jsonify({"msg":[user.serialize() for user in users]}), 200 
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

    return jsonify({"status": "User created", "user": new_user.to_dict()}), 201

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

    return jsonify({"status": "User updated", "user": user.to_dict()}), 200

@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"status": "User deleted"}), 200
    else:
        return jsonify({"error": "User not found"}), 404
