from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Influencers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    nombre = db.Column(db.String(80), unique=False, nullable=False)
    apellidos = db.Column(db.String(80), unique=False, nullable=False)
    ig_user = db.Column(db.String(80), unique=True, nullable=False)
    categoria = db.Column(db.String(80), unique=False, nullable=False)
    pais = db.Column(db.String(80), unique=False, nullable=False)
    ciudad = db.Column(db.String(80), unique=False, nullable=False)
    bio = db.Column(db.String(360), unique=False, nullable=False)
    post1 = db.Column(db.String(120), unique=False, nullable=True)
    post2 = db.Column(db.String(120), unique=False, nullable=True)
    post3 = db.Column(db.String(120), unique=False, nullable=True)
    post4 = db.Column(db.String(120), unique=False, nullable=True)
    post5 = db.Column(db.String(120), unique=False, nullable=True)
    post6 = db.Column(db.String(120), unique=False, nullable=True)

    def __repr__(self):
        return f'<Influencers {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Empresas(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    nombre = db.Column(db.String(80), unique=False, nullable=False)
    apellidos = db.Column(db.String(80), unique=False, nullable=False)
    razon_social = db.Column(db.String(80), unique=False, nullable=False)
    sector = db.Column(db.String(80), unique=False, nullable=False)
    pais = db.Column(db.String(80), unique=False, nullable=False)
    ciudad = db.Column(db.String(80), unique=False, nullable=False)
    bio = db.Column(db.String(360), unique=False, nullable=False)

    def __repr__(self):
        return f'<Empresas {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Favoritos(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    empresa_id = db.Column(db.Integer, db.ForeignKey('empresas.id'))
    influencer_id = db.Column(db.Integer, db.ForeignKey('influencers.id'))
    rel_influencer = db.relationship(Influencers)
    rel_empresa = db.relationship(Empresas)

    def __repr__(self):
        return f'<Favoritos {self.empresa_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "empresa": self.empresa_id,
            "influencer": self.influencer_id,
            # do not serialize the password, its a security breach
        }