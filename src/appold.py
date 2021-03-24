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
from flask_jwt_extended import (JWTManager, jwt_required, create_access_token,get_jwt_identity)
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.models import Tipo_User, User, Tipo_Cobro, Category, Subcategory, Servicio_registrados, Relacion_registrados_subcategory, Sericios_prestados, Favoritos

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
CORS(app)

@app.route('/')
def main():
    return "hola pagina principal"

@app.route('/register', methods=['POST'])
def signup():
        email_reg = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
        password_reg = '^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$'
        confirmar_password = '^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$'

        if not re.search(confirmar_password, request.json.get("confirmar_password")): 
            return jsonify({"msg": "El formato de la confirmación no es valido"}), 401

        if re.search(email_reg, request.json.get("email")):
            _email = request.json.get("email")
        else:
            return jsonify({"msg": "Este correo no tiene formato valido"}), 401

        if re.search(password_reg, request.json.get("password")):
            _username = request.json.get("username")
            if not request.json.get("password") == request.json.get("confirmar_password"):
                return jsonify({"msg": "Las contraseñas no coinciden"}), 401
                
            password_hash = bcrypt.generate_password_hash(
            request.json.get("password"))
            _password = password_hash
        else:
            return jsonify({"msg": "El formato de la password no es valido"}), 401


@app.route('/api/users', methods=["GET"])
@jwt_required()
def get_all_users():
        return jsonify({"Users": User.get_all_users()})

@app.route('/users/<int:id>', methods=["GET"])
@jwt_required()
def get_user_by_id(id):
        user = User.get_user(id)
        return jsonify(user)

@app.route('/users/<int:id>', methods=["PUT"])
@jwt_required()
def update_user(id):
        email_reg = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
        password_reg = '^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$'

        if request.json.get("email") is not None:
            if re.search(email_reg, request.json.get("email")):
                email = request.json.get("email")
        else:
            return jsonify({"msg": "Este correo no tiene formato válido"}), 401

        if request.json.get("password") is not None:
            if re.search(password_reg, request.json.get("password")):
                password_hash = bcrypt.generate_password_hash(
                request.json.get("password"))
                _password = password_hash
        else:
            return jsonify({"msg": "El formato de la contraseña no es válido, debe ser alfanumérica"}), 401

            _email = request.json.get(
            "email") if not request.json.get("email") else _email
            _password = request.json.get("password") if not request.json.get(
            "password") else _password
            _username = request.json.get("username", None)
            _isActivo = request.json.get("isAdmin", None)

            User.update_user(id, _email, _username, _password, _isActivo)

        return jsonify({"success": True})


@app.route('/users/<username>', methods=["DELETE"])
@jwt_required()
def delete_user(username):
    if (User.query.filter_by(username=username).first() is None):
        return jsonify({
        "msg": "No hay usuario con ese nombre",
        "success": False
        }), 401

        User.delete_user(username)
        return jsonify({"success": True})


@app.route('/category', methods=["GET"])
@jwt_required()
def servicio_category():
        if not request.is_json:
            return jsonify({"msg": "El body o contenido esta vacio"}), 400

            servicio_registrados.name_servicio = request.json.get("name_servicio", None)
            servicio_registrados.valor = request.json.get("valor", None)
            servicio_registrados.name_tipocobro = request.json.get("name_tipocobro", None)
            #? Puedo agregar otro tabla >  sericios_prestados.evaluacion = request.json.get("evaluacion", None)
            #? Como puedo agregar > cantidad proyecto 
            
            db.session.add(servicio_registrados)
            db.session.commit()

            return jsonify({"msg": "me he guardado exitosamente"})

@app.route('/category/<int:idServicio_registrados>', methods=["GET"])
@jwt_required()
def servicio_individual():
        if not request.is_json:
            return jsonify({"msg": "El body o contenido esta vacio"}), 400

        servicio_registrados.name_servicio = request.json.get("name_servicio", None)
        servicio_registrados.valor = request.json.get("valor", None)
        servicio_registrados.name_tipocobro = request.json.get("name_tipocobro", None)
        servicio_registrados.merit = request.json.get("merit", None)
        servicio_registrados.duracion = request.json.get("duracion", None)
        servicio_registrados.revision = request.json.get("revision", None)
        servicio_registrados.descrip_servicio = request.json.get("descrip_servicio", None)
        servicio_registrados.proceso = request.json.get("proceso", None)
        servicio_registrados.experiencia = request.json.get("experiencia", None)
        servicio_registrados.portafolio = request.json.get("portafolio", None)
        servicio_registrados.merit = request.json.get("merit", None)
        servicio_registrados.tipo_membresia = request.json.get("tipo_membresia", None)
        servicio_registrados.username = request.json.get("username", None)

        #? Puedo agregar otro tabla >  sericios_prestados.evaluacion = request.json.get("evaluacion", None)
        #? Como puedo agregar > cantidad proyecto 
        
        db.session.add(servicio_registrados)
        db.session.commit()

        return jsonify({"msg": "me he guardado exitosamente"})

@app.route('/registerservice', methods=["POST"])
@jwt_required()
def add_serviciosprestados():
        if not request.is_json:
            return jsonify({"msg": "El body o contenido esta vacio"}), 400

        sericios_prestados = Serviciosprestados()
        sericios_prestados.user_id=request.json.get("user_id", None)
        sericios_prestados.user_oferente_id = request.json.get("user_oferente_id", None)
        sericios_prestados.user_compra_id = request.json.get("user_compra_id", None)
        sericios_prestados.subcategory_id=request.json.get("subcategory_id", None)
        sericios_prestados.create_time= request.json.get("create_time", None)
        sericios_prestados.evaluacion= request.json.get("evaluacion", None)
        sericios_prestados.cantidad_servicio= request.json.get("catidad_servicio", None)
        sericios_prestados.total_valor_servicio= request.json.get("total_valor_servicio", None)
        sericios_prestados.fecha_inicio= request.json.get("fecha_inicio", None)
        sericios_prestados.fecha_termino= request.json.get("fecha_termino", None)

        db.session.add(sericios_prestados)
        db.session.commit()

@app.route('/favoritos', methods=["POST"])
@jwt_required()
def add_favoritos():
        if not request.is_json:
            return jsonify({"msg": "El body o contenido esta vacio"}), 400

        favoritos = favoritos()
        favoritos.user_id = request.json.get("id_users", None)
        favoritos.id_servicio_registrados = request.json.get("id_servicio_registrados", None)
        favoritos.name_servicio= request.json.get("name_servicio", None)

        db.session.add(favoritos)
        db.session.commit()

        return jsonify({"msg": "Agregado a favoritos exitosamente"})

@app.route('/favoritos/<int:id>', methods=["DELETE"])
@jwt_required()
def delete_favoritos(id):
        Favoritos.delete_favoritos(id)
        return jsonify({"success": True})

if __name__ == "__main__":
    manager.run()
