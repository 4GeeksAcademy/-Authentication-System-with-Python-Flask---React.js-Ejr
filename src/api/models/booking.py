
from api.models.db import db
from sqlalchemy import DateTime
import datetime 

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=True)
    company_id = db.Column(db.Integer, db.ForeignKey("company.id"))
    service_workers_id = db.Column(db.Integer, db.ForeignKey("services_workers.id"))
    created_at = db.Column(DateTime, default=datetime.datetime.utcnow())
    start_service = db.Column(DateTime, nullable=False)
    description = db.Column(db.Text)
    user = db.relationship("User")
    services_workers = db.relationship("Services_workers", back_populates="booking")

    def __init__(self, user_id, company_id, service_workers_id, start_service, description):
        self.user_id = user_id
        self.company_id = company_id
        self.service_workers_id = service_workers_id
        self.start_service = start_service
        self.description = description

    def serialize(self):
        return {
            "id": self.id, 
            "created_at": self.created_at,
            "company_id": self.company_id,
            "start_service": self.start_service,
            "description": self.description,
            "user_id": self.user_id,
            "user": self.user.serialize(),
            "service_workers_id": self.service_workers_id,
            "services_workers": self.services_workers.serialize()
        }

    def serialize_admin_booking(self):
        return {
            "id": self.id, 
            "created_at": self.created_at,
            "company_id": self.company_id,
            "start_service": self.start_service,
            "description": self.description,
            "service_workers_id": self.service_workers_id,
            "services_workers": self.services_workers.serialize()
        }