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

# PASSWORD RECOVERY ENDPOINT


@api.route('/recover', methods=['POST'])
def recover_user():
    user_email = request.json.get('email', None)
    user_recovery_question = request.json.get('recovery_question', None)
    user_recovery_answer = request.json.get('recovery_answer', None)
    active_user = User.query.filter_by(email=user_email).first()
    user = User.query.filter_by(
        email=user_email, recovery_question=user_recovery_question, recovery_answer=user_recovery_answer)
    if user is None:
        return jsonify({"Error": "No email or password found"}), 401
    db.session.query()
    db.session.commit()
    return jsonify({"msg": "Successfully recovered password"}), 200
