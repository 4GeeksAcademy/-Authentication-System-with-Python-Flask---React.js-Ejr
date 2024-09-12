from flask_sqlalchemy import SQLAlchemy
import enum
from sqlalchemy import Enum

db = SQLAlchemy()

class UserType(enum.Enum):
    NORMAL = 'normal'
    PREMIUM = 'premium'

class TypeGame(enum.Enum):
    ACTION = 'action'
    ADVENTURE = 'adventure'
    RPG = 'rpg'
    STRATEGY = 'strategy'
    SPORTS = 'sports'
    SHOOTER = 'shooter'

class Platform(enum.Enum):
    STEAM = 'steam'
    PLAY = 'play station'
    XBOX = 'xbox'    
    SWITCH = 'nintendo switch'


class Schedule(enum.Enum):
    ANYTIME = 'anytime'
    MORNING = 'Morning'
    AFTERNOON = 'afternoon'
    EVENING = 'evening'

class Status(enum.Enum):
    ACTIVE = 'active'
    ENDED = 'ended'    

class Region(enum.Enum):
    NA = 'north america'
    SA = 'south america'
    
class Gender(enum.Enum):
    M = 'male'
    F = 'female'

class Duration(enum.Enum):
    UNK = 'unkwnon'
    ONE = 'one hour'
    TWO = 'two hours'
    THREE = 'three hours'

class Language(enum.Enum):
    ENGLISH = 'en'
    SPANISH = 'es'
    PORTUGUESE = 'pt'    

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_type = db.Column(Enum(UserType),nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
c
