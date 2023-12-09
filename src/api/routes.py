"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

api = Blueprint('api', __name__)
jwt = JWTManager()
bcrypt = Bcrypt()

def create_app():
    app = Flask(__name__)
    app.config['JWT_SECRET_KEY'] = 'jwt_password'
    jwt.init_app(app)
    return app

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def create_user():
    email = request.json.get("email")
    password = request.json.get("password")
    first_name = request.json.get("first_name")
    last_name = request.json.get("last_name")
    date_of_birth = request.json.get("date_of_birth")
    pathologies = request.json.get("pathologies")

    existing_user = User.query.filter_by(email=body.email).first()
    if existing_user:
        return jsonify({'error': 'Email already exists.'}), 409

    if existing_user and body.password:

    
        raw_password = body.get('password')
        password_hash = bcrypt.generate_password_hash(raw_password).decode('utf-8')
        new_user = User(
            # id_user = body['id_user'],
            first_name = body["first_name"],
            last_name = body["last_name"],
            date_of_birth = body["date_of_birth"],
            email = body["email"],
            pathologies = body["pathologies"],
            password = password_hash, 
            # password = body["password"], 
            # is_admin = body["is_admin"]
        )


        db.session.add(new_user)
        db.session.commit()
        return jsonify({"first_name": new_user.first_name}), 200
