from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "user"
    idUser = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(200), default="", nullable=True)
    apellido = db.Column(db.String(200), default="", nullable=False)
    rut = db.Column(db.String(200), unique=True, nullable=True)
    email = db.Column(db.String(200), unique=True, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=False)
    telefono = db.Column(db.String(20), unique=True, nullable=False)
    fecha_de_nacimiento = db.Column(
        db.Date, default=datetime.date(2000, 1, 1), unique=False, nullable=True
    )
    rubro = db.Column(db.String(200), unique=False, nullable=True)
    comuna = db.Column(db.String(200), unique=False, nullable=True)
    tipoUsuario = db.Column(db.String(20), default="", nullable=True)
    is_active = db.Column(db.Boolean(), default=True, nullable=False)

    def serialize(self):
        return {
            "id": self.idUser,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "email": self.email,
            "telefono": self.telefono,
            "comuna": self.comuna
        }

    def get_id(self):
        return str(self.idUser)


class UserBuscador(db.Model):
    __tablename__ = "user_buscador"
    idUserBuscador = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(200), default="", nullable=True)
    apellido = db.Column(db.String(200), default="", nullable=False)
    rut = db.Column(db.String(200), unique=True, nullable=True)
    email = db.Column(db.String(200), unique=True, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=False)
    telefono = db.Column(db.String(200), unique=True, nullable=False)
    comuna = db.Column(db.String(200), unique=False, nullable=True)
    tipoUsuario = db.Column(db.String(20), default="", nullable=False)
    fecha_de_nacimiento = db.Column(
        db.Date, default=datetime.date(2000, 1, 1), nullable=True
    )
    is_active = db.Column(db.Boolean(), default=True, nullable=False)

    def serialize(self):
        return {
            "id": self.idUserBuscador,
            "nombre": self.nombre,
            "email": self.email,
        }


class UserPublicacion(db.Model):
    __tablename__ = "publicacion"
    idPublicacion = db.Column(db.Integer, primary_key=True)
    idUser = db.Column(db.Integer)
    nombre = db.Column(db.String(200), default="", nullable=True)
    apellido = db.Column(db.String(200), default="", nullable=False)
    email = db.Column(db.String(200), unique=True, nullable=False)
    descripcion = db.Column(db.String(200), default="", nullable=False)
    comuna = db.Column(db.String(200), default="", nullable=False)
    rubro = db.Column(db.String(200), default="", nullable=False)
    fecha = db.Column(db.String(200), unique=True, nullable=True)

    def __repr__(self):
        return f"<UserBuscador {self.email}>"

    def serialize(self):
        return {
            "email": self.email,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "descripcion": self.descripcion,
            "comuna": self.comuna,
            "rubro": self.rubro,
            "fecha": self.fecha,
        }
