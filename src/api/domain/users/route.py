from flask import Flask, request, jsonify, Blueprint
import api.utilities.handle_response as Response
import api.domain.users.controller as Controller
from api.models.index import User
from flask_jwt_extended import jwt_required, get_jwt_identity
import bcrypt

api = Blueprint('api/users', __name__)

@api.route("/register", methods=["POST"])
def create_new_user():
    body = request.get_json()
    
    user = Controller.create_new_user(body, 'client')
    
    if isinstance(user, User):
        return Response.response_ok('User has been created in database.', user.serialize())
    else:
        return Response.response_error(user['msg'], user['status'])

@api.route('/', methods=["GET"])
def get_users_list():
    return Controller.get_users_list()

@api.route('/<int:user_id>', methods=['GET'])
def get_single_user(user_id):
    user = Controller.get_single_user(user_id)
    return user.serialize()

@api.route('/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    update_user = request.get_json()
    current_user = get_jwt_identity()
    current_user_id = current_user["id"]

    user = Controller.update_user(update_user, user_id, current_user_id)

    if isinstance(user, User):
        return Response.response_ok(f'User with id: {user_id}, has been updated in database.', user.serialize())
    else:
        return Response.response_error(user['msg'], user['status']) 

@api.route('/delete/<int:user_id>', methods=['PUT'])
@jwt_required()
def delete_user(user_id):
    current_user = get_jwt_identity()
    current_user_id = current_user["id"]

    user = Controller.delete_user(user_id, current_user_id)
    print(user)
    if isinstance(user, User):
        return Response.response_ok(f'User with id: {user_id}, was deleted from database.', user.serialize())
    else:
        return Response.response_error(user['msg'], user['status'])

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    token_and_role_type = Controller.login(body)

    if token_and_role_type.get('token'):
        return Response.response_ok('This is a valid token', token_and_role_type)
    return Response.response_error(token_and_role_type['msg'], token_and_role_type['status'])



