from api.models.db import db

class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    cif = db.Column(db.Integer, unique=True, nullable=False)
    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(300), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    working_schedule = db.Column(db.String(120), nullable=False)
    user = db.relationship("User")

    def __init__(self, user_id, cif, name, description, address, working_schedule):
        self.user_id = user_id
        self.cif = cif
        self.name = name
        self.description = description
        self.address = address
        self.working_schedule = working_schedule

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "cif": self.cif,
            "name": self.name,
            "description": self.description,
            "address": self.address,
            "working_schedule": self.working_schedule,
        }

    