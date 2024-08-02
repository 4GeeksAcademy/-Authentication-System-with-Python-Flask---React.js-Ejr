from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone


db = SQLAlchemy()


class Roles(db.Model):
    __tablename__= 'roles'
    id = db.Column(db.Integer, primary_key=True)
    roles_name = db.Column(db.String(100), nullable=False, unique=True)

    def __repr__(self):
        return f'<Roles {self.role_name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "roles_name": self.roles_name,
        }

class User(db.Model):
    __tablename__= 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    phone_number = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False, unique=True)
    roles_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
    appointments = db.relationship('Appointments', backref='user', lazy=True)
    cars = db.relationship('Cars', backref='user', lazy=True)
    comments = db.relationship('Comments', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "phone_number": self.phone_number,
            "email": self.email,
            "roles_id": self.roles_id,
        }

class Cars(db.Model):
    __tablename__ = 'cars'
    id = db.Column(db.Integer, primary_key=True)
    car_model = db.Column(db.String(120), nullable=False)
    license_plate = db.Column(db.String(100), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f'<Cars {self.car_model}>'

    def serialize(self):
        return {
            "id": self.id,
            "car_model": self.car_model,
            "license_plate": self.license_plate,
            "user_id": self.user_id,
        }

class Appointments(db.Model):
    __tablename__ = 'appointments'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    car_id = db.Column(db.Integer, db.ForeignKey('cars.id'), nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=False)
    status = db.Column(db.Boolean(), nullable=False)
    comments = db.relationship('Comments', backref='appointments', lazy=True)

    def __repr__(self):
        return f'<Appointments {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "time": self.time,
            "user_id": self.user_id,
            "cars_id": self.car_id,
            "job_id": self.job_id,
        }

class Services(db.Model):
    __tablename__ = 'services'
    id = db.Column(db.Integer, primary_key=True)
    services_name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(300))
    duration = db.Column(db.Integer, nullable=False)
    max_appointments = db.Column(db.Integer, nullable=False, default=3)
    appointments = db.relationship('Appointments', backref='services', lazy=True)

    def __repr__(self):
        return f'<Service {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "services_name": self.services_name,
            "description": self.description,
            "duration": self.duration,
            "max_appointments": self.max_appointments,
        }

class Comments(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    comments = db.Column(db.String(300), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    appointment_id = db.Column(db.Integer, db.ForeignKey('appointments.id'), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
    timestamp = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)   

    def __repr__(self):
        return f'<Comments {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "comments": self.comments,
            "user_id": self.user_id,
            "appointments_id": self.appointments_id,
            "roles_id": self.roles_id,
            "timestamp": self.timestamp,
        }