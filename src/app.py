"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import datetime
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from werkzeug.security import generate_password_hash, check_password_hash



# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:postgres@localhost:5433/dbp4g"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


jwt = JWTManager (app)
CORS(app)

app.config['JWT_SECRET_KEY'] = os.getenv('SECRET_KEY')

@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')




@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


@app.route('/api/login', methods=['POST'])
def login():
    email = request.json.get("email") # None
    password = request.json.get("password") # None
    
    if not email:
        return jsonify({ "error": "email es obligatorio"}), 400
    
    if not password:
        return jsonify({ "error": "Password es obligatorio"}), 400
    
    userFound = User.query.filter_by(email=email).first()
    
    if not userFound:
        return jsonify({ "error": "email/password son incorrectos!!"}), 401
    
    if not check_password_hash(userFound.password, password):
        return jsonify({ "error": "email/password son incorrectos!!"}), 401
    
    expires = datetime.timedelta(days=3)
    access_token = create_access_token(identity=userFound.id, expires_delta=expires)
    
    data = {
        "access_token": access_token,
        "user": userFound.serialize()
    }
    
    return  jsonify(data), 200

@app.route('/api/register', methods=['POST'])
def register():
    
    email = request.json.get("email") # None
    password = request.json.get("password") # None
    
    if not email:
        return jsonify({ "error": "email es obligatorio"}), 400
    
    if not password:
        return jsonify({ "error": "Password es obligatorio"}), 400
    
    userFound = User.query.filter_by(email=email).first()
    
    if userFound:
        return jsonify({ "error": "email already exists"}), 400
    
    user = User()
    user.email = email
    user.password = generate_password_hash(password)
    
    db.session.add(user)
    db.session.commit()
    
    expires = datetime.timedelta(days=3)
    access_token = create_access_token(identity=user.id, expires_delta=expires)
    
    data = {
        "access_token": access_token,
        "user": user.serialize()
    }
    
    return  jsonify(data), 200
        

@app.route('/api/profile', methods=['GET'])
@jwt_required()
def profile():
    
    id = get_jwt_identity()
    user = User.query.get(id)
    
    return jsonify({ "data": "Hola Mundo", "user": user.serialize() })



# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)



