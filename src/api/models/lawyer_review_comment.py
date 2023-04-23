from api.models.db import db
from datetime import datetime


class Lawyer_review_comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_lawyer_review = db.Column(db.Integer, db.ForeignKey("lawyer_review.id"))
    lawyer_review = db.relationship("Lawyer_review", back_populates="lawyer_review_comment")
    id_user = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', back_populates='lawyer_review_comment')
    text = db.Column(db.Text)
    data_create = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, id_lawyer_review, id_user, text):
        self.id_lawyer_review = id_lawyer_review
        self.id_user = id_user
        self.text = text
        self.data_create = datetime.utcnow()

    def serialize(self):
        return{
            "id" : self.id,
            "id_lawyer_review": self.id_lawyer_review,
            "id_user": self.id_user,
            "text": self.text,
            "data_create": self.data_create
        }