"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, render_template, redirect, jsonify, url_for, Blueprint
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required, unset_jwt_cookies
from api.models import db, User
from api.utils import generate_sitemap, APIException, get_hash, hash_password, verify_password
from utils import get_openai_response
from flask_cors import CORS

app = Flask(__name__)
jwt = JWTManager(app)

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/signup", methods=["POST"])
def signup():
    email = request.json.get("email")
    password = request.json.get("password")

    hashed_password = hash_password(password)

    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"Success": "User created successfully"}), 200


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()

    if not user or not verify_password(user.password, password):
        return jsonify({"error": "Invalid email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

@api.route("/any-route", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@api.route("/get-hash", methods=["POST"])
def handle_get_hash():
    to_hash = request.json.get("string")
    return get_hash(to_hash)

@api.route("/private", methods=["GET"])
@jwt_required()
def private_route():
    current_user = get_jwt_identity()
    return jsonify(message=f"Hello {current_user}, this is a private route!")

@api.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    current_user = get_jwt_identity()

    def perform_logout():
        response = jsonify({"message": "Logout successful"})
        unset_jwt_cookies(response)
        return response, 200

    return perform_logout()

@app.route('/createItinerary', methods=['GET'])
def create_itinerary():
    if request.method == 'GET':

        assistant_reply = get_openai_response()

        return(assistant_reply)

if __name__ == "__main__":
    app.run(debug=True)