import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String, Boolean
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    username = Column(String(250), nullable=True)
    email = Column(String(250), nullable=True)
    profile_id = Column(Integer, ForeignKey('userProfile.id'), nullable=True)
    partner = Column(Boolean, nullable=True)
    partner_profile_id = Column(Integer, ForeignKey('partnerProfile.id'), nullable=True)

    profile = relationship("UserProfile", backref="user", lazy=True)
    partner_profile = relationship("PartnerProfile", backref="user", lazy=True)

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
    id = Column(Integer, primary_key=True)
    address = Column(String(250), nullable=True)
    city = Column(String(250), nullable=True)
    country = Column(String(250), nullable=True)
    event_style = Column(String(250), nullable=True)
    id_favorites = Column(Integer, ForeignKey('favorites.id'), nullable=True)

    favorites = relationship("Favorites", backref="user_profile", lazy=True)

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
    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=True)
    description = Column(String(1000), nullable=True)
    venue_id = Column(Integer, ForeignKey('venue.id'), nullable=True)

    venue = relationship("Venue", backref="partner_profile", lazy=True)
    

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
    id = Column(Integer, primary_key=True)
    purchase_date = Column(String(250), nullable=True)
    price = Column(String(250), nullable=True)
    user_profile_id = Column(Integer, ForeignKey('userProfile.id'), nullable=True)
    events_id = Column(Integer, ForeignKey('events.id'), nullable=True)

    user_profile = relationship("UserProfile", backref="payments", lazy=True)
    events = relationship("Events", backref="payments", lazy=True)

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
    id = Column(Integer, primary_key=True)
    events = Column(String(250), nullable=True)
    venue = Column(String(250), nullable=True)

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
    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=True)
    email = Column(String(250), nullable=True)
    number = Column(Integer, nullable=True)
    capacity = Column(String(250), nullable=True)
    address = Column(String(250), nullable=True)
    clasification = Column(String(250), nullable=True)
    events_id = Column(Integer, ForeignKey('events.id'), nullable=True)

    events = relationship("Events", backref="venue", lazy=True)

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
    id = Column(Integer, primary_key=True)
    user_profile_id = Column(Integer, ForeignKey('userProfile.id'), nullable=True)
    events_id = Column(Integer, ForeignKey('events.id'), nullable=True)
    content = Column(String(250), nullable=True)
    date = Column(String(250), nullable=True)
    rating = Column(String(250), nullable=True)

    user_profile = relationship("UserProfile", backref="comments_events", lazy=True)
    events = relationship("Events", backref="comments_events", lazy=True)

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
    id = Column(Integer, primary_key=True)
    user_profile_id = Column(Integer, ForeignKey('userProfile.id'), nullable=True)
    venue_id = Column(Integer, ForeignKey('venue.id'), nullable=True)
    content = Column(String(250), nullable=True)
    date = Column(String(250), nullable=True)
    rating = Column(String(250), nullable=True)

    user_profile = relationship("UserProfile", backref="comments_venue", lazy=True)
    venue = relationship("Venue", backref="comments_venue", lazy=True)

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
    id = Column(Integer, primary_key=True)
    name_event = Column(String(250), nullable=True)
    payment_id = Column(Integer, ForeignKey('payment.id'), nullable=True)
    style = Column(String(250), nullable=True)
    date = Column(String(250), nullable=True)
    price = Column(String(250), nullable=True)
    description = Column(String(250), nullable=True)

    payment = relationship("Payment", backref="events", lazy=True)

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