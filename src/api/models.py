from flask_sqlalchemy import SQLAlchemy
#from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy import Column, ForeignKey, Integer, String

db = SQLAlchemy()

# user_game = Table(
#     "user_game",
#     Base.metadata,
#     Column("user_id", ForeignKey("user.id")),
#     Column("game_id", ForeignKey("game.id")),
# )

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    name = db.Column(db.String(30), unique=False, nullable=False)
    #favorite = db.Column(db.String(50), unique = False) #nullable = True)
    favorite_game_id = db.Column(db.Integer, ForeignKey('game.id')) #nullable=False)
    favorite_game = db.relationship('Game', foreign_keys=[favorite_game_id])
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            #"password": self.password,
            "name": self.name,
            #"favorite_game_id": self.favorite_game_id,
            "is_active": self.is_active
            # do not serialize the password, its a security breach
        }
    
class Favorite(db.Model):
    __tablename__ =    

class Game(db.Model):
    __tablename__ = "game"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique = False, nullable = False)
    category = db.Column(db.String(100), unique = False, nullable = False) 

    def __repr__(self):
        return f'<game {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "category": self.category
        }