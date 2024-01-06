import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy import create_engine
from eralchemy2 import render_er

Base = declarative_base()

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    full_name = Column(String(250))
    email = Column(String(250))
    user_name = Column(String(250))
    city = Column(String(250))
    country = Column(String(250))

class Games(Base):
    __tablename__ = 'games'
    id = Column(Integer, primary_key=True)
    title = Column(String(250))
    pegi = Column(Integer)
    argument = Column(String(250))
    user_id = Column(Integer, ForeignKey('user.id'))
    user = relationship(User)
     
class Platform(Base):
    __tablename__ = 'platform'
    id = Column(Integer, primary_key=True)
    company = Column(String(250))
    console = Column(String(250))
    country = Column(String(250))
    games_id = Column(Integer, ForeignKey('games.id'))
    games = relationship(Games)
    user_id = Column(Integer, ForeignKey('user.id'))
    user = relationship(User)

class Gender(Base):
    __tablename__ = 'gender'
    id = Column(Integer, primary_key=True)
    type = Column(String(250))
    games_id = Column(Integer, ForeignKey('games.id'))
    games = relationship(Games)
    user_id = Column(Integer, ForeignKey('user.id'))
    user = relationship(User)



    def to_dict(self):
        return {}

## Draw from SQLAlchemy base
try:
    result = render_er(Base, 'diagram.png')
    print("Success! Check the diagram.png file")
except Exception as e:
    print("There was a problem genering the diagram")
    raise e