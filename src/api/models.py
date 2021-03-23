<<<<<<< HEAD
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import cast, func, Float, Integer
from decimal import Decimal
=======
import os
import sys
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

>>>>>>> acc3bf9b62b8cca87cfe19564fe519793114cbfa
db = SQLAlchemy()

class Tipo_User(db.Model):
    __tablename__ = 'tipo_user'
    id = db.Column(db.Integer,primary_key=True)
    name_tipo_user = db.Column(db.String(100), nullable=False)
    users = db.relationship('User', backref="tipo_user", lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "name_tipo_user": self.name_tipo_user
        }

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
<<<<<<< HEAD
    typeUser = db.Column(db.String(45), nullable=True)
    userName = db.Column(db.String(100), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    passWord = db.Column(db.String(100), nullable=False)
    isActive = db.Column(db.Boolean(), unique=False, nullable=False)
   
    def __repr__(self):
        return "<User %r>" % self.userName
=======
    id_tipo_user = db.Column(db.Integer, ForeignKey('tipo_user.id'), nullable=False)
    username = db.Column(db.String(45), unique=True, nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(10), nullable=False)
    sericios_prestados = db.relationship('Sericios_prestados', backref="user", lazy=True)
    favoritos = db.relationship('Favoritos', backref="user", lazy=True)
>>>>>>> acc3bf9b62b8cca87cfe19564fe519793114cbfa
    
    def serialize(self):
        return {
            "id": self.id,
<<<<<<< HEAD
            "typeUser": self.typeUser,
            "userName": self.userName,
            "email": self.email,
            "passWord": self.passWord,
            "isActive": self.isActive,
        }

    def add_user(_typeUser, _userName, _email, _passWord, _isActive):
        new_user = User(typeUser=_typeUser, userName=_userName, email=_email, passWord=_passWord, isActive=_isActive)
        db.session.add(new_user)
        db.session.commit()
    
    def get_user(self, _id):
        return [User.serialize(User.query.filter_by(id=_id).first())]
    
    def get_all_users(self):
        return [User.serialize(user) for user in User.query.all()]
    
    def update_user(self, _id, _typeUser, _userName, _email, _passWord, _isActive):
        user_to_update = User.query.filter_by(id=_id).first()
        user_to_update.typeUser = _typeUser if _typeUser is not None else user_to_update.typeUser
        user_to_update.userName = _userName if _userName is not None else user_to_update.userName
        user_to_update.email = _email if _email is not None else user_to_update.email        
        user_to_update.passWord = _passWord if _passWord is not None else user_to_update.passWord
        user_to_update.isActive = _isActive if _isActive is not None else user_to_update.isActive
        db.session.commit()

    def delete_user(_username):
        User.query.filter_by(userName=_username).delete()
        db.session.commit()

class Category(db.Model):
    __tablename__ = 'category'
    id = db.Column(db.Integer, primary_key=True)
    name_category = db.Column(db.String(50), nullable=True)

   def __repr__(self):
        return "<Category %r>" % self.name

class Subcategory(db.Model):
    __tablename__ = 'subcategory'
    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name_subcategory = db.Column(db.Integer, nullable=False)
    user= db.relationship('User',         
        backref=db.backref('subcategory', lazy=True, uselist=False))     


    def __repr__(self):
        return "<Subcategory %r>" % self.name
=======
            "id_tipo_user": self.tipo_user.id,
            "name_tipo_user": self.tipo_user.name_tipo_user,
            "username": self.username,
            "email": self.email
        }

class Tipo_Cobro(db.Model):
    __tablename__ = 'tipo_cobro'
    id = db.Column(db.Integer, primary_key=True)
    name_tipocobro = db.Column(db.String(45), nullable=False)
>>>>>>> acc3bf9b62b8cca87cfe19564fe519793114cbfa

    def serialize(self):
        return {
            "id": self.id,
<<<<<<< HEAD
            "category_id": self.category_id,
            "user_id": self.user_id,
           }
    
   

class Servicios_prestados(Base):
    __tablename__ = 'servicios_prestadps'
    id = Column(Integer, primary_key=True)
    user_id = db.Column(db.String(100), nullable=True, unique=True)
    movie_id =  db.Column(db.String(50), nullable=False)
    comment_text= Column(String(250), nullable=False)

    def __repr__(self):
        return "<Comment %r>" % self.name

