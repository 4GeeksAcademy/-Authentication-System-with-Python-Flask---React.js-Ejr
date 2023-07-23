from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    first_name = db.Column(db.String(80), unique=False, nullable=True)
    last_name = db.Column(db.String(120), unique=False, nullable=True)
    recovery_question = db.Column(db.String(80), unique=False, nullable=True)
    recovery_answer = db.Column(db.String(80), unique=False, nullable=True)
    country = db.Column(db.String(120), unique=False, nullable=True)
    territory_state = db.Column(db.String(80), unique=False, nullable=True)
    dob = db.Column(db.String(80), unique=False, nullable=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=True)

    def __repr__(self):
        return f'<User {self.email}>'
    
    
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "recovery_question": self.recovery_question,
            "recovery_answer": self.recovery_answer,
            "country": self.country,
            "territory_state": self.territory_state,
            "dob": self.dob,
            # do not serialize the password, its a security breach
        }