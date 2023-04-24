from api.models.db import db

class Products(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    company_id =db.Column(db.Integer, db.ForeignKey("company.id"))
    name = db.Column(db.String(250), unique=False, nullable = False) 
    description = db.Column(db.String(250), unique=False, nullable = False) 
    price = db.Column(db.String(250), unique=False, nullable = False) 
    stock = db.Column(db.String(250), unique=False, nullable = False) 
    company = db.relationship("Company")
    
    def __init__(self,company_id,name,description,price,stock):
        self.company_id = company_id
        self.name = name
        self.description = description
        self.price = price
        self.stock = stock
    
    def serialize(self):
        return {
            "id": self.id,
            "company_id": self.company_id,
            "name": self.name,
            "description": self.description,
            "price":self.price,
            "stock": self.stock,
        }

