"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, render_template , redirect,url_for
# from flask_jwt import jwt_required, JWT
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, JWTManager
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)

# or
# api = Flask('api', __name__)


# favorite_list =[]


# def list_append(item):
#     global favorite_list
#     favorite_list.append(item)


# def list_delete(item):
#     global favorite_list
#     favorite_list.remove(item)


# TESTING API
@api.route('/hello', methods=['POST', 'GET' ])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

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
@api.route("/FAVORITE_PAGE", methods=["GET"])
@jwt_required()
def show_Favorites():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({ "id": user.id, "response": "That is your lsit of Favorites!"}), 200



# GETTING ALL THE FAVORITES OF A USER
@api.route("/FAVORITES", methods=["GET"])
def get_all_Favorites():
    all_Favorites =Favorites.query.all()
    favorites = favorites.query.filter(favorites.user_id == user.id).all()
    # or
    # mapped_Favorites = list(map(lambda index: index.serialize(), all_Favorites))
    response_body = jsonify(favorites)
    # or 
    # response_body = jsonify(mapped_Favorites)
    return response_body, 200














# @api.route('/add', methods=['POST'])
# def index():
#     global favorite_list
#     if request.method == 'POST':       
#         item_added = request.form['item']
#         if item_added != '':
#             list_append(item_added)
#     return render_template('index.html', favorite_list=favorite_list)


# @api.route('/delete/<item>')
# def delete(item):
#     list_delete(item)
#     return redirect(url_for('index'))










# # favoriteList endpoint
# @api.route('/users/<int:user_id>')
# def users_show(user_id):
#     # Show user profile/favorites list.
    
#     user = User.query.get_or_404(user_id)

#     favorites = favorites.query.filter(favorites.user_id == user.id).all()

#     response_body = {
#         "message": "this is the /Users end point "
#     }
#     jsonify(response_body), 200

#     return render_template('users/private', user=user, favorites=favorites) 

# @api.route('/add-favorites', methods=["GET", "POST"])
# def add_favorite():
#     # Adds to the users favorites list

#     if not g.user:
#         flash("Access denied, you need to sign up/in first!", "danger")
#         return redirect("/")

#     else:
        
#         form = AddFavoriteForm()

#     favorite = Favorite.add_favorite(
#         Favorites_id =form.Favorites_id.data,
#         user_id = session[CURR_USER_KEY]
#     )
#     db.session.commit()
    
#     return redirect(f"/users/{g.user.id}")











# @api.route('/favoritesList' , methods=[ 'GET' ,'POST'])
# def get_favorites(favorites_id):
#     User_favorites = User.query.get(user_id)
#     response_body = {
#         "message": "this is the /favoritesList end point "
#     }

#     return jsonify(response_body), 200