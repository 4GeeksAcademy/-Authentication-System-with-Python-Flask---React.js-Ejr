from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    level = db.Column(db.Integer, default=1)


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "is_active": self.is_active,
            "level": self.level,
          
        }

class UserData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column (db.Integer, db.ForeignKey ('user.id'))
    date_time = db.Column(db.DateTime, unique=False, nullable=False)
    location = db.Column(db.String, unique=False, nullable=False)
    liters = db.Column(db.Float, unique=False, nullable=False)

    def __repr__(self):
        return f'<UserData {self.date_time} {self.location} {self.liters}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "date_time": self.date_time,
            "location": self.location,
            "liters": self.liters,
        }

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    day = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(120), nullable=False)
    meeting_point = db.Column(db.String(120), nullable=False)
    clicks_counter = db.Column(db.Integer, default=0)

    def __repr__(self):
        return f'<Event {self.location} {self.day} {self.meeting_point} {self.clicks_counter}>'

    def serialize(self):
        return {
            "id": self.id,
            "day": self.day,
            "location": self.location,
            "meeting_point": self.meeting_point,
            "clicks_counter": self.clicks_counter,
        }
