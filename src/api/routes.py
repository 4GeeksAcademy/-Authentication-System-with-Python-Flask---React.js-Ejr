"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Movie, Actor, Director, Genre, Favorite
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import requests
import os
from flask_cors import CORS
# from schemas import ActorSchema

app = Flask(__name__)
CORS(app)
# ma = Marshmallow(app)



api = Blueprint('api/user', __name__)



# HARRY POTTER MOVIES LOAD 
@api.route("/load_database", methods = ["GET"])
def load_database():
    
    url = "https://api.themoviedb.org/3/search/movie?query=harry%20potter&language=english"

    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGVjZTYyODBhZjZiMGQ0YzY1MWRiOWViYTYwYzVlNSIsInN1YiI6IjY0YzNmNTRkZWMzNzBjMDExYzQ2YmFhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DmLTYp48jRT5TkS8IG0FAEuFro5YNx6S6pO1WghQFOw"
    }

    response = requests.get(url, headers=headers)

    data_json = response.json()

    response_body = {
    "message": data_json['results'][0]['id']
    }

    data = response.json()
    results = data.get("results", [])


    for result in results:
        # Crear una instancia del modelo Movie con los datos de la película actual
        actors = get_actors_from_movie(result["id"])
        directors = get_directors_from_movie(result["id"]) 
        trailer = get_movie_videos(result["id"])
        genres = get_genres_from_movie(result["id"])

        nueva_pelicula = Movie(
            name = result["title"],
            image = result["poster_path"],
            description = result["overview"],
            ranking = result["vote_average"],
            actors = actors,
            directors = directors,
            trailer_key = trailer["key"] if trailer else None,
            trailer_type = trailer["type"] if trailer else None,
            trailer_id = trailer["id"] if trailer else None,
            genres = genres,
        )

        # Agregar la nueva película a la sesión de SQLAlchemy
        db.session.add(nueva_pelicula)

    # Confirmar la sesión para guardar los cambios en la base de datos
    db.session.commit()

    return jsonify(response_body), 200



def get_genres_from_movie(movie_id):
    # URL de la API para obtener los detalles de una película por su ID
    url = f"https://api.themoviedb.org/3/movie/{movie_id}"
    
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGVjZTYyODBhZjZiMGQ0YzY1MWRiOWViYTYwYzVlNSIsInN1YiI6IjY0YzNmNTRkZWMzNzBjMDExYzQ2YmFhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DmLTYp48jRT5TkS8IG0FAEuFro5YNx6S6pO1WghQFOw"
    }
    
    # Realizar la solicitud GET a la API
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        genres_data = response.json().get('genres', [])
        genres = [Genre(name=genre['name']) for genre in genres_data]
        return genres
    else:
        return []


def get_movie_videos(movie_id):
    # para obtener los videos de una película por su ID
    url = f"https://api.themoviedb.org/3/movie/{movie_id}/videos"
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGVjZTYyODBhZjZiMGQ0YzY1MWRiOWViYTYwYzVlNSIsInN1YiI6IjY0YzNmNTRkZWMzNzBjMDExYzQ2YmFhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DmLTYp48jRT5TkS8IG0FAEuFro5YNx6S6pO1WghQFOw"
    }
    response = requests.get(url, headers=headers)

    videos = response.json().get('results', [])

    trailer = next((video for video in videos if video['type'] == 'Trailer' and video['official']), None)

    return trailer


def get_movie_credits(movie_id):
    """Obtiene los créditos de una película por su ID."""
    url = f"https://api.themoviedb.org/3/movie/{movie_id}/credits"
    print(url)
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGVjZTYyODBhZjZiMGQ0YzY1MWRiOWViYTYwYzVlNSIsInN1YiI6IjY0YzNmNTRkZWMzNzBjMDExYzQ2YmFhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DmLTYp48jRT5TkS8IG0FAEuFro5YNx6S6pO1WghQFOw"
    }
    response = requests.get(url, headers=headers)

    return response.json()

