from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship


db = SQLAlchemy()

# Tabla de relación entre Movie y Actor
movie_actor = db.Table('movie_actor',
    db.Column('movie_id', db.Integer, db.ForeignKey('movie.id'), primary_key=True),
    db.Column('actor_id', db.Integer, db.ForeignKey('actor.id'), primary_key=True)
)

# Tabla de relación entre Movie y Director
movie_director = db.Table('movie_director',
    db.Column('movie_id', db.Integer, db.ForeignKey('movie.id'), primary_key=True),
    db.Column('director_id', db.Integer, db.ForeignKey('director.id'), primary_key=True)
)

# Tabla de relación entre Movie y Genres
movie_genres_association = db.Table('movie_genres',
    db.Column('movie_id', db.Integer, db.ForeignKey('movie.id')),
    db.Column('genre_id', db.Integer, db.ForeignKey('genre.id'))
)

class Genre(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))

    def __repr__(self):
        return f'<Genre {self.id} {self.name}>'

    def serialize (self):
        return {
        "id": self.id,
        "name": self.name,
        }


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    secret_question = db.Column(db.String(100), unique=False, nullable=False)
    secret_answer = db.Column(db.String(100), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, security breach
        }

class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(180))
    description = db.Column(db.Text)
    ranking = db.Column(db.Float)  # Puede representar números con decimales
    image = db.Column(db.String(180))
    trailer_key = db.Column(db.String(180))
    trailer_type = db.Column(db.String(50))
    trailer_id = db.Column(db.String(180))

    # Relación con la tabla Actor
    actors = db.relationship('Actor', secondary='movie_actor')
    # Relación con la tabla Director
    directors = db.relationship('Director', secondary='movie_director')
    genres = db.relationship('Genre', secondary=movie_genres_association, backref='movie')

    def __repr__(self):
        return f'<Movie {self.id} {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "ranking": self.ranking,
            "actors": [actor.serialize() for actor in self.actors],  # Serializar los actores asociados
            "directors": [director.serialize() for director in self.directors],  # Serializar los directores asociados
            "image": self.image,
            "trailer_key": self.trailer_key,
            "trailer_type": self.trailer_type,
            "trailer_id": self.trailer_id,
            "genres": [genre.serialize() for genre in self.genres], 
        }

class Actor(db.Model):
    id = db.Column(db.Integer, primary_key= True)
    name = db.Column(db.String(80))
    known_for_department = db.Column(db.String(80))
    character = db.Column(db.String(200))
    profile_path  = db.Column(db.String(200))
    
    def __repr__(self):
        return f'<Actor {self.id} {self.name}>'

    def serialize (self):
        return {
        "id": self.id,
        "name": self.name,
        "known_for_department": self.known_for_department,
        "character": self.character, 
        "profile_path": self.profile_path,
        }

class Director(db.Model):
    id = db.Column(db.Integer, primary_key= True)
    name = db.Column(db.String(80))
    description = db.Column(db.String(800))
    other_movies = db.Column(db.String(200))
    
    def __repr__(self):
        return f'<Director {self.id} {self.name}>'

    def serialize (self):
        return {
        "id": self.id,
        "name": self.name,
        "description": self.description,
        "other_movies": self.other_movies, 
        }


    


    
# faltara añadir series

# class Favorite(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'))  
#     actor_id = db.Column(db.Integer, db.ForeignKey('actor.id')) 
#     director_id = db.Column(db.Integer, db.ForeignKey('director.id'))
#     movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'))
#     series_id = db.Column(db.Integer, db.ForeignKey('series.id'))
#     user = db.relationship("User", backref="favorites")
#     actor = db.relationship("Actor", backref="favorites")



#     def __repr__(self):
#         return f'Favorite {self.id}'

#     def serialize(self):
#         return {
#             "id": self.id,
#             "user_id": self.user_id,
#             "actor_id": self.actor_id,
#             "director_id": self.director_id,
#             "movie_id": self.movie_id,
#             "series_id": self.series_id
#         }