from flask_sqlalchemy import SQLAlchemy

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
    id_tipo_user = db.Column(db.Integer, db.ForeignKey('tipo_user.id'), nullable=False)
    email = db.Column(db.String(200), unique=True, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=False)
    username = db.Column(db.String(200), unique=True, nullable=False)
    favoritos = db.relationship('Favoritos', backref="user", lazy=True)
    

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "id_tipo_user": self.tipo_user.id,
            "name_tipo_user": self.tipo_user.name_tipo_user
        }

class Category(db.Model):
    __tablename__ = 'category'
    id = db.Column(db.Integer,primary_key=True)
    name_category = db.Column(db.String(50), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name_category": self.name_category
        }
class Subcategory(db.Model):
    __tablename__ = 'subcategory'
    id = db.Column(db.Integer,primary_key=True)
    id_category = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    name_subcategory = db.Column(db.String(100), nullable=False)
    category = db.relationship('Category', lazy=True)
    servicio_registrados = db.relationship('Servicio_registrados', secondary="relacion_registrados_subcategory")
    servicios_prestados = db.relationship('Servicios_prestados', backref="subcategory", lazy=True)

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
    id_user = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    id_servicios_prestados = db.Column(db.Integer, db.ForeignKey('servicios_prestados.id'))
    tipo_cobro = db.Column(db.String(50), nullable=False)
    valor = db.Column(db.Integer, nullable=False)
    name_servicio = db.Column(db.String(50), nullable=False)
    descrip_servicio = db.Column(db.String(250), nullable=False)
    duracion = db.Column(db.String(30), nullable=False)
    revision = db.Column(db.String(30), nullable=False)
    proceso = db.Column(db.String(250), nullable=True)
    experiencia = db.Column(db.Integer, nullable=False)
    portafolio = db.Column(db.String(250), nullable=True)
    merit = db.Column(db.String(250), nullable=True)
    tipo_membresia = db.Column(db.String(50), nullable=False)
    user = db.relationship('User', lazy=True)
    subcategory = db.relationship('Subcategory', secondary="relacion_registrados_subcategory")
    servicios_prestados = db.relationship('Servicios_prestados', backref="servicio_registrados", lazy=True)
    comment = db.relationship('Comment', backref="servicio_registrados", lazy=True)
    
    def serialize(self):
        return {
            "id": self.id,
            "id_user": self.user.id,
            "username": self.user.username,
            "tipo_cobro": self.tipo_cobro,
            "evaluacion": self.comment.evaluacion,
            "id_subcategory": self.subcategory.id,
            "name_subcategory": self.subcategory.name_subcategory,
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
    id_servicios_registrados = db.Column(db.Integer, db.ForeignKey('servicio_registrados.id'),primary_key=True)
    id_subcategory = db.Column(db.Integer, db.ForeignKey('subcategory.id'), primary_key=True)

class Comment(db.Model):
    __tablename__ = 'comment'
    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    id_servicio_registrados = db.Column(db.Integer, db.ForeignKey('servicio_registrados.id'), nullable=False)
    comment_text = db.Column(db.String(250), nullable=False)
    evaluacion = db.Column(db.Integer, nullable=False)
    user = db.relationship('User', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "id_user": self.user.id,
            "id_servicio_registrados": self.servicio_registrados.id,
            "comment_text": self.comment_text,
            "evaluacion": self.evaluacion
        }
    
class Servicios_prestados(db.Model):
    __tablename__ = 'servicios_prestados'
    id = db.Column(db.Integer, primary_key=True)
    id_users_compra = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    id_subcategory = db.Column(db.Integer, db.ForeignKey('subcategory.id'))
    cantidad_servicio = db.Column(db.Integer,nullable=False)
    total_valor_servicio = db.Column(db.Integer,nullable=False)
    fecha_inicio = db.Column(db.DateTime)
    fecha_termino = db.Column(db.DateTime)
    user = db.relationship('User', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "id_users_oferente": self.user.id,
            "id_subcategory": self.subcategory.id,
            "name_servicio": self.servicio_registrados.name_servicio,
            "cantidad_servicio": self.cantidad_servicio,
            "total_valor_servicio":self.total_valor_servicio,
            "fecha_inicio": self.fecha_inicio,
            "fecha_termino": self.fecha_termino
        }

class Favoritos(db.Model):
    __tablename__ = 'favoritos'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    id_users = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    id_servicio_registrados = db.Column(db.Integer, db.ForeignKey('servicio_registrados.id'), nullable=False)
    servicio_registrados = db.relationship('Servicio_registrados', lazy=True)
    def serialize(self):
        return {
            "id": self.id,
            "id_users": self.user.id,
            "id_servicio_registrados": self.servicio_registrados.id,
            "name_servicio": self.servicio_registrados.name_servicio
        }