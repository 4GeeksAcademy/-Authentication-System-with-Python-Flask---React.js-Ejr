from api.models.db import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Integer, unique=True, nullable=False)
    firstname = db.Column(db.Integer, unique=True, nullable=False)
    lastname = db.Column(db.Integer, unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False, default=True)
    role_id = db.Column(db.Integer, db.ForeignKey("roles.id"))
    roles = db.relationship("Roles")

    def __init__(self, email, password, is_active):
        self.email = email
        self.password = password
        self.is_active = True

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "firstname": self.firstname, 
            "lastname": self.lastname, 
            "email": self.email,
            "role_id": self.role_id
        }
