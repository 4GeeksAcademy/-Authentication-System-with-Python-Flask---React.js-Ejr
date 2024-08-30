from flask_sqlalchemy import SQLAlchemy
import enum

db = SQLAlchemy()

from datetime import datetime, timedelta

class Sex(enum.Enum):
    male='male'
    female='female'

# class Week(enum.Enum):
#     SEMANA1=1
#     SEMANA2=2
#     SEMANA3=3
#     SEMANA4=4
#     SEMANA5=5

class Day(enum.Enum):
    DOMINGO=0
    LUNES=1
    MARTES=2
    MIERCOLES=3
    JUEVES=4
    VIERNES=5
    SABADO=6

class Category(enum.Enum):
    BRAZOS = 8
    PIERNAS = 9
    ABDOMINALES = 10
    PECHO = 11
    ESPALDA = 12
    PANTORRILLAS = 14
    HOMBROS = 13
    CARDIO = 15

# USUARIO
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    birthday = db.Column(db.Date, nullable=False)
    sex = db.Column(db.Enum(Sex), nullable=False)

    weekly_routine = db.relationship('WeeklyRoutine', cascade="all, delete", backref = 'user', lazy = True)
    routine = db.relationship('Routine', cascade="all, delete", backref = 'user', lazy = True)
    physical_information = db.relationship('PhysicalInformation', cascade="all, delete", backref = 'user', lazy = True)

    def __repr__(self):
        return f'<User {self.email}>'
    
    def __init__(self, name, email, password, birthday, sex):
        self.name = name
        self.email = email
        self.password = password
        self.birthday = birthday
        self.sex = sex

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "birthday": self.birthday,
            "sex": self.sex.value
        }
    
# INFORMACION FISICA
class PhysicalInformation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    height = db.Column(db.Integer, nullable=False)
    weight = db.Column(db.Integer, nullable=False)
    date = db.Column(db.Date, nullable=False)

    def __repr__(self):
        return f'<PhysicalInformation {self.id}>'

    def serialize(self):
        # print(self.date)
        return {
            "id": self.id,
            "user_id": self.user_id,
            "height": self.height,
            "weight": self.weight,
            "date": self.date,
        }
    
    def graphicSerialize(self):
        return {
            "weight": self.weight,
            "height": self.height,
            "date": self.date.strftime("%d/%m/%Y"),
        }
    
# RUTINA 
class Routine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)

    weekly_routine = db.relationship('WeeklyRoutine', cascade="all, delete", back_populates = 'routine', lazy = True)
    exercise_routine = db.relationship('ExerciseRoutine', cascade="all, delete", back_populates = 'routine', lazy = True)
    
    def __repr__(self):
        return f'<Routine {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
            "exercises": self.serialize_routine_exercises()
        }
    
    def serialize_routine_exercises(self):
        return list(map(lambda exercise: exercise.serialize(), self.exercise_routine))

def get_last_monday(date):
    return date - timedelta(days=date.weekday())
# RUTINA SEMANA
class WeeklyRoutine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    routine_id = db.Column(db.Integer, db.ForeignKey('routine.id'), nullable=False)
    day = db.Column(db.Enum(Day), nullable=False) # ENUM

    follow_up = db.relationship('FollowUp', cascade="all, delete", backref = 'weekly_routine', lazy = True)
    routine = db.relationship(Routine)

    def __repr__(self):
        return f'<WeeklyRoutine {self.id, self.day}>'

    def serialize(self):
        today = datetime.now().date()
        last_monday = get_last_monday(today)
        last_monday = last_monday.strftime("%d/%m/%Y")
        follow_up = list(map(lambda item: item.serialize(), self.follow_up))
        routine = self.routine.serialize()
        for item_routine in routine["exercises"]:
            # item_routine["exercise"]["done"] = False
            for item_follow in follow_up:   
                print(item_follow["date"])
                print(datetime.now().date().strftime("%d/%m/%Y"))
                if last_monday <= item_follow["date"] <= today.strftime("%d/%m/%Y") and item_follow["exercise_routine"]["exercise"]["id"] == item_routine["exercise"]["id"]:
                    item_routine["exercise"]["done"] = True
                # else:
                #     item_routine["exercise"]["done"] = False
        return {
            "id": self.id,
            "user_id": self.user_id,
            "routine": routine,
            "day": self.day.name,
            "day_num": self.day.value,
            # "follow_up": list(map(lambda item: item.serialize(), self.follow_up))
        }

# EJERCICIO 
class Exercise(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    category = db.Column(db.Enum(Category), nullable=False) #ENUM
    description = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=True)

    exercise_routines = db.relationship('ExerciseRoutine', back_populates = 'exercise', lazy = True)

    def __repr__(self):
        return f'<Exercise {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "category": self.category.name,
            "description": self.description,
            "image": self.image,
        }

# SERIES
class Sets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sets = db.Column(db.Integer, nullable=False)
    repetitions = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<Sets {self.id, self.sets, self.repetitions}>'

    def serialize(self):
        return {
            "id": self.id,
            "sets": self.sets,
            "repetitions": self.repetitions
        }
    
# EJERCICIO RUTINA
class ExerciseRoutine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    routine_id = db.Column(db.Integer, db.ForeignKey('routine.id'), nullable=False)
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercise.id'), nullable=False)
    sets_id = db.Column(db.Integer, db.ForeignKey('sets.id'), nullable=False)

    exercise = db.relationship(Exercise)
    routine = db.relationship(Routine)
    sets = db.relationship(Sets)
    
    follow_up = db.relationship('FollowUp', back_populates = 'exercise_routine', lazy = True)

    def __repr__(self):
        return f'<ExerciseRoutine {self.id, self.exercise.name, self.routine.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "routine_id":self.routine_id,
            "exercise": self.exercise.serialize(),
            "sets": self.sets.serialize()
        }

# SEGUIMIENTO 
class FollowUp(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    weekly_routine_id = db.Column(db.Integer, db.ForeignKey('weekly_routine.id'), nullable=False)
    exercise_routine_id = db.Column(db.Integer, db.ForeignKey('exercise_routine.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)

    exercise_routine = db.relationship(ExerciseRoutine)

    def __repr__(self):
        return f'<Category {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "routine_id": self.weekly_routine_id,
            "date": self.date.strftime("%d/%m/%Y"),
            "exercise_routine": self.exercise_routine.serialize()
        }