from api.models.db import db
from datetime import datetime


class Lawyer(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship("User", back_populates="lawyer")
    avatar = db.Column(db.String(250), nullable=True)
    email = db.Column(db.String(250), unique=True, nullable=False)
    address = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    cp = db.Column(db.Integer(), nullable=False)
    col_number = db.Column(db.Integer(), unique=True, nullable=False)
    favs = db.relationship("Favorites", back_populates= "lawyer")
    question = db.relationship("Question", back_populates= "lawyer")
    lawyer_review = db.relationship("Lawyer_review", back_populates= "lawyer")
    data_create = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, user_name, password,name, last_name, email, address, city, cp, col_number):
        self.address = address
        self.city = city
        self.cp = cp
        self.col_number = col_number
        self.data_create = datetime.utcnow()