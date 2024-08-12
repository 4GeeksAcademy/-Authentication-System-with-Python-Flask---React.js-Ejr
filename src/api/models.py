from flask_sqlalchemy import SQLAlchemy
from enum import Enum

#falta tabla ofertas largas????


db = SQLAlchemy()

class User(db.Model):
    __tablename__="user"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column (db.String (20), unique=True, nullable=False)
    username = db.Column (db.String(50), unique=True, nullable=False)
    photo = db.Column (db.String(200))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    country = db.Column (db.String (20), unique=False, nullable=False)
    profile_programador = db.relationship ("Programador", backref="user", uselist=False)
    profile_empleador = db.relationship ("Empleador", backref="user", uselist=False)
   

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "username": self.username,
            "photo": self.photo,
            "country": self.country,
            "profile_programador": self.profile_programador.serialize()

            # do not serialize the password, its a security breach
        }

class Experience(Enum):
    JUNIOR: 'junior' 
    MID: 'mid-level' 
    SENIOR: 'senior'

class Programador(db.Model):
    __tablename__="programador"
    id = db.Column(db.Integer, primary_key=True)
    precio_hora = db.Column (db.Integer, nullable=False)
    tecnologias = db.Column (db.String(200), nullable=False)
    experiencia = db.Column(db.Enum(Experience), nullable=False)
    descripcion = db.Column(db.String(300))
    rating = db.Column (db.Float(2))
    proyectos = db.relationship ("Proyectos", backref="programador", lazy=True)
    user_id= db.Column (db.Integer, db.ForeignKey("user.id"), nullable=False)

    def __repr__(self):
        return f'<Programador {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "precio_hora": self.precio_hora,
            "tecnologias": self.tecnologias,
            "experiencia": self.experiencia,
            "descripcion": self.descripcion,
            "rating": self.rating,
            "proyectos": [proyectos.serialize()for proyectos in self.proyectos]

            # do not serialize the password, its a security breach
        }

class Empleador(db.Model):
    __tablename__ = "empleador"
    id = db.Column(db.Integer, primary_key=True)
    cif = db.Column (db.Integer, unique=True, nullable=False)
    metodo_pago = db.Column (db.String(100), nullable=False)
    descripcion = db.Column(db.String(300))
    user_id= db.Column (db.Integer, db.ForeignKey("user.id"), nullable=False)
    

    def __repr__(self):
        return f'<Empleador {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "cif": self.cif,
            "metodo_pago": self.metodo_pago,
            "descripcion": self.descripcion,

            # do not serialize the password, its a security breach
        }
    
class Postulados(db.Model):
    __tablename__="postulados"
    id = db.Column(db.Integer, primary_key=True)
    #id_oferta= db.Column(db.Integer)
    

    def __repr__(self):
        return f'<Postulados {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            #"id_oferta": self.id_oferta,

            # do not serialize the password, its a security breach
        }
    
class Ratings(db.Model):
    __tablename__="ratings"
    id = db.Column(db.Integer, primary_key=True)
    #from_id = db.Column (db.Integer, unique=True, nullable=False)
    #to_id = db.Column (db.Integer, unique=True, nullable=False)
    value = db.Column(db.Integer)
    

    def __repr__(self):
        return f'<Ratings {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            #from_id
            #to_id
            "value": self.value

            # do not serialize the password, its a security breach
        }
    

class Favoritos(db.Model):
    __tablename__="favoritos"
    id = db.Column(db.Integer, primary_key=True)
    #id_programadores
    #id_oferta
    #id_empleadores
    def __repr__(self):
        return f'<Favoritos {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            #resto de id

            # do not serialize the password, its a security breach
        }

class Ofertas(db.Model):
    __tablename__="ofertas"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column (db.String (100), unique=True, nullable=False)
    #id_empleador= db.Column (db.Integer)
    descripcion = db.Column (db.String(700), nullable=False)
    salario = db.Column (db.Integer, nullable=False)
    plazo = db.Column(db.String(100), nullable=False)
    modalidad = db.Column(db.String(80), nullable=False)
    experiencia_minima = db.Column (db.String (100))
    fecha_publicacion = db.Column(db.Date, nullable=False)
   
    #Profile_programador i profile_empleador pendiente

    def __repr__(self):
        return f'<Ofertas {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "descripcion": self.descripcion,
            "salario": self.salario,
            "plazo": self.plazo,
            "modalidad": self.modalidad,
            "experiencia_minima": self.experiencia_minima,
            "fecha_publicacion": self.fecha_publicacion,
            #empleador_id

            # do not serialize the password, its a security breach
        }
    

class Proyectos(db.Model):
    __tablename__="proyectos"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), unique=True, nullable=False)
    descripcion_corta = db.Column(db.String(150), nullable=False)
    git = db.Column(db.String(300))
    link = db.Column(db.String(500))
    tecnologias = db.Column (db.String(200), nullable=False)
    proyectos_id = db.Column (db.Integer, db.ForeignKey ("programador.id"))
    
    

    def __repr__(self):
        return f'<Programador {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "descripcion_corta": self.descripcion_corta,
            "git": self.git,
            "link": self.link,
            "tecnologias": self.tecnologias

            # do not serialize the password, its a security breach
        }