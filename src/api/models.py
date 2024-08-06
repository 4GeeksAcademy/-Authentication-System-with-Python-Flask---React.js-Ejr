from flask_sqlalchemy import SQLAlchemy
import enum

db = SQLAlchemy()

class Sex(enum.Enum):
    male='male'
    female='female'

# USUARIO
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)

    weekly_routine = db.relationship('WeeklyRoutine', backref = 'user', lazy = True)
    physical_information = db.relationship('PhysicalInformation', backref = 'user', lazy = True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
        }
    
# INFORMACION FISICA
class PhysicalInformation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    birthday = db.Column(db.Date, nullable=False)
    sex = db.Column(db.Enum(Sex), nullable=False) #ENUM
    height = db.Column(db.Integer, nullable=False)
    weight = db.Column(db.Integer, nullable=False)
    imc = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "birth_day": self.birth_day,
            "sex": self.sex,
            "height": self.height,
            "weight": self.weight,
            "imc": self.imc,
        }

# RUTINA SEMANA
class WeeklyRoutine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    weekly_day_routine = db.relationship('WeeklyDayRoutine', backref = 'weekly_routine', lazy = True)

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
        }

# RUTINA DIA 
class DayRoutine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)

    weekly_day_routine = db.relationship('WeeklyDayRoutine', backref = 'day_routine', lazy = True)
    day_routine_date = db.relationship('DayRoutineDate', backref = 'day_routine', lazy = True)
    exercise_day_routine = db.relationship('ExerciseDayRoutine', backref = 'day_routine', lazy = True)

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }

# RUTINA SEMANA DIA - PIVOTE
class WeeklyDayRoutine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    day_routine_id = db.Column(db.Integer, db.ForeignKey('day_routine.id'), nullable=False)
    weekly_routine_id = db.Column(db.Integer, db.ForeignKey('weekly_routine.id'), nullable=False)

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "day_routine_id": self.day_routine_id,
            "weekly_routine_id": self.weekly_routine_id,
        }

        
# FECHA RUTINA DIA
class DayRoutineDate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    day_routine_id = db.Column(db.Integer, db.ForeignKey('day_routine.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    done = db.Column(db.Boolean, nullable=False) 

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "day_routine_id": self.day_routine_id,
            "date": self.weekly_routine_id,
            "done": self.done
        }

# EJERCICIO 
class Exercise(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    name = db.Column(db.String, unique=True, nullable=False)
    description = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)

    exercise_day_routine = db.relationship('ExerciseDayRoutine', backref = 'exercise', lazy = True)

    def __repr__(self):
        return f'<User {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "category_id": self.category_id,
            "name": self.name,
            "description": self.description,
            "image": self.image,
        }

# EJERCICIO RUTINA DIA
class ExerciseDayRoutine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    day_routine_id = db.Column(db.Integer, db.ForeignKey('day_routine.id'), nullable=False)
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercise.id'), nullable=False)
    done = db.Column(db.Boolean, nullable=False)

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "day_routine_id": self.day_routine_id,
            "exercise_id": self.exercise_id,
            "done": self.done,
        }

# CATEGORIA 
class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)

    def __repr__(self):
        return f'<User {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }