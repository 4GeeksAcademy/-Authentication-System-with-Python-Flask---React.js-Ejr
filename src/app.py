import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User, Cities, Status ,Treasures_Hide, Treasures_Founded
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
CORS(app)
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

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
    response.cache_control.max_age = 0  # avoid cache memory
    return response

''' ------------------------------------POST-----------------------------------------'''


@app.route('/api/hide', methods=['POST'])
@jwt_required()
def hide_treasure():
    user_identity = get_jwt_identity()
    body = request.get_json(silent = True)
    if body is None:
        return jsonify({'msg': "Debes enviar informacion en el body"}), 400
    if 'name' not in body:
        return jsonify({'msg': "El campo name es requerido"}), 400
    if 'image' not in body:
        return jsonify({'msg':"El campo image es requerido"}), 400
    if 'location' not in body:
        return jsonify({'msg':"El campo location es requerido"}),400
    if 'city_name' not in body:
        return jsonify({'msg':"El campo city_name es requerido"}), 400
    if 'tips' not in body:
        return jsonify({'msg':"El campo tips es requerido"}),400
    user = User.query.filter_by(email=user_identity).first()
    new_treasure = Treasures_Hide()
    new_treasure.name = body['name']
    new_treasure.image = body['image']
    new_treasure.location = body['location']
    new_treasure.city_name = body['city_name']
    new_treasure.tips = body['tips']
    new_treasure.user_id = user.id
    db.session.add (new_treasure)
    db.session.commit()
    
    return jsonify({'msg': "Tesoro ocultado con exito"}), 201


@app.route('/api/register', methods=['POST'])
def register():
    body = request.get_json(silent = True)
    if body is None:
        return jsonify({'msg': "Debes enviar información en el body"}), 400
    if 'email' not in body:
        return jsonify({'msg': "El campo email es obligatorio"}), 400
    if 'password' not in body:
        return jsonify({'msg': "El campo password es obligatorio"}), 400
    if "user_type" not in body:
        return jsonify({"msg": "El campo user_type es obligatorio"}), 400
    if "username" not in body:
        return jsonify({"msg": "El campo username es obligatorio"}), 400
    new_user = User()
    new_user.email = body['email']
    pw_hash = bcrypt.generate_password_hash(body["password"]).decode("utf-8")
    new_user.password = pw_hash
    new_user.username = body["username"]
    new_user.user_type = body["user_type"]
    db.session.add (new_user)
    db.session.commit()
    return jsonify({"msg": "El usuario ha sido creado con exito"}), 201


@app.route('/api/login', methods=['POST'])
def login():
    body = request.get_json(silent = True)
    if body is None:
        return jsonify({'msg': "Debes enviar información en el body"}), 400
    if 'email' not in body:
        return jsonify({'msg': "El campo email es obligatorio"}), 400
    if 'password' not in body:
        return jsonify({'msg': "El campo password es obligatorio"}), 400
    user = User.query.filter_by(email= body["email"]).first()
    if user is None:
        return jsonify({'msg': "El usuario no existe"}), 400
    password_correct = bcrypt.check_password_hash(user.password, body["password"])
    if not password_correct:
        return jsonify({'msg': "La contraseña es incorrecta"}), 400
    access_token = create_access_token(identity=user.email)
    return jsonify({'msg': "Login aceptado",
                    'token': access_token})


'''-------------------------------------GET------------------------------------------- '''


@app.route('/api/treasures', methods=['GET'])
def get_treasures():
    treasures = db.session.query(Treasures_Hide, User).join(User).all()
    print(treasures)
    result =[]
    for treasure, user in treasures:
        treasure_data ={
            "name": treasure.name,
            "image": treasure.image,
            "location": treasure.location,
            "city_name": treasure.city_name,
            "tips": treasure.tips,
            "user_id": treasure.user_id,
            "username": user.username
        }
        result.append(treasure_data)
    return jsonify(result), 200
    


@app.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@app.route('/api/current-user', methods=['GET'])
@jwt_required()
def get_current_user():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    print(user.id)
    if user:
        return jsonify(user.serialize()), 200
    else:
        return jsonify({"msg": "Usuario no encontrado"}), 404


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
