import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy


Base = declarative_base()

db = SQLAlchemy()

# class Admin(db.Model):
#     __tablename__ = 'admin'
#     id = db.Column(db.Integer, primary_key=True)
#     full_name = db.Column(db.String(250), unique=False, nullable=False)
#     email = db.Column(db.String(250), unique=True, nullable=False)
#     admin_nickname = db.Column(db.String(250), unique=False, nullable=False)
#     password = db.Column(db.String(250), unique=False, nullable=False)	
#     videogame_id = db.Column(db.Integer, db.ForeignKey('videogame.videogame_id'))
    # genre_id = db.Column(db.Integer, db.ForeignKey('genre.genre_id')) 
    # console_id = db.Column(db.Integer, db.ForeignKey('console.console_id'))

    # is_active = db.Column(db.Boolean(), unique=False)
    
    # def serialize(self):
    #     return {
    #         "id": self.id,
    #         "email": self.email,
    #     }
    
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(250), unique=False, nullable=False)
    email = db.Column(String(250), unique=True, nullable=False)
    user_name = db.Column(db.String(250), unique=False, nullable=False)
    password = db.Column(db.String(250), unique=True, nullable=False)
    city = db.Column(db.String(250), unique=False, nullable=False)
    country = db.Column(db.String(250), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "full_name": self.id,
            "email": self.email,
            "user_name": self.user_name,
            "city": self.city,
            "country": self.country,
            # do not serialize the password, its a security breach
        }
    
class Videogame(db.Model):
    __tablename__ = 'videogame'
    videogame_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), unique=False, nullable=False)
    pegi = db.Column(db.String(50), unique=False, nullable=False)
    year = db.Column(db.String(50), unique=False, nullable=False)
    # admin_id = Column(Integer, ForeignKey('admin.id'))
    # admin = relationship(Admin)

    def serialize(self):
        return {
            "name": self.name,
            "pegi": self.pegi,
            "year": self.year,
            # do not serialize the password, its a security breach
        }

     


# class Platform(Base):
#     __tablename__ = 'platform'
#     id = Column(Integer, primary_key=True)
#     company = Column(String(250))
#     console = Column(String(250))
#     country = Column(String(250))
#     games_id = Column(Integer, ForeignKey('games.id'))
#     games = relationship(Games)
#     user_id = Column(Integer, ForeignKey('user.id'))
#     user = relationship(User)

# class Gender(Base):
#     __tablename__ = 'gender'
#     id = Column(Integer, primary_key=True)
#     type = Column(String(250))
#     games_id = Column(Integer, ForeignKey('games.id'))
#     games = relationship(Games)
#     user_id = Column(Integer, ForeignKey('user.id'))
#     user = relationship(User)

    # def to_dict(self):
    #     return {}

