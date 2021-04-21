from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    UserID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(100), unique=True, nullable=False)
    Password = db.Column(db.String(30), nullable=False)
    Email = db.Column(db.String(180), unique=True, nullable=False)
    TypeID = db.Column(db.Integer, db.ForeignKey("usertypes.TypeID"), nullable=False)
    usertypes = db.relationship('UserTypes')  

class UserTypes(db.Model):
    __tablename__ = 'usertypes'
    TypeID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(10), unique=True, nullable=False)

class OrderType(db.Model):
    __tablename__ = 'ordertype'
    OrderTypeID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(15), unique=True, nullable=False)

class Category(db.Model):
    __tablename__ = 'category'
    CategoryID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(10), unique=True, nullable=False)

class Product(db.Model):
    __tablename__ = 'product'
    ProductID = db.Column(db.Integer, primary_key=True)
    CategoryID = db.Column(db.Integer, db.ForeignKey("category.CategoryID"), nullable=True) #if is null it has to appear in all categories
    Name = db.Column(db.String(100), nullable=False)
    Price = db.Column(db.Numeric(18,2), nullable=False)
    Description = db.Column(db.String(300), nullable=True)
    ImageURL = db.Column(db.String(500), nullable=True)
    Available = db.Column(db.Boolean(), nullable=False)
    category = db.relationship('Category')  

class Order(db.Model):
    __tablename__ = 'order'
    OrderID = db.Column(db.Integer, primary_key=True)
    OrderTypeID = db.Column(db.Integer, db.ForeignKey("ordertype.OrderTypeID"), nullable=False)
    OrderDate = db.Column(db.DateTime, nullable=False)
    State = db.Column(db.String(15), nullable=False)
    EstimatedTime = db.Column(db.Integer, nullable=True)
    Notes = db.Column(db.String(500), nullable=True)
    SubTotal = db.Column(db.Numeric(18,2), nullable=False)
    Discount = db.Column(db.Numeric(18,2), nullable=False)
    Tax = db.Column(db.Numeric(18,2), nullable=False)
    Total = db.Column(db.Numeric(18,2), nullable=False)
    ClientName = db.Column(db.String(100), nullable=True)
    ordertype = db.relationship('OrderType')  

class OrderDetail(db.Model):
    __tablename__ = 'orderdetail'
    OrderDetailID = db.Column(db.Integer, primary_key=True)
    OrderID = db.Column(db.Integer, db.ForeignKey("order.OrderID"), nullable=False)
    ProductID = db.Column(db.Integer, db.ForeignKey("product.ProductID"), nullable=False)
    Quantity = db.Column(db.Integer, nullable=False)
    SubTotal = db.Column(db.Numeric(18,2), nullable=False)
    Discount = db.Column(db.Numeric(18,2), nullable=False)
    Tax = db.Column(db.Numeric(18,2), nullable=False)
    Total = db.Column(db.Numeric(18,2), nullable=False)
    order = db.relationship('Order')  
    product = db.relationship('Product')  