def get_person_details(person_id):
    url = f'https://api.themoviedb.org/3/person/{person_id}'
    headers = {
        "accept": "application/json",
         "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGVjZTYyODBhZjZiMGQ0YzY1MWRiOWViYTYwYzVlNSIsInN1YiI6IjY0YzNmNTRkZWMzNzBjMDExYzQ2YmFhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DmLTYp48jRT5TkS8IG0FAEuFro5YNx6S6pO1WghQFOw"
    }
    response = requests.get(url, headers=headers)
    data = response.json()

    biography = data.get('biography')
    birthday = data.get('birthday')
    deathday = data.get('deathday')
    place_of_birth = data.get('place_of_birth')
    profile_path = data.get('profile_path')
    
    return {
        'biography': biography, 
        'birthday': birthday, 
        'deathday': deathday, 
        'place_of_birth': place_of_birth, 
        'profile_path': profile_path
    }




def get_actors_from_movie(movie_id):
    credits = get_movie_credits(movie_id)

    print(credits)

    actors = []
    for actor_data in credits["cast"]:
        actor = Actor.query.get(actor_data["id"])
        
        person_details = get_person_details(actor_data["id"])
        biography = person_details.get('biography')
        birthday = person_details.get('birthday')
        deathday = person_details.get('deathday')
        place_of_birth = person_details.get('place_of_birth')
        profile_path = person_details.get('profile_path')

        if actor is None:
            actor = Actor(
                id=actor_data["id"],
                name=actor_data["name"],
                known_for_department=actor_data["known_for_department"],
                character=actor_data["character"],
                profile_path=actor_data["profile_path"],
                biography=biography,
                birthday=birthday,
                deathday=deathday,
                place_of_birth=place_of_birth
            )
            db.session.add(actor)
        actors.append(actor)
        
    # Guardar los cambios en la base de datos
    db.session.commit()

    return actors

def get_directors_from_movie(movie_id):
    credits = get_movie_credits(movie_id)
    print("Créditos completos:", credits)

    directors = []
    for crew_member in credits.get("crew", []):
        if crew_member.get("job") == "Director":
            print("Encontrado director:", crew_member)

            director = Director.query.get(crew_member["id"])
            person_details = get_person_details(crew_member["id"])
            biography = person_details.get('biography')
            birthday = person_details.get('birthday')
            deathday = person_details.get('deathday')
            place_of_birth = person_details.get('place_of_birth')
            profile_path = person_details.get('profile_path')

            if director is None:
                director = Director(
                    id=crew_member["id"],
                    name=crew_member["name"],
                    known_for_department=crew_member.get("known_for_department", ""),
                    biography=biography,
                    birthday=birthday,
                    deathday=deathday,
                    place_of_birth=place_of_birth,
                    profile_path=profile_path
                )
                db.session.add(director)
            directors.append(director)
   
    db.session.commit()
    return directors





@app.route('/users/<int:user_id>/favorites', methods=['GET'])
def get_user_favorites():
    user_id = 1  

    favorites = Favorite.query.filter_by(user_id=user_id).all()

    fav_actors = []
    fav_directors = []
    fav_movies = []

    for fav in favorites:
        if fav.actor_id:
            fav_actors.append(fav.actor.serialize())
        if fav.director_id:
            fav_directors.append(fav.director.serialize())
        if fav.movie_id:
            fav_movies.append(fav.movie.serialize())

    response_body = {
        "msg": "This is the list of favorites for the user",
        "actors": fav_actors,
        "directors": fav_directors,
        "movies": fav_movies,
    }

    return jsonify(response_body), 200



@api.route('/movies', methods=['GET'])
def get_movies():
    movies = Movie.query.all()
    return jsonify([movie.serialize() for movie in movies]), 200

@api.route('/movies/<int:movie_id>', methods=['GET'])
def get_movie(movie_id):
    movie = Movie.query.get(movie_id)
    return jsonify(movie.serialize()), 200

