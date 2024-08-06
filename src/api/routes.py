"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, WeeklyRoutine, DayRoutine, DayRoutineDate, WeeklyDayRoutine, Exercise, ExerciseDayRoutine
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# @api.route("/create-token", methods=["POST"])
# def create_token():
#     email = request.json.get("email", None)
#     password = request.json.get("password", None)
#     if email != "test@test.com" or password != "test":
#         return jsonify({"msg": "Bad username or password"}), 401
#     access_token = create_access_token(identity=email)
#     return jsonify(access_token=access_token)

# @api.route('/register', methods=['POST'])
# def register():
#     data = request.get_json()
#     email = data.get('email')
#     password = data.get('password')

#     if not email or not password:
#         return jsonify({"error": "Email and password are required"}), 400

#     existing_user = User.query.filter_by(email=email).first()
#     if existing_user:
#         return jsonify({"error": "User already exists"}), 400

#     new_user = User(email=email, password=password, is_active=True)
#     db.session.add(new_user)
#     db.session.commit()

#     access_token = create_access_token(identity=new_user.email)
#     return jsonify(access_token=access_token, user=new_user.serialize()), 201

# @api.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     email = data.get('email')
#     password = data.get('password')

#     if not email or not password:
#         return jsonify({"error": "Email and password are required"}), 400

#     user = User.query.filter_by(email=email, password=password).first()
#     if not user:
#         return jsonify({"error": "Invalid email or password"}), 401

#     access_token = create_access_token(identity=user.email)
#     return jsonify(access_token=access_token, user=user.serialize()), 200

# @api.route('/users', methods=['GET'])
# def get_users():
#     users = User.query.all()
#     users_list = [user.serialize() for user in users]
#     return jsonify(users=users_list), 200

# @api.route('/protected', methods=['GET'])
# @jwt_required()
# def protected():
#     current_user = get_jwt_identity()
#     return jsonify(logged_in_as=current_user), 200

# @api.route('/profile', methods=['GET'])
# @jwt_required()
# def profile():
#     email = get_jwt_identity()
#     user = User.query.filter_by(email=email).first()
#     if not user:
#         return jsonify({"error": "User not found"}), 404
#     return jsonify(user=user.serialize()), 200


# CREAR USUARIO
@api.route('/register', methods=['POST'])
def post_user():
    user = request.get_json()
    user_by_email = User.query.filter_by(email=user['email']).first()

    if not isinstance(user['name'], str) or len(user['name'].strip()) == 0:
         return({'error':'"name" must be a string'}), 400
    if not isinstance(user['email'], str) or len(user['email'].strip()) == 0:
         return({'error':'"email" must be a string'}), 400
    if user_by_email:
        if user_by_email.email == user['email']:
            return jsonify('This email is already used'), 403
    if not isinstance(user['password'], str) or len(user['password'].strip()) == 0:
         return({'error':'"password" must be a string'}), 400

    user_created = User(name=user['name'], email=user['email'], password=user['password'])
    db.session.add(user_created)
    db.session.commit()
    return jsonify(user_created.serialize()), 200

# INICIAR SESION
@api.route('/login', methods=['POST'])
def login():

    user = request.get_json()

    if not isinstance(user['email'], str) or len(user['email'].strip()) == 0:
         return({'error':'"email" must be a string'}), 400
    if not isinstance(user['password'], str) or len(user['password'].strip()) == 0:
         return({'error':'"password" must be a string'}), 400

    user_db = User.query.filter_by(email=user['email'], password=user['password']).first()
    if user_db is None:
        return jsonify({"error":"incorrect credentials"}), 401
    
    access_token = create_access_token(identity=user['email'])
    return jsonify({"access_token":access_token, "logged":True}), 200

# VALIDAR TOKEN
@api.route("/valid-token", methods=["GET"])
@jwt_required()
def valid_token():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    
    user_exist = User.query.filter_by(email=current_user).first()
    if user_exist is None:
        return jsonify(logged=False), 404

    return jsonify(logged=True), 200

# GET ALL WeeklyRoutine / TRAER TODAS RUTINA SEMANA
@api.route('/WeeklyRoutine', methods=['GET'])
def get_all_weekly_routine():
    weekly_routines = WeeklyRoutine.query.all()
    if len(weekly_routines) == 0:
        return ({'error':'no routines found'}), 404
    else:
        data_serialized = list(map(lambda routine: routine.serialize(), weekly_routines)) 
        return jsonify(data_serialized), 200
    
# GET One WeeklyRoutine / TRAER UNA RUTINA SEMANA
@api.route('/WeeklyRoutine/<int:user_id>', methods=['GET'])
def get_weekly_routine(user_id):
    weekly_routine = WeeklyRoutine.query.filter_by(user_id=user_id).first()
    if weekly_routine is None:
        return ({'error':'routine week not found'}), 404
    else:
        data_serialized = weekly_routine.serialize()
        return jsonify(data_serialized), 200

