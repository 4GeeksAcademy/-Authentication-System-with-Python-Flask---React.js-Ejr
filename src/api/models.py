from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

class Walker(db.Model):
    __tablename__ = "walker"
    id = db.Column(db.Integer, primary_key=True)
    file = db.Column(db.Text, unique=True, nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(200), unique=False, nullable=False)
    last_name = db.Column(db.String(200), unique=False, nullable=False)
    email = db.Column(db.String(200), unique=True, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=False)
    verify_password = db.Column(db.String(200), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    date_start = db.Column(db.DateTime(timezone=True), default=datetime.datetime.utcnow())

    def __repr__(self):
        return f'<Walker {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            'file': self.file,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
        }

class Owner(db.Model):
    __tablename__ = "owner"
    id = db.Column(db.Integer, primary_key=True)
    file = db.Column(db.Text, unique=True, nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(200), unique=False, nullable=False)
    last_name = db.Column(db.String(200), unique=False, nullable=False)
    email = db.Column(db.String(200), unique=True, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=False)
    verify_password = db.Column(db.String(200), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    date_start= db.Column(db.DateTime(timezone=True), default=datetime.datetime.utcnow() )

    def __repr__(self):
        return f'<Owner {self.first_name}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            'file': self.file,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
        }

class Dog(db.Model):
    __tablename__ = "dog"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), unique=False, nullable=False)
    breed = db.Column(db.String(200), unique=False, nullable=False)
    age = db.Column(db.Integer, unique=False, nullable=False)
    file = db.Column(db.Text, unique=True, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('owner.id', ondelete='CASCADE'))
    Owner = db.relationship('Owner', primaryjoin=owner_id == Owner.id)

    def __repr__(self):
        return f'<Dog {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "breed": self.breed,
            "age": self.age,
            'owner_id': self.owner_id,
            'file': self.file,
        }