@api.route('/actors', methods=['GET'])
def get_actors():
    actors = Actor.query.all()
    return jsonify([actor.serialize() for actor in actors]), 200

@api.route('/actors/<int:actor_id>', methods=['GET'])
def get_actor(actor_id):
    actor = Actor.query.get(actor_id)
    return jsonify(actor.serialize()), 200

@api.route('/directors', methods=['GET'])
def get_directors():
    directors = Director.query.all()
    return jsonify([director.serialize() for director in directors]), 200

@api.route('/directors/<int:director_id>', methods=['GET'])
def get_director(director_id):
    director = Director.query.get(director_id)
    if director:
        return jsonify(director.serialize()), 200
    else:
        return jsonify({"error": "Director not found"}), 404



# USER ROUTES
@api.route("/current_user", methods = ["GET"])
@jwt_required()
def current_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({"user": user.serialize()})    


@api.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200


@api.route('/users/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"msg": "User not found"}), 404
    return jsonify(user.serialize()), 200


@api.route('/users', methods=['POST'])
def create_user():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    name = request.json.get('name', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not name or not email or not password:
        return jsonify({"msg": "Missing name, email or password"}), 400

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"msg": "User already exists"}), 400

    new_user = User(name=name, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.serialize()), 201


@api.route('/users/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    user = User.query.get(user_id)
    if user is None:
        return jsonify({"msg": "User not found"}), 404

    name = request.json.get('name', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if name is not None:
        user.name = name
    if email is not None:
        user.email = email
    if password is not None:
        user.set_password(password)

    db.session.commit()
    return jsonify(user.serialize()), 200


@api.route('/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"msg": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"msg": "User deleted"}), 200





# SIGNE, PASS RECOVERY & LOGIN ROUTES
@api.route('/signup', methods=['POST'])
def create_new_user():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    name = request.json.get('name', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    confirm_password = request.json.get('confirm_password', None)
    secret_question = request.json.get('secret_question', None)


    secret_answer= request.json.get('secret_answer', None)

    if not name or not email or not password or not confirm_password or not secret_question or not secret_answer:
        return jsonify({"msg": "Please, complete all fields"}), 400


    if password != confirm_password:
        return jsonify({"msg": "Password and confirm_password do not match"}), 400

    
    user = User.query.filter_by(email=email).first()

    if user:
        return jsonify({"msg": "User already exists"}), 400


    new_user = User(name=name, email=email, password=password, secret_question= secret_question, secret_answer=secret_answer, is_active=True)


    # new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=new_user.id)

    return jsonify({"token": access_token, "msg": "User created", "id": new_user.id}), 201



@api.route('/login', methods=['POST'])
def login():

    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400
        
    user = User.query.filter_by(email=email).first()
   
    if user is None or user.password != password:
        return jsonify({"msg": "Invalid email or password"}), 401
    
    access_token = create_access_token(identity=user.id)

    return jsonify({"token": access_token, "user": user.serialize()}), 200


@api.route('/pass-recovery', methods=['POST'])
def passRecovery(): 

    email = request.json.get("email", None)
    secret_answer = request.json.get ("secret_answer", None)

    if not email or not secret_answer:
        return jsonify({"msg": "Email and secret_answer are required"}), 400
            
    user = User.query.filter_by(email=email).first()

    if user is None or user.secret_answer != secret_answer:
        return jsonify({"msg" : "Invalid email or secret_answer"}), 401


    return jsonify ({"msg" : "ok"}), 200


@api.route('/pass-change', methods=['PATCH'])
def passChange(): 

    new_password = request.json.get("new_password", None)
    confirm_password = request.json.get ("confirm_password", None)

    if not new_password or new_password != confirm_password:
        return jsonify({"msg": "Las contraseñas no coinciden"}), 400
            
    if new_password == confirm_password :
         return jsonify ({"msg" : "contrasaeña actualizada correctamente"}), 200