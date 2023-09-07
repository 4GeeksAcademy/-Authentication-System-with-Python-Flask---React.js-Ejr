"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, User, Tracker, InstitutionalUser, Scholarship
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, JWTManager
from flask_bcrypt import Bcrypt


#from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

bcrypt = Bcrypt(app)

app.config["JWT_SECRET_KEY"] = os.environ.get('JWS_SECRET')
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

@app.route('/user', methods=['GET'])
def get_users():
    users = User.query.all()
    users_serialized = list(map(lambda x: x.serialize(), users))
    response_body = {
        "msg": "Hello, this is your GET /user response",
        "users" : users_serialized
    }

    return jsonify(response_body), 200

@app.route('/user/<int:user_id>', methods=['GET'])
def get_single_user(user_id):
    single_user = User.query.get(user_id)
    if single_user is None:
        return jsonify({"msg": f"The id {user_id} user doesn't exist"}), 404
    
    user_info = single_user.serialize()
    query_scholarships = Scholarship.query.filter_by(trackers_id = single_user.tracker_id).all()
    scholarships = [scholarship.serialize() for scholarship in query_scholarships]
    user_info["scholarships_info"] = scholarships
    response_body = {
        "msg": "Hello, this is your GET /user response ",
        "user_info" : user_info
    }

    return jsonify(response_body), 200

@app.route('/signup', methods=['POST'])
def add_user():
    request_body = request.get_json(force=True)
    
    if "name" not in request_body:
        raise APIException('The first name is required', 400)
    
    if "last_name" not in request_body:
        raise APIException('The last name is required', 400)
    
    if "email" not in request_body:
        raise APIException("The email is required", 400)
    
    if "password" not in request_body:
        raise APIException('The password is required', 400)

    exists_email = User.query.filter_by(email = request_body['email']).first()

    
    if exists_email:
        raise APIException('Email is in use', 400)
    
    pw_hash = bcrypt.generate_password_hash(request_body['password']).decode('utf-8')

    user = User(
        name = request_body['name'],
        last_name = request_body['last_name'],
        email = request_body['email'],
        password = pw_hash
    )

    user.save()

    response_body = {
        "msg" : "ok",
        "msg2" : "Usuario creado correctamente"
    }
    
    return jsonify(response_body), 201


@app.route('/login', methods=['POST'])
def login():
    request_body = request.get_json(force=True)

    if "email" not in request_body:
        raise APIException('The email is required', status_code=404)

    if "password" not in request_body:
        raise APIException('The password is required', status_code=404)

    user = User.query.filter_by(
        email= request_body['email']
        ).first()    

    if user is None:
        raise APIException ('The email is not correct', status_code=404)

    if bcrypt.check_password_hash(user.password, request_body['password']) is False:
        raise APIException('The password is not correct', 401)    

    access_token = create_access_token(identity = user.id)

    response_body ={ 
                    "msg": "ok",
                    "token": access_token, 
                    "user_id": user.id }

    return jsonify(response_body), 200

@app.route('/tracker', methods=['GET'])
def get_trackers():
    trackers = Tracker.query.all()
    trackers_serialized = list(map(lambda x: x.serialize(), trackers))
    response_body = {
        "msg": "Hello, this is your GET /trackers response",
        "trackers" : trackers_serialized
    }

    return jsonify(response_body), 200

@app.route('/tracker/save/<int:user_id>', methods=['POST'])
def save_tracker(user_id):
    single_user = User.query.get(user_id)
    request_body = request.get_json(force=True)
    
    if single_user is None:
        return jsonify({"msg": f"The id {user_id} user doesn't exist"}), 404
    
    if "tracker_name" not in request_body:
        raise APIException('Tracker name is required', 400)
    
    if "scholarship_name" not in request_body:
        raise APIException('Scholarship name is required', 400)
    
    if "email" not in request_body:
        raise APIException("email is required", 400)    
    
    # Crear el Tracker
    tracker = Tracker(
        scholarship_name=request_body['scholarship_name'],
        email=request_body["email"],
        tracker_name = request_body["tracker_name"]
    )

    # Asignar el Tracker al User
    single_user.tracker = tracker
    db.session.add(single_user)

    # Guardar los cambios en la base de datos
    db.session.commit()

    response_body = {
        "msg": "ok",
        "msg2": "Tracker creado correctamente",
        "user_info": single_user.serialize()
    }
    
    return jsonify(response_body), 201

@app.route('/tracker/update/<int:user_id>', methods=['PATCH'])
def update_tracker(user_id):
    single_user = User.query.get(user_id)
    request_body = request.get_json(force=True)
    
    if single_user is None:
        return jsonify({"msg": f"The id {user_id} user doesn't exist"}), 404
    
    # Buscar si ya existe un Tracker para este usuario
    tracker = Tracker.query.filter(Tracker.user_email.contains(single_user)).first()
    
    if tracker:
        # Actualizar solo los campos proporcionados en la solicitud PATCH
        if "scholarship_name" in request_body:
            tracker.scholarship_name = request_body['scholarship_name']
        if "email" in request_body:
            tracker.email = request_body['email']

        # Guardar los cambios en la base de datos
        db.session.commit()

        response_body = {
            "msg": "ok",
            "msg2": "Tracker actualizado correctamente",
            "user_info": single_user.serialize()
        }
    
        return jsonify(response_body), 200
    else:
        return jsonify({"msg": "No se encontró un Tracker para este usuario"}), 404
