#from flask_sqlalchemy import flask_sqlalchemy
from flask_sqlalchemy import SQLAlchemy
from datetime import timezone 

db= SQLAlchemy()

class User(db.Model):

    id = db.Column(db.Integer,primary_key=True)
    first_name = db.Column(db.String(250), unique=False, nullable=False)
    last_name = db.Column(db.String(250), unique=False, nullable=False)
    email= db.Column(db.String(250), unique=True, nullable=True)
    password= db.Column(db.String(250), unique=False, nullable=False)
    is_older= db.Column(db.DateTime, nullable=False, unique=False)
    favorites: db.relationship('Favorite', lazy=True, backref='user')

    def __repr__(self):
        return '<User %r>' % self.email

    def serialize(self):
        return{
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "is_older": self.is_older,
            "favorites": list(map(lambda x: x.serialize(), self.favorites))
        }

class Favorite(db.Model):

    id= db.Column(db.Integer, primary_key=True)
    cockatail_name= db.Column(db.String(250), nullable=False)
    cocktail_img= db.Column(db.String(500), nullable=False )
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return '<Favorite %r>' % self.user_id

    def serialize(self):
        return{
        "id": self.id,
        "cocktail_name": self.cocktail_name,
        "cocktail_img": self.cocktail_img,
        "user_id": self.user_id
        }