from api.models.db import db

class ServicesWorkers(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    worked_id =db.Column(db.Integer, unique=False, nullable = False)
    service_id =db.Column(db.Integer, unique=False, nullable = False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __init__(self,worked_id,service_id):
        self.worked_id = worked_id
        self.service_id = service_id
        self.is_active = True
    
    def serialize(self):
        return {
        "id": self.id,
        "worked_id": self.worked_id,
        "service_id": self.service_id,
        "is_active":self.is_active,
        }