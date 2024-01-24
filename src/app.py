"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from dotenv import load_dotenv
import requests
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User, Movie_Review, View_State, Personal_List, Follower
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

# from models import Person
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
jwt = JWTManager(app)

# Encryptation
bcrypt = Bcrypt(app)

# Load environment variables from .env file
load_dotenv()

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

# User management
@app.route('/signup', methods=['POST'])
def signup():
    body=request.get_json(silent=True)
    if body is None:
        return jsonify({'msg':'Se debe enviar informacion en el body'}),400
    if 'email' not in body:
        return jsonify({'msg':'Se debe ingresar email'}),400
    if 'password' not in body:
        return jsonify({'msg':'Se debe ingresar password'}),400
    if 'username' not in body:
        return jsonify({'msg': 'No se ha proporcionado username'}), 400
    if 'name' not in body:
        return jsonify({'msg':'Se debe ingresar password'}),400
    if 'age' not in body:
        return jsonify({'msg': 'No se ha proporcionado age'}), 400
    
    pw_hash = Bcrypt.generate_password_hash(body['password']).decode('utf-8')
    
    new_user = User()
    new_user.username = body["username"]
    new_user.name = body["name"]
    new_user.age = body["age"]
    new_user.email = body["email"]
    new_user.password = pw_hash
    new_user.is_active = True
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'msg':'Usuarion registrado correctamente'}), 200

@app.route('/login', methods=['POST'])
def login():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg':'Debes enviar informacion en el body'}), 400
    if 'email' not in body:
        return jsonify({'msg': 'No se ha proporcionado email'}), 400
    if 'password' not in body:
        return jsonify({'msg': 'No se ha proporcionado password'}), 400
    user = User.query.filter_by(email=body['email']).first()
    if user is None or not Bcrypt.check_password_hash(user.password, body['password']):
        return jsonify({'msg': 'Usuario o contraseña incorrectos'}), 400
    access_token = create_access_token(identity=user.id)
    return jsonify({'msg':'ok','token':access_token})

@app.route("/profile", methods=["GET"])
@jwt_required()
def private():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    
    # Perform any additional logout actions here, if needed    
    return jsonify({'msg': 'Logout successful'}), 200

@app.route("/forgotpassword", methods=["POST"])
@jwt_required()
def forgot_password():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    email = request.json.get("email", None)
    if not email:
        return jsonify({"msg": "Missing email parameter"}), 400

    if email not in User:
        return jsonify({"msg": "Email not registered"}), 404

    # Generate a token for password recovery
    recovery_token = create_access_token(identity=email)

    # Here you might want to send an email with the recovery_token to the user
    # For demonstration purposes, we're just returning the token in the response
    return jsonify(recovery_token=recovery_token), 200

#EDIT USER
@app.route('/edituser/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg': 'Debes enviar información en el body'}), 400
    user = User.query.get(user_id)
    if user is None:
        return jsonify({'msg': 'Usuario no encontrado'}), 404
    if "name" in body:
        user.name = body['name']
    if "username" in body:
        user.username = body['username']
    db.session.commit()
    return jsonify({'msg': 'Usuario actualizado con éxito'}),200

