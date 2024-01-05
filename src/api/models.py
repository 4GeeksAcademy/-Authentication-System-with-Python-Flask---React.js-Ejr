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
    
class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300), unique=True, nullable=False)
    relese_date = db.Column(db.String(80), unique=False, nullable=False)
    poster = db.Column(db.String(3000), unique=False, nullable=False)
    description= db.Column(db.String(3000), unique=False, nullable=False)
    funny = db.Column(db.Integer, unique=False, nullable=False)
    happy = db.Column(db.Integer, unique=False, nullable=False)
    sunday = db.Column(db.Integer, unique=False, nullable=False)
    family = db.Column(db.Integer, unique=False, nullable=False)
    couple = db.Column(db.Integer, unique=False, nullable=False)
    epic = db.Column(db.Integer, unique=False, nullable=False)
    etc = db.Column(db.Integer, unique=False, nullable=False)
    
    

    def __repr__(self):
        return f'<Movie {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "relese_date": self.relese_date,
            "poster": self.poster,
            "funny": self.funny,
            "happy": self.happy,
            "sunday": self.sunday,
            "family": self.family,
            "couple": self.couple,
            "epic": self.epic,
            "etc": self.etc,

            

            # do not serialize the password, its a security breach
        }