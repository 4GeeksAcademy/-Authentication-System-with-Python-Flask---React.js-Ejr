from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import  ForeignKey
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()



class DatesRange (db.Model, SerializerMixin):
   __tablename__ = 'datesRange'
   id_dateRange = db.Column(db.Integer, primary_key=True)
   start_date =db.Column(db.Date, nullable =False)
   end_date =db.Column(db.Date, nullable =False)
   def serialize(self):
        return {
            "id_dateRange": self.id_dateRange,
            "start_date": self.start_date.isoformat(),
            "end_date": self.end_date.isoformat(),
        }



class User(db.Model, SerializerMixin):
    __tablename__ = 'user'
    id_user = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(250), nullable=False)
    last_name = db.Column(db.String(250), nullable=False)
    dni = db.Column(db.Integer, unique=True,  nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    def serialize(self):
        return {
            "id_user": self.id_user,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "dni": self.dni,
            "email": self.email,
            
        }

class Owner (db.Model, SerializerMixin):
   __tablename__ = 'owner'
   id_owner = db.Column(db.Integer, primary_key=True)
   id_user= db.Column(db.Integer, ForeignKey('user.id')) 
   
class Keeper (db.Model, SerializerMixin):
   __tablename__ = 'keeper'
   id_keeper = db.Column(db.Integer, primary_key=True)
   id_user= db.Column(db.Integer, ForeignKey('user.id'))  
   id_date_work= db.Column(db.Date, ForeignKey('datesRange.id'))
   id_user= db.Column(db.Integer, ForeignKey('user.id'))  
   daily_pay= db.Column(db.Integer, nullable=False)
   
   def serialize(self):
        return {
            "id_keeper": self.id_keeper,
            "id_user": self.id_user,
            "id_date_work": self.id_date_work,
            "daily_pay": self.daily_pay,
        }

class Breed (db.Model, SerializerMixin):
   __tablename__ = 'breed'
   id_breed = db.Column(db.Integer, primary_key=True)
   name = db.Column(db.String(250), unique=True, nullable=False)
   


class Size (db.Model):
   __tablename__ = 'size'
   id_size = db.Column(db.Integer, primary_key=True)
   description = db.Column(db.String(250), unique=True, nullable=False)
 
  

class Dog(db.Model):
   __tablename__ = 'Dog'
   id_dog = db.Column(db.Integer, primary_key=True)
   name_dog = db.Column(db.String(250),  nullable=False)
   photo = db.Column(db.String(250),  nullable=False)
   description = db.Column(db.String(250),  nullable=False)
   id_breed= db.Column(db.Integer, ForeignKey('breed.id'))    
   id_size= db.Column(db.Integer, ForeignKey('size.id')) 
   id_owner= db.Column(db.Integer, ForeignKey('owner.id')) 
                           
   def serialize(self):
        return {
            "id_dog": self.id_dog,
            "name_dog": self.name_dog,
            "photo": self.photo,
            "description": self.description,
            "id_breed": self.id_breed,
            "id_size": self.id_size,
            "id_owner": self.id_owner,
        }



   