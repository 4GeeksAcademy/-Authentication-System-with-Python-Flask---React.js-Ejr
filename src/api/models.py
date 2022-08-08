import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy

#falta backref en relationships y lazy=true

db = SQLAlchemy()

class Direccion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre_calle = db.Column(db.String(120), unique=False, nullable=False)
    numero_calle = db.Column(db.Integer, unique=True, nullable=False)

    def __repr__(self):
        return f'<User {self.numero_calle},{self.nombre_calle}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre_calle": self.nombre_calle,
            "numero_calle": self.numero_calle,
        }

class Empresa(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre_empresa = db.Column(db.String(80), unique=True, nullable=False)
    cantidad_trabajadores = db.Column(db.Integer, unique=False, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "nombre_empresa": self.nombre_empresa,
            "cantidad_trabajadores":self.cantidad_trabajadores,
            # do not serialize the password, its a security breach
        }


class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre_usuario = db.Column(db.String(80), unique=False, nullable=False)
    apellido_usuario = db.Column(db.String(80), unique=False, nullable=False)
    telefono = db.Column(db.Integer, unique=True, nullable=False)
    skype = db.Column(db.String(80), unique=True, nullable=True)
    facebook = db.Column(db.String(80), unique=True, nullable=True)
    twitter = db.Column(db.String(80), unique=True, nullable=True)
    instagram = db.Column(db.String(80), unique=True, nullable=True)
    linkedin = db.Column(db.String(80), unique=True, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    empresa_id = db.Column(db.Integer, db.ForeignKey('empresa.id'), unique = False, nullable = False)
    direccion_id = db.Column(db.Integer, db.ForeignKey('direccion.id'), unique = False, nullable = False)
    empresa = db.relationship('Empresa')
    direccion = db.relationship('Direccion')
    

    def serialize(self):
        return {
            "id": self.id,
            "nombre_usuario": self.nombre_usuario,
            "apellido_usuario": self.apellido_usuario,
            "telefono": self.telefono,
            "skype": self.skype,
            "facebook": self.facebook,
            "twitter": self.twitter,
            "instagram": self.instagram,
            "linkedin": self.linkedin,
            "email": self.email,
            "empresa_id": self.empresa_id,
            "direccion_id": self.direccion_id,
            # do not serialize the password, its a security breach
        }


class Reporte(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    contenido = db.Column(db.String(120), unique=False, nullable=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), unique = False, nullable = False)
    usuario = db.relationship('Usuario')
    
    def serialize(self):
        return {
            "id": self.id,
            "contenido": self.contenido,
            "usuario_id": self.usuario_id,
            # do not serialize the password, its a security breach
        }


class Pedidos(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    colacion_id = db.Column(db.Integer, db.ForeignKey('colacion.id'), unique = False, nullable = False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), unique = False, nullable = False)
    entregado = db.Column(db.Boolean, server_default=u'false')
    colacion = db.relationship('Colacion')
    usuario = db.relationship('Usuario')

    def serialize(self):
        return {
            "id": self.id,
            "colacion_id": self.colacion_id,
            "usuario_id":self.usuario_id,
            "entregado":self.entregado,
            # do not serialize the password, its a security breach
        }



class Principal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    descripcion_principal = db.Column(db.String(150), unique = True, nullable = False)

    def serialize(self):
        return {
            "id": self.id,
            "descripcion_principal": self.descripcion_principal,
            # do not serialize the password, its a security breach
        }

class Ensalada(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    descripcion_ensalada = db.Column(db.String(150), unique = True, nullable = False)

    def serialize(self):
        return {
            "id": self.id,
            "escripcion_ensalada": self.escripcion_ensalada,
            # do not serialize the password, its a security breach
        }

class Postre(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    descripcion_postre = db.Column(db.String(150), unique = True, nullable = False)

    def serialize(self):
        return {
            "id": self.id,
            "descripcion_postre": self.descripcion_postre,
            # do not serialize the password, its a security breach
        }

class Bebida(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    descripcion_bebida = db.Column(db.String(150), unique = True, nullable = False)

    def serialize(self):
        return {
            "id": self.id,
            "descripcion_bebida": self.descripcion_bebida,
            # do not serialize the password, its a security breach
        }

class Casino(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    principal_id = db.Column(db.Integer, db.ForeignKey('principal.id'), unique = False, nullable = False)
    ensalada_id = db.Column(db.Integer, db.ForeignKey('ensalada.id'), unique = False, nullable = False)
    postre_id = db.Column(db.Integer, db.ForeignKey('postre.id'), unique = False, nullable = False)
    bebida_id = db.Column(db.Integer, db.ForeignKey('bebida.id'), unique = False, nullable = False)
    principal = db.relationship('Principal')
    ensalada = db.relationship('Ensalada')
    postre = db.relationship('Postre')
    bebida = db.relationship('Bebida')

    def serialize(self):
        return {
            "id": self.id,
            "principal_id": self.principal_id,
            "ensalda_id": self.ensalada_id,
            "postre_id": self.postre_id,
            "bebida_id": self.bebida_id,
            # do not serialize the password, its a security breach
        }

class Colacion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    casino_id = db.Column(db.Integer, db.ForeignKey('casino.id'), unique = False, nullable = False)
    casino = db.relationship('Casino')
    
    def serialize(self):
        return {
            "id": self.id,
            "pedidos_id": self.pedidos_id,
            # do not serialize the password, its a security breach
        }

class Menu(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre_casino = db.Column(db.String(80), unique=True, nullable=False)
    razon_social = db.Column(db.String(80), unique=True, nullable=False)
    rut = db.Column(db.Integer, unique=True, nullable=False)
    telefono = db.Column(db.Integer, unique=True,nullable=False)
    mail_casino = db.Column(db.String(80), unique=True, nullable=False)
    contraseña_casino = db.Column(db.String(80), unique=True, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "pedidos_id": self.pedidos_id,
            "nombre_casino": self.nombre_casino,
            "razon_social": self.razon_social,
            "rut": self.rut,
            "telefono": self.telefono,
            "mail_casino": self.mail_casino,
            "contraseña_casino": self.contraseña_casino,

            # do not serialize the password, its a security breach
        }