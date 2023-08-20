"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash
import bcrypt

api = Blueprint('api', __name__)

## USER ENDPOINTS

@api.route("/user", methods=["POST"])
def create_user():
    body = request.json
    user_name = body.get("user_name", None)
    first_name = body.get("first_name", None)
    last_name = body.get("last_name", None)
    email = body.get("email", None)
    password = request.json.get("password", None)
    if user_name is None or first_name is None or last_name is None or email is None or password is None:
        return jsonify({
            "message": "Something is missing"
        }), 400
    salt = str(bcrypt.gensalt(14))
    password_hash = generate_password_hash(password + salt)
    user_exist = User.query.filter_by(user_name=user_name).one_or_none()
    email_exist = User.query.filter_by(email=email).one_or_none()
    if user_exist is not None or email_exist is not None:
        return jsonify({
            "message": "User already exists"
        }), 400
    user = User(
        user_name = user_name,
        first_name = first_name,
        last_name = last_name,
        email = email, 
        password = password_hash,
        salt = salt
        )
    try:
        db.session.add(user)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return jsonify({
            "message": "internal error",
            "error": error.args
        }), 500
    return jsonify({}), 201

@api.route("/user/<int:id>", methods=["GET"])
def get_user(id):
    if id is None: 
        return jsonify({
            "message": "id is required"
        }), 400
    user = User.query.get(id)
    if user is None:
         return jsonify(""), 404
    return jsonify(user.serialize()), 200