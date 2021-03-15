from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id_Document_User = db.Column(db.String(25), primary_key=True)
    name_User = db.Column(db.String(120), nullable=False)
    active_User = db.Column(db.String(80), nullable=False)
    properties = db.relationship('User_Details', backref='user', lazy=True)
    move = db.relationship('Movement_Inventory', backref='user', lazy=True)

    def __repr__(self):
        return '<User %r>' % self.name_User

    def serialize(self):
        return {
            "id_Document_User": self.id_Document_User,
            "name_User": self.name_User,
            "active_User": self.active_User,
            "properties": list(map(lambda det_properties: det_properties.serialize(),self.properties))
        
            }
class User_Details(db.Model):
    id_User_Details = db.Column(db.Integer, primary_key=True)
    id_Document_User = db.Column(db.String(25), db.ForeignKey('user.id_Document_User'), nullable=False)
    email_User_Details = db.Column(db.String(50), nullable=False)
    password_User_Details = db.Column(db.String(300), nullable=False)
    cargo_User_Details = db.Column(db.String(20), nullable=False)
    phone_User_Details = db.Column(db.String(30), nullable=False)
    address_Details = db.Column(db.String(250), nullable=False)

    def __repr__(self):
        return '<User_Details %r>' % self.id_User_Details

    def serialize(self):
        return {
            "id_Document_User": self.id_User_Details,
            'id_Document_User': self.id_Document_User,
            'email_User_Details':self.email_User_Details,
            'cargo_User_Details':self.cargo_User_Details,
            'phone_User_Details':self.phone_User_Details,
            'address_Details': self.address_Details

        }
class Provider(db.Model):
    id_Provider = db.Column(db.String(25), primary_key=True)
    name_Provider = db.Column(db.String(120), nullable=False)
    active_Provider = db.Column(db.String(80), nullable=False)
    properties = db.relationship('Provider_Details', backref='provider', lazy=True)
    product = db.relationship('Product', backref='provider', lazy=True)

    def __repr__(self):
        return '<Provider %r>' % self.name_Provider

    def serialize(self):
        return {
            "id_Provider": self.id_Provider,
            "name_Provider": self.name_Provider,
            "active_Provider": self.active_Provider,
            "properties": list(map(lambda det_properties: det_properties.serialize(),self.properties))
        
            }
class Provider_Details(db.Model):
    id_Provider_Details = db.Column(db.String(25), primary_key=True)
    id_Provider = db.Column(db.String(25), db.ForeignKey('provider.id_Provider'), nullable=False)
    email_Provider_Details = db.Column(db.String(25), nullable=False)
    phone_Provider_Details = db.Column(db.String(30), nullable=False)
    address_Provider_Details = db.Column(db.String(250), nullable=False)
    payment_Type_Provider_Details = db.Column(db.String(30), nullable=False)
    

    def __repr__(self):
        return '<Provider_Details %r>' % self.id_Provider_Details

    def serialize(self):
        return {
            "id_Provider_Details": self.id_Provider_Details,
            'id_Provider':self.id_Provider,
            'email_Provider_Details':self.email_Provider_Details,
            'phone_Provider_Details':self.phone_Provider_Details,
            'address_Provider_Details':self.address_Provider_Details,
            'payment_Type_Provider_Details': self.payment_Type_Provider_Details
        }
class Category(db.Model):
    id_Category = db.Column(db.Integer, primary_key=True)
    name_Category = db.Column(db.String(120), nullable=False)
    description_Category = db.Column(db.Integer, nullable=False)
    active_Product = db.Column(db.String(3), nullable=False)
    properties = db.relationship('Product', backref='category', lazy=True)
   
    def __repr__(self):
        return '<Category %r>' % self.name_Category

    def serialize(self):
        return {
            'id_Category':self.id_Category,
            'name_Category':self.name_Category,
            'description_Category':self.description_Category,
            'active_Product':self.active_Product
            }
