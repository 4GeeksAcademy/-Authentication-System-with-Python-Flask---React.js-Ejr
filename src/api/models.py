#from flask_sqlalchemy import flask_sqlalchemy
from flask_sqlalchemy import SQLAlchemy
from datetime import timezone 

db= SQLAlchemy()

class User(db.Model):

    id = db.Column(db.Integer,primary_key=True)
    first_name= db.Column(db.String(200), nullable=False)
    last_name= db.Column(db.String(200), nullable=False)
    email= db.Column(db.String(250), unique=True, nullable=True)
    password= db.Column(db.String(250), unique=False, nullable=False)
    birthday= db.Column(db.String, nullable=False)
    favorites= db.relationship('Favorite', lazy=True, backref='user')

    def __repr__(self):
        return '<User %r>' % self.email

    def serialize(self):
        return{
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "password": self.password,
            "birthday": self.birthday,
            "favorites": list(map(lambda u: u.serialize(), self.favorites))
        }

class Favorite(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    cocktail_id=db.Column(db.Integer, nullable=False, unique=False)
    cocktail_name= db.Column(db.String(250), nullable=True, unique=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return '<Favorite %r>' % self.user_id

    def serialize(self):
        return{
        "id": self.id,
        "cocktail_id": self.cocktail_id,
        "cocktail_name": self.cocktail_name,
        "user_id": self.user_id
        }