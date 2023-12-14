"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import secrets
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Patient, Specialist
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from jwt.exceptions import ExpiredSignatureError
from flask_jwt_extended import  JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
import logging

api = Blueprint('api', __name__)


# Allow CORS requests to this API
CORS(api)
app=Flask(__name__)
secret_keys=secrets.token_hex(32)
app.config["JWT_SECRET_KEY"]= secret_keys
jwt= JWTManager(app)
bcrypt=Bcrypt(app)





@api.route('/hello', methods=[ 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/signup_patient", methods=["POST"])
def signup():
    try:
        first_name=request.json.get("first_name")
        last_name=request.json.get("last_name")
        email=request.json.get("email")
        password=request.json.get("password")

        if not first_name or not last_name or not email or not password:
            return jsonify ({"Error":"You are missing information, check it out"}),400
        
        existing_patient=Patient.query.filter_by(email=email).first()
        if existing_patient:
            return jsonify ({"Error": "The email already exist"})
        
        password_hash=bcrypt.generate_password_hash(password).decode("utf-8")
        new_patient=Patient(first_name=first_name,last_name=last_name,email=email,password=password_hash)
        db.session.add(new_patient)
        db.session.commit()


        return jsonify ({"Message":"Patient was created Succesfully!","Patient first name": first_name,"Patient last name": last_name}),200


    except Exception as e:
        return jsonify({"Error":"Error in patient creation" + str(e)}),400




