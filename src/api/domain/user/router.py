from flask import request
from api.models.user import User
import api.domain.user.controller as Controller
from flask_jwt_extended import create_access_token, jwt_required, get_jwt
import bcrypt

def user_router(app):
    # SIGNUP USER
    @api.route('/user/signup', methods=['POST'])
    def register():
        body = request.get_json()
        hashed = bcrypt.hashpw(body['password'].encode(), bcrypt.gensalt(14)) # encode convierte en bytes
        new_user = User(body['email'],hashed.decode()) # decode para guardar psswd encriptado

        return Controller.post_user(body)

    ## FOR FUTURE PROPOUSES
    @api.route('/private/<int:id>', methods=['GET'])
    @jwt_required()
    def get_user_id(id):
        user = User.query.get(id)
        token = get_jwt()
        print(token)
        return jsonify(user.serialize()), 201