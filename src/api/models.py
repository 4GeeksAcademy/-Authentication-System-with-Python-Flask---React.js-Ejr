from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    date_of_birth= db.Column(db.String(120), unique=False, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    routine = db.Column(db.String(120), unique=False, nullable=False)
    diet = db.Column(db.String(120), unique=False, nullable=False)
    pathologies = db.Column(db.String(120), unique=False, nullable=False)


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
    id_user = db.Column(db.String(120), unique=False, nullable=True)
    id_trainer = db.Column(db.String(120), unique=False, nullable=True)


class Diets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    breakfast = db.Column(db.String(120), unique=False, nullable=False)
    brunch = db.Column(db.String(120), unique=False, nullable=False)
    lunch = db.Column(db.String(120), unique=False, nullable=False)
    dinner = db.Column(db.String(120), unique=False, nullable=False)
    supper = db.Column(db.String(120), unique=False, nullable=False)
    id_trainer = db.Column(db.String(120), unique=False, nullable=True)
    id_user = db.Column(db.String(120), unique=False, nullable=True)





    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }