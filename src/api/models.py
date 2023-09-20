from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
from sqlalchemy import ForeignKey

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    lastname = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(250), nullable=False)
    region = db.Column(db.String(120), nullable=False)
    photo = db.Column(db.String(120), default="no-photo.png")
    messsage_from = db.relationship('Message', foreign_keys="[Message.user_from_id]", backref='user_from')
    messsage_to = db.relationship('Message', foreign_keys='[Message.user_to_id]', backref='user_to')
    # roles = db.relationship('Role', secondary=roles_users)
    # is_active = db.Column(db.Boolean(), unique=False, nullable=False)

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

# <--TABLA LIBRO-------------------------------------------->
class Book(db.Model):
    __tablename__ = 'book'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    author = db.Column(db.String(120), nullable=False)
    cathegory = db.Column(db.String(120),  default="sin categoria")
    number_of_pages = db.Column(db.String(120))
    description = db.Column(db.String(250))
    price = db.Column(db.String(120))
    photo = db.Column(db.String(120), default="no-photo.png")
    

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "cathegory": self.cathegory,
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
        
#-----< Tabla imagen >---------------------------------------->
class Gallery(db.Model):
    __tablename__= 'gallery'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), nullable=True)
    image = db.Column(db.String(250), nullable=True)
    public_id = db.Column(db.String(250), nullable=True)
    
    def serialize(self):
        return{
            "id": self.id,
            "title": self.title,
            "image": self.image
        }    
        
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def update(self):
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()    
    
#-----< Tabla imagen >---------------------------------------->
class Message(db.Model):
    __tablename__='message'
    id = db.Column(db.Integer, primary_key= True)
    message = db.Column(db.Text(), default=" ")
    user_from_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user_to_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.DateTime(), default=db.func.now())
    
    
    def serialize(self):
        return {
            
            "id":self.id,
            "message": self.message,
            "user_from_id": self.user_from_id,
            "user_to_id": self.user_to_id,
            "date": self.date,
            "user_from":self.user_from.serialize(),
            "user_to":self.user_to.serialize()

        }
            
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def update(self):
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()    