"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from datetime import datetime
from api.models import db, User, WeeklyRoutine, Routine, Exercise, ExerciseRoutine, FollowUp, PhysicalInformation, Category, Sets
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_bcrypt import Bcrypt
from sqlalchemy import desc



api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

app = Flask(__name__)
bcrypt = Bcrypt(app)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():


    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }


    return jsonify(response_body), 200

# USUARIO
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
    # PASSWORD
    # PASSWORD
    espacio = False
    numeros=False
    mayuscula = False
    minuscula = False
    mayus_minus = False
    caract_espec = False
    caract_especiales = "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~"
    if not isinstance(user['password'], str) or len(user['password']) < 6 or len(user['password']) > 12:
         return({'error':'"password" must be between 6 and 12 characters long'}), 400
    
    for caracter in user['password']:
        if caracter.isspace() == True:
            espacio = True
        if caracter.isdigit() == True:
            numeros = True
        
        if caracter.isupper() == True:
            mayuscula = True
            print("mayuscula",mayuscula)
        if caracter.islower() == True:
            minuscula = True
            print("minuscula",minuscula)

        for caract_especial in caract_especiales:
            print(caracter)
            print(caract_especial)
            if caracter == caract_especial:
                caract_espec = True
                print(caract_espec)

    if mayuscula == True and minuscula == True:
        mayus_minus = True
        print("mayus_minus", mayus_minus)

    if espacio == True:
        return({'error':'"password" there can be no blank spaces'}), 400
    if numeros == False:
        return({'error':'"password" must have at least one number'}), 400
    if mayus_minus == False:
        return({'error':'"password" must have at least one uppercase and one lowercase letter'}), 400
    if caract_espec == False:
        return({'error':'"password" must have at least one special character'}), 400
    if user['password'] != user['confirm_password']:
        return({'error':'"password" and "confirm_password" must be the same'}), 400

    password = user['password']
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8') 

    user_created = User(name=user['name'], birthday=user['birthday'], sex=user['sex'], email=user['email'].lower(), password=hashed_password)
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
    
    user_db = User.query.filter_by(email=user['email'].lower()).first()
    if user_db is None:
        return({'error':'this email does not exist'}), 400
    is_valid = bcrypt.check_password_hash(user_db.password, user['password'])

    if user_db and is_valid:
        access_token = create_access_token(identity={"email": user_db.email, "id": user_db.id})
        return jsonify({"access_token":access_token, "logged":True}), 200
    else:
        return jsonify({"error":"incorrect credentials"}), 401

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

