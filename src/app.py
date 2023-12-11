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
    app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:postgres@localhost:5432/dbp4g"

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
        return jsonify({"error": "Email es obligatorio"}), 400

    if not password:
        return jsonify({"error": "Contraseña es obligatoria"}), 400

    # Intenta encontrar al usuario en la tabla User
    user_found = User.query.filter_by(email=email).first()

    # Si no se encuentra en la tabla User, intenta en la tabla UserBuscador
    if not user_found:
        user_found = UserBuscador.query.filter_by(email=email).first()

    if not user_found:
        return jsonify({"error": "Email/contraseña son incorrectos"}), 401

    if not check_password_hash(user_found.password, password):
        return jsonify({"error": "Email/contraseña son incorrectos"}), 401

    expires = datetime.timedelta(days=3)
    access_token = create_access_token(identity=str(user_found.idUser), expires_delta=expires)

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
    comuna = request.json.get("comuna")
    fecha_de_nacimiento = request.json.get("fecha_de_nacimiento")

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
    if not comuna:
        return jsonify(("error: comuna obligatorio")), 400

    user_found = User.query.filter_by(email=email).first()
    buscador_found = UserBuscador.query.filter_by(email=email).first()
    id = None
    if user_found or buscador_found:
        return jsonify({ "error": "Email ya registrado"}), 400

    if "rubro" in request.json:
        new_user = User()
        new_user.rubro = request.json.get("rubro")
        id = new_user.idUser
    else:
        new_user = UserBuscador()
        id = new_user.idUserBuscador

    new_user.email = email
    new_user.password = generate_password_hash(password)
    new_user.nombre = nombre
    new_user.apellido = apellido
    new_user.rut = rut
    new_user.telefono = telefono
    new_user.comuna = comuna
    new_user.fecha_de_nacimiento = fecha_de_nacimiento

    db.session.add(new_user)
    db.session.commit()

    expires = datetime.timedelta(days=3)
    access_token = create_access_token(identity=id, expires_delta=expires)

    data = {
        "access_token": access_token,
        "user": new_user.serialize()
    }

    return jsonify(data), 200

@app.route("/user/<string:name>", methods=["GET"])
def get_user_by_name(name):
    return jsonify({"name": name}), 200


# enviar datos en la url como query string
@app.route("/user/publicacion/<int:id>", methods=["GET"])
def get_user_by_id():
    query = request.args
    idPublicacion = query["id"]
    id = query["id"]
    nombre = query["nombre"]
    publicacion = query["publicacion"]
    fecha = query["fecha"]

    return jsonify({"id":id, "name": name, "publicacion": publicacion, "fecha": fecha}), 200


@app.route("/user/publicacion/<int:id>", methods=["POST"])
def enviar_datos_de_publicacion(id):
    # Capturamos todo el body en un diccionario
    body = request.get_json(id)

    if not "name" in body:
        return jsonify({"msg": "Name is required!"}), 400

    # Capturamos los datos de manera individual
    id = body["id"]
    name = request.json.get("name")
    publicacion = request.json.get("publicacion")
    date = request.json.get("date")

    return (
        jsonify({"body": body, "id":id,  "name": name, "publicacion": publicacion, "date": date}),
        200,
    )


@app.route("/user/publicacion/<int:id>", methods=["PUT"])
def actualizar_datos_de_publicacion():
    if not "username" in request.form:
        return jsonify({"msg": "username is required!"}), 422

    # Enviando datos mediante un formulario con archivo adjunto
    username = request.form["username"]
    password = request.form["password"]

    # Recibiendo un archivo adjunto
    avatar = request.files["avatar"]

    return (
        jsonify(
            {"username": username, "password": password, "avatar": avatar.filename}
        ),
        200,
    )


@app.route("/publicacion", methods=["GET", "POST"])
@app.route("/publicacion/<int:id>", methods=["GET", "PUT", "DELETE"])
def publicacion(id=None):
    if request.method == "GET":
        if id is not None:
            return jsonify({"message": "Buscando con id "}), 200
        else:
            return jsonify({"message": "Buscando todas las publicaciones "}), 200

    if request.method == "POST":
        return jsonify({"message": "creando una publicacion"}), 200

    if request.method == "PUT":
        return jsonify({"message": "actualizando una publicacion"}), 200

    if request.method == "DELETE":
        return jsonify({"message": "eliminando una publicacion"}), 200



@app.route('/api/profile', methods=['GET'])
@jwt_required()
def profile():
    id = get_jwt_identity()
    user = User.query.get(id)
    return jsonify({ "data": "Hola Mundo", "user": user.serialize() })

# Datos de ejemplo para simular una base de datos
perfil_data = {
    "firstName": "",
    "lastName": "",
    "email": "",
    "region": "",
    "comuna": "",
    "birthDate": "",
}


@app.route('/api/perfil', methods=['POST'])

# Ruta para manejar las solicitudes POST desde React
@app.route('/api/perfil', methods=['POST'])
def actualizar_perfil():
    global perfil_data
    
    # Obtener los datos enviados desde React
    data = request.json
    
    # Actualizar los datos del perfil con los nuevos datos recibidos
    perfil_data.update(data)
    
    # Devolver una respuesta
    return jsonify({'message': 'Datos de perfil actualizados correctamente'})

# Ruta para obtener los datos del perfil (solo para demostración)
@app.route('/api/perfil/<int:id>', methods=['GET'])
def obtener_perfil(id):
   user = User.query.get(id) 
   perfil_data = {
    "firstName": user.nombre,
    "lastName": user.apellido,
    "email": user.email,
    "comuna": user.comuna,
    "birthDate": user.fecha_de_nacimiento
   }
    # Devolver los datos actuales del perfil
   return jsonify(perfil_data)


@app.route('/api/SegundoPerfil')
def get_profile():
    profile_data = {
        "name": "Nombre Prestador",
        "jobs": ["Trabajo 1", "Trabajo 2", "Trabajo 3"],
        "description": "Descripción/Experiencia/Comuna",
        "ratings": [
            {
                "comment": "¡Gran trabajo! Muy profesional.",
                "rating": 5,
            },
            {
                "comment": "Buen servicio, lo recomiendo.",
                "rating": 4,
            }
        ]
    }
    return jsonify(profile_data)



if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)



