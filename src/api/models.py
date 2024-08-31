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
    is_active = db.Column(db.Boolean(), unique=False, default=True)
    #favorite = db.Column(db.String(50), unique = False) #nullable = True)
    #favorite_game_id = db.Column(db.Integer, ForeignKey('game.id')) #nullable=False)
    favorite_game = db.relationship('Favorite', back_populates='user', cascade='all, delete-orphan')
    


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "is_active": self.is_active,
            "favorite_game": [favorite.serialize() for favorite in self.favorite_game]
 }
            # do not serialize the password, its a security breach
       


class Game(db.Model):
    __tablename__ = "game"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique = False, nullable = False)
    category = db.Column(db.String(100), unique = False, nullable = False) 
    favorited_by = db.relationship('Favorite', back_populates='game', cascade='all, delete-orphan')
    # add an images column and return it in on like 57 in the serialize
    def __repr__(self):
        return f'<game {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "category": self.category
            #"image": self.image
        }

    
class Favorite(db.Model):
    __tablename__ = "favorite"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    game_id = db.Column(db.Integer, ForeignKey('game.id'), nullable=False)
    user= db.relationship('User', back_populates='favorite_game')
    game= db.relationship('Game', back_populates='favorited_by')

    def __repr__(self):
        return f'<game {self.game}>'

    def serialize(self):
            return {
                "id": self.id,
                "user_id": self.user_id,
                "game_id": self.game_id,
        }

