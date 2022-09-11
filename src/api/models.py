from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            # do not serialize the password, its a security breach
        }


class Platos(db.Model):
    __tablename__ = 'platos'

    uid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    tipo = db.Column(db.String(120), unique=False, nullable=True)
    ingredientes = db.Column(db.String(1000), unique=False, nullable=False)
    tiempo = db.Column(db.String(120), unique=False, nullable=True)

    def __repr__(self):
        return '<Platos %r>' %self.name

    def serialize(self):
        return {
            "uid": self.uid,
            "name": self.name,
            "tipo": self.tipo,
            "ingredientes": self.ingredientes,
            "tiempo": self.tiempo,
        }


class FavPlatos(db.Model):
    __tablename__ = "favPlatos"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(120), db.ForeignKey('user.email'))
    platos_uid = db.Column(db.Integer, db.ForeignKey('platos.uid'))
    user = db.relationship(User)
    platos = db.relationship(Platos)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "plato_uid": self.plato_uid,
        }