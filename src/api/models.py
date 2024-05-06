from sqlalchemy import Column, ForeignKey, Integer, String, Boolean
from sqlalchemy.orm import relationship
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Trainer(db.Model):
    id = Column(Integer, primary_key=True)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(80), unique=False, nullable=False)
    role = Column(String(10), nullable=False)
    trainer_data = relationship("Trainer_data", backref = "Trainer", lazy=True)
    
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
    trainer = Column(Integer, ForeignKey(Trainer.id))
    trainer_name = Column (String(50), nullable=False)
    profile_picture = Column(String(250), nullable=True)
    user_id = relationship("User_data", backref = "Trainer_data", lazy=True)
    exercises = relationship("Exercise", backref="Trainer_data", lazy=True)
    
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
    user_data = relationship("User_data", backref = "User", lazy = True)
    
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
    trainer_id = Column(Integer, ForeignKey(Trainer_data.trainer_data_id))
    exercises = relationship("Exercise", backref = "User_data", lazy = True)

    def __repr__(self):
        return f'<User_data {self.id}>'

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

class Routines(db.Model):
    id = Column(Integer, primary_key=True)
    actual_routine = Column(String(100), nullable=False)
    historical = Column(String(250), nullable=True)
    user_data_id = Column(Integer, ForeignKey(User_data.id), unique = True, nullable=False)
    trainer_data_id = Column(Integer, ForeignKey(Trainer_data.trainer_data_id), nullable=False)
    user_data = relationship('User_data', backref = "Routines", lazy = True )
    trainer = relationship('Trainer_data', backref = "Routines", lazy = True)
    exercises = relationship("Exercise", secondary='routine_exercise_association', back_populates="routines")

    def __repr__(self):
        return f'<Routines {self.id}'
    
    def serialize(self):
        return {
            'id':self.id,
            'actual_routine':self.actual_routine,
            'historial':self.historical,
        }

class Exercise (db.Model):
    id = Column(Integer, primary_key = True)
    exercise_name= Column(String(100), nullable = False, unique = True)
    exercise_type= Column(String(50), nullable = False)
    exercise_weight = Column(Integer, nullable = True)
    user_data_id = Column(Integer, ForeignKey(User_data.id))
    trainer_data_id = Column(Integer, ForeignKey(Trainer_data.trainer_data_id))
    routines = relationship("Routines", secondary='routine_exercise_association', back_populates="exercises")

    def __repr__(self):
        return f'<Exercise {self.id}>'
    def serialize(self):
        return {
            "id": self.id,
            "exercise_name": self.exercise_name,
            "exercise_type": self.exercise_type,
            "exercise_weight": self.exercise_weight,
        }
    
class RoutineExerciseAssociation (db.Model):
    id = Column (Integer, primary_key=True )
    routine_id = Column(Integer, ForeignKey(Routines.id))
    exercise_id = Column(Integer, ForeignKey(Exercise.id))

    def __repr__(self):
        return f'<RoutineExerciseAssociation {self.id}>'