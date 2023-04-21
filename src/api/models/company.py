from api.models.db import db

class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    user = db.relationship("User")
    cif = db.Column(db.Integer(), nullable=False)
    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(300))
    address = db.Column(db.String(200), unique=True, nullable=False)
    working_schedule = db.Column(db.String(120), unique=True, nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False, default=True)

    def __init__(self, cif, name, description, address, working_schedule):
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
            "is_active": self.is_active
        }