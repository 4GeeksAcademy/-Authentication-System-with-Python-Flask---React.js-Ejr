from flask_sqlalchemy import SQLAlchemy


# Crear una instancia global de SQLAlchemy
db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    is_teacher = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, default=True)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_teacher": self.is_teacher
        }

    def __repr__(self):
        return f'<User {self.email}>'
    
class Profesor(db.Model):
    __tablename__ = "profesor"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=True)
    lastname = db.Column(db.String(120),nullable=True)
    telefono = db.Column(db.Integer(120), nullable=True)
    address = db.Column(db.String(120),nullable=True)
    city = db.Column(db.String(120),nullable=True)
    state = db.Column(db.String(120),nullable=True)
    zipcode = db.Column(db.String(120),nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id')) 
    relationship_user = db.relationship('User',back_populates ='profesor', lazy=True)

class Alumno(db.Model):
    __tablename__ = "alumno"
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(120), nullable=True)
    lastname = db.Column(db.String(120),nullable=True)
    telefono = db.Column(db.Integer(120), nullable=True)
    address = db.Column(db.String(120),nullable=True)
    city = db.Column(db.String(120),nullable=True)
    state = db.Column(db.String(120),nullable=True)
    zipcode = db.Column(db.String(120),nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id')) 
    relationship_user = db.relationship('User',back_populates ='alumno', lazy=True)

class Curso(db.Model):
    __tablename__ = "curso"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    #añadir linea de codigo donde va la imagen del curso
    resumen = db.Column(db.String(120), nullable=True)
    categoria = db.Column(db.String(120), nullable=True)
    valoraciones = db.Column(db.Integer, nullable=True)
    niveles = db.Column(db.String(120), nullable=True)
    precios = db.Column(db.Integer, nullable=True)
    fechainicio = db.Column(db.String(120), nullable=True)#no se si es String u otro tipo
    idioma = db.Column(db.String(120), nullable=True)
    modulos = db.Column(db.String(120),nullable=True)
    profesor_id = db.Column(db.Integer, db.ForeignKey('profesor.id')) 
    relationship_user = db.relationship('User',back_populates ='profesor', lazy=True)

class Pagos(db.Model):
    __tablename__ = "pagos"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id')) 
    relationship_user = db.relationship('User',back_populates ='Alumno', lazy=True)

class Matricula(db.Model):
    __tablename__ = "matricula"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id')) 
    relationship_user = db.relationship('User',back_populates ='Alumno', lazy=True)