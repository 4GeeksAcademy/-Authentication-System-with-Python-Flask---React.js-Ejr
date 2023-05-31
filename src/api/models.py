from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    name = db.Column(db.String(50), unique=False, nullable=False)
    address = db.Column(db.String(50), unique=False, nullable=False)
    phone = db.Column(db.String(50), unique=True, nullable=False)
    city = db.Column(db.String(120), unique=False, nullable=False)
    country = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name" : self.name,
            "address" : self.address,
            "phone" : self.phone,
            "city" : self.city,
            "country" : self.country
            # do not serialize the password, its a security breach
        }

class TokenBlockedList(db.Model):
    __tablename__ = "token_blocked_list"
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(50), nullable = False)