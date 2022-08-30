import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

#falta backref en relationships y lazy=true
class Empresa(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), unique=True, nullable=False)
    cantidad_trabajadores = db.Column(db.Integer, unique=False, nullable=False)
    telefono = db.Column(db.Integer, unique=True, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    direccion = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "nombre_empresa": self.nombre_empresa,
            "encargado_empresa": self.encargado_empresa,
            "cantidad_trabajadores":self.cantidad_trabajadores,
            "telefono_empresa":self.telefono_empresa,
            "email_empresa":self.email_empresa,
            "direccion_empresa": self.direccion_empresa,
            # do not serialize the password, its a security breach
        }
    
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def update(self):
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), unique=False, nullable=False)
    apellido = db.Column(db.String(80), unique=False, nullable=False)
    telefono = db.Column(db.Integer, unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    direccion = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    empresa_id = db.Column(db.Integer, db.ForeignKey('empresa.id'), nullable=False)
    casino_id = db.Column(db.Integer, db.ForeignKey('casino.id'), nullable=False)
  

    def serialize(self):
        return {
            "id": self.id,
            "nombre_usuario": self.nombre_empresa,
            "apellido_usuario":self.apellido_trabajadores,
            "telefono_usuario":self.telefono_empresa,
            "email_usuario":self.email_empresa,
            "direccion_usuario": self.direccion_empresa
            # do not serialize the password, its a security breach
        }
    
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def update(self):
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()

class Casino(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), unique=False, nullable=False)
    encargado = db.Column(db.String(80), unique=False, nullable=False)
    telefono = db.Column(db.Integer, unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    direccion = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
  

    def serialize(self):
        return {
            "id": self.id,
            "nombre_casino": self.nombre,
            "apellido_casino":self.apellido,
            "telefono_casino":self.telefono,
            "email_casino":self.email,
            "direccion_casino": self.direccion
            # do not serialize the password, its a security breach
        }
    
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def update(self):
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()

class Pedidos(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    colacion_id = db.Column(db.Integer, db.ForeignKey('colacion.id'), unique = False, nullable = False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), unique = False, nullable = False)
    entregado = db.Column(db.Boolean, server_default=u'false')
    colacion = db.relationship('Colacion', backref='colacion', lazy=True)
    usuario = db.relationship('Usuario', backref='usuario', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "colacion_id": self.colacion_id,
            "usuario_id":self.usuario_id,
            "entregado":self.entregado,
            # do not serialize the password, its a security breach
        }
    
        def save(self):
            db.session.add(self)
            db.session.commit()
    
        def update(self):
            db.session.commit()
        
        def delete(self):
            db.session.delete(self)
            db.session.commit()

class Principal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(150), unique = True, nullable = False)
    descripcion_principal = db.Column(db.String(150), unique = True, nullable = False)

    def serialize(self):
        return {
            "id": self.id,
            "descripcion_principal": self.descripcion_principal,
            # do not serialize the password, its a security breach
        }

class Ensalada(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(150), unique = True, nullable = False)
    descripcion_ensalada = db.Column(db.String(150), unique = True, nullable = False)

    def serialize(self):
        return {
            "id": self.id,
            "escripcion_ensalada": self.escripcion_ensalada,
            # do not serialize the password, its a security breach
        }

class Postre(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(150), unique = True, nullable = False)
    descripcion_postre = db.Column(db.String(150), unique = True, nullable = False)

    def serialize(self):
        return {
            "id": self.id,
            "descripcion_postre": self.descripcion_postre,
            # do not serialize the password, its a security breach
        }

class Bebida(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(150), unique = True, nullable = False)
    descripcion_bebida = db.Column(db.String(150), unique = True, nullable = False)

    def serialize(self):
        return {
            "id": self.id,
            "descripcion_bebida": self.descripcion_bebida,
            # do not serialize the password, its a security breach
        }

class Menu(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    principal_id = db.Column(db.Integer, db.ForeignKey('principal.id'), unique = False, nullable = False)
    ensalada_id = db.Column(db.Integer, db.ForeignKey('ensalada.id'), unique = False, nullable = False)
    postre_id = db.Column(db.Integer, db.ForeignKey('postre.id'), unique = False, nullable = False)
    bebida_id = db.Column(db.Integer, db.ForeignKey('bebida.id'), unique = False, nullable = False)
    principal = db.relationship('Principal', backref='principal', lazy=True)
    ensalada = db.relationship('Ensalada', backref='ensalada', lazy=True)
    postre = db.relationship('Postre', backref='postre', lazy=True)
    bebida = db.relationship('Bebida', backref='bebida', lazy=True)

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
    menu_id = db.Column(db.Integer, db.ForeignKey('menu.id'), unique = False, nullable = False)
    menu = db.relationship('Menu', backref='menu', lazy=True)
    
    def serialize(self):
        return {
            "id": self.id,
            "pedidos_id": self.pedidos_id,
            # do not serialize the password, its a security breach
        }

class Reporte(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    contenido = db.Column(db.String(120), unique=False, nullable=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), unique = False, nullable = False)
    
    
    def serialize(self):
        return {
            "id": self.id,
            "contenido": self.contenido,
            "usuario_id": self.usuario_id,
            # do not serialize the password, its a security breach
        }


