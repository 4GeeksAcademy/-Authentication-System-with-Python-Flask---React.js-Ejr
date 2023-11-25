import os
import datetime
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, User, UserBuscador
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from werkzeug.security import generate_password_hash, check_password_hash

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False


db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:postgres@localhost:5433/dbp4g"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)


setup_admin(app)

setup_commands(app)

app.register_blueprint(api, url_prefix='/api')


jwt = JWTManager(app)
CORS(app)
app.config['JWT_SECRET_KEY'] = os.getenv('SECRET_KEY')

@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code


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
    response.cache_control.max_age = 0  
    return response


@app.route('/api/login', methods=['POST'])
def login():
    email = request.json.get("email")
    password = request.json.get("password")

    if not email:
        return jsonify({ "error": "Email es obligatorio"}), 400

    if not password:
        return jsonify({ "error": "Contraseña es obligatoria"}), 400

    user_found = User.query.filter_by(email=email).first()

    if not user_found:
        return jsonify({ "error": "Email/contraseña son incorrectos"}), 401

    if not check_password_hash(user_found.password, password):
        return jsonify({ "error": "Email/contraseña son incorrectos"}), 401

    expires = datetime.timedelta(days=3)
    access_token = create_access_token(identity=user_found.id, expires_delta=expires)

    data = {
        "access_token": access_token,
        "user": user_found.serialize()
    }

    return jsonify(data), 200

@app.route('/api/register', methods=['POST'])
def register():

    nombre = request.json.get("nombre")
    apellido = request.json.get("apellido")
    email = request.json.get("email")
    password = request.json.get("password")
    rut = request.json.get ("rut")
    telefono = request.json.get ("telefono")
    fecha_de_nacimiento = request.json.get ("fecha de nacimiento")

    if not email:
        return jsonify(("error: email obligatorio")), 400
    if not password:
        return jsonify(("error: password obligatorio")), 400
    if not nombre:
        return jsonify(("error: nombre obligatorio")), 400
    if not apellido:
        return jsonify(("error: apellido obligatorio")), 400
    if not telefono:
        return jsonify(("error: telefono obligatorio")), 400
    if not rut:
        return jsonify(("error: rut obligatorio")), 400
    if not fecha_de_nacimiento:
        return jsonify(("error: fecha de nacimiento obligatorio")), 400

    user_found = User.query.filter_by(email=email).first()
    buscador_found = UserBuscador.query.filter_by(email=email).first()

    if user_found or buscador_found:
        return jsonify({ "error": "Email ya registrado"}), 400

    if "rubro" in request.json:
        new_user = User()
        new_user.rubro = request.json.get("rubro")
    else:
        new_user = UserBuscador()

    new_user.email = email
    new_user.password = generate_password_hash(password)
    new_user.nombre = nombre
    new_user.apellido = apellido
    new_user.rut = rut
    new_user.telefono = telefono
    new_user.fecha_de_nacimiento = fecha_de_nacimiento

    db.session.add(new_user)
    db.session.commit()

    expires = datetime.timedelta(days=3)
    access_token = create_access_token(identity=new_user.id, expires_delta=expires)

    data = {
        "access_token": access_token,
        "user": new_user.serialize()
    }

    return jsonify(data), 200

@app.route('/api/profile', methods=['GET'])
@jwt_required()
def profile():
    id = get_jwt_identity()
    user = User.query.get(id)

    return jsonify({ "data": "Hola Mundo", "user": user.serialize() })

if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)



