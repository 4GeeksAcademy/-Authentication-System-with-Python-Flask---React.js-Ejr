"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token 
import random
import secrets

api = Blueprint('api', __name__)

# user registration
@api.route("/userregistration", methods=['POST'])
def register_user():

    username = request.json.get("username", None)
    fullname = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if email is None:
        return jsonify({"msg": "Please provide a valid email."}), 400
    if password is None:
        return jsonify({"msg": "Please provide a valid password."}), 400
    
    user = User.query.filter_by(username=username, password=password).first()

    if user:
        return jsonify({"msg": "User already exists."}), 401
    else:
        new_user = User()
        new_user.username = username
        new_user.fullName = fullname
        new_user.email = email
        new_user.password = password
        new_user.is_Admin = True

        db.session.add(new_user)
        db.session.commit()
    return jsonify({"msg": "User account was successfully created."}), 200

# user log in
@api.route('/userlogin', methods=['POST']) 
def login_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # valida si estan vacios los ingresos
    if email is None:
        return jsonify({"msg": "Please provide a valid email."}), 400
    if password is None:
        return jsonify({"msg": "Please provide a valid password."}), 400
        
    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        return jsonify({"msg": "Invalid username or password"}), 401
    else:
        # crear token
        my_token = create_access_token(identity=user.username)
        return jsonify({"token": my_token}), 200

# user forgot password
@api.route("/forgotPassword", methods=["POST"])
def returnPassword():
    email = request.json.get("email", None)    
    
    if email is None:
        return jsonify({"msg": "Please provide a valid email."}), 400
    
    user =  User.query.filter_by(email=email).first()
    
    if user:
        recoverKey="pur@v1d@m@rt" + str(secrets.token_hex(16))
        user.password=recoverKey
        db.session.commit() 

        return jsonify(recoverKey), 200        
       
    else:   
        return jsonify({"msg": "Your email is not register in our records."}), 404       
 
 
# get user password reset
@api.route("/reset", methods=["POST"])
def resetPassword():
    email = request.json.get("email", None)
    tempPassword = request.json.get("tempPassword", None)
    newPassword = request.json.get("newPassword", None)    

    if email is None:
        return jsonify({"msg": "Please provide a valid email."}), 400
    if tempPassword is None:
        return jsonify({"msg": "Invalid temporary password"}), 400
    if newPassword is None:
        return jsonify({"msg": "Please provide a new password"}), 400

    user = User.query.filter_by(email=email, password=tempPassword).first()
    if user is None:
        return jsonify({"msg": "Invalid username or password"}), 401
    else:
        user.password=newPassword
        db.session.commit()
        return jsonify({"msg": "Password has been successfully changed."}), 200