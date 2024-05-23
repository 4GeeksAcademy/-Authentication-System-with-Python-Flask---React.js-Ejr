import os
from flask import Flask, request, jsonify, send_from_directory, render_template
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
import re
from flask_mail import Mail, Message
import random
import string
from datetime import datetime

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__, template_folder='../src/templates')

app.config.update(dict(
    DEBUG=False,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    MAIL_USE_SSL=False,
    MAIL_USERNAME="urbantreasures.info@gmail.com",
    MAIL_PASSWORD='smbbvwybbzzebwpo'
))
mail = Mail(app)

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


@app.route('/api/forgot-password', methods=['POST'])
def forgot_password():
    body = request.get_json()
    email = body.get('email')
    if not email:
        return jsonify({'msg': "Email is required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'msg': "No user found with that email"}), 404

    temp_password = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
    user.temp_password = bcrypt.generate_password_hash(temp_password).decode('utf-8')
    user.temp_password_time = datetime.utcnow()
    db.session.commit()

    msg = Message(subject="Your temporary password",
                  sender="urbantreasures.info@gmail.com",
                  recipients=[user.email])
    msg.html = f"<h3>Your temporary password is: {temp_password}</h3>"
    mail.send(msg)

    return jsonify({"msg": "Temporary password sent to your email"}), 200


@app.route('/api/reset-password', methods=['POST'])
def reset_password():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    body = request.get_json()
    temp_password = body.get('temp_password')
    new_password = body.get('new_password')

    if not temp_password or not new_password:
        return jsonify({'msg': "All fields are required"}), 422

    user = User.query.filter(User.temp_password != None).first()

    if not user:
        return jsonify({'msg': "No temporary password has been set for any user"}), 404

    if not bcrypt.check_password_hash(user.temp_password, temp_password):
        return jsonify({'msg': "Temporary password is invalid or has expired"}), 404

    if (datetime.utcnow() - user.temp_password_time).total_seconds() > 3600:
        return jsonify({'msg': "The temporary password has expired"}), 400

    user.password = bcrypt.generate_password_hash(new_password).decode('utf-8')
    user.temp_password = None  
    db.session.commit()

    return jsonify({"msg": "Password has been successfully reset"}), 200


@app.route('/api/contact', methods=['POST'])
@jwt_required()
def contact():
    user_email = get_jwt_identity()
    body = request.get_json(silent=True)
    if not body:
        return jsonify({'msg': "No se han proporcionado datos"}), 400

    username = body.get('username')
    subject = body.get('subject')
    message = body.get('message')

    if not all([username, subject, message]):
        return jsonify({'msg': "Todos los campos son obligatorios excepto el email"}), 400

    msg = Message(subject="Formulario de Contacto: " + subject,
                  sender=user_email,  
                  recipients=["urbantreasures.info@gmail.com"])
    msg.html = f"<h3>Mensaje de: {username}</h3><p>{message}</p>"
    mail.send(msg)

    return jsonify({"msg": "Mensaje enviado con éxito"}), 200


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
    new_treasure.code = body['code']
    db.session.add (new_treasure)
    db.session.commit()
    
    return jsonify({'msg': "Tesoro ocultado con exito"}), 201


@app.route('/api/register', methods=['POST'])
def register():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg': "Debes enviar información en el body"}), 400
    if 'email' not in body or body["email"] == "":
        return jsonify({'msg': "Email is mandatory"}), 400
    if not re.match(r'\S+@\S+\.\S+', body['email']):
        return jsonify({'msg': "Invalid email format"}), 400
    if 'password' not in body:
        return jsonify({'msg': "El campo password es obligatorio"}), 400
    if "user_type" not in body:
        return jsonify({"msg": "El campo user_type es obligatorio"}), 400
    if "username" not in body or body["username"] == "":
        return jsonify({"msg": "Username is mandatory"}), 400

    user_exist = User.query.filter_by(email=body["email"]).first()
    username_exist = User.query.filter_by(username=body["username"]).first()

    if user_exist is not None:
        return jsonify({"msg": "Email already registered"}), 400
    if username_exist is not None:
        return jsonify({"msg": "Username already exists"}), 400

    new_user = User(username=body['username'], email=body['email'], password=bcrypt.generate_password_hash(body['password']).decode('utf-8'), user_type=body['user_type'])
    db.session.add(new_user)
    db.session.commit()

    msg = Message(subject="Welcome mail", sender="urbantreasures.info@gmail.com", recipients=[new_user.email])
    msg.html = render_template('welcome_mail.html', username=new_user.username)
    mail.send(msg)

    return jsonify({"msg": "El usuario ha sido creado con éxito"}), 201


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


@app.route('/api/update-profile-image', methods=['POST'])
@jwt_required()
def update_profile_image():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    
    if user is None:
        return jsonify({'msg': "Usuario no encontrado"}), 404
    
    body = request.get_json(silent=True)
    if body is None or 'photo' not in body:
        return jsonify({'msg': "Debes enviar el campo photo con la URL de la nueva imagen en el body"}), 400
    
    user.photo = body['photo']
    db.session.commit()
    
    return jsonify({'msg': "Imagen de perfil actualizada con éxito"}), 200


@app.route('/api/treasure/<int:treasure_id>/found', methods=['POST'])
@jwt_required()
def mark_treasure_as_found(treasure_id):
    user_email = get_jwt_identity()

    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({'msg': "Usuario no encontrado"}), 404

    treasure = Treasures_Hide.query.filter_by(id=treasure_id).first()
    if not treasure:
        return jsonify({'msg': "Tesoro no encontrado"}), 404

    data = request.get_json()
    submitted_code = data.get('code')
    
    if not submitted_code:
        return jsonify({"msg": "Code required"}), 400
    
    if submitted_code != treasure.code:
        return jsonify({"msg": "Code not correct"}), 403

    if treasure.founded:
        return jsonify({'msg': "Este tesoro ya ha sido encontrado"}), 400

    if user.id == treasure.user_id:
        return jsonify({'msg': "You cannot mark a treasure as found if you hid it yourself"}), 403

    treasure.founded = True
    user.points += 10
    db.session.add(user)

    user_hide = User.query.filter_by(id=treasure.user_id).first()
    if user_hide:
        user_hide.points += 10
        db.session.add(user_hide)

    new_treasure_found = Treasures_Founded(treasures_hide_id=treasure_id, user_found_id=user.id)
    db.session.add(new_treasure_found)
    db.session.commit()

    msg = Message(subject="Treasure Found", sender="urbantreasures.info@gmail.com", recipients=[user_hide.email])
    msg.html = render_template('treasure_founded.html', username=user_hide.username, treasure_name=treasure.name, finder_username=user.username)
    mail.send(msg)

    return jsonify({'msg': "Tesoro marcado como encontrado con éxito"}), 201


'''-------------------------------------GET------------------------------------------- '''


@app.route('/api/treasures', methods=['GET'])
def get_treasures():
    treasures = db.session.query(Treasures_Hide, User).join(User).filter(Treasures_Hide.founded == False).all()
    result = []
    for treasure, user in treasures:
        treasure_data = {
            "id": treasure.id,
            "name": treasure.name,
            "image": treasure.image,
            "location": treasure.location,
            "city_name": treasure.city_name,
            "tips": treasure.tips,
            "user_id": treasure.user_id,
            "username": user.username,
            "userPhoto": user.photo,
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


@app.route('/api/user/<int:user_id>/hide-treasures', methods=['GET'])
def get_user_treasures(user_id):
    treasures = db.session.query(Treasures_Hide).filter(Treasures_Hide.user_id == user_id).all()
    result = [treasure.serialize() for treasure in treasures]  
    return jsonify(result), 200


@app.route('/api/user/<int:user_id>/found-treasures', methods=['GET'])
def get_user_treasures_found(user_id):
    treasures = db.session.query(Treasures_Founded).filter(Treasures_Founded.user_found_id == user_id).all()
    result = [treasure.serialize() for treasure in treasures]  
    return jsonify(result), 200


@app.route('/api/treasure/<int:treasure_id>', methods=['GET'])
@jwt_required()
def get_treasure(treasure_id): 
    treasure = Treasures_Hide.query.filter_by(id=treasure_id).first()
    if treasure is None:
        return jsonify({"error": "Tesoro no encontrado"}), 404

    treasure_data = treasure.serialize()  
    treasure_data['username'] = treasure.user_relationship.username

    return jsonify(treasure_data), 200


@app.route('/api/cities', methods=['GET'])
def get_cities():
    cities = Cities.query.all()
    cities_list = [city.serialize() for city in cities]
    return jsonify(cities_list), 200


@app.route('/api/rankings/<type>', methods=['GET'])
def get_rankings(type):
    try:
        if type == 'Users':
            users = User.query.filter_by(user_type='user').order_by(User.points.desc()).limit(10).all()
        elif type == 'Companies':
            users = User.query.filter_by(user_type='company').order_by(User.points.desc()).limit(10).all()
        else:
            return jsonify({"error": "Invalid type"}), 400

        return jsonify([user.serialize() for user in users]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/status-by-points/<int:points>', methods=['GET'])
def get_status_by_points(points):
    current_status = Status.query.filter(Status.points_min <= points, Status.points_max >= points).first()
    if not current_status:
        return jsonify({'msg': "No se encontró un estado válido para los puntos dados"}), 404
    
    next_status = Status.query.filter(Status.points_min > points).order_by(Status.points_min.asc()).first()
    if next_status:
        progress = (points - current_status.points_min) / (next_status.points_min - current_status.points_min) * 100
    else:
        next_status = current_status  
        progress = 100

    return jsonify({
        'current_status': current_status.serialize(),
        'next_status': next_status.serialize() if next_status != current_status else None,
        'progress': progress
    }), 200


'''-------------------------------------------PUT-------------------------------------------------'''


@app.route('/api/update-username/<int:user_id>', methods=['PUT'])
def update_username(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    new_username = data.get('username')
    if not new_username:
        return jsonify({"error": "New username is required"}), 400

    user.username = new_username
    db.session.commit()
    return jsonify({"message": "Username updated successfully"}), 200
    

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
