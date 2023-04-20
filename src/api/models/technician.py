from api.models.db import db

class Technician(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(20), unique=True, nullable=False)
    description = db.Column(db.String(300), unique=True, nullable=False)
    phone_number = db.Column(db.Integer, unique=True, nullable=False)
    country = db.Column(db.String(40), unique=True, nullable=False)
    ccaa = db.Column(db.String(40), unique=True, nullable=False)
    speciality = db.Column(db.String(120), unique=True, nullable=False)
    num_ropo = db.Column(db.Integer, unique=True, nullable=False)
    
    
    def __init__(self, id_technician, description, name):
        self.name = name
        self.id_technician =  id_technician
        

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "id_technician": self.id_technician
            
        }