from api.models.db import db
from datetime import datetime


class Lawyer_review(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    lawyer_id = db.Column(db.Integer, db.ForeignKey('lawyer.id'), nullable=False)
    lawyer = db.relationship('Lawyer', back_populates='lawyer_review')
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', back_populates='lawyer_review')
    lawyer_review_comment = db.relationship("Lawyer_review_comment", back_populates="lawyer_review")
    rating = db.Column(db.Integer(), nullable=False)
    text = db.Column(db.Text)
    data_create = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, lawyer_id, user_id, rating, text):
        self.lawyer_id = lawyer_id
        self.user_id = user_id
        self.rating = rating
        self.text = text
        self.data_create = datetime.utcnow()

    def serialize(self):
        self.lawyer_id = lawyer_id
        self.user_id = user_id
        self.rating = rating
        self.text = text
        self.data_create = datetime.utcnow()