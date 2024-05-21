from flask import request, jsonify, Blueprint
from api.models import db, User, Electric
from api.utils import APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from flask_cors import CORS

user_bp = Blueprint('users', __name__)
CORS(user_bp)

# Retrieve all registered users:
@user_bp.route('/all_users', methods=['GET'])
def get_all_users():
    query_results = User.query.all()
    results = list(map(lambda item: item.serialize(), query_results))

    if results == []:
        return jsonify("no users in the database"), 404

    response_body = {
        "msg": "ok",
        "results": results
    }

    return jsonify(response_body), 200

# Retrieve a specific user by ID with dynamic URL
@user_bp.route('/user/<int:user_id>', methods=['GET'])
def get_one_user(user_id):
    query_results = User.query.filter_by(id=user_id).first()

    if query_results is None:
        return jsonify({"msg": "there is no user matching the ID provided"}), 404

    response_body = {
        "msg": "ok",
        "results": query_results.serialize()
    }
    return jsonify(response_body), 200

# Delete a specific user with a specific email
@user_bp.route('/user', methods=['DELETE'])
def delete_user():
    data = request.json

    user_exists = User.query.filter_by(email=data["email"]).first()

    if user_exists:
        db.session.delete(user_exists)
        db.session.commit()
        return ({"msg": "ok, it's deleted"}), 200
    else:
        return ({"msg": "there is nothing to delete"}), 200

# Delete all users
@user_bp.route('/users', methods=['DELETE'])
def delete_all_users():
    users_deleted = User.query.delete()
    db.session.commit()

    if users_deleted > 0:
        return ({"msg": "ok, all users have been deleted"}), 200
    else:
        return ({"msg": "there are no users to delete"}), 200

# Create a new user
@user_bp.route('/user', methods=['POST'])
def add_new_user():
    data = request.json
    user_exists = User.query.filter_by(first_name=data["first_name"]).first()

    if user_exists is None:
        new_user = User(
            first_name=data["first_name"],
            last_name=data["last_name"],
            email=data["email"],
            password=data["password"]
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({
            "msg": "New user has been added successfully",
        }), 200
    else:
        return jsonify({"error": "User already exists"}), 400

# Update a specific user
@user_bp.route('/user', methods=['PUT'])
def update_user():
    data = request.json

    user = User.query.filter_by(email=data["email"]).first()

    if user:
        user.first_name = data["first_name"]
        user.last_name = data["last_name"]
        user.email = data["email"]
        user.password = data["password"]

        db.session.commit()
        return ({"msg": "ok, the user has been updated in the database"}), 200
    else:
        return ({"msg": "this user does not exist, you can't update it"}), 404

# User login using email and password, retrieving a token
@user_bp.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    query_results = User.query.filter_by(email=email).first()

    if query_results is None:
        return jsonify({"msg": "Bad Request"}), 404

    if email == query_results.email and password == query_results.password:
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token)
    else:
        return jsonify({"msg": "Bad email or password. I am sorry"}), 401

# Sign up
@user_bp.route("/signup", methods=["POST"])
def signup():
    first_name = request.json.get("first_name", None)
    last_name = request.json.get("last_name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user_exists = User.query.filter_by(email=email).first()

    if user_exists is None:
        new_user = User(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msg": "new user successfully created"})
    else:
        return jsonify({"error": "User already exists"}), 400

# Conditional rendering
@user_bp.route("/valid-token", methods=["GET"])
@jwt_required()
def valid_token():
    current_user = get_jwt_identity()
    query_results = User.query.filter_by(email=current_user).first()
    if query_results is None:
        return jsonify({"msg": "user does not exist", "is_logged": False}), 404

    return jsonify({"is_logged": True}), 200

