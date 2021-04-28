from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, ma
from api.models import User, Supermarket
from api.utils import generate_sitemap, APIException

from api.models import UserSchema
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager

api = Blueprint('api', __name__)

#login route
@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    user = db.session.query(User).filter(User.email==email, User.password==password).first()
    if user is None:
        return jsonify({"Message": "Email or password wrong"}), 401

    return 'something'


@api.route('/user/<int:id>', methods=['GET'])
def get_users(id):
    users = User.query.get(id)
    users_schema = UserSchema()
    output = users_schema.dump(users)
    return jsonify({"Result": output})
