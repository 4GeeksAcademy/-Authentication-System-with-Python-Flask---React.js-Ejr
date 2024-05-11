from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(2042), unique=False, nullable=False)
    name = db.Column(db.String, unique=False, nullable=False)
    age = db.Column(db.Integer)
    region = db.Column(db.String)
    timezone = db.Column(db.String)
    languages = db.Column(db.String)
    image = db.Column(db.LargeBinary)
    xbox = db.Column(db.String)
    psn = db.Column(db.String)
    steam = db.Column(db.String)
    google_play = db.Column(db.String)
    nintendo = db.Column(db.String)
    epic_id = db.Column(db.String)
    bio = db.Column(db.String)
    gender = db.Column(db.String)
    admin = db.Column(db.Boolean, unique=False, nullable=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "age": self.age,
            "region": self.region,
            "timezone": self.timezone,
            "languages": self.languages,
            "xbox": self.xbox,
            "psn": self.psn,
            "steam": self.steam,
            "google_play": self.google_play,
            "nintendo": self.nintendo,
            "epic_id": self.epic_id,
            "bio": self.bio,
            "gender": self.gender,
            "admin": self.admin
        }
    

class Room(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    date = db.Column(db.String)
    time = db.Column(db.String)
    room_name = db.Column(db.String(80), nullable=False)
    game_name = db.Column(db.Integer, nullable=False)
    platform = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    mood = db.Column(db.String, nullable=False)
    reviews = db.Column(db.Integer)
    in_room = db.Column(db.Integer, nullable=False)
    

    def __repr__(self):
        return f'<Room {self.id}>'
    
    def serialize(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "date": self.date,
            "time": self.time,
            "room_name": self.room_name,
            "platform": self.platform,
            "description": self.description,
            "mood": self.mood,
            "members": self.in_room
        }
    