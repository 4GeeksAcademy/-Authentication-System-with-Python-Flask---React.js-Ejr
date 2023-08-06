from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    firstname = db.Column(db.String(100), nullable=False)
    lastname = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    pasaporte = db.Column(db.String(50), nullable=False)
    payment_method = db.Column(db.String(100), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)

    # Relationship to User model
    reviews = db.relationship("Review", backref="user")
    favorites = db.relationship('Favorites', backref='user')
    # likes = db.relationship('Likes', backref='user')

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "address": self.address,
            "pasaporte": self.pasaporte,
            "payment_method": self.payment_method,
            "is_admin": self.is_admin
        }


class Business_user(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    business_name = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(250), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    nif = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(150), nullable=False)
    payment_method = db.Column(db.String(150), nullable=False)

    Offers = db.relationship("Offers", backref="business_user")

    def __repr__(self):
        return '<Business_user %r>' % self.business_name

    def serialize(self):
        return {
            "id": self.id,
            "business_name": self.business_name,
            "email": self.email,
            "nif": self.nif,
            "address": self.address,
            "payment_method": self.payment_method
        }


class Trip(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    country = db.Column(db.String(40), nullable=False)
    city = db.Column(db.String(40), nullable=False)
    activity = db.Column(db.String(100), nullable=False)
    offers = db.relationship("Offers", backref="trip")
    review = db.relationship("Review", backref="trip")
    favorites = db.relationship('Favorites', backref='trip')

    def __repr__(self):
        return '<Trip %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "country": self.country,
            "city": self.city,
            "activities": self.activities
        }


class Offers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    trip_id = db.Column(db.Integer, ForeignKey('trip.id'), nullable=True)
    business_id = db.Column(db.Integer, ForeignKey(
        'business_user.id'), nullable=True)
    offer_title = db.Column(db.String(75), nullable=False)
    offer_description = db.Column(db.String(250), nullable=False)
    country = db.Column(db.String(250), nullable=False)
    city = db.Column(db.String(250), nullable=False)
    normal_user_price = db.Column(db.Integer, nullable=False)
    # medium_user_price = db.Column(db.Integer, nullable=False)
    # high_user_price = db.Column(db.Integer, nullable=False)
    premium_user_price = db.Column(db.Integer, nullable=False)

    favorites = db.relationship('Favorites', backref='offers')

    def __repr__(self):
        return '<Offers %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "trip_id": self.trip_id,
            "business_id": self.business_id,
            "offer_title": self.offer_title,
            "offer_description": self.offer_description,
            "country": self.country,
            "city": self.city,
            "normal_user_price": self.normal_user_price,
            # "medium_user_price": self.medium_user_price,
            # "high_user_price": self.high_user_price,
            "premium_user_price": self.premium_user_price
        }


class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    trip_id = db.Column(db.Integer, db.ForeignKey(
        'trip.id'), nullable=True) 
    title = db.Column(db.String(75), nullable=False)
    comment_text = db.Column(db.String(500), nullable=False)
    favorites = db.relationship('Favorites', backref='review')
    likes = db.relationship('Likes', backref='review')

    def __repr__(self):
        return '<Review %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "user": User.query.get(self.user_id).serialize(),
            "trip_id": self.trip_id,
            "title": self.title,
            "comment_text": self.comment_text,
        }

class Likes(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    review_id = db.Column(db.Integer, db.ForeignKey('review.id'), nullable=True)

    def __repr__(self):
        return '<Likes %r>' % self.id
    
    def serialize(self):
        return {
            "id": self.id,
            "user": User.query.get(self.user_id).serialize(),
        }


class Favorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    trip_id = db.Column(db.Integer, db.ForeignKey('trip.id'), nullable=True)
    offer_id = db.Column(db.Integer, db.ForeignKey('offers.id'), nullable=True)
    review_id = db.Column(db.Integer, db.ForeignKey('review.id'), nullable=True)
    def __repr__(self):
        return '<Favorites %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "trip_id": self.trip_id,
            "offer_id": self.offer_id,
            "review_id": self.review_id
        }
