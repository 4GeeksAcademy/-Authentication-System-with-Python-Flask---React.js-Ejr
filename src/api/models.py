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
    comments = db.relationship('Comments', back_populates='author')
    reports = db.relationship('Reports', back_populates='author', foreign_keys='Reports.author_id')
    reported_user = db.relationship('Reports', back_populates='reported_user', foreign_keys='Reports.reported_user_id')



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
    comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'), nullable=True)
    # score_id = db.Column(db.Integer, db.ForeignKey('score.id'), nullable=False)

    author = db.relationship('User', back_populates='itineraries')
    # score = db.relationship('Score', back_populates='itinerary')
    comments = db.relationship('Comments', back_populates='itinerary')
    # tags = db.relationship('Tags', secondary='Itinerary_Tags_Rel', back_populates='itineraries')

    def __repr__(self):
        return f'<Itinerary {self.title}>'
    
    def serialize_simple(self):
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
    

class Comments(db.Model):
    __tablename__= 'comments'

    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer,  db.ForeignKey('user.id'))
    text = db.Column(db.String(250), unique=False, nullable=False)
    reports_id = db.Column(db.Integer,  db.ForeignKey('reports.id'))

    reports = db.relationship('Reports', back_populates='comment', foreign_keys=[reports_id])
    author = db.relationship('User', back_populates='comments')
    itinerary = db.relationship('Itinerary', back_populates='comments')

    def __repr__(self):
        return f'<Comments {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "author_id": self.author_id,
            "text": self.text,
            "reports_id": self.reports_id,
            
        }

class Reports(db.Model):
    __tablename__= 'reports'

    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'))
    reported_user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    comment = db.relationship('Comments', back_populates='reports', foreign_keys=[comment_id])
    author = db.relationship('User', back_populates='reports', foreign_keys=[author_id])
    reported_user = db.relationship('User', back_populates='reported_user', foreign_keys=[reported_user_id])

    def __repr__(self):
        return f'<Report {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "author_id": self.author_id,
            "reported_user_id": self.reported_user_id,
            "comment_id": self.comment_id,
            
        }