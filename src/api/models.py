from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    idUser = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(200), default='', nullable=True)
    apellido = db.Column(db.String(200), default='', nullable=False)
    rut = db.Column(db.String(200), unique=True, nullable=True)
    email = db.Column(db.String(200), unique=True, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=False)
    telefono = db.Column(db.String(20), unique=True, nullable=False)
    fecha_de_nacimiento = db.Column(db.Date, default=datetime.date(2000, 1, 1), unique=False, nullable=True)
    rubro = db.Column(db.String(200), unique=False, nullable=True)
    comuna = db.Column(db.String(200), unique=False, nullable=True)
    is_active = db.Column(db.Boolean(), default=True, nullable=False)

    def serialize(self):
        return {
            "id": self.idUser,
            "email": self.email,
        }

    def get_id(self):
        return str(self.idUser)

class UserBuscador(db.Model):
    __tablename__ = 'user_buscador'  
    idUserBuscador = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(200), default='', nullable=True)
    apellido = db.Column(db.String(200), default='', nullable=False)
    rut = db.Column(db.String(200), unique=True, nullable=True)
    email = db.Column(db.String(200), unique=True, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=False)
    telefono = db.Column(db.String(200), unique=True, nullable=False)
    comuna = db.Column(db.String(200), unique=False, nullable=True)
    fecha_de_nacimiento = db.Column(db.Date, default=datetime.date(2000, 1, 1), nullable=True)
    is_active = db.Column(db.Boolean(), default=True, nullable=False)

class PrestadorPublicacion(db.Model):
    __tablename__ = 'prestador_publicacion'
    idPrestadorPublicacion = db.Column(db.Integer, primary_key=True)
    idUser = db.Column(db.Integer, db.ForeignKey('user.idUser'))
    

    def __repr__(self):
        return f'<UserBuscador {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
        }
    