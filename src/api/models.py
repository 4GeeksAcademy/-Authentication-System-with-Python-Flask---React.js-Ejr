from flask_sqlalchemy import SQLAlchemy
from datetime import datetime,timezone
import bcrypt

db = SQLAlchemy()

user_especialidad = db.Table('user_especialidad',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('especialidad_id', db.Integer, db.ForeignKey('especialidades.id'), primary_key=True)
)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre_usuario = db.Column(db.String(50), nullable=False)
    apellido = db.Column(db.String(50), nullable=False)
    descripcion = db.Column(db.Text, nullable=True)
    fecha_de_nacimiento = db.Column(db.Date, nullable=True)
    codigo_de_area = db.Column(db.String(10), nullable=True)
    telefono = db.Column(db.String(20), unique=True, nullable=True)
    correo = db.Column(db.String(40), unique=True, nullable=False)
    clave = db.Column(db.String(80), nullable=True)
    is_psicologo = db.Column(db.Boolean(), nullable=False)
    foto = db.Column(db.String(255), nullable=True)
    is_active = db.Column(db.Boolean(), nullable=False)
    correo_verificado = db.Column(db.Boolean(), default=False)

    # Relación muchos a muchos con Especialidades
    especialidades = db.relationship('Especialidades', secondary=user_especialidad, lazy='subquery',
        backref=db.backref('usuarios', lazy=True))

    def __repr__(self):
        return f'<User {self.correo}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre_usuario": self.nombre_usuario,
            "apellido": self.apellido,
            "descripcion": self.descripcion,
            "fecha_de_nacimiento": self.fecha_de_nacimiento,
            "codigo_de_area": self.codigo_de_area,
            "telefono": self.telefono,
            "correo": self.correo,
            "is_psicologo": self.is_psicologo,
            "foto": self.foto,
            "is_active": self.is_active,
            "correo_verificado": self.correo_verificado,
            "especialidades": [especialidad.serialize() for especialidad in self.especialidades]
        }

    # Métodos para manejar contraseñas
    def set_password(self, password):
        self.clave = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.clave.encode('utf-8'))
    
class Especialidades(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    especialidad = db.Column(db.String(100), unique=False, nullable=False)

    def __repr__(self):
        return f'<Especialidad {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "especialidad": self.especialidad,
        }
class Comentarios(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    id_profesional = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    comentario = db.Column(db.Text, nullable=False)
    puntaje = db.Column(db.Integer, nullable=False)
    fecha_de_publicacion = db.Column(db.DateTime, nullable=False, default=datetime.now(timezone.utc))
    
    usuario = db.relationship('User', foreign_keys=[id_usuario])
    profesional = db.relationship('User', foreign_keys=[id_profesional])

    def __repr__(self):
        return f'<Comentario {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_usuario": self.id_usuario,
            "id_profesional": self.id_profesional,
            "comentario": self.comentario,
            "puntaje": self.puntaje,
            "fecha_de_publicacion": self.fecha_de_publicacion.isoformat(),
        }

class ClaveResetToken(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    token = db.Column(db.String(256), unique=True, nullable=False)
    expiration = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f'<PasswordResetToken {self.token}>'