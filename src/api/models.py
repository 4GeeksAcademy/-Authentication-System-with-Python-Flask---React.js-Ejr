from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    level = db.Column(db.Integer, default=1)


    def __repr__(self):
        return f'<User {self.email} {self.id} {self.level}>'

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
    day = db.Column(db.Date, nullable=False)
    hour = db.Column(db.Time, nullable=False)
    location = db.Column(db.String(120), nullable=False)
    meeting_point = db.Column(db.String(120), nullable=False)
    clicks_counter = db.Column(db.Integer, default=0)
    user_email = db.Column(db.String(120), db.ForeignKey('user.email'))

    def __repr__(self):
        return f'<Event {self.location} {self.day} {self.meeting_point} {self.clicks_counter} {self.hour}>'

    def serialize(self):
        return {
            "id": self.id,
            "day": self.day.isoformat() if self.day else None,
            "hour": str(self.hour) if self.hour else None,
            "location": self.location,
            "meeting_point": self.meeting_point,
            "clicks_counter": self.clicks_counter,
            "user_email": self.user_email, 
        }