import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy


Base = declarative_base()

db = SQLAlchemy()


class Admin(Base):
    __tablename__ = 'admin'
    id = Column(Integer, primary_key=True)
    full_name = Column(String(250))
    email = Column(String(250))
    # is_active = db.Column(db.Boolean(), unique=False)
    
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
        }
    
class Videogame(Base):
    __tablename__ = 'videogame'
    videogame_id = Column(Integer, primary_key=True)
    name = Column(String(250))
    pegi = Column(String(250))
    year = Column(String(50))
    # admin_id = Column(Integer, ForeignKey('admin.id'))
    # admin = relationship(Admin)


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    full_name = Column(String(250))
    email = Column(String(250))
    user_name = Column(String(250))
    city = Column(String(250))
    country = Column(String(250))
     


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

