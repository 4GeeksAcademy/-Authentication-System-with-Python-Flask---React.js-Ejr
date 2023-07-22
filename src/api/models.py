from flask import Flask
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy import create_engine
# from eralchemy2 import render_er
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
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
    

class Favorites(db.Model):
    id = db.Column(db.Integer, ForeignKey(User.id), primary_key=True)
    # maybe db.Boolean(False)
    favorite = db.Column(db.Boolean, unique=False, nullable=True ,default= False)
    # foreingKey = User.db 
    # user_id = db.Column(db.Integer, ForeignKey(User.id),unique = True )
    def serialize(self):
        return {
            "id": self.id,
        }    
    