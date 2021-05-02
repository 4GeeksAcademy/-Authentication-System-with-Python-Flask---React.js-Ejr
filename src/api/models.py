from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, ForeignKey, Integer, String, insert, delete
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class TiposUsuario(db.Model):
    __tablename__ = 'tiposUsuario'
    id = db.Column(db.Integer, primary_key=True)
    tipo = db.Column(db.String(120), unique=True, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "tipo": self.tipo,
            # do not serialize the password, its a security breach
        }

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    contrasena = db.Column(db.String(80), unique=False, nullable=False)
    id_tipo = db.Column(db.Integer, ForeignKey('tiposUsuario.id'), unique=False, nullable=False)
    activo = db.Column(db.Boolean(), unique=False, nullable=False)
    TiposUsuario = relationship(TiposUsuario)

    def __repr__(self):
        return '<User %r>' % self.email

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "tipo": self.tipo,
            "activo": self.activo,
            # do not serialize the password, its a security breach
        }

class Provincias(db.Model):
    __tablename__ = 'provincias'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return '<Provincias %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            # do not serialize the password, its a security breach
        }
    
class Cantones(db.Model):
    __tablename__ = 'cantones'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), unique=True, nullable=False)
    id_provincias = db.Column(db.Integer, ForeignKey('provincias.id'), nullable=False)
    #provincia = db.Column(db.Integer, ForeignKey('provincias.id'), nullable=True)
    provincias = relationship(Provincias)

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "id_provincias": self.provincia,
            # do not serialize the password, its a security breach
        }



class TiposServicio(db.Model):
    __tablename__ = 'tiposServicio'
    id = db.Column(db.Integer, primary_key=True)
    tipo = db.Column(db.String(120), unique=True, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "tipo": self.tipo,
            # do not serialize the password, its a security breach
        }

class Pyme(db.Model):
    __tablename__ = 'pyme'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), unique=True, nullable=False)
    id_provincia = db.Column(db.Integer, ForeignKey('provincias.id'), unique=False, nullable=False)
    id_canton = db.Column(db.Integer, ForeignKey('cantones.id'), unique=False, nullable=False)
    otrassenas = db.Column(db.String(80), unique=False, nullable=False)
    servicio = db.Column(db.String(80), unique=False, nullable=False)
    telefono = db.Column(db.String(80), unique=False, nullable=False)
    facebook = db.Column(db.String(80), unique=False, nullable=False)
    instragram = db.Column(db.String(80), unique=False, nullable=False)
    Provincias = relationship(Provincias)
    Cantones = relationship(Cantones)

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "id_provincia": self.id_provincia,
            "id_canton": self.id_canton,
            "otrassenas": self.otrassenas,
            "servicio": self.servicio,
            "telefono": self.telefono,
            "facebook": self.facebook,
            "instragram": self.instragram,
            # do not serialize the password, its a security breach
        }