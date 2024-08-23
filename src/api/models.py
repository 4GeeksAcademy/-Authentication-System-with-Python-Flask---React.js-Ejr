from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    role_name = db.Column(db.String(50), nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'role_name': self.role_name
        }

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
    
    role = db.relationship('Role')
    cars = db.relationship('Car', backref='owner', lazy=True)
    appointments = db.relationship('Appointment', backref='customer', lazy=True)
    comments = db.relationship('Comment', backref='author', lazy=True)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'phone_number': self.phone_number,
            'email': self.email,
            'role_id': self.role_id
        }

class Car(db.Model):
    __tablename__ = 'cars'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    car_model = db.Column(db.String(100), nullable=False)
    license_plate = db.Column(db.String(20), unique=True, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'car_model': self.car_model,
            'license_plate': self.license_plate,
            'owner_id': self.owner_id
        }

class Service(db.Model):
    __tablename__ = 'services'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    duration = db.Column(db.Integer, nullable=False)  # La duración es en minutos, ojo!
    slots_required = db.Column(db.Integer, nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'duration': self.duration,
            'slots_required': self.slots_required
        }

class Appointment(db.Model):
    __tablename__ = 'appointments'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    car_id = db.Column(db.Integer, db.ForeignKey('cars.id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=False)
    service = db.relationship('Service', backref='appointments')
    status = db.Column(db.String(50), default="pending")
    
    comments = db.relationship('Comment', backref='appointment', lazy=True)

    def serialize(self):
        return {
            'id': self.id,
            'date': self.date,
            'user_id': self.user_id,
            'car_id': self.car_id,
            'service_id': self.service_id,
            'status': self.status
        }


class Comment(db.Model):
    __tablename__ = 'comments'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    appointment_id = db.Column(db.Integer, db.ForeignKey('appointments.id'), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp  = db.Column(db.DateTime, default=datetime.utcnow)
    is_mechanic = db.Column(db.Boolean, nullable=False, default=False)

    def serialize(self):
        return {
            'id': self.id,
            'appointment_id': self.appointment_id,
            'author_id': self.author_id,
            'content': self.content,
            'timestamp': self.timestamp,
            'is_mechanic': self.is_mechanic
        }

class Setting(db.Model):
    __tablename__ = 'settings'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    max_appointments_per_hour = db.Column(db.Integer, nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'max_appointments_per_hour': self.max_appointments_per_hour
        }

class TokenBlockList(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(100), nullable=False, unique=True)