"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, WeeklyRoutine, Routine, Exercise, ExerciseRoutine, FollowUp, Week
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

    # Arreglar lo que son los codigos de estado y poner los mensajes desde el frontend

    if not isinstance(user['name'], str) or len(user['name'].strip()) == 0:
         return({'error':'"name" must be a string'}), 400
    if not isinstance(user['birthday'], str) or len(user['birthday'].strip()) == 0:
         return({'error':'"birthday" must be a string'}), 400
    if not isinstance(user['sex'], str) or len(user['sex'].strip()) == 0:
        return({'error':'"sex" must be a string'}), 400
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

    user_created = User(name=user['name'], birthday=user['birthday'], sex=user['sex'], email=user['email'], password=user['password'])
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
   
    access_token = create_access_token(identity={"email": user_db.email, "id": user_db.id})
    return jsonify({"access_token":access_token, "logged":True}), 200


# VALIDAR TOKEN
@api.route("/valid-token", methods=["GET"])
@jwt_required()
def valid_token():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
   
    user_exist = User.query.filter_by(email=current_user['email']).first()
    if user_exist is None:
        return jsonify(logged=False), 404

    return jsonify(logged=True), 200

# TRAER PERFIL
@api.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user['email']).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user=user.serialize()), 200

# GET ALL WeeklyRoutine / TRAER TODAS RUTINA SEMANA
@api.route('/weekly-routine', methods=['GET'])
def get_all_weekly_routine():
    weekly_routine = WeeklyRoutine.query.all()
    if len(weekly_routine) == 0:
        return ({'error':'WeeklyRoutine list not found'}), 404
    else:
        data_serialized = list(map(lambda routine: routine.serialize(), weekly_routine))
        return jsonify(data_serialized), 200
   
# GET ALL WeeklyRoutine OF USER / TRAER TODAS RUTINA SEMANA DE USUARIO
@api.route('/weekly-routine/<int:user_id>', methods=['GET'])
def get_all_weekly_routine_user(user_id):
    weekly_routine = WeeklyRoutine.query.filter_by(user_id=user_id).all()
    if len(weekly_routine) == 0:
        return ({'error':'all WeeklyRoutine user list not found'}), 404
    else:
        data_serialized = list(map(lambda routine: routine.serialize(), weekly_routine))
        return jsonify(data_serialized), 200

# GET ONE WeeklyRoutine OF USER / TRAER UNA RUTINA SEMANA DE USUARIO
@api.route('/weekly-routine/<int:user_id>/<int:week>', methods=['GET'])
def get_one_weekly_routine_user(user_id, week):
    print(Week(week))
    weekly_routine = WeeklyRoutine.query.filter_by(user_id=user_id, week=Week(week)).all()
    if len(weekly_routine) == 0:
        return ({'error':'one WeeklyRoutine user list not found'}), 404
    else:
        data_serialized = list(map(lambda routine: routine.serialize(), weekly_routine))
        return jsonify(data_serialized), 200

# GET ALL Routine / TRAER TODAS RUTINA
@api.route('/routine', methods=['GET'])
def get_all_routine():
    routine = Routine.query.all()
    if len(routine) == 0:
        return ({'error':'Routine list not found'}), 404
    else:
        data_serialized = list(map(lambda routine: routine.serialize(), routine))
        return jsonify(data_serialized), 200
   
# GET ONE Routine / TRAER UNA RUTINA
@api.route('/routine/<int:id>', methods=['GET'])
def get_routine(id):
    routine = Routine.query.filter_by(id=id).first()
    if routine is None:
        return ({'error':'Routine not found'}), 404
    else:
        data_serialized = routine.serialize()
        return jsonify(data_serialized), 200

# # GET ALL DayRoutineDate / TRAER TODAS FECHA RUTINA DIA
# @api.route('/day-routine-date', methods=['GET'])
# def get_all_day_routine_date():
#     day_routines_date = DayRoutineDate.query.all()
#     if len(day_routines_date) == 0:
#         return ({'error':'DayRoutineDate list not found'}), 404
#     else:
#         data_serialized = list(map(lambda date: date.serialize(), day_routines_date))
#         return jsonify(data_serialized), 200


# # GET ONE DayRoutineDate / TRAER UNA FECHA RUTINA DIA
# @api.route('/day-routine-date/<int:id>', methods=['GET'])
# def get_day_routine_date(id):
#     day_routine_date = DayRoutineDate.query.filter_by(id=id).first()
#     if day_routine_date is None:
#         return ({'error':'DayRoutineDate not found'}), 404
#     else:
#         data_serialized = day_routine_date.serialize()
#         return jsonify(data_serialized), 200


