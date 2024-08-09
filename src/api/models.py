from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column (db.String (20), unique=True, nullable=False)
    username = db.Column (db.String(50), unique=True, nullable=False)
    photo = db.Column (db.String(200))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    country = db.Column (db.String (20), unique=False, nullable=False)
   
    #Profile_programador i profile_empleador pendiente

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "username": self.username,
            "photo": self.photo,
            "country": self.country

            # do not serialize the password, its a security breach
        }
    
    