from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(250), unique=False, nullable=False)
    nombre = db.Column(db.String(120), unique=False, nullable=False)
    respuesta_de_seguridad = db.Column(db.String(120), unique=False, nullable=False)
    mi_pasaporte = db.relationship('Mi_pasaporte', lazy=True)

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "nombre": self.nombre
            # do not serialize the password, its a security breach
        }

class Playa(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(250), unique=True, nullable=False)
    descripcion = db.Column(db.String(300), unique=False, nullable=False)
    provincia = db.Column(db.String(300), unique=False, nullable=False)
    contacto = db.Column(db.String(300), unique=False, nullable=False)
    imagen = db.Column(db.String(1000), unique=False, nullable=False)

    def __repr__(self):
        return '<Playa %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "provincia": self.provincia,
            "contacto": self.contacto
        }

class Montana(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(250), unique=True, nullable=False)
    descripcion = db.Column(db.String(300), unique=False, nullable=False)
    provincia = db.Column(db.String(300), unique=False, nullable=False)
    contacto = db.Column(db.String(300), unique=False, nullable=False)
    imagen = db.Column(db.String(1000), unique=False, nullable=False)

    def __repr__(self):
        return '<Montana %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "provincia": self.provincia,
            "contacto": self.contacto
        }

class Mi_pasaporte(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    nombre = db.Column(db.String(250), unique=False, nullable=False)
    #tipo playa o montaña
    tipo = db.Column(db.String(250), nullable=False)

    def __repr__(self):
        return '<Mi_pasaporte %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "nombre": self.nombre,
            "tipo": self.nombre
        }
