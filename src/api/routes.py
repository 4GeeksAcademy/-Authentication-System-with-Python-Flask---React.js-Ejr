"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from api.models import db, User, Role, Car, Appointment, Service, Comment, Setting, TokenBlockList
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime, timedelta
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt


app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'autoagendaFMS24'

jwt = JWTManager(app)
bcrypt = Bcrypt(app)

api = Blueprint('api', __name__)
# Allow CORS requests to this API
CORS(api)

# ///////////////////////////////////////////////////////////////////////////////////////////// post en /create users from admin
@api.route('/users', methods=['POST'])
@jwt_required()
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

    response_body = {
        "user": new_user.serialize(),
    }
    return jsonify(response_body), 201

# ///////////////////////////////////////////////////////////////////////////////////////////// post en /signup
@api.route('/signupuser', methods=['POST'])
def create_signupusers():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    phone_number = data.get('phone_number')

    if not email or not password or not name or not phone_number:
        return jsonify({"error": "All fields are required"}), 400
    
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "User already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password=hashed_password, name=name, phone_number=phone_number, role_id=3)
    db.session.add(new_user)
    db.session.commit()

    response_body = {
        "id": new_user.id,
        "email": new_user.email,
        "name": new_user.name,
        "phone_number": new_user.phone_number,
    }
    return jsonify(response_body), 201


# ///////////////////////////////////////////////////////////////////////////////////////////// post en /login
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()
    
    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Invalid credentials"}), 401

    role = Role.query.filter_by(id=user.role_id).first()
    access_token = create_access_token(identity=user.id, additional_claims={"role": role.role_name})  # Incluye role_name en el token
    return jsonify(access_token=access_token), 200

# ///////////////////////////////////////////////////////////////////////////////////////////// post en /ping user
@api.route('/pinguser', methods=['GET'])
@jwt_required()
def ping_user():
    current_user_id = get_jwt_identity()
    payload = get_jwt()
    return jsonify({"message": "User is authenticated", "user_id": current_user_id, "role": payload["role"]}), 200


# ///////////////////////////////////////////////////////////////////////////////////////////// post en /logout
@api.route('/logout', methods=['POST'])
@jwt_required()
def user_logout():
    jti=get_jwt()["jti"]
    token_blocked=TokenBlockList(jti=jti)
    db.session.add(token_blocked)
    db.session.commit()
    return jsonify({"msg":"Logout"})

# ///////////////////////////////////////////////////////////////////////////////////////////// get a /users con id
@api.route('/users/<int:user_id>', methods=['GET'])
# @jwt_required()
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
@jwt_required()
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
    
# ///////////////////////////////////////////////////////////////////////////////////////////// get a /services con id
@api.route('/services/<int:services_id>', methods=['GET'])
@jwt_required()
def get_service(services_id):
    service_query = Service.query.filter_by(id=services_id).first()
    if service_query:
        response_body = {
            "msg": "Resultado exitoso", 
            "result": service_query.serialize()
        }
        return jsonify(response_body), 200
    else:
        response_body = {
           "msg": "Service no exist" 
        }
        return jsonify(response_body), 404

# ///////////////////////////////////////////////////////////////////////////////////////////// post a /cars 
@api.route('/cars', methods=['POST'])
@jwt_required()
def create_car():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    car_model = data.get('car_model')
    license_plate = data.get('license_plate')
    user_id = data.get('user_id')
    if not car_model or not license_plate or not user_id:
        return jsonify({"error": "Car model, license plate, and user ID are required"}), 400
    existing_user = User.query.filter_by(id=user_id).first()
    if not existing_user:
        return jsonify({"error": "Bad user_id"}), 400

    new_car = Car(car_model=car_model, license_plate=license_plate, owner_id=user_id)
    db.session.add(new_car)
    db.session.commit()

    response_body = new_car.serialize()
    return jsonify(response_body), 201

# ///////////////////////////////////////////////////////////////////////////////////////////// post a /comments 
@api.route('/comments', methods=['POST'])
@jwt_required()
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
@jwt_required()
def create_service():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    name = data.get('name')
    description = data.get('description')
    duration = data.get('duration')
    slots_required = data.get('slots_required')
    if not name or not description or not duration or not slots_required:
        return jsonify({"error": "Name, description,slots_required and duration are required"}), 400

    new_service = Service(name=name, description=description, duration=duration, slots_required=slots_required)
    db.session.add(new_service)
    db.session.commit()

    response_body = new_service.serialize()
    return jsonify(response_body), 201

# ///////////////////////////////////////////////////////////////////////////////////////////// get a /services 
@api.route('/services', methods=['GET'])
@jwt_required()
def get_services():
    services_query = Service.query.all()
    services_list = list(map(lambda service: service.serialize(), services_query))
    return jsonify(services_list), 200

# ///////////////////////////////////////////////////////////////////////////////////////////// post a /settings 
@api.route('/settings', methods=['POST'])
@jwt_required()
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
@jwt_required()
def get_setting():
    setting = Setting.query.first()
    if setting:
        response_body = setting.serialize()
        return jsonify(response_body), 200
    else:
        return jsonify({"msg": "Settings not configured"}), 404
    
