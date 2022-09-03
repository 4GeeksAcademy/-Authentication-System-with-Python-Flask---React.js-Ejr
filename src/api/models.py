from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    full_name = db.Column(db.String(80), unique=False, default=None, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    inmuebles = db.relationship('Inmueble', backref='Propietario', cascade="all, delete")
    messages = db.relationship('Message', backref='Propietario', cascade="all, delete")

    def __repr__(self):
        return f'<Propietario {self.username}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "full_name": self.full_name,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Inmueble(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tipo_operacion = db.Column(db.String(80), unique=False, nullable=False)
    comunidad = db.Column(db.String(80), unique=False, nullable=False)
    provincia = db.Column(db.String(80), unique=False, nullable=False)
    municipio = db.Column(db.String(80), unique=False, nullable=False)
    direccion = db.Column(db.String(80), unique=False, nullable=False)
    precio = db.Column(db.Integer, unique=False, nullable=False)
    tipo_vivienda = db.Column(db.String(80), unique=False, nullable=False)
    habitaciones = db.Column(db.Integer, unique=False, nullable=False)
    aseos = db.Column(db.Integer, unique=False, nullable=False)
    pet = db.Column(db.Boolean, unique=False, nullable=False)
    piscina = db.Column(db.Boolean, unique=False, nullable=False)
    terraza = db.Column(db.Boolean, unique=False, nullable=False)
    garage = db.Column(db.Boolean, unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    # inmueble = db.relationship('User', backref='Inmueble' ) #, lazy=True
    imagenes = db.relationship('Imagen', backref='Inmueble', cascade="all, delete") #, lazy=True
    messages = db.relationship('Message', backref='Inmueble', cascade="all, delete") #, lazy=True

    def __repr__(self):
        return f'<Inmueble {self.direccion}>'

    def serialize(self):
        return {
            "id": self.id,
            "tipo_operacion": self.tipo_operacion,
            "comunidad": self.comunidad,
            "provincia": self.provincia,
            "municipio": self.municipio,
            "direccion": self.direccion,
            "precio": self.precio,
            "tipo_vivienda": self.tipo_vivienda,
            "habitaciones": self.habitaciones,
            "aseos": self.aseos,
            "pet": self.pet,
            "piscina": self.piscina,
            "terraza": self.terraza,
            "garage": self.garage,
            # do not serialize the password, its a security breach
        }

class Imagen(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    imagen_url = db.Column(db.String(80), unique=False, nullable=False)
    inmueble_id = db.Column(db.Integer, db.ForeignKey('inmueble.id'), nullable=False)

    def __repr__(self):
        return f'<Imagen {self.imagen_url}>'

    def serialize(self):
        return {
            "id": self.id,
            "imagen_url": self.imagen_url,
            "inmueble_id": self.inmueble_id,
        }

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender_email = db.Column(db.String(30), unique=False, nullable=False)
    sender_name = db.Column(db.String(30), unique=False, nullable=False)
    sender_phone = db.Column(db.Integer, unique=False, nullable=False)
    body = db.Column(db.String(300), unique=False, nullable=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey('user.id')) 
    # recipient = db.relationship('User', backref='received_messages') #, cascade="all, delete"
    inmueble_id = db.Column(db.Integer, db.ForeignKey('inmueble.id')) 

    def __repr__(self):
        return f'<Message to {self.recipient_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "sender_email": self.sender_email,
            "sender_name": self.sender_name,
            "sender_phone": self.sender_phone,
            "body": self.body,
            "recipient_id": self.recipient_id,
            "inmueble_id": self.inmueble_id
            # do not serialize the password, its a security breach
        }