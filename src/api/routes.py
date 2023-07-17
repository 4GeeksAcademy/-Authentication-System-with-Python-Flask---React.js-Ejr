"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from flask_sqlalchemy import SQLAlchemy
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import get_jwt_identity, jwt_required, JWTManager, create_access_token

app = Flask(__name__)
api = Blueprint('api', __name__)

# Ruta a tu base de datos SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///https://jorgesamper-silver-space-couscous-qxprvgxjxxf4xg5-3001.preview.app.github.dev/'  
db = SQLAlchemy(app)

# Configuración de clave secreta para JWT
app.config['JWT_SECRET_KEY'] = '12345'
jwt = JWTManager(app)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def user_signup():
    user = User(
        email=request.json.get("email"),
        password=request.json.get("password"),
        is_active=True
    )
    db.session.add(user)
    db.session.commit()
    response_body = {
        "message": "User register Ok",
        "id": user.id,
        "email": user.email
    }
    return jsonify(response_body), 200

@api.route("/login", methods=["POST"])
def login():

    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email, password=password).first()

    if not user:
        return jsonify({"msg": "Bad email or password"}), 401
    
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 201

# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.

@api.route("/private", methods=["GET"])
@jwt_required()
def protected():

    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify(logged_in_as=current_user_id), 200

if __name__ == "__main__":
    api.run()