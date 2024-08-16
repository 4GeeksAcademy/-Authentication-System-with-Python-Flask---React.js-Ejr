import os
import sys
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(250))
    email = db.Column(db.String(250), nullable=False)
    profile_id = db.Column(db.Integer, db.ForeignKey('userProfile.id'))
    partner = db.Column(db.Boolean, nullable=False)
    partner_profile_id = db.Column(db.Integer, db.ForeignKey('partnerProfile.id'))
    password = db.Column(db.String(80), nullable=False)
    is_active = db.Column(db.Boolean())

    profile = db.relationship("UserProfile", back_populates="users", lazy=True, uselist=False)
    partner_profile = db.relationship("PartnerProfile", back_populates="users", lazy=True, uselist=False)

    def __repr__(self):
        return '<User %r>' % self.id
    
    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "profile_id": self.profile_id,
            "partner": self.partner,
            "partner_profile_id": self.partner_profile_id,
            # no hacer serialize de la password, es un fallo de seguridad
        }
    
class UserProfile(db.Model):
    __tablename__ = 'userProfile'
    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(250))
    city = db.Column(db.String(250))
    country = db.Column(db.String(250))
    event_style = db.Column(db.String(250))
    id_favorites = db.Column(db.Integer, db.ForeignKey('favorites.id'))


    users = db.relationship("User", backref="userProfile", lazy=True, overlaps="userProfile,user_profile_user")

    favorites = db.relationship("Favorites", backref="user_profile", lazy=True)
    payments = db.relationship("Payment", backref="user_profile", lazy=True)

    def __repr__(self):
        return '<UserProfile %r>' % self.id
    
    def serialize(self):
        return {
            "id": self.id,
            "address": self.address,
            "city": self.city,
            "country": self.country,
            "event_style": self.event_style,
            "id_favorites": self.id_favorites,
        }
    
class PartnerProfile(db.Model):
    __tablename__ = 'partnerProfile'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250))
    description = db.Column(db.String(1000))
    venue_id = db.Column(db.Integer, db.ForeignKey('venue.id'))

    venue = db.relationship("Venue", backref="partner_profile", lazy=True)
    users = db.relationship("User", back_populates="partner_profile", lazy=True)

    def __repr__(self):
        return '<PartnerProfile %r>' % self.name
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "venue_id": self.venue_id,
        }
class Payment(db.Model):
    __tablename__ = 'payment'
    id = db.Column(db.Integer, primary_key=True)
    purchase_date = db.Column(db.String(250))
    price = db.Column(db.String(250))
    user_profile_id = db.Column(db.Integer, db.ForeignKey('userProfile.id'))
    events_id = db.Column(db.Integer, db.ForeignKey('events.id'))

    def __repr__(self):
        return '<Payment %r>' % self.id
    
    def serialize(self):
        return {
            "id": self.id,
            "purchase_date": self.purchase_date,
            "price": self.price,
            "user_profile_id": self.user_profile_id,
            "events_id": self.events_id,
        }

class Favorites(db.Model):
    __tablename__ = 'favorites'
    id = db.Column(db.Integer, primary_key=True)
    events = db.Column(db.String(250))
    venue = db.Column(db.String(250))

    def __repr__(self):
        return '<Favorites %r>' % self.id
    
    def serialize(self):
        return {
            "id": self.id,
            "events": self.events,
            "venue": self.venue,
        }
    
class Venue(db.Model):
    __tablename__ = 'venue'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250))
    email = db.Column(db.String(250))
    number = db.Column(db.Integer)
    capacity = db.Column(db.String(250))
    address = db.Column(db.String(250))
    classification = db.Column(db.String(250))
    events_id = db.Column(db.Integer, db.ForeignKey('events.id'))

    events = db.relationship("Events", backref="venue", lazy=True)
    comments_venue = db.relationship("CommentsVenue", backref="venue", lazy=True)

    def __repr__(self):
        return '<Venue %r>' % self.name
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "number": self.number,
            "capacity": self.capacity,
            "address": self.address,
            "classification": self.classification,
            "events_id": self.events_id,
        }    
    
class CommentsEvents(db.Model):
    __tablename__ = 'commentsEvents'
    id = db.Column(db.Integer, primary_key=True)
    user_profile_id = db.Column(db.Integer, db.ForeignKey('userProfile.id'))
    events_id = db.Column(db.Integer, db.ForeignKey('events.id'))
    content = db.Column(db.String(250))
    date = db.Column(db.String(250))
    rating = db.Column(db.String(250))

    def __repr__(self):
        return '<CommentsEvents %r>' % self.id
    
    def serialize(self):
        return {
            "id": self.id,
            "user_profile_id": self.user_profile_id,
            "events_id": self.events_id,
            "content": self.content,
            "date": self.date,
            "rating": self.rating,
        }   
    
class CommentsVenue(db.Model):
    __tablename__ = 'commentsVenue'
    id = db.Column(db.Integer, primary_key=True)
    user_profile_id = db.Column(db.Integer, db.ForeignKey('userProfile.id'))
    venue_id = db.Column(db.Integer, db.ForeignKey('venue.id'))
    content = db.Column(db.String(250))
    date = db.Column(db.String(250))
    rating = db.Column(db.String(250))

    def __repr__(self):
        return '<CommentsVenue %r>' % self.id
    
    def serialize(self):
        return {
            "id": self.id,
            "user_profile_id": self.user_profile_id,
            "venue_id": self.venue_id,
            "content": self.content,
            "date": self.date,
            "rating": self.rating,
        }  
    
class Events(db.Model):
    __tablename__ = 'events'
    id = db.Column(db.Integer, primary_key=True)
    name_event = db.Column(db.String(250), )
    style = db.Column(db.String(250), )
    date = db.Column(db.String(250), )
    price = db.Column(db.String(250), )
    description = db.Column(db.String(250))

    def __repr__(self):
        return '<Events %r>' % self.name_event
    
    def serialize(self):
        return {
            "id": self.id,
            "name_event": self.name_event,
            "style": self.style,
            "date": self.date,
            "price": self.price,
            "description": self.description,
        }
