from sqlalchemy import Column, ForeignKey, Integer, String, Boolean
from sqlalchemy.orm import relationship
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Trainer(db.Model):
    id = Column(Integer, primary_key=True)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(80), unique=False, nullable=False)
    role = Column(String(10), nullable=False)
    #exercices_id = db.Column(db.Integer, ForeignKey( Exercises.exercises_id))
    

    def __repr__(self):
        return f'<Trainer {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "role": self.role,
        }

class Trainer_data(db.Model):
    trainer_data_id= Column(Integer, primary_key=True)
    trainer_name = Column (String(50), nullable=False)
    profile_picture = Column(String(250), nullable=True)
    
    def __repr__(self):
        return f'<Trainer_data {self.trainer_name}>'

    def serialize(self):
        return {
            "trainer_data_id": self.trainer_data_id,
            "trainer_name": self.trainer_name,
            "profile_picture": self.profile_picture
        }

class User(db.Model):
    id = Column(Integer, primary_key=True)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(80), unique=False, nullable=False)
    role = Column(String(10), nullable=False)
    

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "role": self.role,
        }
    

class User_data(db.Model):
    id = Column(Integer, primary_key=True)
    user_name = Column(String(100), nullable=False)
    user_id = Column(Integer, ForeignKey(User.id))
    user_weight = Column(Integer, nullable= True)
    user_height = Column(Integer, nullable=True)
    user_illness = Column(String(250), nullable=False)
    user_objetives = Column(String(250), nullable=True)

    def __repr__(self):
        return f'<User data {self.user_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_name": self.user_name,
            "user_id": self.user_id,
            "user_weight": self.user_weight,
            "user_height": self.user_height,
            "user_illness": self.user_illness,
            "user_objetives": self.user_objetives,
        }