from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    #cambiar nullable a false
    name = db.Column(db.String(120), unique=False, nullable=True)
    address = db.Column(db.String(250), unique=False)
    phone = db.Column(db.Integer, unique=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.address,
            "address": self.address,
            "phone": self.phone
            # do not serialize the password, its a security breach
        }

class TokenBlockedList(db.Model):
    __tablename__ = "tokenblockedlist"
    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String(1000), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)