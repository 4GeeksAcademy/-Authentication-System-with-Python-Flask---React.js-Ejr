from api.models.db import db

class Shopping_cart(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    user_id =db.Column(db.Integer, db.ForeignKey("user.id"))
    product_id =db.Column(db.Integer, db.ForeignKey("products.id"))
    total_price = db.Column(db.String(250), nullable = False) 
    user = db.relationship("User")
    products = db.relationship("Products")
    
    def __init__(self, user_id, product_id, total_price):
        self.user_id = user_id
        self.product_id = product_id
        self.total_price = total_price
      
    
    def serialize(self):
        return {
        "id": self.id,
        "user_id": self.user_id,
        "product_id": self.product_id,
        "total_price": self.total_price,
        }
    