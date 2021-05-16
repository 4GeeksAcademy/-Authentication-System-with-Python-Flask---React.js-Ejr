from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_utils import create_view
from sqlalchemy import select, func
db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fullName = db.Column(db.String(255), unique=False, nullable=False)
    username = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_Admin = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email
        }

class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    fullName = db.Column(db.String(255), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phoneNumber = db.Column(db.String(11), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    isSeller = db.Column(db.Integer, unique=False)

    def __repr__(self):
        return '<Client %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "fullName": self.fullName,
            "email": self.email,
            "phonenumber": self.phoneNumber
        }

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fk_id = db.Column(db.Integer, db.ForeignKey('client.id'), unique=False, nullable=False)
    productName = db.Column(db.String(255),  nullable=False)
    description = db.Column(db.String(255),  nullable=False)
    category = db.Column(db.String(255),  nullable=False)
    price = db.Column(db.Integer, nullable=False)
    item_status = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return '<Product %r>' % self.productName

    def serialize(self):
        return {
            "id": self.id,
            "fk_id": self.fk_id,
            "productName": self.productName,
            "description": self.description,
            "price": self.price,
            "category": self.category,
            "item_status": self.item_status
        }

class ImageBlob(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fk_id = db.Column(db.Integer, db.ForeignKey('product.id'), unique=True, nullable=False)
    img = db.Column(db.Text, unique=True, nullable=False)
    name = db.Column(db.Text, nullable=False)
    mimetype = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return '<ImageBlob %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "img": self.img,
            "name": self.name,
            "mimetype": self.mimetype            
        }


class Products_View(db.Model):

    

    