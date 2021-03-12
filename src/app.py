"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory, flash,json
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, User, Favorite
from api.routes import api
from api.admin import setup_admin
from flask_jwt_simple import JWTManager, jwt_required, create_jwt, get_jwt_identity
from datetime import datetime


#from models import Person

ENV = os.getenv("FLASK_ENV")
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# database condiguration
if os.getenv("DATABASE_URL") is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db)
db.init_app(app)

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

#JWT Key 
app.config['JWT_SECRET_KEY'] = '$An$Jo$Mo$Ma$'
#JSON Web Token Management
jwt = JWTManager(app)

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

#region USER
                    ####GET ALL USERS####

@app.route('/user', methods=['GET'])                    
def get_users():
    user = User.query.all()
    payload = list(map(lambda u: u.serialize(), user))
    return jsonify(payload), 200
                    
                    ####GET USER BY ID#####
@app.route('/user/<int:user_id>', methods=['GET'])
def get_user_by_ID(user_id):
    user = User.query.filter_by(id=user_id).first_or_404()
    return jsonify(user.serialize()), 200

                    #### ADD USER####
@app.route('/user', methods=['POST'])
def add_user():
    req = json.loads(request.data)
    if req["email"] == None and req["password"] == None:
        flash("Los datos ingresados están incompletos o vacíos")
    else:
        user = User(email= req["email"], password= req["password"])
        db.session.add(user)
        db.session.commit()
        return "El usuario ha sido agregado exitosamente"
                    
                    #### DEL USER####
@app.route('/user/<int:user_id>', methods=['DELETE'])
def del_user_by_ID(user_id):
    user = User.query.filter_by(id=user_id).first_or_404()
    if user is None:
        raise APIException("Usuario no encontrado", status_code=404)
    else:
        db.session.delete(user)
        db.session.commit()
        return jsonify(user.serialize()), 204   #indicates that the server has successfully fulfilled the request and that there is no content to send in the response payload body

                    #### UPDATE USER ####
@app.route('/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    req = User.query.filter_by(id=user_id).first_or_404()
    if req["email"] == None and req["password"] == None:
        db.session.commit()
        return jsonify(req.serialize()), 200
#endregion USER

#region Favorite
            ###GET ALL FAVORITES###
@app.route('/favorite', methods=['GET'])
def get_favorites():
    fav = Favorite.query.all()
    payload = list(map(lambda f: f.serialize(), fav))
    return jsonify(payload), 200
    
            ###ADD FAVORITE###
@app.route('/favorite', methods=['POST'])
@jwt_required
def add_favorite():
    user_id = get_jwt_identity()                #getting tokenid from user 

    req = json.loads(request.data)
    if req["cocktail_name"] == None and req["cocktail_img"] == None:
        flash('Espacios en blanco o invalidos')
    else:
        fav = Favorite(cocktail_name= req["cocktail_name"], cocktail_img= req["cocktail_img"], user_id= user_id)
        db.session.add(fav)
        db.session.commit()
        return "Hecho", 200  #It is OK

        ###DELETE FAVORITE BY ID###
@app.route('/delete/<int:fav_id>', methods=['DELETE'])
def delete_fav_by_id():
    fav= Favorite.query.filter_by(id=fav_id).first_or_404()
    if fav is None:
        raise APIException('Favorito no encontrado', status_code=404)
    else:
        db.session.delete(fav)
        db.session.commit()
        return jsonify(fav.serialize()), 204 #indicates that the server has successfully fulfilled the request and that there is no content to send in the response payload body

#endregion Favorite

#region LOGIN
@app.route('/login', methods=['POST'])
def user_login():
    if not request.is_json:
        return ({"msg": "Missing JSON request"}), 400 #Bad request

    req = resquest.get_json()
    email = req.get("email", None)
    password =  req.get("password", None)

    if not email:
        return jsonify({"msg": "Email required"}), 400
    if not password:
        return jsonify({"msg": "Password is required"}), 400

                ###CHECKING FOR VALID USER
    chk_usr = User.query.filter_by(email=email, password=password).first_or_404()
    if chk_usr == None:
        return jsonify({"msg": "Email\Password required"}), 401 #this status =>  it lacks valid authentication credentials
                
                ###TOKEN GENERATOR###
    myToken = {'jwt': create_jwt(identity=chk_usr.id), 'id':chk_usr.id, 'user':chk_usr.serialize()}
    return jsonify(myToken), 200 


#endregion LOGIN
# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
