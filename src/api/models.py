from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    profile_img=db.Column(db.Unicode)
    user_name = db.Column(db.String(40), unique=True, nullable=False)
    first_name = db.Column(db.String(40), unique=False, nullable=False)
    last_name = db.Column(db.String(40), unique=False, nullable=False)
    description = db.Column(db.String(500), unique=False, nullable=True )
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_grandparent = db.Column(db.Boolean(), unique=False, nullable=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            
            "id": self.id,
            "email": self.email,
            "profile_img":self.profile_img,
            "user_name":self.user_name,
            "first_name":self.first_name, 
            "last_name":self.last_name,
            "description":self.description
            
            # do not serialize the password, its a security breach
        }