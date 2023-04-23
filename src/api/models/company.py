from api.models.db import db
from datetime import datetime


class Company(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship("User", back_populates="company")    
    avatar = db.Column(db.String(250), nullable=True)
    address = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    cp = db.Column(db.Integer(), nullable=False)
    cif = db.Column(db.String(10), unique=True, nullable=False)
    review = db.relationship('Review', back_populates='company')
    favs = db.relationship("Favorites", back_populates="company") 
    data_create = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, address, city, cp, cif):

        self.address = address
        self.city = city
        self.cp = cp
        self.cif = cif

    def serialize(self):
        return{
        "user_id" : self.user_id,
        "id" : self.id,
        "address" : self.address,
        "city" : self.city,
        "cp" : self.cp,
        "cif" : self.cif
        }