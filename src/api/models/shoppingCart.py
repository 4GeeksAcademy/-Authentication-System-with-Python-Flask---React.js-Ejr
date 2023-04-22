from api.models.db import db

class ShoppingCart(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    user_id =db.Column(db.Integer, unique=False, nullable = False)
    products_id =db.Column(db.Integer, unique=False, nullable = False)
    total_price = db.Column(db.String(250), nullable = False) 
    
    def __init__(self,user_id,product_id,total_price,price,stock):
        self.user_id = user_id
        self.products_id = product_id
        self.total_price = total_price
      
    
    def serialize(self):
        return {
        "id": self.id,
        "user_id": self.user_id,
        "product_id": self.product_id,
        "total_price": self.total_price,
        }
    