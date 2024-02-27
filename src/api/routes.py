"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Subscription, Testimony, Session, Instructor, Types_of_session
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import datetime, timedelta

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# 
# Aquí haremos la rutas de backend
# IMPORTANTE siempre poner api.route en los endpoints 
# 

#endpoint para traer a los usuarios
@api.route('/user', methods=['GET'])
def get_users():    
    user_query = User.query.all()
    user_query = list(map(lambda item: item.serialize(), user_query))
    # print(user_query)    
    if user_query == []:
        return jsonify({
             "Msg": "No hay usuarios registrados"
             }), 404
        
    response_body = {
        "msg": "ok",
        "user": user_query    }    
        
    return jsonify(response_body), 200
    # Create a route to authenticate your users and return JWTs. The
    # create_access_token() function is used to actually generate the JWT.

#api para traer un usuario en concreto
@api.route('/user/<int:user_id>', methods=['GET'])
# Si devuelve ok aparecerá en la consola de vscode el numero de id.
def get_one_user(user_id):
    user_query = User.query.filter_by(id = user_id).first() #El filter sera con el id, no se podrá repetir
    # Te lo devuelve en crudo.
    
    if user_query is None:
        return jsonify({
            "msg": "User not found"
        }), 404
    
    response_body = {
        "msg": "ok",
        "user": user_query.serialize() #Hacemos el serialize para mostrar la informacion tratada.
    }
    return jsonify(response_body), 200


#endpoint para iniciar sesion con usuario existente
@api.route("/login", methods=["POST"])
def login():
    print("HOLA")
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user_query = User.query.filter_by(email=email).first()
    if email != user_query.email or password != user_query.password:
        print("CHAO")
        return jsonify({"msg": "Bad email or password"}), 401    
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.

#endpoint para guardar el token del usuario
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    info_profile = User.query.filter_by(email=current_user).first()
    return jsonify({"user": info_profile.serialize()}), 200


#endpoint para que aparezcan las clases
@api.route('/sessions', methods=['GET'])
def get_sessions():    
    session_query = Session.query.all()
    session_query = list(map(lambda item: item.serialize(), session_query))
    print(session_query)    
    if session_query == []:
        return jsonify({
             "Msg": "No hay sesiones disponibles"
             }), 404
        
    response_body = {
        "msg": "ok",
        "session": session_query    }    
        
    return jsonify(response_body), 200
    # Create a route to authenticate your users and return JWTs. The
    # create_access_token() function is used to actually generate the JWT.

#endpoint para que aparezcan las clases de jivamukti
@api.route('/sessions/jivamuktiyoga', methods=['GET'])
def get_jivamukti():    
    jivamukti_query = Jivamukti_yoga.query.all()
    jivamukti_query = list(map(lambda item: item.serialize(), jivamukti_query))
    print(jivamukti_query)    
    if jivamukti_query == []:
        return jsonify({
             "Msg": "No hay sesiones disponibles"
             }), 404
        
    response_body = {
        "msg": "ok",
        "session": jivamukti_query    }    
        
    return jsonify(response_body), 200

#endpoint para que aparezcan las clases de jivamukti
@api.route('/sessions/vinyasayoga', methods=['GET'])
def get_vinyasa():    
    vinyasa_query = Vinyasa_yoga.query.all()
    vinyasa_query = list(map(lambda item: item.serialize(), vinyasa_query))
    print(vinyasa_query)    
    if vinyasa_query == []:
        return jsonify({
             "Msg": "No hay sesiones disponibles"
             }), 404
        
    response_body = {
        "msg": "ok",
        "session": vinyasa_query    }    
        
    return jsonify(response_body), 200

@api.route('/sessions/hathayoga', methods=['GET'])
def get_hatha():    
    hatha_query = Hatha_yoga.query.all()
    hatha_query = list(map(lambda item: item.serialize(), hatha_query))
    print(hatha_query)    
    if hatha_query == []:
        return jsonify({
             "Msg": "No hay sesiones disponibles"
             }), 404
        
    response_body = {
        "msg": "ok",
        "session": hatha_query    }    
        
    return jsonify(response_body), 200


@api.route('/sessions/ashtangayoga', methods=['GET'])
def get_asthanga():    
    ashtanga_query = Asthanga_yoga.query.all()
    ashtanga_query = list(map(lambda item: item.serialize(), ashtanga_query))
    print(ashtanga_query)    
    if ashtanga_query == []:
        return jsonify({
             "Msg": "No hay sesiones disponibles"
             }), 404
        
    response_body = {
        "msg": "ok",
        "session": ashtanga_query    }    
        
    return jsonify(response_body), 200


@api.route('/sessions/rocketyoga', methods=['GET'])
def get_rocket():    
    rocket_query = Rocket_yoga.query.all()
    rocket_query = list(map(lambda item: item.serialize(), rocket_query))
    print(rocket_query)    
    if rocket_query == []:
        return jsonify({
             "Msg": "No hay sesiones disponibles"
             }), 404
        
    response_body = {
        "msg": "ok",
        "session": rocket_query    }    
        
    return jsonify(response_body), 200


