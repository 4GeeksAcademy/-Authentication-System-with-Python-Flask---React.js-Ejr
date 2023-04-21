import api.domain.user.repository as Repository
from flask import jsonify

def post_user(body):
    if body["email"] is None:
        return jsonify("Null Email!")
    if body["password"] is None:
        return jsonify("Null password")
    return Repository.log_in_user(body), 201