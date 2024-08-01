from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func

db = SQLAlchemy()

class User(db.Model):
    __tablename__= 'user'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    creation_date = db.Column(db.Date, default=func.current_date(), unique=False, nullable=False)

    itineraries = db.relationship('Itinerary', back_populates='author')
    # comments = db.relationship('Comments', back_populates='author')



    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username
            # do not serialize the password, its a security breach
        }
    
class Itinerary(db.Model):
    __tablename__ = 'itinerary'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(90), unique=False, nullable=False)
    description = db.Column(db.String(250), unique=False, nullable=False)
    duration = db.Column(db.Integer, unique=False, nullable=False)
    images = db.Column(db.JSON, unique=False, nullable=True)
    itinerary = db.Column(db.JSON, unique=False, nullable=False)
    creation_date = db.Column(db.Date, default=func.current_date(), unique=False, nullable=False,)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    # score_id = db.Column(db.Integer, db.ForeignKey('score.id'), nullable=False)

    author = db.relationship('User', back_populates='itineraries')
    # score = db.relationship('Score', back_populates='itinerary')
    # comments = db.relationship('Comments', back_populates='itinerary')
    # tags = db.relationship('Tags', secondary='Itinerary_Tags_Rel', back_populates='itineraries')

    def __repr__(self):
        return f'<Itinerary {self.title}>'
    
    def serialize_siemple(self):
        return {
            'id': self.id,
            'title': self.title
        }
    
    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'duration': self.duration,
            'images': self.images,
            'itinerary': self.itinerary,
            'creation_date': self.creation_date,
            'author': self.author.username,
            'comments': [comment.serialize() for comment in self.comments],
            'tags': [tag.serialize() for tag in self.tags]
        }