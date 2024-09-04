from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class Game(db.Model):
    __tablename__ = 'games'  # Define el nombre de la tabla manualmente

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    platform = db.Column(db.String(50), nullable=False)
    genre = db.Column(db.String(50), nullable=True)
    description = db.Column(db.String(200), nullable=True)
    launch_date = db.Column(db.Date, nullable=True)

    def __repr__(self):
        return f'<Game {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "game": self.name,
            "platform": self.platform,
            "genre": self.genre,
            "description": self.description,
            "launch_date": self.launch_date
        }
