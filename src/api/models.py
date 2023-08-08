from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(200))
    location = db.Column(db.String(100))
    payment_method = db.Column(db.String(100))
    is_admin = db.Column(db.Boolean, default=False)

    favorites = db.relationship('Product', secondary='favorites')
    shopping_cart = db.relationship('ShoppingCart', back_populates='user')
    orders = db.relationship('Order', back_populates='user')
    voted_products = db.relationship('ProductsRating', back_populates='user')

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            'id': self.id,
            'last_name': self.last_name,
            'first_name': self.first_name,
            'email': self.email,
            'address': self.address,
            'location': self.location,
            'payment_method': self.payment_method,
            'is_admin': self.is_admin,
        }
    
favorites = db.Table(
    'favorites',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('product_id', db.Integer, db.ForeignKey('products.id'), primary_key=True),
)
    
class Product(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(1000))
    color = db.Column(db.String(50))
    type = db.Column(db.String(100))
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)

    images = db.relationship('ProductImage', back_populates='product')
    category = db.relationship('Category', back_populates='products')
    orders = db.relationship('OrderItems', back_populates='product')
    sizes_stock = db.relationship('ProductSizeStock', back_populates='product')
    users_ratings = db.relationship('ProductsRating', back_populates='product')
    shopping_carts = db.relationship('ShoppingCart', back_populates='product')

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'description': self.description,
            'color': self.color,
            'type': self.type,
            'sizes_stock': [size_stock.serialize() for size_stock in self.sizes_stock],
            'category_id': self.category_id,
            'rating': self.calculate_rating(),
            'images': self.serialize_sorted_images(),
            'rating_count': len(self.users_ratings),
        }
    
    def serialize_rating(self):
        return {
            'id': self.id,
            'name': self.name,
            'rating': self.calculate_rating(),
            'users_ratings': [rating.serialize() for rating in self.users_ratings]
        }
    
    def serialize_sorted_images(self):
        return [image.serialize() for image in sorted(self.images, key=lambda image: image.order)]
    
    def calculate_rating(self):
        total_rating = sum(rating.rating for rating in self.users_ratings)
        average_rating = total_rating / len(self.users_ratings) if self.users_ratings else 0
        return average_rating
    
class ProductImage(db.Model):
    __tablename__ = 'product_images'
    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(500), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    order = db.Column(db.Integer, nullable=False, default=0)

    product = db.relationship('Product', back_populates='images')

    def serialize(self):
        return {
            'id': self.id,
            'order': self.order,
            'image_url': self.image_url,
            'product_id': self.product_id,
        }
    
class ProductSizeStock(db.Model):
    __tablename__= 'product_sizes_stock'
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), primary_key=True)
    size_id = db.Column(db.Integer, db.ForeignKey('sizes.id'), primary_key=True)
    stock = db.Column(db.Integer, nullable=False, default=0)

    product = db.relationship("Product", back_populates="sizes_stock")
    size = db.relationship("Size", back_populates="products")
    def serialize(self):
        return {
            'id': self.size.id,
            'size': self.size.name,
            'stock': self.stock,
        }
    
class ShoppingCart(db.Model):
    __tablename__ = 'shopping_carts'
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), primary_key=True)
    size_id = db.Column(db.Integer, db.ForeignKey('sizes.id'), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False, default=1)

    user = db.relationship('User', back_populates='shopping_cart')
    product = db.relationship('Product', back_populates='shopping_carts')
    size = db.relationship('Size')

    def serialize(self):
        return {
            'product': self.product.serialize(),
            'quantity': self.quantity,
            'size': self.size.serialize(),
        }

class ProductsRating(db.Model):
    __tablename__= 'products_rating'
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    rating = db.Column(db.Float, nullable=False, default=0)

    product = db.relationship("Product", back_populates="users_ratings")
    user = db.relationship("User", back_populates="voted_products")

    __table_args__ = (
        db.CheckConstraint(rating >= 0, name='check_rating_min'),
        db.CheckConstraint(rating <= 5, name='check_rating_max'),
    )

    def serialize(self):
        return {
            'user_id': self.user.id,
            'product_id': self.product.id,
            'rating': self.rating,
        }
    
class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    order_date = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(50))

    user = db.relationship('User', back_populates='orders')
    products = db.relationship('OrderItems', back_populates='order')

    def serialize(self):
        return {
            'id': self.id,
            'user': self.user.serialize(),
            'order_date': self.order_date,
            'status': self.status,
            'products': [p.serialize() for p in self.products]
        }

class OrderItems(db.Model):
    __tablename__ = 'order_items'
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False, default=1)

    product = db.relationship('Product', back_populates='orders')
    order = db.relationship('Order', back_populates='products')

    def serialize(self):
        return {
            'product': self.product.serialize(),
            'quantity': self.quantity
        }

    
class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    name = db.Column(db.String(100), nullable=False, unique=True)

    products = db.relationship('Product', back_populates='category')

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
        }
    
class Size(db.Model):
    __tablename__ = 'sizes'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    products = db.relationship('ProductSizeStock', back_populates='size')
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
        }