from api.models.db import db
from datetime import datetime


class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'), nullable=False)
    company = db.relationship('Company', back_populates='review')
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', back_populates='review')
    review_comment = db.relationship("Review_comment", back_populates="review")
    rating = db.Column(db.Integer(), nullable=False)
    text = db.Column(db.Text)
    data_create = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, company, user, rating, text):
        self.company_id = company_id
        self.user_id = self.user_id
        self.rating = rating
        self.text = text


    def serialize(self):
        return {
            "id" : self.id,
            'company_id': self.company_id,
            'user_id': self.user_id,
            'rating': self.rating,
            'text': self.text,
            "data_create":self.data_create
        }

