from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import  ForeignKey, Enum
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()



class DatesRange (db.Model, SerializerMixin):
   __tablename__ = 'datesRange'
   id = db.Column(db.Integer, primary_key=True)
   start_date =db.Column(db.Date, nullable =False)
   end_date =db.Column(db.Date, nullable =False)
   

class User(db.Model, SerializerMixin):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(250), nullable=False)
    last_name = db.Column(db.String(250), nullable=False)
    document_id = db.Column(db.Integer, unique=True,  nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

class Owner (db.Model, SerializerMixin):
   __tablename__ = 'owner'
   id = db.Column(db.Integer, primary_key=True)
   user= db.Column(db.Integer, ForeignKey('user.id')) 
   
class Keeper (db.Model, SerializerMixin):
   __tablename__ = 'keeper'
   id = db.Column(db.Integer, primary_key=True)
   user= db.Column(db.Integer, ForeignKey('user.id'))  
   date_work= db.Column(db.Date, ForeignKey('datesRange.id'))
   daily_pay= db.Column(db.Integer, nullable=False)
   
  
class Category (str, Enum):
   small = 'small 0-15 lbs'
   medium = 'medium 16-40 lbs'
   large = 'large 41-100 lbs'
   giant = 'giant 101+ lbs'

 
  

class Pet(db.Model):
   __tablename__ = 'pet'
   id = db.Column(db.Integer, primary_key=True)
   name = db.Column(db.String(250),  nullable=False)
   photo = db.Column(db.String(250),  nullable=False)
   description = db.Column(db.String(250),  nullable=False) 
   size= db.Column(db.Enum, Category) 
   owner= db.Column(db.Integer, ForeignKey('owner.id')) 




   