from flask_sqlalchemy import SQLAlchemy
import enum

db = SQLAlchemy()

class Sex(enum.Enum):
    male='male'
    female='female'

class Week(enum.Enum):
    SEMANA1=1
    SEMANA2=2
    SEMANA3=3
    SEMANA4=4
    SEMANA5=5

class Day(enum.Enum):
    LUNES=1
    MARTES=2
    MIERCOLES=3
    JUEVES=4
    VIERNES=5
    SABADO=6
    DOMINGO=7

class Category(enum.Enum):
    PECHO=1
    ESPALDA=2
    PIERNA=3
    HOMBRO=4
    TRAPECIO=5
    ABDOMEN=6

# USUARIO
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    birthday = db.Column(db.Date, nullable=False)
    sex = db.Column(db.Enum(Sex), nullable=False)

    weekly_routine = db.relationship('WeeklyRoutine', backref = 'user', lazy = True)
    routine = db.relationship('Routine', backref = 'user', lazy = True)
    physical_information = db.relationship('PhysicalInformation', backref = 'user', lazy = True)

    def __repr__(self):
        return f'<User {self.email}>'

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
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    height = db.Column(db.Integer, nullable=False)
    weight = db.Column(db.Integer, nullable=False)
    date = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<PhysicalInformation {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "height": self.height,
            "weight": self.weight,
            "date": self.date,
        }

# # RUTINA SEMANA
# class WeeklyRoutine(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

#     weekly_day_routine = db.relationship('WeeklyDayRoutine', backref = 'weekly_routine', lazy = True)

#     def __repr__(self):
#         return f'<User {self.id}>'

#     def serialize(self):
#         return {
#             "id": self.id,
#             "user_id": self.user_id,
#         }

# RUTINA 
class Routine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)

    weekly_routine = db.relationship('WeeklyRoutine', back_populates = 'routine', lazy = True)
    exercise_routine = db.relationship('ExerciseRoutine', backref = 'routine', lazy = True)
    
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

# RUTINA SEMANA
class WeeklyRoutine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    routine_id = db.Column(db.Integer, db.ForeignKey('routine.id'), nullable=False)
    week = db.Column(db.Enum(Week), nullable=False) # ENUM
    day = db.Column(db.Enum(Day), nullable=False) # ENUM

    follow_up = db.relationship('FollowUp', backref = 'weekly_routine', lazy = True)
    routine = db.relationship(Routine)

    def __repr__(self):
        return f'<WeeklyRoutine {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "routine": self.routine.serialize(),
            "week": self.week.value,
            "day": self.day.value
        }

        
# # FECHA RUTINA DIA
# class DayRoutineDate(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     day_routine_id = db.Column(db.Integer, db.ForeignKey('day_routine.id'), nullable=False)
#     date = db.Column(db.Date, nullable=False)
#     done = db.Column(db.Boolean, nullable=False) 

#     def __repr__(self):
#         return f'<User {self.id}>'

#     def serialize(self):
#         return {
#             "id": self.id,
#             "day_routine_id": self.day_routine_id,
#             "date": self.date,
#             "done": self.done
#         }

# EJERCICIO 
class Exercise(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    category = db.Column(db.Enum(Category), nullable=False) #ENUM
    description = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)

    exercise_routines = db.relationship('ExerciseRoutine', back_populates = 'exercise', lazy = True)

    def __repr__(self):
        return f'<Exercise {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "category": self.category.value,
            "description": self.description,
            "image": self.image,
        }

# EJERCICIO RUTINA
class ExerciseRoutine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    routine_id = db.Column(db.Integer, db.ForeignKey('routine.id'), nullable=False)
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercise.id'), nullable=False)

    exercise = db.relationship(Exercise)
    follow_up = db.relationship('FollowUp', backref = 'exercise_routine', lazy = True)

    def __repr__(self):
        return f'<ExerciseRoutine {self.id}>'

    def serialize(self):
        return self.exercise.serialize()
            

# SEGUIMIENTO 
class FollowUp(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    weekly_routine_id = db.Column(db.Integer, db.ForeignKey('weekly_routine.id'), nullable=False)
    exercise_routine_id = db.Column(db.Integer, db.ForeignKey('exercise_routine.id'), nullable=False)

    def __repr__(self):
        return f'<Category {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "routine_id": self.weekly_routine_id,
            "exercise_routine_id": self.exercise_routine_id
        }