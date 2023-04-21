from api.models.db import db

class ServicesWorkers(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    workes_id =db.Column(db.Integer, db.ForeignKey("workers.id"), unique=False, nullable = False)
    workers = db.relationship("Workers")
    service_id =db.Column(db.Integer, db.ForeignKey("services.id"), unique=False, nullable = False)
    services = db.relationship("Services")

    def __init__(self,worked_id,service_id):
        self.worked_id = worked_id
        self.service_id = service_id
    
    def serialize(self):
        return {
        "id": self.id,
        "worked_id": self.worked_id,
        "service_id": self.service_id,
        }