class Servicios_registrados(db.Model):
    #__tablename__ = 'rate'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    movie_id =  db.Column(db.String(10), db.ForeignKey('movie.id'),nullable=False)
    rate = db.Column(db.Float, nullable=False)
    year = db.Column(db.Integer, nullable=False)
    poster =  db.Column(db.String(250), nullable=False)
    title =  db.Column(db.String(250), nullable=False)
    user= db.relationship('User',
        backref=db.backref('rate', lazy=True))
    movie= db.relationship('Movie',
        backref=db.backref('rate', lazy=True))
    
    def __repr__(self):
        return "<Rate %r>" % self.rate
    
    def serialize(self):
        return {
            "Id": self.id,
            "user_id": self.user_id,
            "movie_id": self.movie_id,
            "rate": self.rate,
            "Year": self.year,
            "Poster": self.poster,
            "Title": self.title,
        }
    
    def rate_movie(self,_idUser, _idMovie, _rate, _year, _poster, _title):
        new_rate = Rate(user_id=_idUser, movie_id=_idMovie, rate=_rate, year=_year, poster=_poster, title=_title)
        db.session.add(new_rate)
        db.session.commit()

    def movies_rates_avgs():
        db.session.commit()
        #print (db.session.query(Rate.movie_id, cast(func.avg(Rate.rate), Float).\
        #            label('rate_avg')).\
        #            group_by(Rate.movie_id).all())
        return [Rate.serialize(movierateavg) for movierateavg in db.session.query(cast(0, Integer).label('id'), cast(0, Integer).label('user_id'), Rate.movie_id, cast(func.round(func.avg(Rate.rate), 1), Float).label('rate'), Rate.year, Rate.poster, Rate.title\
                     ).\
                     group_by(Rate.movie_id, Rate.year, Rate.poster, Rate.title).all()]
    
    def get_user_rates(_id):
        db.session.commit()
        return [Rate.serialize(movierate) for movierate in db.session.query(Rate.id, Rate.user_id, Rate.movie_id, cast(Rate.rate, Float).label('rate'), Rate.year, Rate.poster, Rate.title\
                     ).filter_by(user_id=_id).all()]
    


class MovieRateAVG(db.Model):
    movie_id = db.Column(db.String(10), primary_key=True)
    rate_avg = db.Column(db.Float, nullable=False)

    def serialize(self):
        return {
            "movie_id": self.movie_id,
            "rate_avg": self.rate_avg,
        }

class MovieRate(db.Model):
    movie_id = db.Column(db.String(10), primary_key=True)
    rate = db.Column(db.Float, nullable=False)

    def serialize(self):
        return {
            "movie_id": self.movie_id,
            "rate": self.rate,
        }

  
        
# ## Draw from SQLAlchemy base
# render_er(Base, 'diagram.png')

class favoritos(Base):
    __tablename__ = 'favoritos'
    id = Column(Integer, primary_key=True)
    user_id = db.Column(db.String(100), nullable=True, unique=True)
    movie_id =  db.Column(db.String(50), nullable=False)
    comment_text= Column(String(250), nullable=False)

    def __repr__(self):
        return "<Comment %r>" % self.name
 
 # def add_favorite(self, _movie_id, _user_id, year, poster, title):
    #     new_favorite = Favorites(movie_id=_movie_id, user_id=_user_id, year=year, poster=poster, title=title)
    #     db.session.add(new_favorite)
    #     db.session.commit()

    # def get_favorites_by_user(self, idUser):
    #     db.session.commit()
    #     favorites = Favorites.query.filter_by(user_id = idUser).all()
    #     return list(map(lambda favorite: favorite.serialize(), favorites))

    # def delete_favorite(_id):
    #     Favorites.query.filter_by(id=_id).delete()
    #     db.session.commit()
=======
            "name_tipocobro": self.name_tipocobro
        }

class Category(db.Model):
    __tablename__ = 'category'
    id = db.Column(db.Integer,primary_key=True)
    name_category = db.Column(db.String(50), nullable=False)
    subcategory = db.relationship('Subcategory', backref="category", lazy=True)
    
    def serialize(self):
        return {
            "id": self.id,
            "name_category": self.name_category
        }

class Subcategory(db.Model):
    __tablename__ = 'subcategory'
    id = db.Column(db.Integer,primary_key=True, nullable=False)
    id_category = db.Column(db.Integer, ForeignKey('category.id'), nullable=False)
    name_subcategory = db.Column(db.String(100), nullable=False)
    servicio_registrados = db.relationship('Servicio_registrados', secondary="Relacion_registrados_subcategory", backref="Subcategory")
    sericios_prestados = db.relationship('Sericios_prestados', backref="Subcategory", lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "id_category": self.category.id,
            "name_category": self.category.name_category,
            "name_subcategory": self.name_subcategory
        }
    
