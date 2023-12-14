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
def signup_patient():
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


        return jsonify ({"Message":"Patient was created Succesfully!","First name": first_name,"Last name": last_name, "email":email}),200


    except Exception as e:
        return jsonify({"Error":"Error in patient creation" + str(e)}),400




@api.route("signup_specialist",methods=["POST"])
def signup_specialist():
    try:
        first_name=request.json.get("first_name")
        last_name=request.json.get("last_name")
        email=request.json.get("email")
        password=request.json.get("password")
        is_physiotherapist=request.json.get("is_physiotherapist")    
        is_nurse=request.json.get("is_nurse")   
        certificate=request.json.get("certificate")
        description=request.json.get("description")
        language=request.json.get("language") 
        
        if not first_name or not last_name or not email or not password:
            return jsonify ({"Error":"You are missing information, check it out"}),400


        existing_specialist=Specialist.query.filter_by(email=email).first()

        if existing_specialist:
            return jsonify ({"Error":"The Specialist already exist!"}),400
        
        password_hash=bcrypt.generate_password_hash(password).decode("utf-8")
        new_specialist=Specialist(email=email,first_name=first_name,last_name=last_name,password=password_hash,is_physiotherapist=is_physiotherapist,is_nurse=is_nurse,certificate=certificate,description=description,language=language)
        db.session.add(new_specialist)
        db.session.commit()

        return jsonify({"Message":"The Specialist was created succesfully!", "email":email,"first_name":first_name, "last_name": last_name,"is_physiotherapist":is_physiotherapist,"is_nurse":is_nurse,"certificate":certificate,"description":description,"language":language}),200

    except Exception as e: 
        return jsonify({"Error": "Error in Specialist creation " + str(e)}),400

