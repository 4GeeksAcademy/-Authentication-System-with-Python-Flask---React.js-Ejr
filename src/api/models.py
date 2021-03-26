from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(200), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    tipo_user = db.Column(db.String(200), nullable=False)
    servicio_registrados = db.relationship('Servicio_registrados', backref='user',lazy=True)
    servicios_prestados = db.relationship('Servicios_prestados', backref='user',lazy=True)
    favoritos = db.relationship('Favoritos', backref='user',lazy=True)

    def __repr__(self):
        return "<User %r>" % self.id

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "tipo_user": self.tipo_user
        }
        
class Servicio_registrados(db.Model):
    __tablename__ = 'servicio_registrados'
    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    username = db.Column(db.String(50), nullable=False)
    tipo_membresia = db.Column(db.String(50), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    subcategory = db.Column(db.String(50), nullable=False)
    tipo_cobro = db.Column(db.String(50), nullable=False)
    valor = db.Column(db.Integer, nullable=False)
    name_servicio = db.Column(db.String(50), nullable=False)
    descrip_servicio = db.Column(db.String(250), nullable=False)
    duracion = db.Column(db.String(30))
    revision = db.Column(db.String(30), nullable=False)
    proceso = db.Column(db.String(250))
    experiencia = db.Column(db.Integer, nullable=False)
    portafolio = db.Column(db.String(250), nullable=True)
    merit = db.Column(db.String(250))
    servicios_prestados = db.relationship('Servicios_prestados', backref='servicio_registrados',lazy=True)
    favoritos = db.relationship('Favoritos', backref='servicio_registrados',lazy=True)

    def __repr__(self):
        return "<Servicio_registrados %r>" % self.id

    def serialize(self):
        return {
            "id": self.id,
            "id_user": self.user.id,
            "username": self.username,
            "tipo_membresia": self.tipo_membresia,
            "category": self.category,
            "subcategory": self.subcategory,
            "tipo_cobro": self.tipo_cobro,
            "valor": self.valor, 
            "name_servicio": self.name_servicio,
            "descrip_servicio": self.descrip_servicio,
            "duracion":self.duracion,
            "revision":self.revision,
            "proceso":self.proceso,
            "experiencia": self.experiencia,
            "portafolio": self.portafolio,
            "merit":self.merit,
            "evaluacion": self.servicios_prestados.evaluacion
        }

class Servicios_prestados(db.Model):
    __tablename__ = 'servicios_prestados'
    id = db.Column(db.Integer, primary_key=True)
    id_user_compra = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    id_servicio_registrados = db.Column(db.Integer, db.ForeignKey('servicio_registrados.id'), nullable=False)
    cantidad_servicio = db.Column(db.Integer,nullable=False)
    total_valor_servicio = db.Column(db.Integer,nullable=False)
    fecha_inicio = db.Column(db.DateTime)
    fecha_termino = db.Column(db.DateTime)
    text_comment = db.Column(db.String(250), nullable=True)
    evaluacion = db.Column(db.Integer, nullable=True)
    

    def __repr__(self):
        return "<Servicios_prestados %r>" % self.id
    

    def serialize(self):
        return {
            "id": self.id,
            "id_user_compra": self.user.id,
            "id_servicio_registrados": self.servicio_registrados.id,
            "name_servicio": self.servicio_registrados.name_servicio,
            "cantidad_servicio": self.cantidad_servicio,
            "total_valor_servicio":self.total_valor_servicio,
            "fecha_inicio": self.fecha_inicio,
            "fecha_termino": self.fecha_termino,
            "text_comment": self.text_comment,
            "evaluacion": self.evaluacion
        }

class Favoritos(db.Model):
    __tablename__ = 'favoritos'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    id_user = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    id_servicio_registrados = db.Column(db.Integer, db.ForeignKey('servicio_registrados.id'), nullable=False)

    def __repr__(self):
        return "<Servicios_prestados %r>" % self.id
    

    def serialize(self):
        return {
            "id": self.id,
            "id_user": self.user.id,
            "id_servicio_registrados": self.servicio_registrados.id,
            "name_servicio": self.servicio_registrados.name_servicio
        }