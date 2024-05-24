from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "username": self.username
            # do not serialize the password, its a security breach
        }

class Transactions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    products = db.Column(db.Text, nullable=False)
    is_cash = db.Column(db.Boolean, nullable=False)
    is_refunded = db.Column(db.Boolean, nullable=False)
    created = db.Column(db.Date, nullable=False)

    user = db.relationship('User', backref=db.backref('transactions', lazy=True))

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "total_price": self.total_price,
            "products": self.products,
            "is_cash": self.is_cash,
            "is_refunded": self.is_refunded,
            "created": self.created
            # do not serialize the password, its a security breach
        }
