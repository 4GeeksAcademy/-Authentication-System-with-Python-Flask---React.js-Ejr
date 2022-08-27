"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

import cloudinary
import cloudinary.uploader
import cloudinary.api
import logging
import os
import uuid

from os.path import exists
from flask import Flask, request, jsonify, url_for, send_from_directory, render_template
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, Walker, Owner, Dog
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from dotenv import load_dotenv
from cloudinary.utils import cloudinary_url
from werkzeug.utils import secure_filename

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager


from flask_bcrypt import Bcrypt

#from models import Person

ENV = os.getenv("FLASK_ENV")
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

bcrypt = Bcrypt(app)
app.config["JWT_SECRET_KEY"] = "dogger_dogger"
jwt = JWTManager(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type = True)
db.init_app(app)

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER_OWNER'] = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'public/owner')
app.config['UPLOAD_FOLDER_WALKER'] = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'public/walker')
app.config['UPLOAD_FOLDER_DOG'] = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'public/dog')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory
    return response


@app.route('/walkers', methods=['POST'])
def create_walker():
    body = request.form

    if body is None:
        raise APIException('You need to specify the request body as a json object', status_code=400)
    if 'first_name' not in body:
        raise APIException('Campo requerido', status_code=400)
    if 'last_name' not in body:
        raise APIException('Campo reqerido', status_code=400)
    if 'email' not in body:
        raise APIException('Campo requerido', status_code=400)
    if 'password' not in body:
        raise APIException('Campo requerido', status_code=400)
    if body['verify_password'] != body['password']:
        raise APIException('Las contrasñas no coinciden', status_code=400)
#    if len(body['password']) < 6:
#        raise APIException('El password tiene que tener al menos 6 caracteres', status_code=400)
    if 'username' not in body:
        raise APIException('Campo requerido', status_code=400)
#    if len(body['username']) < 6:
#        raise APIException('El usuario tiene que tener al menos 6 caracteres', status_code=400)
    if 'file' not in request.files:
        raise APIException("No has enviado un archivo", status_code=400)
        
    file = request.files['file']

    if file.filename == '':
        raise APIException("Archivo sin nombre", status_code=400)
        
    if file and allowed_file(file.filename):
        filename = str(uuid.uuid4()) + '.' + file.filename.rsplit('.', 1)[1].lower()

        file.save(os.path.join(app.config['UPLOAD_FOLDER_WALKER'], filename)) 

    walker_email = Walker.query.filter_by(email= body['email']).first()
    if walker_email != None:
        raise APIException('Ya existe una cuenta con ese correo', status_code=400)

    walker_username = Walker.query.filter_by(username = body['username']). first()

    if walker_username != None:
        raise APIException('Ese usuario ya existe', status_code=400)
    
    owner_username = Owner.query.filter_by(username = body['username']). first()

    if owner_username != None:
        raise APIException('Ese usuario ya existe', status_code=400)

    pw_hash = bcrypt.generate_password_hash(body['password']).decode('utf-8')


    new_walker = Walker(first_name = body['first_name'], last_name = body['last_name'], username = body['username'], email = body['email'], password = pw_hash, verify_password = body['verify_password'], is_active = True, file = filename)
    db.session.add(new_walker)
    db.session.commit()

    response_body = {
        'results': new_walker.serialize(),
    }
    return jsonify(response_body), 200

