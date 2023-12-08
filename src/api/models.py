from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    date_of_birth = db.Column(db.String(120), unique=False, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    pathologies = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    id_routine = db.Column(db.Integer, db.ForeignKey('routines.id'), nullable=False)
    id_diets = db.Column(db.Integer, db.ForeignKey('diets.id'), nullable=False)
    

class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)


class Trainer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    

class Routines(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    Chest = db.Column(db.String(120), unique=False, nullable=False)
    shoulders = db.Column(db.String(120), unique=False, nullable=False)
    arms = db.Column(db.String(120), unique=False, nullable=False)
    legs = db.Column(db.String(120), unique=False, nullable=False)
    id_user = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    id_trainer = db.Column(db.Integer, db.ForeignKey('trainer.id'), nullable=False)


class Diets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    breakfast = db.Column(db.String(120), unique=False, nullable=False)
    brunch = db.Column(db.String(120), unique=False, nullable=False)
    lunch = db.Column(db.String(120), unique=False, nullable=False)
    dinner = db.Column(db.String(120), unique=False, nullable=False)
    supper = db.Column(db.String(120), unique=False, nullable=False)
    id_trainer = db.Column(db.Integer, db.ForeignKey('trainer.id'), nullable=False)
    id_user = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)





    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "date_of_birth": self.date_of_birth,
            "routine": self.routine,
            "diet": self.diet,
            "pathologies": self.pathologies
            # No se serializa la contraseña por razones de seguridad
        }
    
    def __repr__(self):
        return f'<Admin {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # No se serializa la contraseña por razones de seguridad
        }
    
    def __repr__(self):
        return f'<Trainer {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            # No serializar la contraseña por razones de seguridad
        }
    
    def __repr__(self):
        return f'<Routines {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "Chest": self.Chest,
            "shoulders": self.shoulders,
            "arms": self.arms,
            "legs": self.legs,
            "id_user": self.get_user_serialized(),  # Serializar usuario si existe
            "id_trainer": self.get_trainer_serialized()  # Serializar entrenador si existe
        }

    def __repr__(self):
        return f'<Diets {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "breakfast": self.breakfast,
            "brunch": self.brunch,
            "lunch": self.lunch,
            "dinner": self.dinner,
            "supper": self.supper,
            "id_trainer": self.get_trainer_serialized(),  # Serializar entrenador si existe
            "id_user": self.get_user_serialized()  # Serializar usuario si existe
        }