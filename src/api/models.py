from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
import enum
db = SQLAlchemy()

class MyEnum(enum.Enum):
    user ='user'
    company = 'company'

class Cities (db.Model):
    __tablename__= 'cities'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=True, nullable=False)

    def __repr__(self):
        return "{}".format (self.name)

    def serialize(self): 
        return {
            "id": self.id,
            "name": self.name,
        }

class Status (db.Model):
    __tablename__= 'status'
    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String(30), unique=True, nullable=False)
    points_min=db.Column(db.Integer)
    points_max= db.Column(db.Integer)
    image=db.Column(db.String)

    def __repr__(self):
        return "Status: {}".format (self.name)

    def serialize(self): 
        return {
            "id": self.id,
            "name": self.name,
            "points_min": self.points_min,
            "points_max": self.points_max,
            "image": self.image
        }

class User(db.Model):
    __tablename__='user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    username =db.Column(db.String(30), unique=True, nullable=False)
    user_type = db.Column(db.Enum(MyEnum), nullable=False)
    photo = db.Column(db.String, unique=False, nullable=True)
    points = db.Column(db.Integer, default=0)
    status_name = db.Column(db.String, db.ForeignKey('status.name'),default="Amateur", nullable=False)
    status_relationship = db.relationship(Status)

    def __repr__(self):
        return "Usuario {}, con email {} y status {}".format (self.username, self.email, self.status_name)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username":self.username,
            "points": self.points,
            "status_name": self.status_name,
            "photo": self.photo
        }
    
class Treasures_Hide (db.Model):
    __tablename__= 'treasures_hide'
    id = db.Column(db.Integer, primary_key=True)
    name =db.Column(db.String(30), nullable=False)
    image =db.Column(db.String, nullable=False)
    location =db.Column(db.String, nullable=False)
    tips =db.Column(db.String,nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user_relationship = db.relationship(User)
    city_name=db.Column(db.String, db.ForeignKey('cities.name'))
    city_relationship = db.relationship(Cities)
    founded=db.Column(db.Boolean(), default=False, nullable=True)
    code=db.Column(db.String(20), nullable=True, unique=True)
    
    def __repr__(self):
        return "Tesoro escondido: {}".format (self.name)

    def serialize(self): 
        return {
            "id": self.id,
            "name": self.name,
            "image": self.image,
            "city_name": self.city_name,
            "user_id": self.user_id,
            "location": self.location,
            "tips": self.tips
        }

class Treasures_Founded(db.Model):
    __tablename__='treasures_founded'
    id = db.Column(db.Integer, primary_key=True)
    treasures_hide_id = db.Column(db.Integer, db.ForeignKey('treasures_hide.id'), nullable=False)
    treasures_hide_relationship = db.relationship(Treasures_Hide)
    user_found_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user_relationship = db.relationship(User)

    def __repr__(self):
        return "Tesoro encontrado de id {}".format (self.id)

    def serialize(self):
        treasure = self.treasures_hide_relationship
        return {
            "id": self.id,
            "user_found_id": self.user_found_id,
            "treasure_hide_id": self.treasures_hide_id,
            "name": treasure.name,
            "image": treasure.image,
            "city_name": treasure.city_name
        }
