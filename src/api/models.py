from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    rol_id = db.Column(db.String, foreign_key=True)
    name = db.Column(db.String(120), nullable=False)
    lastname = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(250), nullable=False)
    region = db.Column(db.String(120), nullable=False)
    photo = db.Column(db.String(120), default="no-photo.png")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "email": self.email,
            "region": self.region,
            "photo": self.photo
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

# <--TABLA LIBRO-------------------------------------------------------------------------------------------------->


class Book(db.Model):
    __tablename__ = 'book'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    author = db.Column(db.String(120), nullable=False)
    number_of_pages = db.Column(db.String(120))
    description = db.Column(db.String(250))
    price = db.Column(db.String(120))
    photo = db.Column(db.String(120), default="no-photo.png")

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "number_of_pages": self.number_of_pages,
            "description": self.description,
            "price": self.price,
            "photo": self.photo
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
