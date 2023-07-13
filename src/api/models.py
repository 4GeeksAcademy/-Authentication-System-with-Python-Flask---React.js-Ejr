from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship


db = SQLAlchemy()

class Saved(db.Model):
    __tablename__ = 'saved'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey("user.id"), unique=True, nullable=True)
    car_id = db.Column(db.Integer, ForeignKey('car.id'), unique=True, nullable=True)
    # saved_cars = relationship('Car', backref='user', uselist=False)



    def __repr__(self):
        return f'<Saved {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "car_id": self.car_id
        }


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(120), nullable=False)
    phone_number = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    # saved = relationship('Saved', lazy=True, back_populates='user')


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "phone_number": self.phone_number,
            # "saved": list(map(lambda x: x.serialize(), self.saved))
        }


class Car(db.Model):
    __tablename__ = 'car'
    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer, unique=False, nullable=False)
    brand = db.Column(db.String(100), unique=False, nullable=False)
    car_name = db.Column(db.String(50), unique=False, nullable=False)
    car_type = db.Column(db.String(30), unique=False, nullable=False)

    def __repr__(self):
        return f'<Car {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "year": self.year,
            "brand": self.brand,
            "car_name": self.car_name,
            "car_type": self.car_type
        }



