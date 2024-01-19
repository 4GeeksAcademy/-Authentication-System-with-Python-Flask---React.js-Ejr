from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__='user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(120), unique=False, nullable=False)
    age = db.Column(db.Integer, unique=False, nullable=False)
    profile_picture = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

#informacion cuando se hace print en el admin
    def __repr__(self):
        return 'User ID: {} - Username: {}'.format(self.id, self.username)

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "name": self.name,
            "age": self.age,
            "profile_picture": self.profile_picture,
            "email": self.email
            # do not serialize the password, its a security breach
        }
    
class Movie(db.Model):
    __tablename__='movie'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), unique=False, nullable=False)
    genre = db.Column(db.String(120), unique=False, nullable=False)
    year = db.Column(db.Integer, unique=False, nullable=False)

#informacion cuando se hace print en el admin
    def __repr__(self):
        return 'Movie ID: {} - Titulo: {}'.format(self.id, self.username)

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "genre": self.genre,
            "year": self.year
            # do not serialize the password, its a security breach
        }

class Movie_Review(db.Model):
    __tablename__='movie_review'
    id = db.Column(db.Integer, primary_key=True)
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'), nullable=False)
    movie_relationship = db.relationship(Movie)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user_relationship = db.relationship(User)

#informacion cuando se hace print en el admin
    def __repr__(self):
        return 'Movie ID: {} - User ID: {}'.format(self.movie_id, self.user_id)

    def serialize(self):
        return {
            "id": self.id,
            "movie_id": self.movie_id,
            "user_id": self.user_id
            # do not serialize the password, its a security breach
        }

class Actor(db.Model):
    __tablename__='actor'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)

#informacion cuando se hace print en el admin
    def __repr__(self):
        return 'Actor ID: {} - Nombre: {}'.format(self.id, self.name)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
            # do not serialize the password, its a security breach
        }   

class Movie_Details(db.Model):
    __tablename__='movie_details'
    id = db.Column(db.Integer, primary_key=True)
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'), nullable=False)
    movie_relationship = db.relationship(Movie)
    actor_id = db.Column(db.Integer, db.ForeignKey('actor.id'), nullable=False)
    actor_relationship = db.relationship(Actor)

#informacion cuando se hace print en el admin
    def __repr__(self):
        return 'Movie ID: {} - Actor ID: {}'.format(self.movie_id, self.actor_id)

    def serialize(self):
        return {
            "id": self.id,
            "movie_id": self.movie_id,
            "actor_id": self.actor_id
            # do not serialize the password, its a security breach
        }

class View_State(db.Model):
    __tablename__='view_state'
    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.String(30), unique=False, nullable=False)


#informacion cuando se hace print en el admin
    def __repr__(self):
        return 'Estado de Visualización: {}'.format(self.value)

    def serialize(self):
        return {
            "id": self.id,
            "value": self.value
            # do not serialize the password, its a security breach
        }
    
class Personal_List(db.Model):
    __tablename__='personal_list'
    id = db.Column(db.Integer, primary_key=True)
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'), nullable=False)
    movie_relationship = db.relationship(Movie)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user_relationship = db.relationship(User)
    view_state_id = db.Column(db.Integer, db.ForeignKey('view_state.id'), nullable=False)
    view_state_relationship = db.relationship(View_State)

#informacion cuando se hace print en el admin
    def __repr__(self):
        return 'Usuario ID: {} - Movie ID: {} - Estado ID: {}'.format(self.user_id, self.movie_id, self.view_state_id)

    def serialize(self):
        return {
            "id": self.id,
            "movie_id": self.movie_id,
            "user_id": self.user_id,
            "view_state_id": self.view_state_id
            # do not serialize the password, its a security breach
        }
        
class Follower(db.Model):
    __tablename__='follower'
    id = db.Column(db.Integer, primary_key=True)
    user_from_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user_to_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user_from_id_relationship = db.relationship(User, foreign_keys = [user_from_id])
    user_to_id_relationship = db.relationship(User, foreign_keys = [user_to_id])

#informacion cuando se hace print en el admin
    def __repr__(self):
        return 'Usuario ID: {} - Usuario ID: {}'.format(self.user_from_id, self.user_to_id)

    def serialize(self):
        return {
            "id": self.id,
            "user_from_id": self.user_from_id,
            "user_to_id": self.user_to_id
            # do not serialize the password, its a security breach
        }
        