@app.route('/walker/download/<filename>', methods=['GET'])
def download_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER_WALKER"], filename)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/owners', methods=['POST'])
def create_owner():
    body = request.form

    if body is None:
        raise APIException('You need to specify the request body as a json object', status_code=400)
    if 'first_name' not in body:
        raise APIException('Nombre requerido', status_code=400)
    if 'last_name' not in body:
        raise APIException('Apellido reqerido', status_code=400)
    if 'email' not in body:
        raise APIException('Correo requerido', status_code=400)
    if 'password' not in body:
        raise APIException('Contraseña requerida', status_code=400)
    if body['verify_password'] != body['password']:
        raise APIException('Las contrasñas no coinciden', status_code=400)
    if 'username' not in body:
        raise APIException('Nombre de usuario requerido', status_code=400)
    if 'file' not in request.files:
        raise APIException("No has enviado un archivo", status_code=400)
        
    file = request.files['file']

    if file.filename == '':
        raise APIException("Archivo sin nombre", status_code=400)
        
    if file and allowed_file(file.filename):
        filename = str(uuid.uuid4()) + '.' + file.filename.rsplit('.', 1)[1].lower()

        file.save(os.path.join(app.config['UPLOAD_FOLDER_OWNER'], filename)) 
    
    owner = Owner.query.filter_by(email= body['email']).first()
    if owner != None:
        raise APIException('Ya existe el usuario, puedes iniciar sesión', status_code=400)

    owner_username = Owner.query.filter_by(username = body['username']).first()
    if owner_username != None:
        raise APIException('Ese usuario ha sido tomado', status_code=400)
    
    walker_username = Walker.query.filter_by(username = body['username']).first()
    if walker_username != None:
        raise APIException('Ese usuario ha sido tomado', status_code=400)

    walker_email = Walker.query.filter_by(email=body['email']).first()
    if walker_email != None:
        raise APIException('Ya existe una cuenta con ese correo', status_code=400)

    pw_hash = bcrypt.generate_password_hash(body['password']).decode('utf-8')

    new_owner = Owner(first_name = body['first_name'], last_name = body['last_name'], email = body['email'], username = body['username'], password = pw_hash, verify_password = body['verify_password'], is_active = True, file = filename)
    db.session.add(new_owner)
    db.session.commit()

    response_body = {
        'results': new_owner.serialize(),
        'owner_id': new_owner.id
    }
    return jsonify(response_body), 200

@app.route('/owner/download/<filename>', methods=['GET'])
def download_owner_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER_OWNER"], filename)


@app.route('/dogs', methods=['POST'])
def create_dog():
    body = request.form

    if body is None:
        raise APIException('You need to specify the request body as a json object', status_code=400)
    if 'name' not in body:
        raise APIException('Campo requerido', status_code=400)
    if 'breed' not in body:
        raise APIException('Campo reqerido', status_code=400)
    if 'age' not in body:
        raise APIException('Campo requerido', status_code=400)
    if 'file' not in request.files:
        raise APIException("No has enviado un archivo", status_code=400)
    if 'owner_id' not in body:
        raise APIException("Este perro no tiene dueno", status_code=400)

    file = request.files['file']

    if file.filename == '':
        raise APIException("Archivo sin nombre", status_code=400)
        
    if file and allowed_file(file.filename):
        filename = str(uuid.uuid4()) + '.' + file.filename.rsplit('.', 1)[1].lower()

        file.save(os.path.join(app.config['UPLOAD_FOLDER_DOG'], filename)) 
    
    new_dog = Dog(name = body['name'], breed = body['breed'], age = body['age'], file = filename, owner_id = body['owner_id'])
    db.session.add(new_dog)
    db.session.commit()

    response_body = {
        'results': new_dog.serialize()
    }
    return jsonify(response_body), 200

@app.route('/dogs/download/<filename>', methods=['GET'])
def download_dog_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER_DOG"], filename)



@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    walker = Walker.query.filter_by(email=email).first()
    owner = Owner.query.filter_by(email=email).first()

    if walker is None and owner is None:
        raise APIException('El usuario no existe', status_code=400)
    if password is None:
        raise APIException('Se requiere la contraseña', status_code=400)

    if walker is None:
        userFound = owner
        usertype = "owner"
    else: 
        userFound = walker
        usertype = "walker"

    is_correct = bcrypt.check_password_hash(userFound.password, password)
    if is_correct == False:
        return jsonify({'msg': 'Correo o contraseña incorrectos'}), 401

    access_token = create_access_token(identity=email)

    body_response = {

        "access_token": access_token,
        "user_type": usertype,
        "user_id": userFound.id
        }


    return jsonify(body_response)


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
