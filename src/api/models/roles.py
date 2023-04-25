from api.models.db import db


class Roles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(80), unique=False, nullable=False)

    def __init__(self, type):
        self.type = type

    def serialize(self):
        return {
            "id": self.id,
            "type": self.type
        }   
