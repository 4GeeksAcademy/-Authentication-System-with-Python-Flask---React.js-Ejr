import os
from flask import Flask, request, jsonify, url_for, send_from_directory, abort
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, Trainer, Trainer_data, User, User_data, Routines, Exercise
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from datetime import timedelta
from flask_cors import CORS

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
CORS(app)
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
        email=data["email"],
        password=data["password"],
        role="user",
    )

    db.session.add(new_user)
    db.session.commit()
    access_token = create_access_token(identity=new_user.email, additional_claims={"role": new_user.role})

    return jsonify({'access_token': access_token}), 200

#User Endpoints
@app.route('/user_data/<int:user_id>')
@jwt_required()
def get_user_data(user_id):
    user_data = User_data.query.get(user_id)

    if not user_data:
        return jsonify({'error': 'User data not found'}), 404
    
    serialized_user_data = user_data.serialize()

    return jsonify(serialized_user_data), 200

@app.route('/user_data', methods=['POST', 'PATCH'])
@jwt_required()
def add_or_update_user_data():
    data = request.json
    existing_user_data = User_data.query.filter_by(user_id=get_jwt_identity()).first()
    
    if existing_user_data:
        
        existing_user_data.user_name = data.get("user_name", existing_user_data.user_name)
        existing_user_data.user_weight = data.get("user_weight", existing_user_data.user_weight)
        existing_user_data.user_height = data.get("user_height", existing_user_data.user_height)
        existing_user_data.user_illness = data.get("user_illness", existing_user_data.user_illness)
        existing_user_data.user_objetives = data.get("user_objetives", existing_user_data.user_objetives)
        db.session.commit()
        
        updated_user_data = User_data.query.filter_by(user_id=get_jwt_identity()).first()
        serialized_user_data = updated_user_data.serialize()

        return jsonify(serialized_user_data), 200
    else:
        new_user_data = User_data(
            user_name=data.get("user_name"),
            user_weight=data.get("user_weight"),
            user_height=data.get("user_height"),
            user_illness=data.get("user_illness"),
            user_objetives=data.get("user_objetives"),
            user_id=get_jwt_identity() 
        )

        db.session.add(new_user_data)
        db.session.commit()

        serialized_new_user_data = new_user_data.serialize()

        return jsonify(serialized_new_user_data), 201

# Trainer Endpoints
@app.route('/trainer/<int:id>')
@jwt_required()
def get_trainer_users(id):
    trainer = Trainer_data.query.filter_by(trainer_data_id=id).first()
    if not trainer:
        return jsonify({'error': 'User not found'}), 404
    
    users = User_data.query.filter_by(trainer_id=id)
    serialized_users = [user.serialize() for user in users]
    
    return jsonify(serialized_users), 200
    
@app.route('/trainer/<int:trainer_id>/<int:user_id>')
@jwt_required()
def get_single_user_from_trainer(trainer_id, user_id):
    user = User_data.query.filter_by(trainer_id=trainer_id, user_id=user_id).first()

    if not user:
        return jsonify({'error': 'Not users associated with this account'}), 400
    serialized_user = user.serialize()

    return jsonify(serialized_user), 200

# Routines endpoints
#Get users actual rutine
@app.route('/user/<int:user_id>/actual_routine')
@jwt_required()
def get_actual_routine(user_id):
    user_routine = Routines.query.filter_by(user_data_id=user_id).first()
    if user_routine:
        return jsonify(user_routine.serialize())
    else:
        return jsonify({'error': 'No user routine found'}), 404

#Get the particular user's Historical 
@app.route('/user/<int:user_id>/routine_history')
@jwt_required()
def get_routine_history(user_id):

    user_routine = Routines.query.filter_by(user_data_id=user_id).first()

    if user_routine:
        user_history = user_routine.historical
        return jsonify({"historical": user_history})
    else:
        return jsonify({'error': "User's historical not found"}), 404
    
#Allows the Trainer to set the rutine to the user
@app.route('/trainer/<int:user_id>/set_routine', methods=['POST'])
@jwt_required()
def set_routine_with_exercises(user_id):
    data = request.json
    
    user = User_data.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    exercises_data = data.get("exercises")
    if not exercises_data:
        return jsonify({'error': 'Exercises data missing'}), 400

    exercises = []
    for exercise_data in exercises_data:
        exercise_id = exercise_data.get("exercise_id")
        exercise = Exercise.query.get(exercise_id)
        if not exercise:
            abort(400, description=f"Exercise with ID {exercise_id} not found")
        exercises.append(exercise)

    
    user_routine = Routines.query.filter_by(user_data_id=user_id).first()
    if not user_routine:
        new_routine = Routines(
            user_data_id=user_id,
            trainer_data_id=data["trainer_data_id"],
            actual_routine=data["routine"],
            historical=data["routine"],
            exercises=exercises
        )
        db.session.add(new_routine)
    else:
        user_routine.actual_routine = data["routine"]
        user_routine.historical = f"{user_routine.historical}, {data['routine']}"
        user_routine.exercises = exercises

    db.session.commit()

    return jsonify({'message': 'Routine added with exercises'}), 201

# Exercise Endpoints
# Get all exercises
@app.route('/exercises', methods=['GET'])
@jwt_required()
def get_all_exercises():
    exercises = Exercise.query.all()
    serialized_exercises = [exercise.serialize() for exercise in exercises]
    return jsonify(serialized_exercises), 200

# Get exercise by ID
@app.route('/exercises/<int:exercise_id>', methods=['GET'])
@jwt_required()
def get_exercise(exercise_id):
    exercise = Exercise.query.get(exercise_id)
    if not exercise:
        return jsonify({'error': 'Exercise not found'}), 404
    serialized_exercise = exercise.serialize()
    return jsonify(serialized_exercise), 200

# Create a new exercise
@app.route('/exercises', methods=['POST'])
@jwt_required()
def create_exercise():
    data = request.json
    new_exercise = Exercise(
        exercise_name=data["exercise_name"],
        exercise_type=data["exercise_type"],
        exercise_weight=data.get("exercise_weight"),
        user_data_id=data.get("user_data_id"),
        trainer_data_id=data.get("trainer_data_id")
    )
    db.session.add(new_exercise)
    db.session.commit()
    serialized_new_exercise = new_exercise.serialize()
    return jsonify(serialized_new_exercise), 201

# Update an existing exercise
@app.route('/exercises/<int:exercise_id>', methods=['PATCH'])
@jwt_required()
def update_exercise(exercise_id):
    data = request.json
    exercise = Exercise.query.get(exercise_id)
    if not exercise:
        return jsonify({'error': 'Exercise not found'}), 404
    exercise.exercise_name = data.get("exercise_name", exercise.exercise_name)
    exercise.exercise_type = data.get("exercise_type", exercise.exercise_type)
    exercise.exercise_weight = data.get("exercise_weight", exercise.exercise_weight)
    exercise.user_data_id = data.get("user_data_id", exercise.user_data_id)
    exercise.trainer_data_id = data.get("trainer_data_id", exercise.trainer_data_id)
    db.session.commit()
    serialized_updated_exercise = exercise.serialize()
    return jsonify(serialized_updated_exercise), 200

# Delete an exercise
@app.route('/exercises/<int:exercise_id>', methods=['DELETE'])
@jwt_required()
def delete_exercise(exercise_id):
    exercise = Exercise.query.get(exercise_id)
    if not exercise:
        return jsonify({'error': 'Exercise not found'}), 404
    db.session.delete(exercise)
    db.session.commit()
    return jsonify({'message': 'Exercise deleted'}), 200


if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)