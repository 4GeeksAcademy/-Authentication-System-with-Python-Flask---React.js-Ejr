from flask_sqlalchemy import SQLAlchemy
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
            # do not serialize the password, its a security breach
        }


class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=False, nullable=False)
    fullName = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phoneNumber = db.Column(db.String(11), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return '<Client %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "fullName": self.fullName,
            "email": self.email,
            "phonenumber": self.phoneNumber
            # do not serialize the password, its a security breach
        }


class Seller(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=False, nullable=False)
    fullName = db.Column(db.String(255), unique=True, nullable=False)
    phoneNumber = db.Column(db.String(11), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return '<Seller %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "fullName": self.fullName,
            "phonenumber": self.phoneNumber,
            "email": self.email
            # do not serialize the password, its a security breach
        }

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fk_id = db.Column(db.Integer, db.ForeignKey('seller.id'), unique=True, nullable=False)
    productName = db.Column(db.String(255),  nullable=False)
    description = db.Column(db.String(255),  nullable=False)
    category = db.Column(db.String(255),  nullable=False)
    price = db.Column(db.Integer, nullable=False)
    image = db.Column(db.Integer, nullable=False)
    item_status = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return '<Product %r>' % self.productName

    def serialize(self):
        return {
            "id": self.id,
            "productName": self.productName,
            "description": self.description,
            "price": self.price,
            "image": self.image,
            "category": self.category,
            "item_status": self.item_status
            # do not serialize the password, its a security breach
        }
