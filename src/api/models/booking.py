
from api.models.db import db
from sqlalchemy import DateTime
import datetime 

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    service_workers_id = db.Column(db.Integer, db.ForeignKey("services_workers.id"))
    created_at = db.Column(DateTime, default=datetime.datetime.utcnow())
    start_service = db.Column(DateTime, nullable=False)
    end_service = db.Column(DateTime, nullable=False)
    user = db.relationship("User")
    services_workers = db.relationship("Services_workers")

    def __init__(self, user_id, service_workers_id, created_at, start_service, end_service):
        self.user_id = user_id
        self.service_workers_id = service_workers_id
        self.created_at = created_at
        self.start_service = start_service
        self.end_service = end_service

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "service_workers_id": self.service_workers_id, 
            "created_at": self.created_at,
            "start_service": self.start_service, 
            "end_service": self.end_service
        }