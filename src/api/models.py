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
    fk_id = db.Column(db.Integer, db.ForeignKey(
        'client.id'), unique=False, nullable=False)
    productName = db.Column(db.String(255),  nullable=False)
    description = db.Column(db.String(255),  nullable=False)
    category = db.Column(db.String(255),  nullable=False)
    price = db.Column(db.Integer, nullable=False)
    item_status = db.Column(db.String(20), nullable=False)
    # img = db.Column(db.LargeBinary)
    # imgname = db.Column(db.String())
    # mimetype = db.Column(db.String(), nullable=False)
    client = db.relationship("Client", lazy="subquery")

    def __repr__(self):
        return '<Product %r>' % self.productName

    def serialize(self):
        return {
            "s_id": self.client.id,
            "s_name": self.client.fullName,
            "s_email": self.client.email,
            "s_phonenumber": self.client.phoneNumber,
            "p_id": self.id,
            "p_productName": self.productName,
            "p_description": self.description,
            "p_price": self.price,
            "p_category": self.category
            #"p_image": self.img,
            # "p_mimetype": self.mimetype
        }
