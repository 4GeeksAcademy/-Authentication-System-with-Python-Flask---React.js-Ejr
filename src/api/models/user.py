from api.models.db import db
from datetime import datetime


class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(250), unique=True, nullable=False)
    user_type_id = db.Column(db.Integer, db.ForeignKey("user_type.id"))
    user_type = db.relationship("User_type", back_populates="user") 
    favs = db.relationship("Favorites", back_populates= "user")
    review = db.relationship("Review", back_populates= "user")
    review_comment= db.relationship("Review_comment", back_populates="user")
    lawyer_review = db.relationship("Lawyer_review", back_populates= "user")
    lawyer_review_comment= db.relationship("Lawyer_review_comment", back_populates="user")
    question = db.relationship("Question", back_populates= "user")
    question_comment= db.relationship("Question_comment", back_populates="user")
    data_create = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, user_name, password, name, last_name, email, user_type):
        self.user_name = user_name
        self.password = password
        self.name = name
        self.last_name = last_name
        self.email = email
        self.user_type = user_type

    def __repr__(self):
        return  '%r' % self.user_name #para las relaciones, en lugar de mostrar el id
