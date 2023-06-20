from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

rentas_user = db.Table(
    "rentas_user",
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('rentas_id', db.Integer, db.ForeignKey('rentas.id'))
)

canchas_rentas = db.Table(
    "canchas_rentas",
    db.Column('rentas_id', db.Integer, db.ForeignKey('canchas.id')),
    db.Column('canchas_id', db.Integer, db.ForeignKey('rentas.id'))
)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=True)
    name = db.Column(db.String(120), nullable=True)
    lastname = db.Column(db.String(120), nullable=True)
    password = db.Column(db.String(500), nullable=True)
    is_admin = db.Column(db.Boolean, nullable=True)
    is_renter = db.Column(db.Boolean, nullable=True)
    rentas = db.relationship(
        'Rentas', secondary=rentas_user, back_populates='users')

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "lastname": self.lastname,
            "is_admin": self.is_admin,
            "is_renter": self.is_renter
        }


class Canchas(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String, nullable=False)
    name = db.Column(db.String(120), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref='canchas')
    rentas = db.relationship(
        'Rentas', secondary=canchas_rentas, back_populates='canchas')
    sport_id = db.Column(db.Integer, db.ForeignKey('sport.id'), nullable=False)
    sport = db.relationship('Sport', backref='canchas')

    def serialize(self):
        return {
            "id": self.id,
            "location": self.location,
            "name": self.name
        }


class Rentas(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    disponibility = db.Column(db.DateTime, nullable=False)
    is_available = db.Column(db.Boolean, nullable=False)
    counter = db.Column(db.Boolean, nullable=False)
    users = db.relationship(
        'User', secondary=rentas_user, back_populates='rentas')
    canchas = db.relationship(
        'Canchas', secondary=canchas_rentas, back_populates='rentas')

    def serialize(self):
        return {
            "id": self.id,
            "disponibility": self.disponibility,
            "is_available": self.is_available,
            "counter": self.counter
        }


class Sport(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Integer, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "type": self.type
        }
