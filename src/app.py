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
    new_user.is_admin = False
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
     # Retrieve TMDb API key and base URL from environment variables
    api_key = os.getenv("API_KEY")
    base_url = os.getenv("APIMOVIES_URL")

    # Specify the TMDb API endpoint with the specific movie ID
    tmdb_api_url = f"{base_url}/authentication/guest_session/new?api_key=" + api_key

    # Set up parameters for the TMDb API request
    params = {}

    try:
        # Make a GET request to TMDb API
        response = requests.get(tmdb_api_url, params=params)
        response.raise_for_status()  # Check for errors

        # Parse the JSON response
        data = response.json()

        # Return the movie details as JSON response
        return (
            jsonify(
                {
                    "msg": "Logged in and guest session created correctly",
                    "token": access_token,
                    "guest_token": data,
                }
            ),
            200,
        )

    except requests.exceptions.RequestException as e:
        return jsonify({"msg": f"Error fetching data from TMDb API: {str(e)}"}), 500


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


'''
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
'''

@app.route("/api/passwordreset", methods=["POST"])
@jwt_required()
def update_password():
    try:
        data = request.get_json(silent=True)

        if data is None:
            return jsonify({"error": "No JSON data provided in the request"}), 400
        if "password" not in data:
            return jsonify({"error": "Required fields are missing"}), 400

        new_password = data["password"]
        current_user = get_jwt_identity()

        user = User.query.filter_by(email=current_user).first()

        if not user:
            return jsonify({"error": "User not found"}), 404

        user.password = bcrypt.generate_password_hash(new_password).decode("utf-8")
        db.session.commit()
        return jsonify({"message": "Password updated succesfully"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


#EDIT USER
@app.route("/edituser", methods=["PUT"])
@jwt_required()
def update_user():
    current_user_id = get_jwt_identity()
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg": "Debes enviar información en el body"}), 400
    user = User.query.get(current_user_id)
    if user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    if "name" in body:
        user.name = body["name"]
    if "username" in body:
        user.username = body["username"]
    db.session.commit()
    return jsonify({"msg": "Usuario actualizado con éxito"}), 200

#DELETE USER
@app.route('/deleteuser/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user:
        user.is_active = False
        db.session.commit()

        return jsonify({"msg": "Usuario se desactivó con éxito"}), 200
    else:
        return jsonify({"error": "Usuario no encontrado"}), 404

#GET ALL USERS
@app.route('/users', methods=['GET'])
def get_all_users():
    all_users = User.query.all()
    serialized_all_users = list(map(lambda users: users.serialize(), all_users))
    return jsonify({'msg': 'Usuario obtenidos:', 'results': serialized_all_users}), 200

#GET ONE USER
@app.route("/user/<int:user_id>", methods=["GET"])
@jwt_required()
def get_user(user_id):
    current_user = get_jwt_identity()
    if current_user.is_admin:
        user = User.query.get(user_id)
        serialized_user = user.serialize()
        return jsonify({"msg": "El Usuario obtenido es:", "results": serialized_user}), 200

    return jsonify({"msg": "No tiene los permisos para hacer esta consulta"}), 404

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
    if Follower.query.filter_by(user_from_id=current_user_id, user_to_id=id).first():
        return jsonify({"msg": "You are already following this user"}), 400

    # Create a new Follower entry to represent the follow relationship
    new_follower = Follower(user_from_id=current_user_id, user_to_id=user_to_follow.id)
    """
    new_follower = Follower()
    new_follower.user_from_id = current_user_id
    new_follower.user_to_id = user_to_follow.id
    """
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
        user_from_id=current_user_id, user_to_id=id
    ).first()
    if not follower_entry:
        return jsonify({"msg": "You are not following this user"}), 400

    # Remove the Follower entry to unfollow the user
    db.session.delete(follower_entry)
    db.session.commit()

    return jsonify({"msg": "Successfully unfollowed user"}), 200


# Lista de seguidos
@app.route("/followed", methods=["GET"])
@jwt_required()
def get_followed_list():
    current_user_id = get_jwt_identity()

    # Query the Follower table to get all entries where current_user_id is the follower
    followers_entries = Follower.query.filter_by(user_from_id=current_user_id).all()

    # Extract the user_to_id values from the followers entries
    users_followed_ids = [entry.user_to_id for entry in followers_entries]

    # Query the User table to get the details of users followed by current_user_id
    users_followed = User.query.filter(User.id.in_(users_followed_ids)).all()

    # Serialize the user details
    serialized_users_followed = [user.serialize() for user in users_followed]

    return (
        jsonify(
            {
                "msg": "Usuarios seguidos por el usuario actual:",
                "results": serialized_users_followed,
            }
        ),
        200,
    )

# Lista de seguidores
@app.route("/followers", methods=["GET"])
@jwt_required()
def get_followers_list():
    current_user_id = get_jwt_identity()

    # Query the Follower table to get all entries where current_user_id is the one being followed
    followers_entries = Follower.query.filter_by(user_to_id=current_user_id).all()

    # Extract the user_from_id values from the followers entries
    followers_ids = [entry.user_from_id for entry in followers_entries]

    # Query the User table to get the details of users who are following the current user
    followers = User.query.filter(User.id.in_(followers_ids)).all()

    # Serialize the user details
    serialized_followers = [follower.serialize() for follower in followers]

    return jsonify({"msg": "Users following the current user:", "results": serialized_followers}), 200


# Personal movie list management
@app.route("/favoritemovies/<int:id>", methods=["POST"])
@jwt_required()
def add_movie_personal(id):
    current_user_id = get_jwt_identity()

    # Check if the movie is already in the user's personal list
    existing_entry = Personal_List.query.filter_by(
        user_id=current_user_id, movie_id=int(id)
    ).first()

    if existing_entry:
        return jsonify({"msg": "La película ya está en tu lista personal"}), 400

    # Add the movie to the user's personal list
    new_entry = Personal_List(user_id=current_user_id, movie_id=int(id))
    db.session.add(new_entry)

    try:
        db.session.commit()
        return jsonify({"msg": "Película agregada a tu lista personal"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.session.close()


@app.route("/favoritemovies/<int:id>", methods=["DELETE"])
@jwt_required()
def remove_movie_personal(id):
    try:
        # Get user identity
        current_user_id = get_jwt_identity()

        # Check if the movie is in the user's personal list
        entry_to_remove = Personal_List.query.filter_by(
            user_id=current_user_id, movie_id=int(id)
        ).first()

        if not entry_to_remove:
            return jsonify({"msg": "La película no está en tu lista personal"}), 404

        # Remove the movie from the user's personal list
        db.session.delete(entry_to_remove)
        db.session.commit()

        return jsonify({"msg": "Película eliminada de tu lista personal"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.session.close()


# Personal view state management
@app.route("/viewstate/<int:id>", methods=["GET"])
@jwt_required()
def change_view_status(id):
    try:
        # Get user identity
        current_user_id = get_jwt_identity()

        # Check if the movie is in the user's personal list
        entry_to_update = Personal_List.query.filter_by(
            user_id=current_user_id, movie_id=id
        ).first()

        if not entry_to_update:
            return jsonify({"msg": "La película no está en tu lista personal"}), 404

        # Update the view state of the movie
        entry_to_update.view_state_id = 1  # Assuming 2 represents the "watched" state
        db.session.commit()

        return (
            jsonify({"msg": "Estado de visualización actualizado correctamente"}),
            200,
        )

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.session.close()
    
# Busqueda multiple
@app.route("/multi/<string:value>", methods=["GET"])
def get_multi(value):
    # Retrieve TMDb API key and base URL from environment variables
    api_key = os.getenv("API_KEY")
    base_url = os.getenv("APIMOVIES_URL")

    # Specify the TMDb API endpoint with the specific movie ID
    tmdb_api_url = f"{base_url}/search/multi?query={value}&api_key=" + api_key

    # Set up parameters for the TMDb API request
    params = {}

    try:
        # Make a GET request to TMDb API
        response = requests.get(tmdb_api_url, params=params)
        response.raise_for_status()  # Check for errors

        # Parse the JSON response
        data = response.json()

        # Return the movie details as JSON response
        return (
            jsonify({"msg": "Data obtained successfully", "result": data}),
            200,
        )

    except requests.exceptions.RequestException as e:
        return jsonify({"msg": f"Error fetching data from TMDb API: {str(e)}"}), 500

# Movie management
def get_movies():
    # Retrieve TMDb API key and base URL from environment variables
    api_key = os.getenv("API_KEY")
    base_url = os.getenv("APIMOVIES_URL")

    # Specify the TMDb API endpoint
    tmdb_api_url = f"{base_url}/discover/movie?api_key=" + api_key

    # Set up parameters for the TMDb API request
    params = {
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


# Busqueda por id de IMDB
@app.route("/movie/id/<string:id>", methods=["GET"])
def get_movie_id(id):
    # Retrieve TMDb API key and base URL from environment variables
    api_key = os.getenv("API_KEY")
    base_url = os.getenv("APIMOVIES_URL")

    # Specify the TMDb API endpoint with the specific movie ID
    tmdb_api_url = f"{base_url}/find/{id}?api_key=" + api_key

    # Set up parameters for the TMDb API request
    params = {
        "external_source": "imdb_id",  # Specify search by IMDB id
    }

    try:
        # Make a GET request to TMDb API
        response = requests.get(tmdb_api_url, params=params)
        response.raise_for_status()  # Check for errors

        # Parse the JSON response
        movie_data = response.json()

        # Return the movie details as JSON response
        return (
            jsonify({"msg": "Movie obtained successfully", "result": movie_data}),
            200,
        )

    except requests.exceptions.RequestException as e:
        return jsonify({"msg": f"Error fetching movie from TMDb API: {str(e)}"}), 500


# Busqueda por titulo
@app.route("/movie/title/<string:title>", methods=["GET"])
def get_movie_title(title):
    # Retrieve TMDb API key and base URL from environment variables
    api_key = os.getenv("API_KEY")
    base_url = os.getenv("APIMOVIES_URL")

    # Specify the TMDb API endpoint with the specific movie ID
    tmdb_api_url = f"{base_url}/search/movie?query={title}&api_key=" + api_key

    # https://image.tmdb.org/t/p/original/[poster_path] para mostrar imagenes en front
    # https://image.tmdb.org/t/p/w185/[poster_path] cambio image size

    # Set up parameters for the TMDb API request
    params = {}

    try:
        # Make a GET request to TMDb API
        response = requests.get(tmdb_api_url, params=params)
        response.raise_for_status()  # Check for errors

        # Parse the JSON response
        movie_data = response.json()

        # Return the movie details as JSON response
        return (
            jsonify({"msg": "Movie obtained successfully", "result": movie_data}),
            200,
        )

    except requests.exceptions.RequestException as e:
        return jsonify({"msg": f"Error fetching movie from TMDb API: {str(e)}"}), 500


# Por conflicto se cambio la ruta, solo da los detalles de las peliculas que se busquen por el id propio de TMDB
@app.route("/moviedetails/<int:id>", methods=["GET"])
def get_movie_details(id):
    # Retrieve TMDb API key and base URL from environment variables
    api_key = os.getenv("API_KEY")
    base_url = os.getenv("APIMOVIES_URL")

    # Specify the TMDb API endpoint with the specific movie ID
    tmdb_api_url = f"{base_url}/movie/{id}?api_key=" + api_key

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
        return (
            jsonify({"msg": "Movie obtained successfully", "result": movie_data}),
            200,
        )

    except requests.exceptions.RequestException as e:
        return jsonify({"msg": f"Error fetching movie from TMDb API: {str(e)}"}), 500

'''
@app.route("/addmovie", methods=["POST"])
def add_movie():
    return jsonify({"msg": "ok"})

@app.route("/deletemovie/<int:id>", methods=["DELETE"])
def delete_movie():
    return jsonify({"msg": "ok"})

@app.route("/updatemovie/<int:id>", methods=["PUT"])
def update_movie():
     return jsonify({"msg": "ok"})
'''


# Movie review management
@app.route("/reviews", methods=["POST"])
@jwt_required()
def add_review():
    try:
        # Get user identity
        current_user_id = get_jwt_identity()

        # Get data from request body
        data = request.get_json(silent=True)
        if data is None:
            return jsonify({"error": "No JSON data provided in the request"}), 400

        # Validate required fields
        if "movie_id" not in data:
            return jsonify({"error": "Movie ID is required"}), 400
        if "rating" not in data:
            return jsonify({"error": "Rating is required"}), 400
        if "review" not in data:
            return jsonify({"error": "Review is required"}), 400

        # Create a new Movie_Review entry
        new_review = Movie_Review(
            user_id=current_user_id,
            movie_id=data["movie_id"],
            rating=data["rating"],
            review=data["review"],
        )
        db.session.add(new_review)
        db.session.commit()

        return jsonify({"msg": "Review added successfully"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.session.close()


@app.route("/reviews/<int:id>", methods=["PUT"])
@jwt_required()
def update_review(id):
    try:
        # Get user identity
        current_user_id = get_jwt_identity()

        # Get data from request body
        data = request.get_json(silent=True)
        if data is None:
            return jsonify({"error": "No JSON data provided in the request"}), 400

        # Validate required fields
        if "rating" not in data:
            return jsonify({"error": "Rating is required"}), 400
        if "review" not in data:
            return jsonify({"error": "Review is required"}), 400

        # Check if the review exists
        review = Movie_Review.query.filter_by(id=id, user_id=current_user_id).first()
        if not review:
            return (
                jsonify(
                    {"error": "Review not found or you don't have permission to update"}
                ),
                404,
            )

        # Update the review
        review.rating = data["rating"]
        review.review = data["review"]
        db.session.commit()

        return jsonify({"msg": "Review updated successfully"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.session.close()


@app.route("/reviews/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_review(id):
    try:
        # Get user identity
        current_user_id = get_jwt_identity()

        # Check if the review exists
        review = Movie_Review.query.filter_by(id=id, user_id=current_user_id).first()
        if not review:
            return (
                jsonify(
                    {"error": "Review not found or you don't have permission to delete"}
                ),
                404,
            )

        # Delete the review
        db.session.delete(review)
        db.session.commit()

        return jsonify({"msg": "Review deleted successfully"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.session.close()


# Actor management
@app.route("/actors", methods=["GET"])
def get_actors():
    # Retrieve TMDb API key and base URL from environment variables
    api_key = os.getenv("API_KEY")
    base_url = os.getenv("APIMOVIES_URL")

    # Specify the TMDb API endpoint for popular actors
    tmdb_api_url = f"{base_url}/person/popular?api_key={api_key}"

    # Set up parameters for the TMDb API request
    params = {}

    try:
        # Make a GET request to TMDb API
        response = requests.get(tmdb_api_url, params=params)
        response.raise_for_status()  # Check for errors

        # Parse the JSON response
        actors_data = response.json()

        # Extract relevant information (you may adjust this based on TMDb API response structure)
        actors_list = actors_data.get("results", [])

        # Return the list of popular actors as JSON response
        return (
            jsonify(
                {"msg": "Popular actors obtained successfully", "results": actors_list}
            ),
            200,
        )

    except requests.exceptions.RequestException as e:
        return jsonify({"msg": f"Error fetching actors from TMDb API: {str(e)}"}), 500

@app.route("/actors/<string:name>", methods=["GET"])
def get_actor_name(name):
    # Retrieve TMDb API key and base URL from environment variables
    api_key = os.getenv("API_KEY")
    base_url = os.getenv("APIMOVIES_URL")

    # Specify the TMDb API endpoint with the specific movie ID
    tmdb_api_url = f"{base_url}/search/person?query={name}&api_key=" + api_key

    # Set up parameters for the TMDb API request
    params = {}

    try:
        # Make a GET request to TMDb API
        response = requests.get(tmdb_api_url, params=params)
        response.raise_for_status()  # Check for errors

        # Parse the JSON response
        actor_data = response.json()

        # Return the movie details as JSON response
        return (
            jsonify({"msg": "Actor obtained successfully", "result": actor_data}),
            200,
        )

    except requests.exceptions.RequestException as e:
        return jsonify({"msg": f"Error fetching actor from TMDb API: {str(e)}"}), 500


@app.route("/actors/<int:id>", methods=["GET"])
def get_actor_id(id):
    # Retrieve TMDb API key and base URL from environment variables
    api_key = os.getenv("API_KEY")
    base_url = os.getenv("APIMOVIES_URL")

    # Specify the TMDb API endpoint with the specific movie ID
    tmdb_api_url = f"{base_url}/search/person/{id}&api_key=" + api_key

    # Set up parameters for the TMDb API request
    params = {}

    try:
        # Make a GET request to TMDb API
        response = requests.get(tmdb_api_url, params=params)
        response.raise_for_status()  # Check for errors

        # Parse the JSON response
        actor_data = response.json()

        # Return the movie details as JSON response
        return (
            jsonify({"msg": "Actor obtained successfully", "result": actor_data}),
            200,
        )

    except requests.exceptions.RequestException as e:
        return jsonify({"msg": f"Error fetching actor from TMDb API: {str(e)}"}), 500


'''
@app.route("/actors", methods=["POST"])
def add_actor():
    return jsonify({"msg": "ok"})

@app.route("/actors/<int:id>", methods=["PUT"])
def update_actor():
    return jsonify({"msg": "ok"})

@app.route("/actors/<int:id>", methods=["DELETE"])
def delete_actor():
    return jsonify({"msg": "ok"})
'''

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
