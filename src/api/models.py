from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(250), unique=False, nullable=False)
    nombre_completo = db.Column(db.String(120), unique=False, nullable=False)
    respuesta_de_seguridad = db.Column(db.String(120), unique=False, nullable=False)
    mi_pasaporte = db.relationship('Mi_pasaporte', lazy=True)

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "nombre_completo": self.nombre_completo
            # do not serialize the password, its a security breach
        }

class Pymes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(600), unique=True, nullable=False)
    descripcion = db.Column(db.String(10485760), unique=False, nullable=True)
    provincia = db.Column(db.String(600), unique=False, nullable=False)
    telefono = db.Column(db.String(600), unique=False, nullable=True)
    email = db.Column(db.String(600), unique=False, nullable=True)
    horario = db.Column(db.String(1000), unique=False, nullable=True)
    imagen = db.Column(db.String(1000), unique=False, nullable=False)
    logo = db.Column(db.String(1000), unique=False, nullable=True)
    info_adicional = db.Column(db.String(10485760), unique=False, nullable=True)
    link_youtube = db.Column(db.String(1000), unique=False, nullable=True)
    sitio_web = db.Column(db.String(1000), unique=False, nullable=True)
    tipo = db.Column(db.String(1000), unique=False, nullable=False)
    categoria = db.Column(db.String(1000), unique=False, nullable=False)
    id_osm = db.Column(db.BigInteger,unique=False, nullable=False)

    def __repr__(self):
        return '<Pymes %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "descripcion": self.descripcion,
            "provincia": self.provincia,
            "telefono": self.telefono,
            "email": self.email,
            "horario": self.horario,
            "imagen": self.imagen,
            "logo": self.logo,
            "info_adicional": self.info_adicional,
            "link_youtube": self.link_youtube,
            "sitio_web": self.sitio_web,
            "tipo": self.tipo,
            "categoria": self.categoria,
            "id_osm": self.id_osm
        }

class Mi_pasaporte(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    #tipo playa o montaña
    tipo_pymes = db.Column(db.String(100), unique=False, nullable=False)
    name = db.Column(db.String(250), unique=False, nullable=False)

    #id del pyme

    def __repr__(self):
        return '<Mi_pasaporte %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "nombre": self.name,
            "tipo_pymes": self.tipo_pymes
        }
