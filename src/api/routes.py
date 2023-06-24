"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/configuration/<int:user_id>', methods=['GET'])
def configuration(user_id):
    user=User.query.filter_by(id = user_id).first()
    response_body = {
        "data": user.serialize()
    }

    return jsonify(response_body), 200


@api.route('/configuration/<int:user_id>', methods=['PUT'])
def update_configuration(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"message": "User not found"}), 404

    data = request.get_json()
    nameandsur = data.get('nameandsur')
    email = data.get('email')
    id_document = data.get('id_document')
    id_number = data.get('id_number')
    address = data.get('address')
    phone = data.get('phone')

    if nameandsur:
        user.nameandsur = nameandsur
    if email:
        user.email = email
    if id_document:
        user.id_document = id_document
    if id_number:
        user.id_number = id_number
    if address:
        user.address = address
    if phone:
        user.phone = phone

    try:
        db.session.commit()
        return jsonify({"message": "User updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error updating user"}), 500