class Servicio_registrados(db.Model):
    __tablename__ = 'servicio_registrados'
    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    id_tipo_cobro = db.Column(db.Integer, ForeignKey('tipo_cobro.id'), nullable=False)
    id_sericios_prestados = db.Column(db.Integer, ForeignKey('sericios_prestados.id'), nullable=False)
    valor = db.Column(db.Integer, nullable=False)
    name_servicio = db.Column(db.String(50), nullable=False)
    descrip_servicio = db.Column(db.String(250), nullable=False)
    duracion = db.Column(db.String(30), nullable=False)
    revision = db.Column(db.String(30), nullable=False)
    proceso = db.Column(db.String(250), nullable=True)
    experiencia = db.Column(db.Integer, nullable=False)
    portafolio = db.Column(db.Integer, nullable=True)
    merit = db.Column(db.String(250), nullable=True)
    tipo_membresia = db.Column(db.String(50), nullable=False)
    subcategory = db.relationship('Subcategory', secondary="Relacion_registrados_subcategory", backref="Servicio_registrados")
    tipo_cobro = db.relationship('Tipo_cobro', backref="servicio_registrados", lazy=True, uselist=False)
    favoritos = db.relationship('Favoritos', backref="servicio_registrados", lazy=True)
    sericios_prestados = db.relationship('Sericios_prestados', backref="servicio_registrados", lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "username": self.user.username,
            "name_tipocobro": self.tipo_cobro.name_tipocobro,
            "evaluacion": self.sericios_prestados.evaluacion,
            "id_subcategory": self.subcategory.id,
            "subcategory": self.subcategory.name_subcategory,
            "valor": self.valor,
            "name_servicio": self.name_servicio,
            "descrip_servicio": self.descrip_servicio,
            "duracion":self.duracion,
            "revision":self.revision,
            "proceso":self.proceso,
            "experiencia": self.experiencia,
            "portafolio": self.portafolio,
            "merit":self.merit,
            "tipo_membresia": self.tipo_membresia
        }

class Relacion_registrados_subcategory(db.Model):
    __tablename__ = 'relacion_registrados_subcategory'
    id_servicios_registrados = db.Column(db.Integer, ForeignKey('servicio_registrados.id'),primary_key=True)
    id_subcategory = db.Column(db.Integer, ForeignKey('subcategory.id'), primary_key=True)
    
class Sericios_prestados(db.Model):
    __tablename__ = 'sericios_prestados'
    id = db.Column(db.Integer, primary_key=True)
    id_users_oferente = db.Column(db.Integer, ForeignKey('user.id'))
    id_users_compra = db.Column(db.Integer, ForeignKey('user.id'))
    id_subcategory = db.Column(db.Integer, ForeignKey('subcategory.id'))
    evaluacion = db.Column(db.Integer, nullable=True)
    cantidad_servicio = db.Column(db.Integer,nullable=False)
    total_valor_servicio = db.Column(db.Integer,nullable=False)
    fecha_inicio = db.Column(db.DateTime, nullable=False)
    fecha_termino = db.Column(db.DateTime, nullable=False)


    def serialize(self):
        return {
            "id": self.id,
            "id_users_oferente": self.user.id,
            "id_users_compra": self.user.id,
            "id_subcategory": self.subcategory.id,
            "name_servicio": self.servicio_registrados.name_servicio,
            "evaluacion": self.evaluacion,
            "cantidad_servicio": self.cantidad_servicio,
            "total_valor_servicio":self.total_valor_servicio,
            "fecha_inicio": self.fecha_inicio,
            "fecha_termino": self.fecha_termino
        }

class Favoritos(db.Model):
    __tablename__ = 'favoritos'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    id_users = db.Column(db.Integer, ForeignKey('user.id'))
    id_servicio_registrados = db.Column(db.Integer, ForeignKey('servicio_registrados.id'))
    #es correcto?
    #name_servicio = db.Column(db.Integer, ForeignKey('servicio_registrados.id'))

    def serialize(self):
        return {
            "id": self.id,
            "id_users": self.user.id,
            "id_servicio_registrados": self.servicio_registrados.id,
            "name_servicio": self.servicio_registrados.name_servicio
        }


    def __repr__(self):
        return "<Category %r>" % self.name
>>>>>>> acc3bf9b62b8cca87cfe19564fe519793114cbfa
