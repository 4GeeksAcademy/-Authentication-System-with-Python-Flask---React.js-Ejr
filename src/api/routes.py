"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Owner, Keeper
from api.utils import generate_sitemap, APIException
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token


api = Blueprint('api', __name__)
#Agregado al boilerplate
app = Flask(__name__)
bcrypt = Bcrypt(app)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


# @api.route('/login', methods=["POST"])
# def login_user():
#     data = request.get_json(force=True)
#     user = User.query.filter_by(email=data["email"]).first()
#     if user is None:
#         return jsonify({"msg": "Incorrect user or password"}), 401
#     passwordCheck = bcrypt.check_password_hash(user.password, data["password"])
#     if passwordCheck == False:
#         return jsonify({"msg":"Wrong password"}), 401
#     token = create_access_token(identity = data["dni"], additional_claims={"role":"admin"}) #cambiar por tipo de usuario de los modelos pendientes (Enum)
#     return jsonify({"msg": "Login successful!", "token":token}),200


@api.route('/signup/owner', methods=['POST'])
def create_owner():
    data = request.get_json(force=True)
    email = data["email"].lower()
    if Owner.query.filter_by(email=email).first() is not None:
        return jsonify({"msg":"Email already registered"}), 400
    new_owner= Owner()
    new_owner.first_name = data["first_name"]
    new_owner.last_name =  data["last_name"]
    new_owner.email = data["email"]
    new_owner.password = data["password"]
    new_owner.is_active = True
    user_type = data.get("user_type")
    if user_type == "owner":
        db.session.add(new_owner)
        db.session.commit()
    return jsonify({"msg": "Owner created successfully"}), 201


@api.route('/signup/keeper', methods=['POST'])
def create_keeper():
    data = request.get_json(force=True)
    email = data["email"].lower()
    if Keeper.query.filter_by(email=email).first() is not None:
        return jsonify({"msg":"Email already registered"}), 400
    new_keeper= Keeper()
    new_keeper.first_name = data["first_name"]
    new_keeper.last_name =  data["last_name"]
    new_keeper.email = data["email"]
    new_keeper.password = data["password"]
    new_keeper.hourly_pay = data["hourly_pay"]
    new_keeper.is_active = True
    user_type = data.get("user_type")
    if user_type == "keeper":
        db.session.add(new_keeper)
        db.session.commit()
    return jsonify({"msg": "Keeper created successfully"}), 201


@api.route('/owner', methods=["GET"])
def owners_list():
    owners = Owner.query.all()
    owners_data = [{"id": owner.id, "first_name": owner.first_name, "last_name": owner.last_name, "email": owner.email}
                   for owner in owners]

    return jsonify(owners_data), 200


@api.route('/owner/<int:owner_id>', methods=['GET'])
def get_owner(owner_id):
    owner = Owner.query.get(owner_id)
    owner_data = {
        "id": owner.id,
        "first_name": owner.first_name,
        "last_name": owner.last_name,
        "email": owner.email,
    }
    return jsonify(owner_data), 200


@api.route('/owner/<int:owner_id>', methods=['DELETE'])
def delete_owner(owner_id):
    owner = Owner.query.get(owner_id)
    db.session.delete(owner)
    db.session.commit()
    return jsonify({"msg": "Owner deleted successfully"}), 200



@api.route('/keeper', methods=["GET"])
def keepers_list():
    keepers = Keeper.query.all()
    keepers_data = [{"id": keeper.id, "first_name": keeper.first_name, "last_name": keeper.last_name, "email": keeper.email, "hourly_pay": keeper.hourly_pay}
                   for keeper in keepers]

    return jsonify(keepers_data), 200


@api.route('/keeper/<int:keeper_id>', methods=['GET'])
def get_keeper(keeper_id):
    keeper = Keeper.query.get(keeper_id)
    keeper_data = {
        "id": keeper.id,
        "first_name": keeper.first_name,
        "last_name": keeper.last_name,
        "email": keeper.email,
    }
    return jsonify(keeper_data), 200


@api.route('/keeper/<int:keeper_id>', methods=['DELETE'])
def delete_keeper(keeper_id):
    keeper = Keeper.query.get(keeper_id)
    db.session.delete(keeper)
    db.session.commit()
    return jsonify({"msg": "keeper deleted successfully"}), 200