# ROUTES FOR INSTITUTIONAL USERS

@app.route('/institution-user', methods=['GET'])
def get_institutional_users():
    institutional_users = InstitutionalUser.query.all()
    institutional_users_serialized = list(map(lambda x: x.serialize(), institutional_users))
    response_body = {
        "msg": "Hello, this is your GET /institutional users response",
        "institutional_users" : institutional_users_serialized
    }

    return jsonify(response_body), 200

@app.route('/institution-user/<int:institution_user_id>', methods=['GET'])
def get_single_institutional_user(institution_user_id):
    single_institutional_user = InstitutionalUser.query.get(institution_user_id)
    if single_institutional_user is None:
        return jsonify({"msg": f"The id {institution_user_id} user doesn't exist"}), 404
    
    response_body = {
        "msg": "Hello, this is your GET /institutional user response ",
        "institutional_user_info" : single_institutional_user.serialize()
    }

    return jsonify(response_body), 200


@app.route('/signup-ins', methods=['POST'])
def add_institutional_user():
    request_body = request.get_json(force=True)
    
    if "institutional_name" not in request_body:
        raise APIException('The institutional name is required', 400)
    
    if "email" not in request_body:
        raise APIException("The email is required", 400)
    
    if "password" not in request_body:
        raise APIException('The password is required', 400)

    exists_institutional_email = InstitutionalUser.query.filter_by(email = request_body['email']).first()

    
    if exists_institutional_email:
        raise APIException('Email is in use', 400)
    
    pw_hash = bcrypt.generate_password_hash(request_body['password']).decode('utf-8')

    institutional_user = InstitutionalUser(
        institutional_name = request_body['institutional_name'],
        email = request_body['email'],
        password = pw_hash
    )

    institutional_user.save()

    response_body = {
        "msg" : "ok",
        "msg2" : "Usuario institucional creado correctamente"
    }
    
    return jsonify(response_body), 201


@app.route('/login-ins', methods=['POST'])
def institutional_login():
    request_body = request.get_json(force=True)

    if "email" not in request_body:
        raise APIException('The email is required', status_code=404)

    if "password" not in request_body:
        raise APIException('The password is required', status_code=404)

    insti_user = InstitutionalUser.query.filter_by(
        email= request_body['email']
        ).first()    

    if insti_user is None:
        raise APIException ('The email or password is not correct', status_code=404)

    if bcrypt.check_password_hash(insti_user.password, request_body['password']) is False:
        raise APIException('The email or password is not correct', 401)    

    access_token = create_access_token(identity = insti_user.id)

    response_body ={ 
                    "msg": "ok",
                    "token": access_token, 
                    "institutional_user_id": insti_user.id }

    return jsonify(response_body), 200

#Scholarship POST

@app.route('/create-scholarship', methods=['POST'])
def add_scholarship():
    request_body = request.get_json(force=True)
    
    if "scholarship_name" not in request_body:
        raise APIException('Scholarship name is required', 400)
    
    if "deadline" not in request_body:
        raise APIException("dates are required", 400)

    if "institution" not in request_body:
        raise APIException('Institution is required', 400)

    if "modality" not in request_body:
        raise APIException('modality is required', 400)
    
    if "coverage" not in request_body:
        raise APIException('coverage is required', 400)
    
    if "description" not in request_body:
        raise APIException('description is required', 400)

    if "url_to" not in request_body:
        raise APIException('url is required', 400)
    

    scholarship = Scholarship(
        scholarship_name = request_body['scholarship_name'],
        deadline = request_body['deadline'],
        institution = request_body['institution'],
        modality = request_body["modality"],
        coverage = request_body["coverage"],
        description = request_body["description"],
        url_to = request_body["url_to"]
    )

    scholarship.save()

    response_body = {
        "msg" : "ok",
        "msg2" : "Beca agregada correctamente"
    }
    
    return jsonify(response_body), 201



@app.route("/scholarships", methods=["GET"])
def get_scholarships():
    scholarships = Scholarship.query.all()
    if scholarships is None:
        return jsonify({"msg": "There are not scholarships"}), 404
    scholarships_serialized = list(map(lambda x : x.serialize(), scholarships))
    response_body = {
        "msg": "Hello, this is your GET /scholarships response ",
        "scholarships": scholarships_serialized
    }

    return jsonify(response_body), 200

#borra trackers
@app.route("/tracker/delete/<int:scholarship_id>", methods=['DELETE'])
def delete_scholarship(scholarship_id):
    single_scholarship = Tracker.query.get(scholarship_id)
    if single_scholarship is None:
        raise APIException("La beca no existe", status_code=400)
    db.session.delete(single_scholarship)
    db.session.commit()

    return jsonify({"msg": "Completed"})

#muestra en que trackers está la beca según el id de la BECA
@app.route("/tracker/scholarships/<user_id>", methods=["GET"])
def get_scholarships_in_tracker(user_id):
    single_tracker = Tracker.query.get(user_id)
    if single_tracker is None:
        raise APIException("The scholarship does not exist", status_code=400)
    response_body = {
        "msg": "Hello, this is your GET /scholarships in tracker response ",
        "tracker_info": single_tracker.serialize()
    }

    return jsonify(response_body), 200

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)