# # GET ALL WeeklyDayRoutine / TRAER TODAS RUTINA SEMANA DIA - PIVOTE
# @api.route('/weekly-day-routine', methods=['GET'])
# def get_all_weekly_day_routine():
#     weekly_day_routine = WeeklyDayRoutine.query.all()
#     if len(weekly_day_routine) == 0:
#         return ({'error':'WeeklyDayRoutine list not found'}), 404
#     else:
#         data_serialized = list(map(lambda weekly_day: weekly_day.serialize(), weekly_day_routine))
#         return jsonify(data_serialized), 200


# # GET WeeklyDayRoutine OF ONE WEEK / TRAER TODAS RUTINA SEMANA DIA DE UNA SEMANA- PIVOTE
# @api.route('/weekly-day-routine/<int:weekly_routine_id>', methods=['GET'])
# def get_one_weekly_day_routine(weekly_routine_id):
#     weekly_day_routine = WeeklyDayRoutine.query.filter_by(weekly_routine_id=weekly_routine_id).all()
#     if len(weekly_day_routine) == 0:
#         return ({'error':'WeeklyDayRoutine list of one week not found'}), 404
#     else:
#         data_serialized = list(map(lambda weekly_day: weekly_day.serialize(), weekly_day_routine))
#         return jsonify(data_serialized), 200

# GET ALL EXERCICE / TRAER TODOS EJERCICIO
@api.route('/exercise', methods=['GET'])
def get_all_exercise():
    exercise = Exercise.query.all()
    if len(exercise) == 0:
        return ({'error':'exercise list not found'}), 404
    else:
        data_serialized = list(map(lambda exercise: exercise.serialize(), exercise))
        return jsonify(data_serialized), 200

# GET ONE EXERCIE / TRAER UN EJERCICIO
@api.route('/exercise/<int:id>', methods=['GET'])
def get_one_exercise(id):
    exercise = Exercise.query.filter_by(id=id).first()
    if exercise is None:
        return ({'error':'exercise not found'}), 404
    else:
        data_serialized = exercise.serialize()
        return jsonify(data_serialized), 200

# GET ALL ExerciseRoutine / TRAER TODAS RUTINA EJERCICIO
@api.route('/exercise-routine', methods=['GET'])
def get_all_exercise_routine():
    exercise_routine = ExerciseRoutine.query.all()
    if len(exercise_routine) == 0:
        return ({'error':'exercise routine list not found'}), 404
    else:
        data_serialized = list(map(lambda routine: routine.serialize(), exercise_routine))
        return jsonify(data_serialized), 200

# GET ALL weekly-user-routine / TRAER TODAS RUTINA EJERCICIO DE UN DIA
@api.route('/weekly-user-routine/<int:week>', methods=['GET'])
@jwt_required()
def get_all_exercise_routine_one_day(week):
    current_user=get_jwt_identity()
    exercise_routine = WeeklyRoutine.query.filter_by(week=Week(week), user_id=current_user["id"]).all()
    if len(exercise_routine) == 0:
        return ({'error':'exercise routine list of one day not found'}), 404
    else:
        data_serialized = list(map(lambda routine: routine.serialize(), exercise_routine))
        return jsonify(data_serialized), 200


# GET ALL FollowUp / TRAER TODOS SEGUIMIENTO
@api.route('/follow-up', methods=['GET'])
def get_all_follow_up():
    follow_up = FollowUp.query.all()
    if len(follow_up) == 0:
        return ({'error':'followUp list not found'}), 404
    else:
        data_serialized = list(map(lambda followUp: followUp.serialize(), follow_up))
        return jsonify(data_serialized), 200

# GET ALL FollowUp weekly_routine / TRAER TODOS SEGUIMIENTO DE UNA RUITNA SEMANA
@api.route('/follow-up/<int:weekly_routine_id>', methods=['GET'])
def get_one_follow_up(weekly_routine_id):
    follow_up = FollowUp.query.filter_by(weekly_routine_id=weekly_routine_id).all()
    if len(follow_up) == 0:
        return ({'error':'followUp of one week not found'}), 404
    else:
        data_serialized = list(map(lambda followUp: followUp.serialize(), follow_up))
        return jsonify(data_serialized), 200