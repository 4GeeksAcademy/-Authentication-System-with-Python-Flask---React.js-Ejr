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

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    service_workers_id = db.Column(db.Integer, db.ForeignKey("services.id"))
    created_at = db.Column(db.DateTime(timezone=False))
    start_service = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.utcnow)
    user = db.relationship("User", back_populates = "booking")
    serviceworkers = db.relationship("ServiceWorkers", back_populates = "booking")

    def __init__(self, user_id, service_workers_id):
        self.user_id = user_id
        self.service_workers_id = service_workers_id

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "service_workers_id": self.service_workers_id,
            "start_service": self.start_service
        }
    
    def serialize_populate(self):
        return {
            "service_workers_id": self.service_workers_id,
            "start_service": self.start_service
        }