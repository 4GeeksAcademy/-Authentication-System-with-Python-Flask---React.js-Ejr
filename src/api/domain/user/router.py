from flask import Flask, request, jsonify, url_for, Blueprint
from api.models.user import User
import api.domain.user.controller as Controller
from flask_jwt_extended import create_access_token, jwt_required, get_jwt



api = Blueprint("api/user", __name__)

# SIGNUP USER
@api.route('/signup/farmer', methods=['POST'])
def register():
    body = request.get_json()
    print(body)
    return Controller.post_user(body, "farmer")

## FOR FUTURE PROPOUSES TODO
@api.route('/private/<int:id>', methods=['GET'])
@jwt_required()
def get_user_id(id):
    user = User.query.get(id)
    token = get_jwt()
    print(token)
    return jsonify(user.serialize()), 201