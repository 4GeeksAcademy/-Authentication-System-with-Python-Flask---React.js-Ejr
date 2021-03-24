from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(200), unique=True, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=False)
    username = db.Column(db.String(200), unique=True, nullable=False)
    typeuser = db.Column(db.String(200), unique=False, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username
            # do not serialize the password, its a security breach
        }

class Category(db.Model):
    __tablename__ = 'category'
    id = db.Column(db.Integer,primary_key=True)
    name_category = db.Column(db.String(50), nullable=False)
    # subcategory = db.relationship('Subcategory', backref="category", lazy=True)
    def serialize(self):
        return {
            "id": self.id,
            "name_category": self.name_category
        }