class Product(db.Model):
    id_Product = db.Column(db.String(25), primary_key=True)
    name_Product = db.Column(db.String(120), nullable=False)
    id_Category = db.Column(db.Integer, db.ForeignKey('category.id_Category') , nullable=False)
    id_Provider = db.Column(db.String(25), db.ForeignKey('provider.id_Provider') , nullable=False)
    active_Product = db.Column(db.String(3), nullable=False)
    properties = db.relationship('Product_Details', backref='product', lazy=True)
    inventory = db.relationship('Inventory', backref='product', lazy=True)
    move = db.relationship('Movement_Inventory', backref='product', lazy=True)

    def __repr__(self):
        return '<Product %r>' % self.name_Product

    def serialize(self):
        return {
            "id_Product ": self.id_Product,
            "name_Product": self.name_Product,
            "id_Category": self.id_Category,
            'id_Provider':self.id_Provider,
            'active_Product':self.active_Product,
            "properties": list(map(lambda det_properties: det_properties.serialize(),self.properties))
        
            }
class Product_Details(db.Model):
    id_Product_Details = db.Column(db.Integer, primary_key=True)
    id_Product = db.Column(db.String(25), db.ForeignKey('product.id_Product') )
    trade_Product_Details = db.Column(db.String(30), nullable=False)
    image_Product_Details = db.Column(db.String(150), nullable=False)
    tax_Product_Details = db.Column(db.Float, nullable=False)
    description_Product_Details = db.Column(db.String(350), nullable=False)
    price_In_Product_Details = db.Column(db.Float, nullable=False)
    profit_Product_Details = db.Column(db.Float, nullable=False)
    price_Out_Product_Details = db.Column(db.Float, nullable=False)
    discount_Product_Details = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return '<Product_Details %r>' % self.id_Product_Details

    def serialize(self):
        return {
            'id_Product_Details':self.id_Product_Details,
            'id_Product': self.id_Product,
            'trade_Product_Details':self.trade_Product_Details,
            'image_Product_Details':self.image_Product_Details,
            'tax_Product_Details':self.tax_Product_Details,
            'description_Product_Details':self.description_Product_Details,
            'price_In_Product_Details':self.price_In_Product_Details,
            'profit_Product_Details':self.profit_Product_Details,
            'price_Out_Product_Details':self.price_Out_Product_Details,
            'discount_Product_Details':self.discount_Product_Details
        }      
class Inventory(db.Model):
    id_Inventory = db.Column(db.Integer, primary_key=True)
    id_Product  = db.Column(db.String(120), db.ForeignKey('product.id_Product'), nullable=False)
    quantity_Product_Inventory = db.Column(db.Integer, nullable=False)
    max_Product_Inventory = db.Column(db.String(3), nullable=False)
    min_Product_Inventory = db.Column(db.Float, nullable= False)
    total_Cost_Inventory = db.Column(db.Float, nullable= False)

    def __repr__(self):
        return '<Inventory %r>' % self.id_Inventory

    def serialize(self):
        return {
            'id_Inventory':self.id_Inventory,
            'id_Product':self.id_Product,
            'quantity_Product_Inventory':self.quantity_Product_Inventory,
            'max_Product_Inventory':self.max_Product_Inventory,
            'min_Product_Inventory':self.min_Product_Inventory,
            'total_Cost_Inventory':selftotal_Cost_Inventory
            }
class Movement_Inventory(db.Model):
    id_Movement = db.Column(db.Integer, primary_key=True)
    id_Product  = db.Column(db.String(25), db.ForeignKey('product.id_Product'), nullable=False)
    id_Document_User = db.Column(db.String(120), db.ForeignKey('user.id_Document_User'), nullable=False)
    id_Orden = db.Column(db.String(50), nullable=False)
    quantity_Product_Movement = db.Column(db.Float, nullable=False)
    type_Movement = db.Column(db.String(3), nullable=False)
    date_Movement = db.Column(db.Date, nullable= False)

    def __repr__(self):
        return '<Movement_Inventory %r>' % self.id_Movement

    def serialize(self):
        return {
            'id_Movement':self.id_Movement,
            'id_Product':self.id_Product,
            'id_Document_User':self.id_Document_User,
            'id_Orden':self.id_Orden,
            'quantity_Product_Movement':self.quantity_Product_Movement,
            'type_Movement':self.type_Movement,
            'date_Movement':self.date_Movement        
            }















