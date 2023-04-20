from api.models.db import db


class Services(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    company_id =db.Column(db.Integer, unique=False, nullable = False)
    date = db.Column(db.String(250), unique=False, nullable = False) 
    name = db.Column(db.String(250), unique=False, nullable = False) 
    description = db.Column(db.String(250), unique=False, nullable = False) 
    service_duration = db.Column(db.String(250), unique=False, nullable = False) 
    price = db.Column(db.String(250), unique=False, nullable = False) 
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __init__(self,company_id,date,name,description,service_duration):
        self.company_id = company_id
        self.date = date
        self.name = name
        self.description = description
        self.service_duration = service_duration
        self.price = price
        self.is_active = True
    
    def serialize(self):
        return {
        "id": self.id,
        "company_id": self.company_id,
        "date": self.date,
        "name": self.name,
        "description": self.description,
        "service_duration": self.service_duration,
        "price":self.price,
        "is_active":self.is_active,
        }
