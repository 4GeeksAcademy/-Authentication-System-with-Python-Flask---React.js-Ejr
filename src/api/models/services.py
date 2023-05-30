from api.models.db import db
from sqlalchemy import DateTime
import datetime 

class Services(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    company_id =db.Column(db.Integer, db.ForeignKey("company.id"))
    created_at = db.Column(DateTime, default=datetime.datetime.utcnow())
    name = db.Column(db.String(250), unique=False, nullable = False) 
    description = db.Column(db.String(250), unique=False, nullable = False) 
    service_duration = db.Column(db.Integer, unique=False, nullable = False) 
    price = db.Column(db.Float, unique=False, nullable = False) 
    is_active = db.Column(db.Boolean(), nullable=False, default=True)
    company = db.relationship("Company", back_populates="services")

    def __init__(self, company_id, name, description, service_duration, price):
        self.company_id = company_id
        self.name = name
        self.description = description
        self.service_duration = service_duration
        self.price = price
    
    def serialize(self):
        return {
        "id": self.id,
        "created_at": self.created_at,
        "company_id": self.company_id,
        "name": self.name,
        "description": self.description,
        "service_duration": self.service_duration,
        "price": self.price,
        "is_active": self.is_active
        }
    
