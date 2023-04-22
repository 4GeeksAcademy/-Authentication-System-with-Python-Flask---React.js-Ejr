import api.domain.user.repository as Repository
from api.models.user import User
import api.domain.farmer.repository as FarmerRepository
from flask import jsonify
import bcrypt

def post_user(body, role):
    if body["email"] is None:
        return jsonify("Null Email!")
    if body["password"] is None:
        return jsonify("Null password")

    hashed = bcrypt.hashpw(body['password'].encode(), bcrypt.gensalt(14)) # encode convierte en bytes
    if role == "farmer":
        user = Repository.sign_in_user(body['email'], hashed, role)
        print(user)
        farmer = FarmerRepository.add_farmer(body, user.id)
        print(farmer)
        return jsonify("Register completed"), 200


    