# GET ALL DayRoutine / TRAER TODAS RUTINA DIA
@api.route('/DayRoutine', methods=['GET'])
def get_all_day_routine():
    day_routines = DayRoutine.query.all()
    if len(day_routines) == 0:
        return ({'error':'no routines found'}), 404
    else:
        data_serialized = list(map(lambda routine: routine.serialize(), day_routines)) 
        return jsonify(data_serialized), 200
    
# GET ONE DayRoutine / TRAER UNA RUTINA DIA
@api.route('/DayRoutine/<int:id>', methods=['GET'])
def get_day_routine(id):
    day_routine = DayRoutine.query.filter_by(id=id).first()
    if day_routine is None:
        return ({'error':'Day Routine not found'}), 404
    else:
        data_serialized = day_routine.serialize()
        return jsonify(data_serialized), 200

# GET ALL DayRoutineDate / TRAER TODAS RUTINA DIA FECHA
@api.route('/DayRoutineDate', methods=['GET'])
def get_all_day_routine_date():
    day_routines_dates = DayRoutineDate.query.all()
    if len(day_routines_dates) == 0:
        return ({'error':'Dates not found'}), 404
    else:
        data_serialized = list(map(lambda date: date.serialize(), day_routines_dates)) 
        return jsonify(data_serialized), 200

# GET ONE DayRoutineDate / TRAER UNA RUTINA DIA FECHA
@api.route('/DayRoutineDate/<int:id>', methods=['GET'])
def get_day_routine_date(id):
    day_routine_date = DayRoutineDate.query.filter_by(id=id).first()
    if day_routine_date is None:
        return ({'error':'Date not found'}), 404
    else:
        data_serialized = day_routine_date.serialize()
        return jsonify(data_serialized), 200

# GET ALL WeeklyDayRoutine / TRAER TODAS RUTINA SEMANA DIA - PIVOTE
@api.route('/WeeklyDayRoutine', methods=['GET'])
def get_all_weekly_day_routine():
    weekly_day_routines = WeeklyDayRoutine.query.all()
    if len(weekly_day_routines) == 0:
        return ({'error':'WeeklysDays not found'}), 404
    else:
        data_serialized = list(map(lambda weekly_day: weekly_day.serialize(), weekly_day_routines)) 
        return jsonify(data_serialized), 200

# GET WeeklyDayRoutine OF ONE WEEK / TRAER TODAS RUTINA SEMANA DIA DE UNA SEMANA- PIVOTE
@api.route('/WeeklyDayRoutine/<int:weekly_routine_id>', methods=['GET'])
def get_one_weekly_day_routine(weekly_routine_id):
    weekly_day_routine = WeeklyDayRoutine.query.filter_by(weekly_routine_id=weekly_routine_id).all()
    if len(weekly_day_routine) == 0:
        return ({'error':'WeeklyDays not found'}), 404
    else:
        data_serialized = list(map(lambda weekly_day: weekly_day.serialize(), weekly_day_routine)) 
        return jsonify(data_serialized), 200

# GET ALL EXERCIES / TRAER TODOS LOS EJERCICIOS
@api.route('/Exercise', methods=['GET'])
def get_all_Exercise():
    exercises = Exercise.query.all()
    if len(exercises) == 0:
        return ({'error':'exercises not found'}), 404
    else:
        data_serialized = list(map(lambda exercise: exercise.serialize(), exercises)) 
        return jsonify(data_serialized), 200

# GET ONE EXERCIE / TRAER UNO DE LOS EJERCICIOS
@api.route('/Exercise/<int:id>', methods=['GET'])
def get_one_Exercise(id):
    exercise = Exercise.query.filter_by(id=id).first()
    if exercise is None:
        return ({'error':'exercise not found'}), 404
    else:
        data_serialized = exercise.serialize()
        return jsonify(data_serialized), 200

# GET ALL ExerciseDayRoutine / TRAER TODOS LOS RUTINA DIA EJERCICIO
@api.route('/ExerciseDayRoutine', methods=['GET'])
def get_all_exercise_day_routine():
    exercise_day_routines = ExerciseDayRoutine.query.all()
    if len(exercise_day_routines) == 0:
        return ({'error':'exercise_day_routines not found'}), 404
    else:
        data_serialized = list(map(lambda exercise_day_routins: exercise_day_routins.serialize(), exercise_day_routines)) 
        return jsonify(data_serialized), 200

# GET ALL ExerciseDayRoutine / TRAER TODOS LOS RUTINA DIA EJERCICIO
@api.route('/Exercise/<int:id>', methods=['GET'])
def get_one_Exercise(id):
    exercise = Exercise.query.filter_by(id=id).first()
    if exercise is None:
        return ({'error':'exercise not found'}), 404
    else:
        data_serialized = exercise.serialize()
        return jsonify(data_serialized), 200