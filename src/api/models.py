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

class Programador(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    #proyectos 
    precio_hora = db.Column (db.Integer, unique=False)
    tecnologias = db.Column (db.String(200), unique=False)
    experiencia = db.Column(db.String(200), unique=False)
    descripcion = db.Column(db.String(300), unique=False)
    rating = db.Column (db.Float(2), unique=False)
    

    def __repr__(self):
        return f'<Programador {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "precio_hora": self.precio_hora,
            "tecnologias": self.tecnologias,
            "experiencia": self.experiencia,
            "descripcion": self.descripcion,
            "rating": self.rating

            # do not serialize the password, its a security breach
        }
