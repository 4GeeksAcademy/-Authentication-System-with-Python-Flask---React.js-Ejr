from flask_sqlalchemy import SQLAlchemy
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Boolean



db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

class Restaurant(db.Model):
    __tablename__="Restaurant"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    platos = db.Column(db.String(80), unique=False, nullable=False)
    ubicaciones = db.Column(db.String(80), unique=False, nullable=False)

class TokenBlockedList(db.Model):
    __tablename__="token_blocked_list"
    id=db.Column(db.Integer, primary_key=True)
    jti=db.Column(db.String(40), nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }