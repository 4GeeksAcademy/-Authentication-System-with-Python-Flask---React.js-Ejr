from api.models.db import db
from datetime import datetime


class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    lawyer_id = db.Column(db.Integer, db.ForeignKey('lawyer.id'), nullable=False)
    lawyer = db.relationship('Lawyer', back_populates='question')
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', back_populates='question')
    question_comment = db.relationship("Question_comment", back_populates="question")
    text = db.Column(db.Text)
    data_create = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, lawyer_id, user_id, text):
        self.lawyer_id = lawyer_id
        self.user_id = user_id
        self.text = text
        self.data_create = datetime.utcnow()

    def serialize(self):
        return {
            "id" : self.id,
            'lawyer_id': self.lawyer_id,
            'user_id': self.user_id,
            'text': self.text, 
            "data_create":self.data_create
        }
