from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    location = db.Column(db.String(50), nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __init__(self, name, email, password, location, is_active):
        self.name = name
        self.email = email 
        self.password = password
        self.location = location
        self.is_active = is_active

class Supermarket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    market_name = db.Column(db.String(60), nullable=False)
    location = db.Column(db.String(60), unique=True ,nullable=False)
    information = db.Column(db.String(255))

    def __init__(self, market_name, location, information):
        self.market_name = market_name
        self.location = location
        self.information = information

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(60), unique=True ,nullable=False)
    price = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    market_id = db.Column(db.Integer, db.ForeignKey('supermarket.id'))

    supermarket = db.relationship('Supermarket')
    
    carts = db.relationship('Cart', backref='product', lazy=True)

    def __init__(self, product_name, price, category):
        self.product_name = product_name
        self.price = price
        self.category = category

class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    user = db.relationship('User')

    def __init__(self, user_id, product_id):
        self.user_id = user_id
        self.product_id = product_id

class Coupons(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    coupon_name = db.Column(db.String(40), nullable=False)
    coupon_info = db.Column(db.String(100))
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    market_id = db.Column(db.Integer, db.ForeignKey('supermarket.id'))
    #Relationships
    product = db.relationship('Product')
    supermarket = db.relationship('Supermarket')

    def __init__(self, coupon_name, coupon_info, product_id, market_id):
        self.coupon_name = coupon_name
        self.coupon_info = coupon_info
        self.product_id = product_id
        self.market_id = market_id

class Couponlist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    coupon_id = db.Column(db.Integer, db.ForeignKey('coupons.id'))
    #Relationships
    user = db.relationship('User')
    coupons = db.relationship('Coupons')
    

    def __init__(self, user_id, coupon_id):
        self.user_id = user_id
        self.coupon_id = coupon_id
