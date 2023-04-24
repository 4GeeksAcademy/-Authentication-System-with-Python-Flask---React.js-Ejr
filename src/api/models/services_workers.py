from api.models.db import db

class Services_workers(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    worker_id = db.Column(db.Integer, db.ForeignKey("workers.id"))
    service_id = db.Column(db.Integer, db.ForeignKey("services.id"))
    services = db.relationship("Services")
    workers = db.relationship("Workers")

    def __init__(self,worker_id, service_id):
        self.worker_id = worker_id
        self.service_id = service_id

    def serialize(self):
        return {
        "id": self.id,
        "worker_id": self.worker_id,
        "service_id": self.service_id,
        }