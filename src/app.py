import os
import datetime
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    get_jwt_identity,
    jwt_required,
)
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, User, UserBuscador, UserPublicacion
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from werkzeug.security import generate_password_hash, check_password_hash


ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(
    os.path.dirname(os.path.realpath(__file__)), "../public/"
)
app = Flask(__name__)
app.url_map.strict_slashes = False


db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config[
        "SQLALCHEMY_DATABASE_URI"
    ] = "postgresql://postgres:postgres@localhost:5432/dbp4g"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)


setup_admin(app)

setup_commands(app)

app.register_blueprint(api, url_prefix="/api")


app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY")
jwt = JWTManager(app)
CORS(app)



@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code


@app.route("/")
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, "index.html")


@app.route("/<path:path>", methods=["GET"])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = "index.html"
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0
    return response


@app.route("/api/login", methods=["POST"])
def login():
    email = request.json.get("email")
    password = request.json.get("password")

    if not email:
        return jsonify({"error": "Email es obligatorio"}), 400

    if not password:
        return jsonify({"error": "Contraseña es obligatoria"}), 400

    user_found = User.query.filter_by(email=email).first()

    if not user_found:
        user_found = UserBuscador.query.filter_by(email=email).first()
        print("User Found:", user_found)

    if not user_found:
        print("User not found")
        return jsonify({"error": "Email/contraseña son incorrectos"}), 401

    if not check_password_hash(user_found.password, password):
        print("Password incorrect")
        return jsonify({"error": "Email/contraseña son incorrectos"}), 401

    expires = datetime.timedelta(days=3)

    if isinstance(user_found, User):
        access_token = create_access_token(
            identity=str(user_found.idUser), expires_delta=expires
        )
    elif isinstance(user_found, UserBuscador):
        access_token = create_access_token(
            identity=str(user_found.idUserBuscador), expires_delta=expires
        )
    else:
        access_token = None

    if access_token:
        data = {"access_token": access_token, "user": user_found.serialize()}

        return jsonify(data), 200
    else:
        return jsonify({"error": "Tipo de usuario no válido"}), 400


@app.route("/api/register", methods=["POST"])
def register():
    nombre = request.json.get("nombre")
    apellido = request.json.get("apellido")
    email = request.json.get("email")
    password = request.json.get("password")
    rut = request.json.get("rut")
    telefono = request.json.get("telefono")
    comuna = request.json.get("comuna")
    fecha_de_nacimiento = request.json.get("fecha_de_nacimiento")
    tipoUsuario = request.json.get("tipoUsuario")
    rubro = request.json.get("rubro")

    # Verificar la existencia del email en ambas tablas
    user_found = User.query.filter_by(email=email).first()
    buscador_found = UserBuscador.query.filter_by(email=email).first()

    if user_found or buscador_found:
        return jsonify({"message": "Email ya registrado"}), 400
    
    user_found = User.query.filter_by(telefono=telefono).first()
    buscador_found = UserBuscador.query.filter_by(telefono=telefono).first()

    if user_found or buscador_found:
        return jsonify({"error": "Telefono ya registrado"}), 400
    
    user_found = User.query.filter_by(rut=rut).first()
    buscador_found = UserBuscador.query.filter_by(rut=rut).first()

    if user_found or buscador_found:
        return jsonify({"error": "Rut ya registrado"}), 400

    # Crear instancia de usuario basándose en la presencia de "rubro"
    if "rubro" in request.json:
        new_user = User(rubro=rubro)
    else:
        new_user = UserBuscador()

    # Configurar atributos comunes
    new_user.email = email
    new_user.password = generate_password_hash(password)
    new_user.nombre = nombre
    new_user.apellido = apellido
    new_user.rut = rut
    new_user.telefono = telefono
    new_user.comuna = comuna
    new_user.tipoUsuario = tipoUsuario
    new_user.fecha_de_nacimiento = fecha_de_nacimiento

    # Agregar y hacer commit del nuevo usuario
    db.session.add(new_user)
    db.session.commit()

    # Obtener el ID después del commit
    id = new_user.idUser if hasattr(new_user, "idUser") else new_user.idUserBuscador

    expires = datetime.timedelta(days=3)
    access_token = create_access_token(identity=id, expires_delta=expires)

    data = {"message": "Usuario registrado con éxito","access_token": access_token, "user": new_user.serialize()}


    # if "rubro" not in request.json:
        #  del data["user"]["rubro"]


    return jsonify(data), 200


@app.route("/publicacion/<string:name>", methods=["GET"])
def get_user_by_name(name):
    return jsonify({"name": name}), 200


@app.route("/publicaciones", methods=["GET"])
def publicaciones():
    publicaciones = UserPublicacion.query.all()
    publicaciones = list(
        map(lambda publicacion: publicacion.serialize(), publicaciones)
    )
    return jsonify({"publicaciones": publicaciones}), 200


