import os
import sys
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, ForeignKey, Integer, String
#from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
#from sqlalchemy import create_engine

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    type_user = db.Column(db.String(45), nullable=False)
    username = db.Column(db.String(45), unique=True, nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(10), nullable=False)

class Tipo_Cobro(db.Model):
    __tablename__ = 'tipo_cobro'
    id = db.Column(db.Integer,primary_key=True, nullable=False)
    name_tipocobro = db.Column(db.String(45), nullable=False)

class Category(db.Model):
    __tablename__ = 'category'
    id = db.Column(db.Integer,primary_key=True, nullable=False)
    name_category = db.Column(db.String(50), nullable=False)

class Subcategory(db.Model):
    __tablename__ = 'subcategory'
    id = db.Column(db.Integer,primary_key=True, nullable=False)
    id_category = db.Column(db.Integer, ForeignKey('category.id'), nullable=False)
    name_subcategory = db.Column(db.String(50), nullable=False)
    category = relationship(Category)
    
class Servicio_registrados(db.Model):
    __tablename__ = 'servicio_registrados'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    id_tipo_cobro = db.Column(db.Integer, ForeignKey('tipo_cobro.id'), nullable=False)
    valor = db.Column(db.Integer, nullable=False)
    name_servicio = db.Column(db.String(50), nullable=False)
    descrip_servicio = db.Column(db.String(250), nullable=False)
    anos_experiencia = db.Column(db.Integer, nullable=False)
    merit = db.Column(db.String(50), nullable=False)
    tipo_membresia = db.Column(db.String(50), nullable=False)
    tipo_cobro = relationship(Tipo_Cobro)

class Relacion_registrados_subcategory(db.Model):
    __tablename__ = 'relacion_registrados_subcategory'
    id_servicios_registrados = db.Column(db.Integer, ForeignKey('servicio_registrados.id'),primary_key=True)
    id_subcategory = db.Column(db.Integer, ForeignKey('subcategory.id'), primary_key=True)
    subcategory = relationship(Subcategory)
    servicio_registrados = relationship(Servicio_registrados)


class User_Sericios_Registrados(db.Model):
    __tablename__ = 'user_Sericios_Registrados'
    id_users = db.Column(db.Integer, ForeignKey('user.id'),primary_key=True)
    id_servicio_registrados = db.Column(db.Integer, ForeignKey('servicio_registrados.id'), primary_key=True)
    user = relationship(User)
    servicio_registrados = relationship(Servicio_registrados)

    
class Sericios_prestados(db.Model):
    __tablename__ = 'sericios_prestados'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    id_users_oferente = db.Column(db.Integer, ForeignKey('user.id'),primary_key=True)
    id_users_compra = db.Column(db.Integer, ForeignKey('user.id'),primary_key=True)
    id_subcategory = db.Column(db.Integer, ForeignKey('subcategory.id'),primary_key=True)
    create_time = db.Column(db.Integer, nullable=False)
    evaluacion = db.Column(db.Integer)
    cantidad_servicio = db.Column(db.Integer,nullable=False)
    total_valor_servicio = db.Column(db.Integer,nullable=False)
    fecha_inicio = db.Column(db.Integer, nullable=False)
    fecha_termino = db.Column(db.Integer, nullable=False)
    user = relationship(User)
    subcategory = relationship(Subcategory)

class Favoritos(db.Model):
    __tablename__ = 'favoritos'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    id_users = db.Column(db.Integer, ForeignKey('user.id'))
    id_servicio_registrados = db.Column(db.Integer, ForeignKey('servicio_registrados.id'))
    user = relationship(User)
    servicio_registrados = relationship(Servicio_registrados)


    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "type_user": self.type_user,
            "username": self.username,

            "name_tipocobro": self.name_tipocobro,

            "name_category": self.name_category,

            "name_subcategory": self.name_subcategory,

            "id_tipo_cobro": self.id_tipo_cobro,
            "valor": self.valor,
            "name_servicio": self.name_servicio,
            "descrip_servicio": self.descrip_servicio,
            "anos_experiencia": self.anos_experiencia,
            "merit": self.merit,
            "tipo_membresia": self.tipo_membresia,

            "id_Servicios_registrados": self.id_Servicios_registrados,
            "id_subcategory": self.id_subcategory,

            "id_users": self.id_users,
            "create_time": self.create_time,
            "evaluacion": self.evaluacion,
            "cantidad_servicio": self.cantidad_servicio,
            "total_valor_servicio": self.total_valor_servicio,
            "fecha_inicio": self.fecha_inicio,
            "fecha_termino": self.fecha_termino,

            # do not serialize the password, its a security breach
        }