# ///////////////////////////////////////////////////////////////////////////////////////////// get a /users 
@api.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    users_query = User.query.all()
    users_list = list(map(lambda user: user.serialize(), users_query))
    return jsonify(users_list), 200
# ///////////////////////////////////////////////////////////////////////////////////////////// post a /appointments 
@api.route('/appointments', methods=['POST'])
@jwt_required()
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
    
    existing_user = User.query.filter_by(id=user_id).first()
    if not existing_user:
        return jsonify({"error": "Bad user_id"}), 400
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
    
    comments = Comment.query.filter_by(appointment_id=appointment_id).all()
    for comment in comments:
        db.session.delete(comment)
    db.session.delete(appointment)
    db.session.commit()

    return jsonify({"msg": "Cita cancelada exitosamente"}), 200
# ///////////////////////////////////////////////////////////////////////////////////////////// get a /appointments
@api.route('/appointments', methods=['GET'])
@jwt_required()
def get_appointments():
    appointments_query = Appointment.query.all()
    appointments_list = list(map(lambda appointment: appointment.serialize(), appointments_query))
    return jsonify(appointments_list), 200

# ///////////////////////////////////////////////////////////////////////////////////////////// get a /update_profile
@api.route('/update_profile', methods=['PATCH'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    data = request.get_json()
    email = data.get('email')
    current_password = data.get('currentPassword')
    new_password = data.get('newPassword')

    user = User.query.get(user_id)
    
    if not user or not bcrypt.check_password_hash(user.password, current_password):
        return jsonify({"error": "Invalid current password"}), 401

    if email:
        user.email = email
    if new_password:
        user.password = bcrypt.generate_password_hash(new_password).decode('utf-8')

    db.session.commit()
    return jsonify({"msg": "Profile updated successfully", "email": user.email}), 200



# /***************** GENERA DATOS DE PRUEBA ************ get a /add_test_data
@api.route('/add_test_data', methods=['POST'])
def add_test_data():
    # Agregar roles
    roles = ['Admin', 'Mechanic', 'User']
    for idx, role_name in enumerate(roles, start=1):
        role = Role(id=idx, role_name=role_name)
        db.session.add(role)
    
    db.session.commit()

    # Agregar usuarios
    users = [
        {"email": "user1@example.com", "password": "123123", "name": "User One", "phone_number": "1234567890", "role_id": 3},
        {"email": "user2@example.com", "password": "password2", "name": "User Two", "phone_number": "0987654321", "role_id": 3},
        {"email": "user3@example.com", "password": "password3", "name": "User Three", "phone_number": "1122334455", "role_id": 3},
        {"email": "user4@example.com", "password": "password4", "name": "User Four", "phone_number": "2233445566", "role_id": 3},
        {"email": "user5@example.com", "password": "password5", "name": "User Five", "phone_number": "3344556677", "role_id": 3},
        {"email": "user6@example.com", "password": "password6", "name": "User Six", "phone_number": "4455667788", "role_id": 3},
        {"email": "user7@example.com", "password": "password7", "name": "User Seven", "phone_number": "5566778899", "role_id": 3},
        {"email": "user8@example.com", "password": "password8", "name": "User Eight", "phone_number": "6677889900", "role_id": 3},
        {"email": "user9@example.com", "password": "password9", "name": "User Nine", "phone_number": "7788990011", "role_id": 3},
        {"email": "user10@example.com", "password": "password10", "name": "User Ten", "phone_number": "8899001122", "role_id": 3},
        {"email": "user11@example.com", "password": "password11", "name": "User Eleven", "phone_number": "9900112233", "role_id": 3},
        {"email": "admin@example.com", "password": "123123", "name": "Admin User", "phone_number": "1231231234", "role_id": 1},
        {"email": "mechanic@example.com", "password": "123123", "name": "Mechanic User", "phone_number": "3213214321", "role_id": 2}
    ]
    user_objects = []
    for user_data in users:
        hashed_password = bcrypt.generate_password_hash(user_data['password']).decode('utf-8')
        user = User(
            email=user_data['email'],
            password=hashed_password,
            name=user_data['name'],
            phone_number=user_data['phone_number'],
            role_id=user_data['role_id']
        )
        db.session.add(user)
        user_objects.append(user)

    db.session.commit()

    # Agregar servicios
    services = [
        {"name": "Oil Change", "description": "Standard oil change service", "duration": 1, "slots_required": 1},
        {"name": "Brake Inspection", "description": "Comprehensive brake system inspection", "duration": 1.5, "slots_required": 1},
        {"name": "Tire Rotation", "description": "Rotation of all four tires", "duration": 1, "slots_required": 1}
    ]
    for service_data in services:
        service = Service(
            name=service_data['name'],
            description=service_data['description'],
            duration=service_data['duration'],
            slots_required=service_data['slots_required']
        )
        db.session.add(service)

    db.session.commit()

    # Agregar configuraciones
    setting = Setting(max_appointments_per_hour=4)
    db.session.add(setting)
    db.session.commit()
    
    # Agregar autos
    cars = [
        {"car_model": "Toyota Corolla", "license_plate": "ABC123", "owner_id": user_objects[0].id},
        {"car_model": "Honda Civic", "license_plate": "XYZ789", "owner_id": user_objects[1].id},
        {"car_model": "Ford Focus", "license_plate": "DEF456", "owner_id": user_objects[2].id},
        {"car_model": "Chevy Malibu", "license_plate": "GHI101", "owner_id": user_objects[3].id},
        {"car_model": "Nissan Altima", "license_plate": "JKL234", "owner_id": user_objects[4].id},
        {"car_model": "BMW 3 Series", "license_plate": "MNO567", "owner_id": user_objects[5].id},
        {"car_model": "Mercedes-Benz C-Class", "license_plate": "PQR890", "owner_id": user_objects[6].id},
        {"car_model": "Audi A4", "license_plate": "STU123", "owner_id": user_objects[7].id},
        {"car_model": "Lexus IS", "license_plate": "VWX456", "owner_id": user_objects[8].id},
        {"car_model": "Hyundai Sonata", "license_plate": "YZA789", "owner_id": user_objects[9].id},
        {"car_model": "Kia Optima", "license_plate": "BCD012", "owner_id": user_objects[10].id}
    ]
    for car_data in cars:
        car = Car(
            car_model=car_data['car_model'],
            license_plate=car_data['license_plate'],
            owner_id=car_data['owner_id']
        )
        db.session.add(car)

    db.session.commit()

    # Agregar citas
    appointments = [
        {"date": "2024-08-10 10:00:00", "user_id": user_objects[0].id, "car_id": 1, "service_id": 1, "status": "pending"},
        {"date": "2024-08-11 11:00:00", "user_id": user_objects[1].id, "car_id": 2, "service_id": 2, "status": "pending"},
        {"date": "2024-08-12 12:00:00", "user_id": user_objects[2].id, "car_id": 3, "service_id": 3, "status": "pending"},
        {"date": "2024-08-13 13:00:00", "user_id": user_objects[3].id, "car_id": 4, "service_id": 1, "status": "pending"},
        {"date": "2024-08-14 14:00:00", "user_id": user_objects[4].id, "car_id": 5, "service_id": 2, "status": "pending"},
        {"date": "2024-08-15 15:00:00", "user_id": user_objects[5].id, "car_id": 6, "service_id": 3, "status": "pending"},
        {"date": "2024-08-16 16:00:00", "user_id": user_objects[6].id, "car_id": 7, "service_id": 1, "status": "pending"},
        {"date": "2024-08-17 17:00:00", "user_id": user_objects[7].id, "car_id": 8, "service_id": 2, "status": "pending"},
        {"date": "2024-08-18 18:00:00", "user_id": user_objects[8].id, "car_id": 9, "service_id": 3, "status": "pending"},
        {"date": "2024-08-19 19:00:00", "user_id": user_objects[9].id, "car_id": 10, "service_id": 1, "status": "pending"},
        {"date": "2024-08-20 20:00:00", "user_id": user_objects[10].id, "car_id": 11, "service_id": 2, "status": "pending"}
    ]
    for appointment_data in appointments:
        appointment = Appointment(
            date=datetime.strptime(appointment_data['date'], '%Y-%m-%d %H:%M:%S'),
            user_id=appointment_data['user_id'],
            car_id=appointment_data['car_id'],
            service_id=appointment_data['service_id'],
            status=appointment_data['status']
        )
        db.session.add(appointment)

    db.session.commit()

    # Agregar comentarios
    comments = [
        {"content": "Great service!", "author_id": user_objects[0].id, "appointment_id": 1},
        {"content": "Very satisfied with the brake inspection.", "author_id": user_objects[1].id, "appointment_id": 2},
        {"content": "Tire rotation was quick and efficient.", "author_id": user_objects[2].id, "appointment_id": 3},
        {"content": "Oil change done perfectly.", "author_id": user_objects[3].id, "appointment_id": 4},
        {"content": "Friendly staff.", "author_id": user_objects[4].id, "appointment_id": 5},
        {"content": "Great service as always.", "author_id": user_objects[5].id, "appointment_id": 6},
        {"content": "Quick and efficient.", "author_id": user_objects[6].id, "appointment_id": 7},
        {"content": "Highly recommend.", "author_id": user_objects[7].id, "appointment_id": 8},
        {"content": "Very professional.", "author_id": user_objects[8].id, "appointment_id": 9},
        {"content": "Exceptional service.", "author_id": user_objects[9].id, "appointment_id": 10},
        {"content": "Best workshop in town.", "author_id": user_objects[10].id, "appointment_id": 11}
    ]
    for comment_data in comments:
        comment = Comment(
            content=comment_data['content'],
            author_id=comment_data['author_id'],
            appointment_id=comment_data['appointment_id']
        )
        db.session.add(comment)

    db.session.commit()

    return jsonify({"msg": "Test data added successfully"}), 201
