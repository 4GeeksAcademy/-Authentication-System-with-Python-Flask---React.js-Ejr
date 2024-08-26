from flask_sqlalchemy import SQLAlchemy


# Crear una instancia global de SQLAlchemy
db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer(), primary_key=True)
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
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(120), nullable=True)
    lastname = db.Column(db.String(120),nullable=True)
    telefono = db.Column(db.Integer(), nullable=True)
    address = db.Column(db.String(120),nullable=True)
    avatar=db.Column(db.String(250))
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id')) 
    relationship_user = db.relationship('User',backref ='profesor', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "telefono": self.telefono,
            "address": self.address,
            "user_id": self.user_id,
            #añadir linea de codigo donde va la foto del usuario
        }


class Alumno(db.Model):
    __tablename__ = "alumno"
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(120), nullable=True)
    lastname = db.Column(db.String(120),nullable=True)
    telefono = db.Column(db.Integer(), nullable=True)
    address = db.Column(db.String(120),nullable=True)
    #añadir linea de codigo donde va la foto del usuario
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id')) 
    relationship_user = db.relationship('User',backref ='alumno', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "telefono": self.telefono,
            "address": self.address,
            "user_id": self.user_id,
            #añadir linea de codigo donde va la foto del usuario
        }

class Curso(db.Model):
    __tablename__ = "curso"
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    portada=db.Column(db.String(120), nullable=False)
    resumen = db.Column(db.String(120), nullable=True)
    categoria = db.Column(db.String(120), nullable=True)
    valoraciones = db.Column(db.Integer(), nullable=True)
    niveles = db.Column(db.String(120), nullable=True)
    precio = db.Column(db.Integer(), nullable=True)
    fecha_inicio = db.Column(db.String(120), nullable=True)#no se si es String u otro tipo
    idioma = db.Column(db.String(120), nullable=True)
    modulos = db.Column(db.String(120),nullable=True)
    profesor_id = db.Column(db.Integer(), db.ForeignKey('profesor.id')) 
    relationship_profesor = db.relationship('Profesor',backref ='curso', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "resumen": self.resumen,
            "categoria": self.categoria,
            "valoraciones": self.valoraciones,
            "niveles": self.niveles,
            "precio": self.precio,
            "fecha_inicio": self.fecha_inicio,
            "idioma": self.idioma,
            "modulos": self.modulos,
            "profesor_id": self.profesor_id,
            #añadir linea de codigo donde va la imagen del curso
        }
    
class Videos(db.Model) :
    __tablename__ = "videos"
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(120), nullable=True)
    url = db.Column(db.String(120), nullable=True)
    text = db.Column(db.String(250), nullable=False)
    curso_id = db.Column(db.Integer(), db.ForeignKey('curso.id'))
    relationship_contenido = db.relationship('Curso',backref ='contenido', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "resumen": self.resumen,
        }

class Matricula(db.Model):
    __tablename__ = "matricula"
    id = db.Column(db.Integer(), primary_key=True)
    curso_id = db.Column(db.Integer(), db.ForeignKey('curso.id'))
    relationship_curso = db.relationship('Curso',backref ='matricula', lazy=True) 
    alumno_id = db.Column(db.Integer(), db.ForeignKey('alumno.id'))
    relationship_alumno = db.relationship('Alumno',backref ='matricula', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "curso_id": self.curso_id,
            "alumno_id": self.alumno_id,
        }

class Pagos(db.Model):
    __tablename__ = "pagos"
    id = db.Column(db.Integer, primary_key=True)
    matricula_id = db.Column(db.Integer(), db.ForeignKey('matricula.id'))
    relationship_curso = db.relationship('Curso',back_populates ='matricula', lazy=True) 
    alumno_id = db.Column(db.Integer(), db.ForeignKey('alumno.id'))
    relationship_alumno = db.relationship('Alumno',back_populates ='matricula', lazy=True)
    profesor_id = db.Column(db.Integer(), db.ForeignKey('profesor.id')) 
    relationship_profesor = db.relationship('Profesor',back_populates ='matricula', lazy=True)
    fecha_pago = db.Column(db.String(120), nullable=True)#no se si es String u otro tipo

    def serialize(self):
        return {
            "id": self.id,
            "matricula_id": self.matricula_id,
            "alumno_id": self.alumno_id,
            "profesor_id": self.profesor_id,
            "fecha_pago": self.fecha_pago,
        }
