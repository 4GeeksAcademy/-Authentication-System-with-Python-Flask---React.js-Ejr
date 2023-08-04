"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Movie, Actor, Director
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import requests
import os


api = Blueprint('api/user', __name__)


# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200

@api.route("/current_user", methods = ["GET"])
@jwt_required()
def current_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({"user": user.serialize()})

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

        nueva_pelicula = Movie(
            name=result["title"],
            description=result["overview"][:250],
            ranking=result["vote_average"],
            actors=actors,
            directors=directors
        )

        # Agregar la nueva película a la sesión de SQLAlchemy
        db.session.add(nueva_pelicula)

    # Confirmar la sesión para guardar los cambios en la base de datos
    db.session.commit()

    return jsonify(response_body), 200


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

def get_actors_from_movie(movie_id):
    """Obtiene los actores de una película por su ID."""
    # Obtener los créditos
    credits = get_movie_credits(movie_id)

    print(credits)
    # Extraer los actores de los créditos
    actors = []
    for actor_data in credits["cast"]:
        actor = Actor.query.get(actor_data["id"])
        if actor is None:
            actor = Actor(
                id=actor_data["id"],
                name=actor_data["name"],
                description=actor_data.get("known_for_department", ""),
                other_movies=actor_data.get("character", "")
            )
            db.session.add(actor)
        actors.append(actor)

        
    # Guardar los cambios en la base de datos
    db.session.commit()
    return actors


def get_directors_from_movie(movie_id):
    """Obtiene los direcotres de una película por su ID."""
    # Obtener los créditos
    credits = get_movie_credits(movie_id)
    print("Créditos completos:", credits)

    # Extraer los directores de los créditos
    directors = []

    for crew_member in credits.get("crew", []):
        if crew_member.get("job") == "Director":
            print("Encontrado director:", crew_member)
            director = Director.query.get(crew_member["id"])
            if director is None:
                director = Director(
                    id=crew_member["id"],
                    name=crew_member["name"],
                    description=crew_member.get("known_for_department", ""),
                    other_movies=crew_member.get("") 
                )
                db.session.add(director)
            directors.append(director)

        
    # Guardar los cambios en la base de datos
    db.session.commit()
    return directors


    

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


@api.route('/signup', methods=['POST'])
def create_new_user():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    name = request.json.get('name', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    confirm_password = request.json.get('confirm_password', None)

    if not name or not email or not password or not confirm_password:
        return jsonify({"msg": "Missing name, email or password or confirm_password"}), 400

    if password != confirm_password:
        return jsonify({"msg": "Password and confirm_password do not match"}), 400

    
    user = User.query.filter_by(email=email).first()

    if user:
        return jsonify({"msg": "User already exists"}), 400

    new_user = User(name=name, email=email)
    new_user.set_password(password)
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

    if user is None or not user.check_password(password):
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
    