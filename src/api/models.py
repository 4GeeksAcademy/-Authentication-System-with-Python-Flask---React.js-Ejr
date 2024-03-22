from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    name = db.Column(db.String(60), nullable=True)
    age = db.Column(db.Integer, nullable=False)
    height = db.Column(db.String(20), nullable=False)
    weight = db.Column(db.Integer, nullable=True)
    activity_level = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "age": self.age,
            "height": self.height,
            "weight": self.weight,
            "activity_level": self.activity_level
            # do not serialize the password, its a security breach
        }