"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, WeeklyRoutine, DayRoutine, DayRoutineDate, WeeklyDayRoutine, Exercise, ExerciseDayRoutine, Category
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
            return ({'error':'This email is already used'}), 400
    if not isinstance(user['password'], str) or len(user['password'].strip()) == 0:
         return({'error':'"password" must be a string'}), 400
    if not isinstance(user['confirm_password'], str) or len(user['confirm_password'].strip()) == 0:
         return({'error':'"confirm_password" must be a string'}), 400
    if user['password'] != user['confirm_password']:
        return({'error':'"password" and "confirm_password" must be the same'}), 400

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
@api.route('/weekly-routine', methods=['GET'])
def get_all_weekly_routine():
    weekly_routine = WeeklyRoutine.query.all()
    if len(weekly_routine) == 0:
        return ({'error':'WeeklyRoutine list not found'}), 404
    else:
        data_serialized = list(map(lambda routine: routine.serialize(), weekly_routine))
        return jsonify(data_serialized), 200
   
# GET ONE WeeklyRoutine / TRAER UNA RUTINA SEMANA
@api.route('/weekly-routine/<int:user_id>', methods=['GET'])
def get_weekly_routine(user_id):
    weekly_routine = WeeklyRoutine.query.filter_by(user_id=user_id).first()
    if weekly_routine is None:
        return ({'error':'WeeklyRoutine not found'}), 404
    else:
        data_serialized = weekly_routine.serialize()
        return jsonify(data_serialized), 200


# GET ALL DayRoutine / TRAER TODAS RUTINA DIA
@api.route('/day-routine', methods=['GET'])
def get_all_day_routine():
    day_routine = DayRoutine.query.all()
    if len(day_routine) == 0:
        return ({'error':'DayRoutine list not found'}), 404
    else:
        data_serialized = list(map(lambda routine: routine.serialize(), day_routine))
        return jsonify(data_serialized), 200
   
# GET ONE DayRoutine / TRAER UNA RUTINA DIA
@api.route('/day-routine/<int:id>', methods=['GET'])
def get_day_routine(id):
    day_routine = DayRoutine.query.filter_by(id=id).first()
    if day_routine is None:
        return ({'error':'DayRoutine not found'}), 404
    else:
        data_serialized = day_routine.serialize()
        return jsonify(data_serialized), 200


# GET ALL DayRoutineDate / TRAER TODAS FECHA RUTINA DIA
@api.route('/day-routine-date', methods=['GET'])
def get_all_day_routine_date():
    day_routines_date = DayRoutineDate.query.all()
    if len(day_routines_date) == 0:
        return ({'error':'DayRoutineDate list not found'}), 404
    else:
        data_serialized = list(map(lambda date: date.serialize(), day_routines_date))
        return jsonify(data_serialized), 200


# GET ONE DayRoutineDate / TRAER UNA FECHA RUTINA DIA
@api.route('/day-routine-date/<int:id>', methods=['GET'])
def get_day_routine_date(id):
    day_routine_date = DayRoutineDate.query.filter_by(id=id).first()
    if day_routine_date is None:
        return ({'error':'DayRoutineDate not found'}), 404
    else:
        data_serialized = day_routine_date.serialize()
        return jsonify(data_serialized), 200


# GET ALL WeeklyDayRoutine / TRAER TODAS RUTINA SEMANA DIA - PIVOTE
@api.route('/weekly-day-routine', methods=['GET'])
def get_all_weekly_day_routine():
    weekly_day_routine = WeeklyDayRoutine.query.all()
    if len(weekly_day_routine) == 0:
        return ({'error':'WeeklyDayRoutine list not found'}), 404
    else:
        data_serialized = list(map(lambda weekly_day: weekly_day.serialize(), weekly_day_routine))
        return jsonify(data_serialized), 200


# GET WeeklyDayRoutine OF ONE WEEK / TRAER TODAS RUTINA SEMANA DIA DE UNA SEMANA- PIVOTE
@api.route('/weekly-day-routine/<int:weekly_routine_id>', methods=['GET'])
def get_one_weekly_day_routine(weekly_routine_id):
    weekly_day_routine = WeeklyDayRoutine.query.filter_by(weekly_routine_id=weekly_routine_id).all()
    if len(weekly_day_routine) == 0:
        return ({'error':'WeeklyDayRoutine list of one week not found'}), 404
    else:
        data_serialized = list(map(lambda weekly_day: weekly_day.serialize(), weekly_day_routine))
        return jsonify(data_serialized), 200


# GET ALL EXERCIE / TRAER TODOS EJERCICIO
@api.route('/exercise', methods=['GET'])
def get_all_exercise():
    exercise = Exercise.query.all()
    if len(exercise) == 0:
        return ({'error':'Exercise list not found'}), 404
    else:
        data_serialized = list(map(lambda exercise: exercise.serialize(), exercise))
        return jsonify(data_serialized), 200


# GET ONE EXERCIE / TRAER UN EJERCICIO
@api.route('/exercise/<int:id>', methods=['GET'])
def get_one_exercise(id):
    exercise = Exercise.query.filter_by(id=id).first()
    if exercise is None:
        return ({'error':'Exercise not found'}), 404
    else:
        data_serialized = exercise.serialize()
        return jsonify(data_serialized), 200


# GET ALL ExerciseDayRoutine / TRAER TODAS RUTINA DIA EJERCICIO
@api.route('/exercise-day-routine', methods=['GET'])
def get_all_exercise_day_routine():
    exercise_day_routine = ExerciseDayRoutine.query.all()
    if len(exercise_day_routine) == 0:
        return ({'error':'Exercise_Day_Routine list not found'}), 404
    else:
        data_serialized = list(map(lambda routine: routine.serialize(), exercise_day_routine))
        return jsonify(data_serialized), 200


# GET ALL ExerciseDayRoutine ONE DAY / TRAER TODAS RUTINA DIA EJERCICIO DE UN DIA
@api.route('/exercise-day-routine/<int:day_routine_id>', methods=['GET'])
def get_all_exercise_day_routine_one_day(day_routine_id):
    exercise_day_routine = ExerciseDayRoutine.query.filter_by(day_routine_id=day_routine_id).all()
    if len(exercise_day_routine) == 0:
        return ({'error':'exercise_day_routine list of one day not found'}), 404
    else:
        data_serialized = list(map(lambda routine: routine.serialize(), exercise_day_routine))
        return jsonify(data_serialized), 200


# GET ALL Category / TRAER TODAS CATEGORIA
@api.route('/category', methods=['GET'])
def get_all_Category():
    category = Category.query.all()
    if len(category) == 0:
        return ({'error':'category list not found'}), 404
    else:
        data_serialized = list(map(lambda category: category.serialize(), category))
        return jsonify(data_serialized), 200


# GET ONE CATEGORY / TRAER UNA CATEGORIA
@api.route('/category/<int:id>', methods=['GET'])
def get_one_category(id):
    category = Category.query.filter_by(id=id).first()
    if category is None:
        return ({'error':'category not found'}), 404
    else:
        data_serialized = category.serialize()
        return jsonify(data_serialized), 200