# enviar datos en la url como query string
@app.route("/publicacion/<int:id>", methods=["GET"])
def get_user_by_id(id):
    query = request.args
    idPublicacion = query["id"]
    idUser = query["idUser"]
    nombre = query["nombre"]
    apellido = query["apellido"]
    email = query["email"]
    descripcion = query["descripcion"]
    comuna = query["comuna"]
    rubro = query["rubro"]
    fecha = query["fecha"]

    return (
        jsonify(
            {
                "idPublicacion": id,
                "idUser": idUser,
                "nombre": nombre,
                "apellido": apellido,
                "email": email,
                "descripcion": descripcion,
                "comuna": comuna,
                "rubro": rubro,
                "fecha": fecha,
            }
        ),
        200,
    )


@app.route("/publicacion/<int:id>", methods=["POST"])
def enviar_datos_de_publicacion(id):
    # Capturamos todo el body en un diccionario
    body = request.get_json(id)

    if not "name" in body:
        return jsonify({"msg": "Name is required!"}), 400

    # Capturamos los datos de manera individual
    id = body["id"]
    nombre = (request.json.get("nombre"),)
    descripcion = (request.json.get("descripcion"),)
    fecha = request.json.get("fecha")

    return (
        jsonify(
            {
                "body": body,
                "id": id,
                "nombre": nombre,
                "descripcion": descripcion,
                "fecha": fecha,
            }
        ),
        200,
    )


@app.route("/publicacionpost", methods=["POST"])
def enviar_datos_de_publicacionpost():
    # Capturamos todo el body en un diccionario
    body = request.get_json()
    publicacion = UserPublicacion()
    publicacion.idUsuario = body["idUser"]
    publicacion.nombre = body["nombre"]
    publicacion.apellido = body["apellido"]
    publicacion.email = body["email"]
    publicacion.descripcion = body["descripcion"]
    publicacion.comuna = body["comuna"]
    publicacion.rubro = body["rubro"]
    publicacion.fecha = body["fecha"]

    db.session.add(publicacion)
    db.session.commit()

    return jsonify({"body": body}), 200


@app.route("/publicacion/<int:id>", methods=["PUT"])
def actualizar_datos_de_publicacion(id):
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


@app.route("/publicacion/<int:id>", methods=["DELETE"])
def eliminar_publicacion(id):
    global publicaciones

    publicacion = next((pub for pub in publicaciones if pub['id'] == id), None)

    if publicacion:
        publicaciones = [pub for pub in publicaciones if pub['id'] != id]
        return jsonify({"message": f"Publicación con ID {id} eliminada correctamente"}), 200
    else:
        return jsonify({"message": f"No se encontró la publicación con ID {id}"}), 404


@app.route("/api/profile", methods=["GET"])
@jwt_required()
def profile():
    id = get_jwt_identity()
    user = User.query.get(id)
    return jsonify({"data": "Hola Mundo", "user": user.serialize()})


# Datos de ejemplo para simular una base de datos
perfil_data = {
    "firstName": "",
    "lastName": "",
    "email": "",
    "region": "",
    "comuna": "",
    "birthDate": "",
}


@app.route("/api/perfil", methods=["POST"])

# Ruta para manejar las solicitudes POST desde React
@app.route("/api/perfil", methods=["POST"])
def actualizar_perfil():
    global perfil_data

    # Obtener los datos enviados desde React
    data = request.json

    # Actualizar los datos del perfil con los nuevos datos recibidos
    perfil_data.update(data)

    # Devolver una respuesta
    return jsonify({"message": "Datos de perfil actualizados correctamente"})


# Ruta para obtener los datos del perfil (solo para demostración)
@app.route("/api/perfil/<int:id>", methods=["GET"])
def obtener_perfil(id):
    user = User.query.get(id) 
    perfil_data = {
        "firstName": user.nombre,
        "lastName": user.apellido,
        "email": user.email,
        "comuna": user.comuna,
        "birthDate": user.fecha_de_nacimiento,
        "rubro": user.rubro
    }

    # Devolver los datos actuales del perfil
    return jsonify(perfil_data)


@app.route("/api/SegundoPerfil")
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
            },
        ],
    }
    return jsonify(profile_data)


@app.route("/api/perfil_logeado", methods = ["POST"])
#@jwt_required()
def perfil_logeado():
    email= request.json.get("email")
    user = User.query.filter_by(email=email).first()
    print(email)
    user_cliente = UserBuscador.query.filter_by(email=email).first()
    print(user)
    if not user and not user_cliente:
        return jsonify({"error":"usuario no encontrado"}), 400
    
    return jsonify({"usuario": user.serialize() if user else user_cliente.serialize()})

@app.route("/api/contactar", methods=[ "POST" ])
@jwt_required()
def contactar():
    id= get_jwt_identity()
    return jsonify({"msg": id}), 200
    


if __name__ == "__main__":
    PORT = int(os.environ.get("PORT", 3001))
    app.run(host="0.0.0.0", port=PORT, debug=True)
