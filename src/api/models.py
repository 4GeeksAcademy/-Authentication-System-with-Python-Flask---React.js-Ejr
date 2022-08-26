from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'{self.email}'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Inmueble(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    operacion = db.Column(db.String(80), unique=False, nullable=False)
    precio = db.Column(db.Integer, unique=False, nullable=False)
    comunidad = db.Column(db.String(80), unique=False, nullable=False)
    provincia = db.Column(db.String(80), unique=False, nullable=False)
    municipio = db.Column(db.String(80), unique=False, nullable=False)
    direccion = db.Column(db.String(80), unique=False, nullable=False)
    latitud = db.Column(db.String(80), unique=False, nullable=False)
    longitud = db.Column(db.String(80), unique=False, nullable=False)
    imgurl = db.Column(db.String(120), unique=False, nullable=False)

    def __repr__(self):
        return f'{self.email}'

    def serialize(self):
        return {
            "id": self.id,
            "operacion": self.operacion,
            "precio": self.precio,
            "comunidad": self.comunidad,
            "provincia": self.provincia,
            "municipio": self.municipio,
            "direccion": self.direccion,
            "latitud": self.latitud,
            "longitud": self.longitud,
            "imgurl": self.imgurl,
            # do not serialize the password, its a security breach
        }
