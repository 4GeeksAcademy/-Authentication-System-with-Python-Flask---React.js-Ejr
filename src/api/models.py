from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
from sqlalchemy import ForeignKey


roles_user = db.Table(
    'roles_user', 
    db.Column('roles_id', db.Integer, db.ForeignKey('roles.id'), nullable=False, primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), nullable=False, primary_key=True)
)

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    lastname = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(250), nullable=False)
    region = db.Column(db.String(120), nullable=False)
    photo = db.Column(db.String(120), default="no-photo.png")
    message_from = db.relationship('Message', foreign_keys="[Message.user_from_id]", backref='user_from')
    message_to = db.relationship('Message', foreign_keys='[Message.user_to_id]', backref='user_to')
    books_user = db.relationship('Book', backref='user', lazy=True)
    is_active = db.Column(db.Boolean(), default=True)
    roles = db.relationship('Role', secondary=roles_user)  # secondary es la tabla intermedia entres usuarios y roles



    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "email": self.email,
            "region": self.region,
            "photo": self.photo,
            "message_from": self.message_from,
            "message_to": self.message_to,
            "books_user": self.books_user,
            "is_active": self.is_active
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()    

class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False, unique=True)
    users = db.relationship('User', secondary=roles_user, overlaps="roles")
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
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
    cathegory = db.Column(db.String(120), nullable=False)
    number_of_pages = db.Column(db.String(120))
    description = db.Column(db.String(250), nullable=False)
    sell_trade = db.Column(db.String(120), nullable=False)
    price = db.Column(db.String(120), nullable=False)    
    cover = db.Column(db.String(120), default="no-photo.png")
    user_book_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    
    

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "cathegory": self.cathegory,
            "number_of_pages": self.number_of_pages,
            "description": self.description,
            "sell_trade": self.sell_trade,
            "price": self.price,
            "cover": self.cover
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
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user_gallery = db.relationship('User', backref='galleries')
    books = db.relationship('Book', backref='gallery', lazy=True)
    
    
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
    message = db.Column(db.String(500), default=" ")
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



    