# ELIMINAR USUARIO
@api.route('/delete-account', methods=['DELETE'])
@jwt_required()
def delete_user():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user['email']).first()
    if not user:
        return jsonify({"error":"User not found"}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify("User successfully deleted"), 200

# PHYSICAL INFORMATION
# GET ALL PhysicalInformation / TRAER TODAS INFORMACION FISICA
@api.route('/physical-information', methods=['GET'])
def get_all_physical_information():
    physical_information = PhysicalInformation.query.all()
    if physical_information == 0:
        return ({'error':'physical information list not found'}), 404
    else:
        data_serialized = list(map(lambda information: information.serialize(), physical_information))
        return jsonify(data_serialized), 200
    
# GET ONE PhysicalInformation / TRAER UNA INFORMACION FISICA
@api.route('/physical-user-information', methods=['GET'])
@jwt_required()
def get_one_physical_user_information():
    current_user=get_jwt_identity()
    physical_information = PhysicalInformation.query.filter_by(user_id=current_user["id"]).first()
    if physical_information is None:
        return ({'error':'physical information not found'}), 404
    else:
        data_serialized = physical_information.serialize()
        return jsonify(data_serialized), 200

# GET LAST ONE PhysicalInformation / TRAER ULTIMA INFORMACION FISICA
@api.route('/last-one-physical-user-information', methods=['GET'])
@jwt_required()
def get_last_one_physical_user_information():
    current_user = get_jwt_identity()
    physical_information_list = PhysicalInformation.query.filter_by(user_id=current_user["id"]).all()
    last_value = physical_information_list[-1]
    if physical_information_list is None:
        return ({'error':'physical information not found'}), 404
    else:
        data_serialized = last_value.serialize()
        return jsonify(data_serialized), 200


# GET LAST PhysicalInformation / TRAER LAS ULTIMAS INFORMACION FISICA
@api.route('/last-physical-user-information', methods=['GET'])
@jwt_required()
def get_last_physical_user_information():
    current_user = get_jwt_identity()
    query = db.select(PhysicalInformation).where(PhysicalInformation.user_id==current_user["id"]).order_by(desc(PhysicalInformation.date))
    result = db.session.execute(query)
    physical_information_list = result.scalars()
    if physical_information_list is None:
        return ({'error':'physical information not found'}), 404
    else:
        data_serialized = list(map(lambda information: information.graphicSerialize(), physical_information_list))
        print(data_serialized)
        return jsonify(data_serialized), 200

# POST PhysicalInformation / AGREGAR INFORMACION FISICA
@api.route('/physical-information', methods=['POST'])
@jwt_required()
def post_physical_information():
    current_user=get_jwt_identity()
    physical_information = request.get_json()
    if not isinstance(physical_information['height'], str) or len(physical_information['height'].strip()) == 0:
         return({'error':'"height" must be a string'}), 400
    if not isinstance(physical_information['weight'], str) or len(physical_information['weight'].strip()) == 0:
         return({'error':'"weight" must be a string'}), 400
    physical_information_created = PhysicalInformation(user_id=current_user["id"], height=physical_information["height"], weight=physical_information["weight"], date=datetime.now().date())
    
    db.session.add(physical_information_created)
    db.session.commit()
    return jsonify(physical_information_created.serialize()), 200

# WEEKLY ROUTINE
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
@api.route('/weekly-user-routine', methods=['GET'])
@jwt_required()
def get_all_weekly_user_routine():
    current_user=get_jwt_identity()
    weekly_routine = WeeklyRoutine.query.filter_by(user_id=current_user["id"]).all()
    if len(weekly_routine) == 0:
        return ({'error':'weekly routine list of one day not found'}), 404
    else:
        data_serialized = list(map(lambda routine: routine.serialize(), weekly_routine))
        return jsonify(data_serialized), 200

# # GET ONE WeeklyRoutine OF USER / TRAER UNA RUTINA SEMANA DE USUARIO
# @api.route('/weekly-routine/<int:user_id>/<int:week>', methods=['GET'])
# def get_one_weekly_routine_user(user_id, week):
#     print(Week(week))
#     weekly_routine = WeeklyRoutine.query.filter_by(user_id=user_id, week=Week(week)).all()
#     if len(weekly_routine) == 0:
#         return ({'error':'one WeeklyRoutine user list not found'}), 404
#     else:
#         data_serialized = list(map(lambda routine: routine.serialize(), weekly_routine))
#         return jsonify(data_serialized), 200

# # GET ONE weekly-user-routine / TRAER TODAS RUTINA DEL USUARIO DE UNA SEMANA
# @api.route('/weekly-user-routine/<int:week>', methods=['GET'])
# @jwt_required()
# def get_all_exercise_routine_one_day(week):
#     current_user=get_jwt_identity()
#     exercise_routine = WeeklyRoutine.query.filter_by(week=Week(week), user_id=current_user["id"]).all()
#     if len(exercise_routine) == 0:
#         return ({'error':'exercise routine list of one day not found'}), 404
#     else:
#         data_serialized = list(map(lambda routine: routine.serialize(), exercise_routine))
#         return jsonify(data_serialized), 200
    
# POST WeeklyRoutine / AGREGAR RUTINA SEMANA DE USUARIO
@api.route('/weekly-routine', methods=['POST'])
@jwt_required()
def post_weekly_routine():
    current_user=get_jwt_identity()
    weekly_routine = request.get_json()
    if not isinstance(weekly_routine['routine_id'], str) or len(weekly_routine['routine_id'].strip()) == 0:
         return({'error':'"routine_id" must be a string'}), 400
    if not isinstance(weekly_routine['day'], str) or len(weekly_routine['day'].strip()) == 0:
         return({'error':'"day" must be a string'}), 400

    weekly_routine_created = WeeklyRoutine(user_id=current_user["id"], routine_id=weekly_routine["routine_id"], day=weekly_routine["day"])
    weekly_routine_created = WeeklyRoutine(user_id=current_user["id"], routine_id=weekly_routine["routine_id"], day=weekly_routine["day"])
    db.session.add(weekly_routine_created)
    db.session.commit()
    return jsonify(weekly_routine_created.serialize()), 200

# PUT WeeklyRoutine / ACTUALIZAR RUTINA SEMANA
@api.route('/weekly-user-routine/<day>', methods=['PUT'])
@jwt_required()
def put_weekly_user_routine(day):
    current_user=get_jwt_identity()
    weekly_user_routine = WeeklyRoutine.query.filter_by(user_id=current_user['id'],day=day).first()
    if weekly_user_routine == None:
        return jsonify('weekly_user_routine not found'), 404
    else: 
        weekly_user_routine_update = request.get_json()
        if weekly_user_routine_update['routine_id'] is None:
            return({'error':'"routine_id" must be a number'}), 400
        if not isinstance(weekly_user_routine_update['day'], str) or len(weekly_user_routine_update['day'].strip()) == 0:
            return({'error':'"day" must be a string'}), 400

        weekly_user_routine.routine_id=weekly_user_routine_update['routine_id']
        weekly_user_routine.day=weekly_user_routine_update['day']
        weekly_user_routine.verified = True
        db.session.commit()
        return jsonify('weekly_user_routine update'), 200

# DELETE WeeklyRoutine / ELIMINAR RUTINA SEMANA
@api.route('/weekly-user-routine/<day>', methods=['DELETE'])
@jwt_required()
def delete_weekly_routine(day):
    current_user = get_jwt_identity()
    weekly_user_routine = WeeklyRoutine.query.filter_by(user_id=current_user['id'], day=day).first()
    if not weekly_user_routine:
        return jsonify({"error":"weekly_user_routine not found"}), 404
    db.session.delete(weekly_user_routine)
    db.session.commit()
    return jsonify("weekly_user_routine successfully deleted"), 200

# ROUTINE
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
    
# POST Routine / AGREGAR RUTINA
# @api.route('/routine', methods=['POST'])
# @jwt_required()
# def post_routine():
#     current_user=get_jwt_identity()
#     routine = request.get_json()
#     if not isinstance(routine['name'], str) or len(routine['name'].strip()) == 0:
#          return({'error':'"name" must be a string'}), 400

#     routine_created = Routine(user_id=current_user["id"], name=routine["name"])
#     db.session.add(routine_created)
#     db.session.commit()
#     return jsonify(routine_created.serialize()), 200

@api.route('/routine', methods=['POST'])
@jwt_required()
def post_routine():
    current_user = get_jwt_identity()
    routine = request.get_json()

    if not isinstance(routine['name'], str) or len(routine['name'].strip()) == 0:
        return {'error': '"name" must be a string'}, 400

    existing_routine = Routine.query.filter_by(user_id=current_user["id"], name=routine["name"]).first()
    if existing_routine:
        return jsonify({'error': 'Ya existe una rutina con este nombre'}), 400

    # Crear la nueva rutina
    routine_created = Routine(user_id=current_user["id"], name=routine["name"])
    db.session.add(routine_created)
    db.session.commit()
    return jsonify(routine_created.serialize()), 200

# PUT Routine / ACTUALIZAR RUTINA
@api.route('/routine/<int:id>', methods=['PUT'])
@jwt_required()
def put_routine(id):
    current_user=get_jwt_identity()
    routine = Routine.query.filter_by(id=id, user_id=current_user['id']).first()
    if routine == None:
        return jsonify('routine not found'), 404
    else: 
        routine_update = request.get_json()
        if not isinstance(routine_update['name'], str) or len(routine_update['name'].strip()) == 0:
            return({'error':'"name" must be a string'}), 400

        routine.name=routine_update['name']
        routine.verified = True
        db.session.commit()
        return jsonify('routine update'), 200

# DELETE Routine / ELIMINAR RUTINA
@api.route('/delete-routine/<int:id>', methods=['DELETE'])
def delete_routine(id):
    routine = Routine.query.filter_by(id=id).first()
    if not routine:
        return jsonify({"error":"routine not found"}), 404
    db.session.delete(routine)
    db.session.commit()
    return jsonify("routine successfully deleted"), 200

# EXERCISE
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

# POST EXERCISE / AGREGAR EJERCICIO
@api.route('/exercise', methods=['POST'])
def post_exercise():
    exercise = request.get_json()
    if not isinstance(exercise['name'], str) or len(exercise['name'].strip()) == 0 :
        return ({'error': "'name' must be a string"}), 400
    if not isinstance(exercise['category'], str) or len(exercise['category'].strip()) == 0 :
        return ({'error': "'category' must be a string"}), 400
    if not isinstance(exercise['description'], str) or len(exercise['description'].strip()) == 0 :
        return ({'error': "'description' must be a string"}), 400
    if not isinstance(exercise['image'], str) or len(exercise['image'].strip()) == 0 :
        return ({'error': "'image' must be a string"}), 400

    exercise_created = Exercise(name = exercise['name'], category = exercise['category'], description = exercise['description'], image = exercise['image'])
    db.session.add(exercise_created)
    db.session.commit()
    return jsonify(exercise_created.serialize())

# PUT EXERCISE / ACTUALIZAR EJERCICIO
@api.route('/exercise/<int:id>', methods=['PUT'])
def put_exercise(id):
    exercise = Exercise.query.filter_by(id=id).first()
    if exercise == None:
        return jsonify('exercise not found'), 404
    else: 
        exercise_update = request.get_json()
        if not isinstance(exercise_update['name'], str) or len(exercise_update['name'].strip()) == 0 :
            return ({'error': "'name' must be a string"}), 400
        if not isinstance(exercise_update['category'], str) or len(exercise_update['category'].strip()) == 0 :
            return ({'error': "'category' must be a string"}), 400
        if not isinstance(exercise_update['description'], str) or len(exercise_update['description'].strip()) == 0 :
            return ({'error': "'description' must be a string"}), 400
        if not isinstance(exercise_update['image'], str) or len(exercise_update['image'].strip()) == 0 :
            return ({'error': "'image' must be a string"}), 400

        exercise.name=exercise_update['name']
        exercise.category=exercise_update['category']
        exercise.description=exercise_update['description']
        exercise.image=exercise_update['image']
        
        exercise.verified = True
        db.session.commit()
        return jsonify('exercise update'), 200

# ExerciseRoutine
# GET ALL ExerciseRoutine / TRAER TODAS RUTINA EJERCICIO
@api.route('/exercise-routine', methods=['GET'])
def get_all_exercise_routine():
    exercise_routine = ExerciseRoutine.query.all()
    if len(exercise_routine) == 0:
        return ({'error':'exercise routine list not found'}), 404
    else:
        data_serialized = list(map(lambda routine: routine.serialize(), exercise_routine))
        return jsonify(data_serialized), 200

# GET ONE ExerciseRoutine / TRAER UNA RUTINA EJERCICIO
@api.route('/exercise-routine/<int:routine_id>/<int:exercise_id>', methods=['GET'])
def get_one_exercise_routine(routine_id, exercise_id):
    exercise_routine = ExerciseRoutine.query.filter_by(routine_id=routine_id, exercise_id=exercise_id).first()
    if exercise_routine is None:
        return ({'error':'exercise routine not found'}), 404
    else:
        data_serialized = exercise_routine.serialize()
        return jsonify(data_serialized), 200


# POST ExerciseRoutine / AGREGAR RUTINA EJERCICIO
@api.route('/exercise-routine', methods=['POST'])
def post_exercise_routine():
    exercise_routine = request.get_json()
    if len(exercise_routine['routine_id']) == 0 :
        return ({'error': "'routine_id' must not be empty"}), 400
    if len(exercise_routine['exercise_id']) == 0 :
        return ({'error': "'exercise_id' must not be empty"}), 400
    if len(exercise_routine['sets_id']) == 0 :
        return ({'error': "'sets_id' must not be empty"}), 400

    exercise_routine_created = ExerciseRoutine(routine_id = exercise_routine['routine_id'], exercise_id = exercise_routine['exercise_id'], sets_id=exercise_routine['sets_id'])
    db.session.add(exercise_routine_created)
    db.session.commit()
    return jsonify(exercise_routine_created.serialize())

# DELETE ExerciseRoutine / ELIMINAR EJERCICIO DE RUTINA
@api.route('/exercise-routine/<int:routine_id>/<int:exercise_id>', methods=['DELETE'])
def delete_exercise_routine(routine_id, exercise_id):
    exercise_routine = ExerciseRoutine.query.filter_by(routine_id=routine_id, exercise_id=exercise_id).first()
    if exercise_routine is None:
        return ({'error':'exercise_routine not found'}), 404

    db.session.delete(exercise_routine)
    db.session.commit()
    return jsonify("successfully removed"), 200

# PUT ExerciseRoutine / ACTUALIZAR EJERCICIO DE RUTINA
@api.route('/exercise-routine/<int:routine_id>/<int:exercise_id>', methods=['PUT'])
def put_exercise_routine(routine_id, exercise_id):
    exercise_routine_update = request.get_json()
    if exercise_routine_update['routine_id'] is None:
        return({'error':'"routine_id" must be a number'}), 400
    if exercise_routine_update['exercise_id'] is None:
        return({'error':'"exercise_id" must be a number'}), 400
    if exercise_routine_update['sets_id'] is None:
        return({'error':'"sets_id" must be a number'}), 400
    
    exercise_routine = ExerciseRoutine.query.filter_by(routine_id=routine_id, exercise_id=exercise_id).first()
    if exercise_routine == None:
        return jsonify('exercise_routine not found'), 404
    else: 
        exercise_routine.routine_id=exercise_routine_update['routine_id']
        exercise_routine.exercise_id=exercise_routine_update['exercise_id']
        exercise_routine.sets_id=exercise_routine_update['sets_id']
        
        exercise_routine.verified = True
        db.session.commit()
        return jsonify('exercise_routine update'), 200

# FOLLOW UP
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
def get_all_weekly_routine_follow_up(weekly_routine_id):
    follow_up = FollowUp.query.filter_by(weekly_routine_id=weekly_routine_id).all()
    if len(follow_up) == 0:
        return ({'error':'followUp of one week not found'}), 404
    else:
        data_serialized = list(map(lambda followUp: followUp.serialize(), follow_up))
        return jsonify(data_serialized), 200
    
# GET ONE FollowUp / TRAER UN SEGUIMIENTO
@api.route('/follow-up/<int:weekly_routine_id>/<int:exercise_routine_id>', methods=['GET'])
def get_one_follow_up(weekly_routine_id, exercise_routine_id):
    follow_up = FollowUp.query.filter_by(weekly_routine_id=weekly_routine_id, exercise_routine_id=exercise_routine_id).first()
    if follow_up is None:
        return ({'error':'Follow Up not found'}), 404
    else:
        data_serialized = follow_up.serialize()
        return jsonify(data_serialized), 200

# POST FollowUp / AGREGAR SEGUIMIENTO
@api.route('/follow-up', methods=['POST'])
def post_follow_up():
    follow_up = request.get_json()
    # if follow_up['weekly_routine_id'] is None :
    #     return ({'error': "'weekly_routine_id' must not be empty"}), 400
    
    weekly_routine = WeeklyRoutine.query.filter_by(id=follow_up['weekly_routine_id']).first()
    if weekly_routine is None:
        return ({'error': "weekly routine not found"}), 404
    
    # if follow_up['exercise_routine_id'] is None:
    #     return ({'error': "'exercise_routine_id' must not be empty"}), 400
    
    exercise_routine = ExerciseRoutine.query.filter_by(id=follow_up['exercise_routine_id']).first()
    if exercise_routine is None:
        return ({'error': "exercise routine not found"}), 404
    
    follow_up_created = FollowUp(weekly_routine_id = follow_up['weekly_routine_id'], exercise_routine_id = follow_up['exercise_routine_id'], date=datetime.now().date())
    db.session.add(follow_up_created)
    db.session.commit()
    return jsonify(follow_up_created.serialize()), 200

# DELETE FollowUp / ELIMINAR SEGUIMIENTO
@api.route('/follow-up/<int:weekly_routine_id>/<int:exercise_routine_id>', methods=['DELETE'])
def delete_follow_up(weekly_routine_id, exercise_routine_id):
    query = db.select(FollowUp).where(FollowUp.weekly_routine_id==weekly_routine_id, FollowUp.exercise_routine_id==exercise_routine_id).order_by(desc(FollowUp.date)).limit(1)  
    result = db.session.execute(query)
    follow_up = result.scalars().first()
    print(follow_up)
    if follow_up is None:
        return ({'error':'Follow Up not found'}), 404

    db.session.delete(follow_up)
    db.session.commit()
    return jsonify("successfully removed"), 200

# PUT FollowUp / ACTUALIZAR SEGUIMIENTO
@api.route('/follow-up/<int:weekly_routine_id>/<int:exercise_routine_id>/<date>', methods=['PUT'])
def put_follow_up(weekly_routine_id, exercise_routine_id, date):
    try:
        date_obj = datetime.fromisoformat(date).date()
    except ValueError:
        return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD.'}), 400

    follow_up = FollowUp.query.filter_by(weekly_routine_id=weekly_routine_id, exercise_routine_id=exercise_routine_id, date=date_obj).first()
    if follow_up == None:
        return jsonify('follow_up not found'), 404
    else: 
        follow_up_update = request.get_json()
        if follow_up_update['weekly_routine_id'] is None:
            return({'error':'"weekly_routine_id" must be a number'}), 400
        if follow_up_update['exercise_routine_id'] is None:
            return({'error':'"exercise_routine_id" must be a number'}), 400
        if not isinstance(follow_up_update['date'], str) :
            return({'error':'"date" must be a string'}), 400

        follow_up.weekly_routine_id=follow_up_update['weekly_routine_id']
        follow_up.exercise_routine_id=follow_up_update['exercise_routine_id']
        follow_up.date=follow_up_update['date']
        
        follow_up.verified = True
        db.session.commit()
        return jsonify('follow_up update'), 200
    
# CATEGORIA DE EJERCICIOS
@api.route('/exercises-category', methods=['GET'])
def get_exercises_category():
    categories = {category.name: category.value for category in Category}
    return jsonify(categories), 200

# SERIES
# GET ALL Sets / TRAER TODAS LAS SERIES
@api.route('/sets', methods=['GET'])
def get_all_sets():
    sets = Sets.query.all()
    if len(sets) == 0:
        return ({'error':'sets list not found'}), 404
    else:
        data_serialized = list(map(lambda set: set.serialize(), sets))
        return jsonify(data_serialized), 200
    
# GET ONE Sets / TRAER UNA SERIES
@api.route('/sets/<int:sets>/<int:repetitions>', methods=['GET'])
def get_one_sets(sets, repetitions):
    sets = Sets.query.filter_by(sets=sets, repetitions=repetitions).first()
    if sets is None:
        return ({'error':'sets not found'}), 404
    else:
        data_serialized = sets.serialize()
        return jsonify(data_serialized), 200

# POST Sets / AGREGAR UNA SERIES
@api.route('/sets', methods=['POST'])
def post_sets():
    sets = request.get_json()
    if not isinstance(sets['sets'], str) or len(sets['sets'].strip()) == 0 :
        return ({'error': "'sets' must not be empty"}), 400
    
    if not isinstance(sets['repetitions'], str) or len(sets['repetitions']) == 0 :
        return ({'error': "'repetitions' must not be empty"}), 400

    sets_exist = Sets.query.filter_by(sets=sets['sets'], repetitions=sets['repetitions']).first()
    if sets_exist:
        return ({'error': "'sets' already exists"}), 400

    sets_created = Sets(sets = sets['sets'], repetitions = sets['repetitions'])
    db.session.add(sets_created)
    db.session.commit()
    return jsonify(sets_created.serialize())

# PUT Sets / ACTUALIZAR SERIES
@api.route('/sets/<int:sets>/<int:repetitions>', methods=['PUT'])
def put_sets(sets, repetitions):
    sets = Sets.query.filter_by(sets=sets, repetitions=repetitions).first()
    if sets == None:
        return jsonify('sets not found'), 404
    else: 
        sets_update = request.get_json()
        if sets_update['sets'] is None:
            return({'error':'"sets" must be a number'}), 400
        if sets_update['repetitions'] is None:
            return({'error':'"repetitions" must be a number'}), 400

        sets.sets=sets_update['sets']
        sets.repetitions=sets_update['repetitions']
        
        sets.verified = True
        db.session.commit()
        return jsonify('sets update'), 200