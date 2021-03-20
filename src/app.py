"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import re
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from flask_swagger import swagger
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.models import User
#Tipo_Cobro, Category, Subcategory, Servicio_registrados, Relacion_registrados_subcategory, User_Sericios_Registrados, Sericios_prestados, Favoritos

BASEDIR = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
#app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(BASEDIR, "test.db")
app.config["DEBUG"] = True
app.config["ENV"] = "development"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = "secret-key"
app.config['JWT_SECRET_KEY'] = 'encrypt'

ENV = os.getenv("FLASK_ENV")
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False
# database condiguration
if os.getenv("DATABASE_URL") is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

MIGRATE = Migrate(app, db)
db.init_app(app)
manager = Manager(app)
manager.add_command('db', MigrateCommand)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
# Allow CORS requests to this API
CORS(app)

@app.route('/signup', methods=['POST'])
def signup():
      ereg = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
      preg = '^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$'
      user = User()
      #Checking email 
      if (re.search(ereg,request.json.get("email"))):
           user.email = request.json.get("email")
      else:
          return "Invalid email format", 400
      #Checking password
      if (re.search(preg,request.json.get('password'))):
          pw_hash = bcrypt.generate_password_hash(request.json.get("password"))
          user.password = pw_hash
      else:
          return "Invalid password format", 400

      user.username = request.json.get("username", None )
      user.name = request.json.get("name")
      user.age = request.json.get("age")
      user.bio = request.json.get("bio")

      db.session.add(user)
      db.session.commit()

      return jsonify({"success":True}), 201

# # add the admin
# setup_admin(app)

# # Add all endpoints form the API with a "api" prefix
# app.register_blueprint(api, url_prefix='/api')

# # Handle/serialize errors like a JSON object
# @app.errorhandler(APIException)
# def handle_invalid_usage(error):
#     return jsonify(error.to_dict()), error.status_code

# # generate sitemap with all your endpoints
# @app.route('/')
# def sitemap():
#     if ENV == "development":
#         return generate_sitemap(app)
#     return send_from_directory(static_file_dir, 'index.html')

# # any other endpoint will try to serve it like a static file
# @app.route('/<path:path>', methods=['GET'])
# def serve_any_other_file(path):
#     if not os.path.isfile(os.path.join(static_file_dir, path)):
#         path = 'index.html'
#     response = send_from_directory(static_file_dir, path)
#     response.cache_control.max_age = 0 # avoid cache memory
#     return response

# # this only runs if `$ python src/main.py` is executed
# if __name__ == '__main__':
#     PORT = int(os.environ.get('PORT', 3001))
#     app.run(host='0.0.0.0', port=PORT, debug=True)
