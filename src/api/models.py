import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Empresa(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), unique=True, nullable=False)
    telefono = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    direccion = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    usuarios = db.relationship('Usuario', backref='empresa', lazy=True)
    casino_id = db.Column(db.Integer, db.ForeignKey('casino.id'))

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "telefono":self.telefono,
            "email":self.email,
            "direccion": self.direccion,
            # do not serialize the password, its a security breach
        }
    def serialize_con_usuarios(self):
        return{
             "id": self.id,
            "nombre": self.nombre,
            "telefono":self.telefono,
            "email":self.email,
            "direccion": self.direccion,
            "usuarios": self.lista_usuarios()
        }

    def lista_usuarios(self):
        return list(map(lambda usuario: usuario.serialize(), self.usuarios))
    
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def update(self):
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), unique=False, nullable=False)
    apellido = db.Column(db.String(80), unique=False, nullable=False)
    telefono = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    direccion = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    empresa_id = db.Column(db.Integer, db.ForeignKey('empresa.id'), nullable=False)
    reportes = db.relationship('Reporte_Usuario', backref='usuario', lazy= True)
  
    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellido":self.apellido,
            "telefono":self.telefono,
            "email":self.email,
            "direccion": self.direccion
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
     telefono = db.Column(db.String(80), unique=True, nullable=False)
     email = db.Column(db.String(120), unique=True, nullable=False)
     direccion = db.Column(db.String(80), unique=True, nullable=False)
     password = db.Column(db.String(80), unique=False, nullable=False)
     empresas = db.relationship('Empresa', backref='empresa', uselist=False)

     def serialize(self):
         return {
             "id": self.id,
             "nombre": self.nombre,
             "telefono":self.telefono,
             "email":self.email,
             "direccion": self.direccion,
             # do not serialize the password, its a security breach
         }
    
     def serialize_casino_empresa(self):
        return {
             "id": self.id,
             "nombre": self.nombre,
             "telefono":self.telefono,
             "email":self.email,
             "direccion": self.direccion,
             "empresa": self.get_empresas()
        }
    
     def get_empresas(self):
        return list(map(lambda empresa: empresa.serialize(), self.empresas))
    
    
     def save(self):
         db.session.add(self)
         db.session.commit()
    
     def update(self):
         db.session.commit()
    
     def delete(self):
         db.session.delete(self)
         db.session.commit()


class Semana(db.Model):
    __tablename__ = 'semanas'
    id = db.Column(db.Integer, primary_key=True)
    dias = db.relationship('Dia', backref="semana")
    lunes = db.Column(db.String(80), unique=True, nullable=True)
    martes = db.Column(db.String(80), unique=True, nullable=True)
    miercoles = db.Column(db.String(80), unique=True, nullable=True)
    jueves = db.Column(db.String(80), unique=True, nullable=True)
    viernes = db.Column(db.String(80), unique=True, nullable=True)

    def serialize(self):
        return {
            "lunes": self.lunes,
            "martes": self.martes,
            "miercoles":self.miercoles,
            "jueves":self.jueves,
            "viernes": self.viernes
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


class Dia(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    dia = db.Column(db.String(180), unique=True, nullable=False)
    semana_id= db.Column(db.Integer, db.ForeignKey('semanas.id'), nullable=False)
    menu = db.relationship('Menu', backref="dia", uselist=False)

class Menu(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ensalada = db.Column(db.String(180), unique=True, nullable=False)
    principal = db.Column(db.String(180), unique=True, nullable=False)
    prostre = db.Column(db.String(180), unique=True, nullable=False)
    bebida = db.Column(db.String(180), unique=True, nullable=False)
    dia_id = db.Column(db.Integer, db.ForeignKey('dia.id'), nullable="False")

class Reporte_Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    contenido = db.Column(db.String(120), unique=False, nullable=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), unique = False, nullable = False)
 
    def serialize(self):
        return {
        "id": self.id,
        "contenido": self.contenido,
        "usuario_id": self.usuario_id,

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

# class Pedidos(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     colacion_id = db.Column(db.Integer, db.ForeignKey('colacion.id'), unique = False, nullable = False)
#     usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), unique = False, nullable = False)
#     entregado = db.Column(db.Boolean, server_default=u'false')

#     def serialize(self):
#         return {
#             "id": self.id,
#             "colacion_id": self.colacion_id,
#             "usuario_id":self.usuario_id,
#             "entregado":self.entregado,
#             # do not serialize the password, its a security breach
#         }
    
#         def save(self):
#             db.session.add(self)
#             db.session.commit()
    
#         def update(self):
#             db.session.commit()
        
#         def delete(self):
#             db.session.delete(self)
#             db.session.commit()

# class Principal(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     nombre = db.Column(db.String(150), unique = True, nullable = False)
#     descripcion_principal = db.Column(db.String(150), unique = True, nullable = False)

#     def serialize(self):
#         return {
#             "id": self.id,
#             "descripcion_principal": self.descripcion_principal,
#             # do not serialize the password, its a security breach
#         }

# class Ensalada(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     nombre = db.Column(db.String(150), unique = True, nullable = False)
#     descripcion_ensalada = db.Column(db.String(150), unique = True, nullable = False)

#     def serialize(self):
#         return {
#             "id": self.id,
#             "escripcion_ensalada": self.escripcion_ensalada,
#             # do not serialize the password, its a security breach
#         }

# class Postre(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     nombre = db.Column(db.String(150), unique = True, nullable = False)
#     descripcion_postre = db.Column(db.String(150), unique = True, nullable = False)

#     def serialize(self):
#         return {
#             "id": self.id,
#             "descripcion_postre": self.descripcion_postre,
#             # do not serialize the password, its a security breach
#         }

# class Bebida(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     nombre = db.Column(db.String(150), unique = True, nullable = False)
#     descripcion_bebida = db.Column(db.String(150), unique = True, nullable = False)

#     def serialize(self):
#         return {
#             "id": self.id,
#             "descripcion_bebida": self.descripcion_bebida,
#             # do not serialize the password, its a security breach
#         }

# class Menu(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     principal_id = db.Column(db.Integer, db.ForeignKey('principal.id'), unique = False, nullable = False)
#     ensalada_id = db.Column(db.Integer, db.ForeignKey('ensalada.id'), unique = False, nullable = False)
#     postre_id = db.Column(db.Integer, db.ForeignKey('postre.id'), unique = False, nullable = False)
#     bebida_id = db.Column(db.Integer, db.ForeignKey('bebida.id'), unique = False, nullable = False)

#     def serialize(self):
#         return {
#             "id": self.id,
#             "principal_id": self.principal_id,
#             "ensalda_id": self.ensalada_id,
#             "postre_id": self.postre_id,
#             "bebida_id": self.bebida_id,
#             # do not serialize the password, its a security breach
#         }

# class Colacion(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     menu_id = db.Column(db.Integer, db.ForeignKey('menu.id'), unique = False, nullable = False)
#     menu = db.relationship('Menu', backref='menu', lazy=True)
    
#     def serialize(self):
#         return {
#             "id": self.id,
#             "pedidos_id": self.pedidos_id,
#             # do not serialize the password, its a security breach
#         }

# class Reporte(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     contenido = db.Column(db.String(120), unique=False, nullable=False)
#     usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), unique = False, nullable = False)
    
    
#     def serialize(self):
#         return {
#             "id": self.id,
#             "contenido": self.contenido,
#             "usuario_id": self.usuario_id,
#             # do not serialize the password, its a security breach
#         }


