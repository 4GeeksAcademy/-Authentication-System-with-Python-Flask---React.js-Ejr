"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from api.models import db, User, Role, Car, Appointment, Service, Comment, Setting
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime, timedelta
from flask_bcrypt import Bcrypt

app = Flask(__name__)
bcrypt = Bcrypt(app)

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# ///////////////////////////////////////////////////////////////////////////////////////////// post en /users
@api.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    phone_number = data.get('phone_number')
    role_id = data.get('role_id')
    if not email or not password or not name or not phone_number or not role_id:
        return jsonify({"error": "All fields are required"}), 400
    
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "User already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password=hashed_password, name=name, phone_number=phone_number, role_id=role_id)
    db.session.add(new_user)
    db.session.commit()

    response_body = new_user.serialize()
    return jsonify(response_body), 201

# ///////////////////////////////////////////////////////////////////////////////////////////// get a /users con id
@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user_query = User.query.filter_by(id=user_id).first()
    if user_query:
        response_body = {
            "msg": "Resultado exitoso", 
            "result": user_query.serialize()
        }
        return jsonify(response_body), 200
    else:
        response_body = {
           "msg": "No existe" 
        }
        return jsonify(response_body), 404
    

# ///////////////////////////////////////////////////////////////////////////////////////////// get a /cars con id
@api.route('/cars/<int:car_id>', methods=['GET'])
def get_cars(car_id):
    car_query = Car.query.filter_by(id=car_id).first()
    if car_query:
        response_body = {
            "msg": "Resultado exitoso", 
            "result": car_query.serialize()
        }
        return jsonify(response_body), 200
    else:
        response_body = {
           "msg": "Car no exist" 
        }
        return jsonify(response_body), 404

# ///////////////////////////////////////////////////////////////////////////////////////////// post a /cars 
@api.route('/cars', methods=['POST'])
def create_car():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    car_model = data.get('car_model')
    license_plate = data.get('license_plate')
    user_id = data.get('user_id')
    if not car_model or not license_plate or not user_id:
        return jsonify({"error": "Car model, license plate, and user ID are required"}), 400

    new_car = Car(car_model=car_model, license_plate=license_plate, owner_id=user_id)
    db.session.add(new_car)
    db.session.commit()

    response_body = new_car.serialize()
    return jsonify(response_body), 201

# ///////////////////////////////////////////////////////////////////////////////////////////// post a /comments 
@api.route('/comments', methods=['POST'])
def create_comment():
    data = request.get_json()
    comment = data.get('comment')
    user_id = data.get('user_id')
    appointment_id = data.get('appointment_id')
    if not comment or not user_id or not appointment_id:
        return jsonify({"error": "Comment, user ID, and appointment ID are required"}), 400

    new_comment = Comment(content=comment, author_id=user_id, appointment_id=appointment_id)
    db.session.add(new_comment)
    db.session.commit()

    response_body = new_comment.serialize()
    return jsonify(response_body), 201

# ///////////////////////////////////////////////////////////////////////////////////////////// post a /services 
@api.route('/services', methods=['POST'])
def create_service():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    name = data.get('name')
    description = data.get('description')
    duration = data.get('duration')
    slots_required = data.get('slots_required')

    new_service = Service(name=name, description=description, duration=duration, slots_required=slots_required)
    db.session.add(new_service)
    db.session.commit()

    response_body = new_service.serialize()
    return jsonify(response_body), 201

# ///////////////////////////////////////////////////////////////////////////////////////////// get a /services 
@api.route('/services', methods=['GET'])
def get_services():
    services_query = Service.query.all()
    services_list = list(map(lambda service: service.serialize(), services_query))
    return jsonify(services_list), 200

# ///////////////////////////////////////////////////////////////////////////////////////////// post a /settings 
@api.route('/settings', methods=['POST'])
def create_setting():
    data = request.get_json()
    max_appointments_per_hour = data.get('max_appointments_per_hour')
    if max_appointments_per_hour is None:
        return jsonify({"error": "Max appointments per hour is required"}), 400

    setting = Setting.query.first()
    if setting:
        setting.max_appointments_per_hour = max_appointments_per_hour
    else:
        setting = Setting(max_appointments_per_hour=max_appointments_per_hour)
        db.session.add(setting)
    db.session.commit()

    response_body = setting.serialize()
    return jsonify(response_body), 201


# ///////////////////////////////////////////////////////////////////////////////////////////// get a /settings 
@api.route('/settings', methods=['GET'])
def get_setting():
    setting = Setting.query.first()
    if setting:
        response_body = setting.serialize()
        return jsonify(response_body), 200
    else:
        return jsonify({"msg": "Settings not configured"}), 404

# ///////////////////////////////////////////////////////////////////////////////////////////// post a /appointments 
@api.route('/appointments', methods=['POST'])
def create_appointment():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    date = data.get('date')
    user_id = data.get('user_id')
    car_id = data.get('car_id')
    service_id = data.get('service_id')
    
    if not date or not user_id or not car_id or not service_id:
        return jsonify({"error": "Date, user ID, car ID, and service ID are required"}), 400

    service = Service.query.get(service_id)
    if not service:
        return jsonify({"error": "Service not found"}), 404

    max_appointments_per_hour = Setting.query.first().max_appointments_per_hour

    start_time = datetime.strptime(date, '%Y-%m-%d %H:%M:%S')
    end_time = start_time + timedelta(hours=1)

    appointments_in_hour = Appointment.query.filter(
        Appointment.date >= start_time,
        Appointment.date < end_time
    ).all()

    total_slots_booked = sum([app.service.slots_required for app in appointments_in_hour])

    if (total_slots_booked + service.slots_required) <= max_appointments_per_hour:
        new_appointment = Appointment(
            date=start_time,
            user_id=user_id,
            car_id=car_id,
            service_id=service_id,
            status="pending"
        )
        db.session.add(new_appointment)
        db.session.commit()

        response_body = new_appointment.serialize()
        return jsonify(response_body), 201
    else:
        return jsonify({"error": "No available slots for this time"}), 400


# ///////////////////////////////////////////////////////////////////////////////////////////// get a /appointments con id
@api.route('/appointments/<int:appointment_id>', methods=['GET'])
def get_appointment(appointment_id):
    appointment_query = Appointment.query.filter_by(id=appointment_id).first()
    if appointment_query:
        response_body = {
            "msg": "Resultado exitoso",
            "result": appointment_query.serialize()
        }
        return jsonify(response_body), 200
    else:
        response_body = {
           "msg": "No existe"
        }
        return jsonify(response_body), 404

# ///////////////////////////////////////////////////////////////////////////////////////////// delete a /appointments con id
@api.route('/appointments/<int:appointment_id>', methods=['DELETE'])
def cancel_appointment(appointment_id):
    appointment = Appointment.query.get(appointment_id)
    if not appointment:
        return jsonify({"error": "Cita no encontrada"}), 404

    db.session.delete(appointment)
    db.session.commit()

    return jsonify({"msg": "Cita cancelada exitosamente"}), 200