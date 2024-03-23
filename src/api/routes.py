"""
This module takes care of starting the API Server, Loading the DB, and Adding the endpoints.
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
import hashlib
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_bcrypt import Bcrypt  # Add this import for Bcrypt

api = Blueprint('api', __name__)

# Initialize Bcrypt here
bcrypt = Bcrypt()

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def createUser():
    password = request.json.get("password")
    email = request.json.get("email")

    user = User.query.filter_by(email=email).first()
    if user != None:
        return jsonify({"msg": "email exists"}), 401
    
    user = User(password=password, email = email)
    db.session.add(user)
    db.session.commit()
    
    response_body = {
        "msg": "User successfully added "
    }

    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def handle_login():
    body = request.get_json()
    user = User.query.filter_by(email=body['email']).first()
    if user and bcrypt.check_password_hash(user.password, body['password']):
        access_token = create_access_token(identity=body['email'])
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "Bad email or password"}), 401
    

@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get("email")
    password = request.json.get("password")
    
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        
        return jsonify({"msg": "Bad email or password"}), 401
    
  
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id }) ,200

#private route
@api.route("/private", methods=["GET"])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()    
    user = User.query.get(current_user_id)

    if user == None:
        response_body = {
            "msg": "Please login to continue"
        }
        return jsonify(response_body)
    
    return jsonify({"id": user.id, "email": user.email }), 200


#Contact
@api.route('/contact', methods=['POST'])
def handle_contact_form():
    # Extract data from the request
    name = request.json.get('name')
    email = request.json.get('email')
    message = request.json.get('message')

  
    contact = contact(name=name, email=email, message=message)
    db.session.add(contact)
    db.session.commit()

    # Example: Send email notification
    # Replace this with your actual email sending logic
    def send_email_notification(name, email, message):
    # Assuming you have configured Flask-Mail in your Flask app
        mail = current_app.extensions['mail']

    # Create the message
    msg = Message(subject="New Contact Form Submission",
                  sender=("Your Name", "your_email@example.com"),
                  recipients=["your_recipient_email@example.com"])  # Add your recipient email address here

    # Customize the email body
    msg.body = f"Name: {name}\nEmail: {email}\nMessage: {message}"

    # Send the email
    mail.send(msg)
    send_email_notification(name, email, message)

    # Respond to the client with a success message
    response_body = {
        "message": "Your message has been successfully submitted. We will get back to you soon!"
    }
    return jsonify(response_body), 200
