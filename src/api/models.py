from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False) 
    profile_picture = db.Column(db.String, nullable=True) 
    is_active = db.Column(db.Boolean, nullable=False, default=False)
    groups = db.relationship("Group", secondary='users_group', back_populates='users')

    def __repr__(self):
        return f'<User {self.username}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "password": self.password,
            "profile_picture": self.profile_picture,
            "is_active": self.is_active
        }

class Group(db.Model):
    __tablename__='group'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    profile_picture = db.Column(db.String, nullable=True)
    users = db.relationship("User", secondary='users_group', back_populates='groups')

    def __repr__(self):
        return f'<Group {self.name}>'

    def serialize(self, include_users=True):
        serialized_data = {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "profile_picture": self.profile_picture
        }
        if include_users:
            serialized_data["users"] = [user.serialize() for user in self.users]
        return serialized_data

class UsersGroup(db.Model):
    __tablename__='users_group'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'), nullable=False)
    admin = db.Column(db.Boolean, default=False, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "group_id": self.group_id,
            "admin": self.admin
        }

class Event(db.Model):
    __tablename__='event'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date = db.Column(db.DateTime, nullable=False)
    admin_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    admin = db.relationship('User')
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'), nullable=False)  
    group = db.relationship('Group') 

    def __repr__(self):
        return f'<Event {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "admin_id": self.admin_id,
            "group_id": self.group_id 
        }

class Votes(db.Model):
    __tablename__='votes'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User')
    vote = db.Column(db.Boolean, nullable=False)
    selected_id = db.Column(db.Integer, db.ForeignKey('selected.id'), nullable=False)
    selected = db.relationship('Selected')

    def __repr__(self):
        return f'<Votes {self.id}>'
    
    def serialize(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "selected_id": self.selected_id,
            "vote": self.vote
        }

class Selected(db.Model):
    __tablename__='selected'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    event_id =db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)
    event = db.relationship('Event')
    movie_id = db.Column(db.Integer,nullable=False)
    winner = db.Column(db.Boolean, nullable=False)

    def __repr__(self):
        return f'<Selected {self.id}>'

    def serialize (self):
        return{
            "id": self.id,
            "event_id": self.event_id,
            "movie_id": self.movie_id,
            "winner": self.winner
        }







