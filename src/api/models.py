from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), unique=True, nullable=False)
    last_name = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)


    def __repr__(self):
        return f'<Patient {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,

            # do not serialize the password, its a security breach
        }
    
class Specialist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), unique=True, nullable=False)
    last_name = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_physio = db.Column(db.Boolean(), unique=False, nullable=False)
    is_nurse = db.Column(db.Boolean(), unique=False, nullable=False)
    picture = db.Column(db.String(120), unique=True, nullable=True)
    certificate = db.Column(db.String(120), unique=True, nullable=True)
    description = db.Column(db.String(250), unique=True, nullable=True)
    language = db.Column(db.String(120), unique=True, nullable=True)

    def __repr__(self):
        return f'<Specialist {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "is_physio": self.is_physio,
            "is_nurse": self.is_nurse,
            "picture": self.picture,
            "certificate": self.certificate,
            "description": self.description,
            "language": self.language
            # do not serialize the password, its a security breach
        }