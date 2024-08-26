from flask_sqlalchemy import SQLAlchemy
from enum import Enum


db = SQLAlchemy()

class Postulados(db.Model):
    __tablename__="postulados"
    user_id= db.Column (db.Integer, db.ForeignKey("user.id"), primary_key=True)
    oferta_id = db.Column (db.Integer, db.ForeignKey("ofertas.id"), primary_key=True)
    

    def __repr__(self):
        return f'<Postulados {self.user_id}>'

    def serialize(self):
        return {
            "user_id": self.user_id,
            "oferta_id": self.oferta_id

        }
    
class Ratings(db.Model):
    __tablename__="ratings"
    id = db.Column(db.Integer, primary_key=True)
    from_id = db.Column (db.Integer, db.ForeignKey ("empleador.id"), primary_key=True)
    to_id = db.Column (db.Integer, db.ForeignKey ("programador.id"), primary_key=True)
    value = db.Column(db.Integer)
    

    def __repr__(self):
        return f'<Ratings {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "from_id": self.from_id,
            "to_id": self.to_id,
            "value": self.value
        }
    
class Favoritos(db.Model):
    __tablename__="favoritos"
    programador_id = db.Column (db.Integer, db.ForeignKey ("programador.id"), primary_key=True)
    empleador_id = db.Column (db.Integer, db.ForeignKey ("empleador.id"), primary_key=True)
    oferta_id =db.Column (db.Integer, db.ForeignKey ("ofertas.id"), primary_key=True)
    
    def __repr__(self):
        return f'<Favoritos {self.programador_id}>'

    def serialize(self):
        return {
            "programador_id": self.programador_id,
            "empleador_id": self.empleador_id,
            "oferta_id": self.oferta_id

            
        }
    
class User(db.Model):
    __tablename__="user"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column (db.String (20), nullable=False)
    username = db.Column (db.String(50), nullable=False)
    photo = db.Column (db.String(200))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    country = db.Column (db.String (20), unique=False, nullable=False)
    profile_programador = db.relationship ("Programador", backref="user", uselist=False)
    profile_empleador = db.relationship ("Empleador", backref="user", uselist=False)
    postulados= db.relationship ("Postulados", backref= "user", lazy=True)
   

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
            "profile_programador": self.profile_programador.serialize() if self.profile_programador else None,
            "profile_empleador": self.profile_empleador.serialize()  if self.profile_empleador else None,
            "postulados": [postulados.serialize() for postulados in self.postulados] if self.postulados else None
        }
    


class Experience(Enum):
    JUNIOR = 'junior'
    MID = 'mid-level'
    SENIOR = 'senior'

class Programador(db.Model):
    __tablename__="programador"
    id = db.Column(db.Integer, primary_key=True)
    precio_hora = db.Column (db.Integer)
    tecnologias = db.Column (db.String(200))
    experiencia = db.Column(db.Enum(Experience))
    descripcion = db.Column(db.String(300))
    rating = db.Column (db.Float(2))
    proyectos = db.relationship ("Proyectos", backref="programador", lazy=True)
    user_id= db.Column (db.Integer, db.ForeignKey("user.id"), nullable=False)
    rating = db.relationship ("Ratings", backref="programador", lazy=True)
    favoritos = db.relationship ("Favoritos", backref="programador", lazy=True)
   

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
            "proyectos": [proyectos.serialize()for proyectos in self.proyectos],
            "favoritos": [favoritos.serialize() for favoritos in self.favoritos] if self.favoritos else None
        }

class Empleador(db.Model):
    __tablename__ = "empleador"
    id = db.Column(db.Integer, primary_key=True)
    cif = db.Column (db.String(15), unique=True)
    metodo_pago = db.Column (db.String(100))
    descripcion = db.Column(db.String(300))
    user_id= db.Column (db.Integer, db.ForeignKey("user.id"), nullable=False)
    rating = db.relationship ("Ratings", backref="empleador", lazy=True)
    favoritos = db.relationship ("Favoritos", backref="empleador", lazy=True)
    oferta = db.relationship ("Ofertas", backref="empleador", lazy=True)
    

    def __repr__(self):
        return f'<Empleador {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "cif": self.cif,
            "metodo_pago": self.metodo_pago,
            "descripcion": self.descripcion,
            "favoritos": [favoritos.serialize() for favoritos in self.favoritos]  if self.favoritos else None
        }
    



class Modalidad(Enum):
    TELETRABAJO = 'teletrabajo'
    PRESENCIAL = 'presencial'
    
class Ofertas(db.Model):
    __tablename__="ofertas"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column (db.String (100), nullable=False)
    descripcion = db.Column (db.String(700), nullable=False)
    salario = db.Column (db.Integer, nullable=False)
    plazo = db.Column(db.String(100), nullable=False)
    modalidad = db.Column(db.Enum(Modalidad), nullable=False)
    experiencia_minima = db.Column (db.Enum(Experience), nullable=False)
    fecha_publicacion = db.Column(db.Date, nullable=False)
    postulados= db.relationship ("Postulados", backref= "ofertas", lazy=True)
    favoritos = db.relationship ("Favoritos", backref="ofertas", lazy=True)
    empleador_id = db.Column (db.Integer, db.ForeignKey ("empleador.id"))
   

    def __repr__(self):
        return f'<Ofertas {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "descripcion": self.descripcion,
            "salario": self.salario,
            "plazo": self.plazo,
            "modalidad": self.modalidad.value,
            "experiencia_minima": self.experiencia_minima.value,
            "fecha_publicacion": self.fecha_publicacion.isoformat(),
            "empleador_id": self.empleador_id,
            "favoritos": [favoritos.serialize() for favoritos in self.favoritos] if self.favoritos else None
        }
    

class Proyectos(db.Model):
    __tablename__="proyectos"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), unique=True, nullable=False)
    descripcion_corta = db.Column(db.String(150), nullable=False)
    git = db.Column(db.String(300))
    link = db.Column(db.String(500))
    tecnologias = db.Column (db.String(200), nullable=False)
    programador_id = db.Column (db.Integer, db.ForeignKey ("programador.id"))
    

    def __repr__(self):
        return f'<Programador {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "descripcion_corta": self.descripcion_corta,
            "git": self.git,
            "link": self.link,
            "tecnologias": self.tecnologias,
            "programador_id": self.programador_id
        }


class Contact(db.Model):
    __tablename__ = "contact"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    lastName = db.Column(db.String(50), nullable=False)  
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.String(1000), nullable=False)
    privacy_policy_accepted = db.Column(db.Boolean, nullable=False, default=False)

    def __repr__(self):
        return f'<Contact {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastName": self.lastName,
            "email": self.email,
            "message": self.message,
            "privacy_policy_accepted": self.privacy_policy_accepted
        }