@api.route('/sessions/meditation', methods=['GET'])
def get_meditation():    
    meditation_query = Meditation.query.all()
    meditation_query = list(map(lambda item: item.serialize(), meditation_query))
    print(meditation_query)    
    if meditation_query == []:
        return jsonify({
             "Msg": "No hay sesiones disponibles"
             }), 404
        
    response_body = {
        "msg": "ok",
        "session": meditation_query    }    
        
    return jsonify(response_body), 200

@api.route('/sessions/harmonium', methods=['GET'])
def get_harmonium():    
    harmonium_query = Harmonium.query.all()
    harmonium_query = list(map(lambda item: item.serialize(), harmonium_query))
    print(harmonium_query)    
    if harmonium_query == []:
        return jsonify({
             "Msg": "No hay sesiones disponibles"
             }), 404
        
    response_body = {
        "msg": "ok",
        "session": harmonium_query    }    
        
    return jsonify(response_body), 200

#endpoint para registrarse
@api.route("/signup", methods=["POST"])
def signup():
    # El request_body o cuerpo de la solicitud ya está decodificado en formato JSON y se encuentra en la variable request.json
    request_body = request.json
    # Creamos variable y se la metemos dentro de user(Como otra instancia, cada user es una)
    # le damos como valores a name y password los request que pondremos en el Postman
    
    data = request.json
    name = data.get('name')
    password = data.get('password')
    last_name = data.get('last_name')
    email = data.get('email')
    date_of_birth = data.get('date_of_birth')
    role = data.get('role')
    subscription_start_date = datetime.utcnow() #para que aparezca la fecha de registro en la fecha actual de rellenar el formulario
    plan = data.get('plan')
    last_payment_date = ''
    next_payment_date = ''
    is_subscription_active = True


    # Example validation
    if not email or not password or not name or not last_name or not date_of_birth or not role:
        return jsonify({'Error': 'All the fields are required'}), 400    # Example database interaction (using SQLAlchemy)
    
    if plan == "Free Trial":
        next_payment_date = subscription_start_date + timedelta(days=4) #que el proximo pago sea 3 dias después de registrarse
    else:
        last_payment_date = subscription_start_date
        next_payment_date = subscription_start_date + timedelta(days=30)

    new_user = User(
        name=name, 
        last_name=last_name, 
        password=password, 
        email=email, 
        date_of_birth=date_of_birth, 
        role=role,
        subscription_start_date=subscription_start_date,
        next_payment_date=next_payment_date,
        last_payment_date=last_payment_date,
        is_subscription_active=is_subscription_active
        )
    

    print(new_user)
    # Le decimos que lo agregue y que lo comitee 
    db.session.add(new_user)
    db.session.commit()

    # generamos el token de este usuario
    access_token = create_access_token(identity=new_user.name)

    response_body = {
        "msg": "the user has been created",
        "access_token": access_token
        }
    
    return jsonify(response_body), 200


#endpoint para registrarse
@api.route("/signup/freetrial", methods=["POST"])
def signup_free_trial():
    # El request_body o cuerpo de la solicitud ya está decodificado en formato JSON y se encuentra en la variable request.json
    request_body = request.json
    
    data = request.json
    name = data.get('name')
    password = data.get('password')
    last_name = data.get('last_name')
    email = data.get('email')
    date_of_birth = data.get('date_of_birth')
    role = data.get('role')
    subscription_start_date = datetime.utcnow() #para que aparezca la fecha de registro en la fecha actual de rellenar el formulario
    subscription = Subscription.query.filter_by(plan='Free Trial').first() #seleccionamos la opcion del plan Free Trial
    last_payment_date = ''
    next_payment_date = ''
    is_subscription_active = True

    # Example validation
    if not email or not password or not name or not last_name or not date_of_birth or not role:
        return jsonify({'Error': 'All the fields are required'}), 400    # Example database interaction (using SQLAlchemy)
    
    # if subscription == 'Free Trial':
    next_payment_date = subscription_start_date + timedelta(days=4) #que el proximo pago sea 3 dias después de registrarse
    

    new_user = User(
        name=name, 
        last_name=last_name, 
        password=password, 
        email=email, 
        date_of_birth=date_of_birth, 
        role=role,
        subscription_start_date=subscription_start_date,
        subscription=subscription,
        next_payment_date=next_payment_date,
        last_payment_date=last_payment_date,
        is_subscription_active=is_subscription_active
        )
    
    # print(new_user)
    # Le decimos que lo agregue y que lo comitee 
    db.session.add(new_user)
    db.session.commit()

    # generamos el token de este usuario
    access_token = create_access_token(identity=new_user.name)

    response_body = {
        "msg": "the user has been created with the Free Trial plan",
        "access_token": access_token
        }
    return jsonify(response_body), 200


#endpoint para desuscribirse
@api.route("/unsubscribe", methods=["POST"])
@jwt_required()
def unsubscribe():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()

    if user:
        if user.subscription_end_date is None: #si no hay fecha de subscripción, añade la actual
            user.subscription_end_date = datetime.utcnow()
            user.is_subscription_active = False
            db.session.commit()
            return jsonify({
                "msg": "User unsubscribed succesfully"
            }), 200
        else:
            return jsonify({
                "msg": "User alredy unsubscribed"
            }), 200
    
    else:
        return jsonify({
            "msg": "User not found"
        }), 404
