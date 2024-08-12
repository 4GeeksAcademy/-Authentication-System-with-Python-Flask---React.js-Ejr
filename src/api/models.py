import os
import sys
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(250), nullable=True)
    email = db.Column(db.String(250), nullable=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('userProfile.id'), nullable=True)
    partner = db.Column(db.Boolean, nullable=True)
    partner_profile_id = db.Column(db.Integer, db.ForeignKey('partnerProfile.id'), nullable=True)

    profile = db.relationship("UserProfile", backref="user", lazy=True)
    partner_profile = db.relationship("PartnerProfile", backref="user", lazy=True)

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
        }

class UserProfile(db.Model):
    __tablename__ = 'userProfile'
    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(250), nullable=True)
    city = db.Column(db.String(250), nullable=True)
    country = db.Column(db.String(250), nullable=True)
    event_style = db.Column(db.String(250), nullable=True)
    id_favorites = db.Column(db.Integer, db.ForeignKey('favorites.id'), nullable=True)

    favorites = db.relationship("Favorites", backref="user_profile", lazy=True)

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
    name = db.Column(db.String(250), nullable=True)
    description = db.Column(db.String(1000), nullable=True)
    venue_id = db.Column(db.Integer, db.ForeignKey('venue.id'), nullable=True)

    venue = db.relationship("Venue", backref="partner_profile", lazy=True)
    

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
    purchase_date = db.Column(db.String(250), nullable=True)
    price = db.Column(db.String(250), nullable=True)
    user_profile_id = db.Column(db.Integer, db.ForeignKey('userProfile.id'), nullable=True)
    events_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=True)

    user_profile = db.relationship("UserProfile", backref="payments", lazy=True)
    events = db.relationship("Events", backref="payments", lazy=True)

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
    events = db.Column(db.String(250), nullable=True)
    venue = db.Column(db.String(250), nullable=True)

    def __repr__(self):
        return '<Payment %r>' % self.id
    
    def serialize(self):
        return {
            "id": self.id,
            "events": self.events,
            "venue": self.venue,
        }
    
class Venue(db.Model):
    __tablename__ = 'venue'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=True)
    email = db.Column(db.String(250), nullable=True)
    number = db.Column(db.Integer, nullable=True)
    capacity = db.Column(db.String(250), nullable=True)
    address = db.Column(db.String(250), nullable=True)
    clasification = db.Column(db.String(250), nullable=True)
    events_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=True)

    events = db.relationship("Events", backref="venue", lazy=True)

    def __repr__(self):
        return '<Payment %r>' % self.name
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "number": self.number,
            "capacity": self.capacity,
            "address": self.address,
            "clasification": self.clasification,
            "events_id": self.events_id,
        }    
    
class CommentsEvents(db.Model):
    __tablename__ = 'commentsEvents'
    id = db.Column(db.Integer, primary_key=True)
    user_profile_id = db.Column(db.Integer, db.ForeignKey('userProfile.id'), nullable=True)
    events_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=True)
    content = db.Column(db.String(250), nullable=True)
    date = db.Column(db.String(250), nullable=True)
    rating = db.Column(db.String(250), nullable=True)

    user_profile = db.relationship("UserProfile", backref="comments_events", lazy=True)
    events = db.relationship("Events", backref="comments_events", lazy=True)

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
    user_profile_id = db.Column(db.Integer, db.ForeignKey('userProfile.id'), nullable=True)
    venue_id = db.Column(db.Integer, db.ForeignKey('venue.id'), nullable=True)
    content = db.Column(db.String(250), nullable=True)
    date = db.Column(db.String(250), nullable=True)
    rating = db.Column(db.String(250), nullable=True)

    user_profile = db.relationship("UserProfile", backref="comments_venue", lazy=True)
    venue = db.relationship("Venue", backref="comments_venue", lazy=True)

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
    name_event = db.Column(db.String(250), nullable=True)
    payment_id = db.Column(db.Integer, db.ForeignKey('payment.id'), nullable=True)
    style = db.Column(db.String(250), nullable=True)
    date = db.Column(db.String(250), nullable=True)
    price = db.Column(db.String(250), nullable=True)
    description = db.Column(db.String(250), nullable=True)

    payment = db.relationship("Payment", backref="events", lazy=True)

    def __repr__(self):
        return '<Events %r>' % self.name_event
    
    def serialize(self):
        return {
            "id": self.id,
            "name_event": self.name_event,
            "payment_id": self.payment_id,
            "style": self.style,
            "date": self.date,
        }
    


    def to_dict(self):
        return {}

## Draw from SQLAlchemy base