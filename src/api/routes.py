"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Favorites , Destinations
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity



api = Blueprint('api', __name__)

@api.route('/landing-page', methods=['POST', 'GET'])
def landing_page():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


    # REGISTER ENDPOINT
@api.route('/register', methods=['POST'])
def create_user():
    user_email= request.json.get('email', None)
    user_password = request.json.get('password', None)
    recovery_question = request.json.get('recovery_question', None)
    recovery_answer = request.json.get('recovery_answer', None)
    active_user = User.query.filter_by(email = user_email).first()
    if active_user:
        return jsonify({"Error": "Email already in use, try another one"}), 409
    new_user = User(email=user_email,password=user_password,recovery_question=recovery_question,recovery_answer=recovery_answer)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"Message": "User successfully created"})


 
# LOGIN ENDPOINT FOR USERS
@api.route('/login', methods=['POST'])
def login_user():
     user_email = request.json.get("email", None)
     user_password = request.json.get("password", None)
     user = User.query.filter_by(email = user_email, password = user_password).first()
     if user is None:
          return jsonify({"Error": "Wrong email or password"}), 401
     token = create_access_token(identity=user.id)
     return jsonify({"Response": "Successfully logged in", "token": token, "email": user.email}), 200


#GET ALL USERS
@api.route('/users', methods=['GET'])
def get_all_users():
    all_users = User.query.all()
    mapped_users = list(map(lambda index: index.serialize(), all_users))
    response_body=jsonify(mapped_users)
    return response_body, 200

#ACCESSING USERS PRIVATE PAGE

@api.route('/private', methods=['GET'])
@jwt_required()
def show_email():
    current_user_id = get_jwt_identity()
    user=User.query.get(current_user_id)
    return jsonify (user.serialize()), 200

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"id": user.id, "email": user.email }), 200

@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # Query your database for email and password
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        # the user was not found on the database
        return jsonify({"msg": "Bad email or password"}), 401
    
    # create a new token with the user id inside
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })



#Adding FAVORITES 
@api.route('/add_favorites', methods=["POST"])
def add_favorites():
    Favorites_id= request.json.get("id", None)

    Favorites_id_exists = Favorites.query.filter_by(id = Favorites_id).first()

    if Favorites_id_exists:
        return jsonify({"msg":" Favorited has already been added"})
    
    new_Favorites =  Favorites(id= Favorites_id)
    db.session.add(new_Favorites)
    db.session.commit()
    return jsonify({"msg": "Favorites added successfully"}), 200


# DELETING A FAVORIED 
@api.route("/delete_Favorites/<Favorites_id>", methods=["DELETE"])
def delete_Favorite(Favorites_id):
   find_Favorites = Favorites.query.get(Favorites_id)
   
   if find_Favorites is None:
        return jsonify({"Error": " not found"})
   db.session.delete(find_Favorites)
   db.session.commit()

   return jsonify({"Msg": "Favorites successfully deleted"}), 200


# GETTING USER'S FAVORITE PAGE
# @api.route("/FAVORITE_PAGE", methods=["GET"])
# @jwt_required()
# def show_Favorites():
#     current_user_id = get_jwt_identity()
#     user = User.query.filterby(current_user_id = current_user_id ).first()
#     return jsonify({ "id": user.id}), 200\
    # "response": User.favorites



# GETTING ALL THE FAVORITES OF A USER
@api.route("/FAVORITES", methods=["GET"])
@jwt_required()
def get_all_Favorites():
    user = get_jwt_identity()
    all_Favorites =user.favorites.query.all()
    mapped_Favorites = list(map(lambda index: index.serialize(), all_Favorites))
    # response_body = jsonify(favorites)
    # or 
    response_body = jsonify(mapped_Favorites)
    return response_body, 200


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# from flask import Flask, request, jsonify

# app = Flask(__name__)

# geting all destination 
@api.route("/destination", methods=["GET"])
def get_all_Destinations():
    all_Destinations =Destinations.query.all()
    mapped_Destinations = list(map(lambda index: index.serialize(), all_Destinations))
    # response_body = jsonify(favorites)
    # or 
    response_body = jsonify(mapped_Destinations)
    return response_body, 200




destinations_data = [
    {'id': 1, 'name': 'New York City', 'country': 'United States', 'description': 'The city that never sleeps'},
    {'id': 2, 'name': 'Paris', 'country': 'France', 'description': 'The city of love and lights'},
    {'id': 3, 'name': 'Tokyo', 'country': 'Japan', 'description': 'A vibrant and futuristic metropolis'}
]



@api.route('/api/destination/<int:destination_id>', methods=['GET'])
def get_destination(destination_id):
    
    destination = next((d for d in destinations_data if d['id'] == destination_id), None)

    if not destination:
        return jsonify({'error': 'Destination not found.'}), 404

    return jsonify(destination), 200

@api.route('/api/destinations', methods=['POST'])
def save_destination():
    data = request.get_json()
    name = data.get('name')
    country = data.get('country')
    description = data.get('description')

    if not name or not country:
        return jsonify({'error': 'Name and country are required fields.'}), 400

    
    new_destination_id = max(d['id'] for d in destinations_data) + 1

    new_destination = {
        'id': new_destination_id,
        'name': name,
        'country': country,
        'description': description
    }

    destinations_data.append(new_destination)

    return jsonify({'message': 'Destination saved successfully.', 'new_destination': new_destination}), 201

if __name__ == '__main__':
    app.run()

