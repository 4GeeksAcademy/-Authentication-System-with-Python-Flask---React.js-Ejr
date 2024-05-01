import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, Trainer, Trainer_data, User, User_data, Routines
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from datetime import timedelta

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False
app.config['JWT_SECRET_KEY'] = 'your_secret_key_here'
jwt = JWTManager(app)

# database configuration
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

# Login & Signup Endpoints
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    if not data:
        return jsonify({'error': 'Insert correct information'}), 400

    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return jsonify({'error': 'Missing email or password'}), 400

    user = User.query.filter_by(email=email).first()
    trainer = Trainer.query.filter_by(email=email).first()

    if (user and password != user.password) or (trainer and password != trainer.password):
        return jsonify({'error': 'Invalid password, please try again'}), 401
    
    role = "user" if user else "trainer"

    access_token = create_access_token(identity=email, additional_claims={"role": role})
   
    return jsonify({ "access_token": access_token}), 200

@app.route('/signup', methods=['POST'])
def create_new_user():
    data = request.json
    check_if_email_already_exists = User.query.filter_by(email=data["email"]).first()
    if check_if_email_already_exists:
        return jsonify({'error': 'Email already exists'}), 400
    
    new_user = User(
        user_name=data["user_name"], 
        email=data["email"],
        password=data["password"],
        role="user",
    )

    db.session.add(new_user)
    db.session.commit()
    serialized_new_user = new_user.serialize()

    return jsonify(serialized_new_user), 200

# Trainer Endpoints
@app.route('/trainer/<int:id>')
def get_trainer_users(id):
    trainer = Trainer_data.query.filter_by(trainer_data_id=id).first()
    if not trainer:
        return jsonify({'error': 'User not found'}), 404
    
    users = User_data.query.filter_by(trainer_id=id)
    serialized_users = [user.serialize() for user in users]
    
    return jsonify(serialized_users), 200
    
@app.route('/trainer/<int:trainer_id>/<int:user_id>')
def get_single_user_from_trainer(trainer_id, user_id):
    user = User_data.query.filter_by(trainer_id=trainer_id, user_id=user_id).first()

    if not user:
        return jsonify({'error': 'Not users associated with this account'}), 400
    serialized_user = user.serialize()

    return jsonify(serialized_user), 200

# Routines endpoints
#Get users actual rutine
@app.route('/user/<int:user_id>/actual_routine')
def get_actual_routine(user_id):
    user_routine = Routines.query.filter_by(user_data_id=user_id).first()
    if user_routine:
        return jsonify(user_routine.serialize())
    else:
        return jsonify({'error': 'No user routine found'}), 404

#Get the particular user's Historical 
@app.route('/user/<int:user_id>/routine_history')
def get_routine_history(user_id):

    user_routine = Routines.query.filter_by(user_data_id=user_id).first()

    if user_routine:
        user_history = user_routine.historical
        return jsonify({"historical": user_history})
    else:
        return jsonify({'error': "User's historical not found"}), 404
    
#Allows the Trainer to set the rutine to the user
@app.route('/trainer/<int:user_id>/set_routine', methods=['POST'])
def set_routine(user_id):
    data = request.json
    
    
    user_routine = Routines.query.filter_by(user_data_id=user_id).first()
    

    if not user_routine:
        new_routine = Routines(
            user_data_id=data["user_id"],
            trainer_data_id=data["trainer_data_id"],
            actual_routine=data["routine"],
            historical=data["routine"]
        )
    else:
        
        user_routine.actual_routine = data["routine"]
        user_routine.historical = f"{user_routine.historical}, {data['routine']}"
        new_routine = user_routine
    
    db.session.add(new_routine)
    db.session.commit()

    return jsonify({'message': 'Rutine added'}), 201

if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)