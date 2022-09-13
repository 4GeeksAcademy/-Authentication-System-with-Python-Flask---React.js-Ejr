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
    ingredientes = db.Column(db.String(1000), unique=False, nullable=False)
    tiempo = db.Column(db.String(120), unique=False, nullable=True)

    def __repr__(self):
        return '<Platos %r>' %self.name

    def serialize(self):
        return {
            "uid": self.uid,
            "name": self.name,
            "ingredientes": self.ingredientes,
            "tiempo": self.tiempo,
        }
class Veget(db.Model):
    __tablename__ = 'veget'

    uid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    ingredientes = db.Column(db.String(1000), unique=False, nullable=False)
    tiempo = db.Column(db.String(120), unique=False, nullable=True)

    def __repr__(self):
        return '<Veget %r>' %self.name

    def serialize(self):
        return {
            "uid": self.uid,
            "name": self.name,
            "ingredientes": self.ingredientes,
            "tiempo": self.tiempo,
        }
class Dulce(db.Model):
    __tablename__ = 'dulce'

    uid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    ingredientes = db.Column(db.String(1000), unique=False, nullable=False)
    tiempo = db.Column(db.String(120), unique=False, nullable=True)

    def __repr__(self):
        return '<Dulce %r>' %self.name

    def serialize(self):
        return {
            "uid": self.uid,
            "name": self.name,
            "ingredientes": self.ingredientes,
            "tiempo": self.tiempo,
        }


class FavPlatos(db.Model):
    __tablename__ = "favPlatos"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(120), db.ForeignKey('user.email'))
    platos_uid = db.Column(db.Integer, db.ForeignKey('platos.uid'))
    dulce_uid = db.Column(db.Integer, db.ForeignKey('dulce.uid'))
    veget_uid = db.Column(db.Integer, db.ForeignKey('veget.uid'))
    user = db.relationship(User)
    platos = db.relationship(Platos)
    veget = db.relationship(Veget)
    dulce = db.relationship(Dulce)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "plato_uid": self.plato_uid,
            "dulce_uid" : self.dulce_uid,
            "veget_uid": self.veget_uid,
        }