#DELETE USER
@app.route('/deleteuser/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'msg': 'Usuario se eliminó con éxito'}), 200

#GET ALL USERS
@app.route('/users', methods=['GET'])
def get_all_users():
    all_users = User.query.all()
    serialized_all_users = list(map(lambda users: users.serialize(), all_users))
    return jsonify({'msg': 'Usuario obtenidos:', 'results': serialized_all_users}), 200

#GET ONE USER
@app.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    print(user_id)
    user = User.query.get(user_id)
    serialized_user = user.serialize()
    return jsonify({'msg': 'El Usuario obtenido es:', 'results': serialized_user}), 200

# Followed users management
@app.route("/followuser/<int:id>", methods=["POST"])
@jwt_required()
def follow_user(id):
    current_user_id = get_jwt_identity()

    # Check if the user to be followed exists
    user_to_follow = User.query.get(id)
    if user_to_follow is None:
        return jsonify({"msg": "User not found"}), 404

    # Check if the user is not trying to follow themselves
    if current_user_id == id:
        return jsonify({"msg": "Cannot follow yourself"}), 400

    # Check if the user is not already being followed
    if Follower.query.filter_by(follower_id=current_user_id, following_id=id).first():
        return jsonify({"msg": "You are already following this user"}), 400

    # Create a new Follower entry to represent the follow relationship
    new_follower = Follower(follower_id=current_user_id, following_id=id)
    db.session.add(new_follower)
    db.session.commit()

    return jsonify({"msg": "Successfully followed user"}), 200


@app.route("/unfollowuser/<int:id>", methods=["POST"])
@jwt_required()
def unfollow_user(id):
    current_user_id = get_jwt_identity()

    # Check if the user to be unfollowed exists
    user_to_unfollow = User.query.get(id)
    if user_to_unfollow is None:
        return jsonify({"msg": "User not found"}), 404

    # Check if the user is not trying to unfollow themselves
    if current_user_id == id:
        return jsonify({"msg": "Cannot unfollow yourself"}), 400

    # Check if the user is currently being followed
    follower_entry = Follower.query.filter_by(
        follower_id=current_user_id, following_id=id
    ).first()
    if not follower_entry:
        return jsonify({"msg": "You are not following this user"}), 400

    # Remove the Follower entry to unfollow the user
    db.session.delete(follower_entry)
    db.session.commit()

    return jsonify({"msg": "Successfully unfollowed user"}), 200

# Personal movie list management
@app.route("/favoritemovies", methods=["POST"])
def add_movie_personal():
    return jsonify({"msg": "ok"})

@app.route("/favoritemovies/<int:id>", methods=["DELETE"])
def remove_movie_personal():
    return jsonify({"msg": "ok"})

# Personal view state management
@app.route("/viewstate/<int:id>", methods=["GET"])
def change_view_status():
    return jsonify({"msg": "ok"})

# Movie management
@app.route("/movies", methods=["GET"])
def get_movies():
    # Retrieve TMDb API key and base URL from environment variables
    api_key = os.getenv("API_KEY")
    base_url = os.getenv("APIMOVIES_URL")

    # Specify the TMDb API endpoint
    tmdb_api_url =  f"{base_url}/discover/movie?" + api_key

    # Set up parameters for the TMDb API request
    params = {
        "language": "en-US",  # Specify the language
        "sort_by": "popularity.desc",  # Specify the sorting criteria
    }

    try:
        # Make a GET request to TMDb API
        response = requests.get(tmdb_api_url, params=params)
        response.raise_for_status()  # Check for errors

        # Parse the JSON response
        movies_data = response.json()

        # Extract relevant information (you may adjust this based on TMDb API response structure)
        movies_list = movies_data.get("results", [])

        # Return the list of movies as JSON response
        return (
            jsonify({"msg": "Movies obtained successfully", "results": movies_list}),
            200,
        )

    except requests.exceptions.RequestException as e:
        return jsonify({"msg": f"Error fetching movies from TMDb API: {str(e)}"}), 500


@app.route("/movie/<int:id>", methods=["GET"])
def get_movie(id):
    # Retrieve TMDb API key and base URL from environment variables
    api_key = os.getenv("API_KEY")
    base_url = os.getenv("APIMOVIES_URL")

    # Specify the TMDb API endpoint with the specific movie ID
    tmdb_api_url = f"{base_url}/movie/{id}?" + api_key

    # Set up parameters for the TMDb API request
    params = {
        "language": "en-US",  # Specify the language
    }

    try:
        # Make a GET request to TMDb API
        response = requests.get(tmdb_api_url, params=params)
        response.raise_for_status()  # Check for errors

        # Parse the JSON response
        movie_data = response.json()

        # Return the movie details as JSON response
        return jsonify({"msg": "Movie obtained successfully", "result": movie_data}), 200

    except requests.exceptions.RequestException as e:
        return jsonify({"msg": f"Error fetching movie from TMDb API: {str(e)}"}), 500


@app.route("/addmovie", methods=["POST"])
def add_movie():
    return jsonify({"msg": "ok"})

@app.route("/deletemovie/<int:id>", methods=["DELETE"])
def delete_movie():
    return jsonify({"msg": "ok"})

@app.route("/updatemovie/<int:id>", methods=["PUT"])
def update_movie():
    return jsonify({"msg": "ok"})

# Movie review management
@app.route("/reviews", methods=["POST"])
def add_review():
    return jsonify({"msg": "ok"})

@app.route("/reviews/<int:id>", methods=["PUT"])
def update_review():
    return jsonify({"msg": "ok"})

@app.route("/reviews/<int:id>", methods=["DELETE"])
def delete_review():
    return jsonify({"msg": "ok"})

# Movie details management
@app.route("/moviedetails/<int:id>", methods=["GET"])
def get_movie_details():
    return jsonify({"msg": "ok"})

# Actor management
@app.route("/actors", methods=["GET"])
def get_actors():
    return jsonify({"msg": "ok"})

@app.route("/actors/<int:id>", methods=["GET"])
def get_actor():
    return jsonify({"msg": "ok"})

@app.route("/actors", methods=["POST"])
def add_actor():
    return jsonify({"msg": "ok"})

@app.route("/actors/<int:id>", methods=["PUT"])
def update_actor():
    return jsonify({"msg": "ok"})

@app.route("/actors/<int:id>", methods=["DELETE"])
def delete_actor():
    return jsonify({"msg": "ok"})


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
