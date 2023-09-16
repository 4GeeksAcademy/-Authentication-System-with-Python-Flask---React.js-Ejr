from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    #cambiar nullable a false
    name = db.Column(db.String(120), unique=False, nullable=False)
    address = db.Column(db.String(250), unique=False, nullable=True)
    phone = db.Column(db.String(20), unique=False, nullable=True)
    events = db.relationship('Events', backref='user', lazy=True)
    teams = db.relationship('Teams', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "address": self.address,
            "phone": self.phone
            # do not serialize the password, its a security breach
        }

events_teams= db.Table('events_teams',
                    db.Column('events_id', db.Integer, db.ForeignKey('events.id')),
                    db.Column('teams_id', db.Integer, db.ForeignKey('teams.id'))
                    )

class Events(db.Model):
    __tablename__ = "events"
    id = db.Column(db.Integer, primary_key=True)
    nombre_evento= db.Column(db.String(50), unique=False, nullable=False)
    descr_corta = db.Column(db.String(100), unique=False, nullable=False)
    fecha_ini = db.Column(db.DateTime, unique=False, nullable=False)
    fecha_fin = db.Column(db.DateTime, unique=False, nullable=False)
    ubicacion = db.Column(db.String(100), unique=False, nullable=False)
    logotipo = db.Column(db.String(150), unique=False, nullable=False)
    descr_larga = db.Column(db.String(250), unique=False, nullable=False)
    reglas = db.Column(db.String(150), unique=False, nullable=False)
    fecha_lim = db.Column(db.DateTime, unique=False, nullable=False)
    email_contacto = db.Column(db.String(50), unique=False, nullable=False)
    tel_contacto = db.Column(db.String(15), unique=False, nullable=False)
    nombre_contacto = db.Column(db.String(150), unique=False, nullable=False)
    costo = db.Column(db.Integer, unique=False, nullable=False)
    id_user = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    teams = db.relationship('Teams', secondary=events_teams, lazy='subquery',
        backref=db.backref('eventss', lazy=True))

class Teams(db.Model):
    __tablename__ = "teams"
    id = db.Column(db.Integer, primary_key=True)
    nombre_equipo= db.Column(db.String(50), unique=False, nullable=False)
    fecha_registro = db.Column(db.DateTime, unique=False, nullable=False)
    id_user = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)


class TokenBlockedList(db.Model):
    __tablename__ = "tokenblockedlist"
    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String(1000), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)