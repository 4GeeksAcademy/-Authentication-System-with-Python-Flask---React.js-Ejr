from api.models.db import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    firstname = db.Column(db.String(20), nullable=False)
    lastname = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False, default=True)
    role_id = db.Column(db.Integer, db.ForeignKey("roles.id"))
    avatar = db.Column(db.String(250), nullable=True)

    roles = db.relationship("Roles")

    def __init__(self, username, firstname, lastname, email, password, role_id):
        self.username = username
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.password = password
        self.role_id = role_id

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "firstname": self.firstname, 
            "lastname": self.lastname, 
            "email": self.email,
            "role_id": self.role_id,
            "is_active": self.is_active,
            "avatar": self.avatar
        }
    
