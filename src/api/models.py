from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
class Books(db.Model):
    #isbn no se que es 
    title=db.Column(db.String(50),unique=True,nullable=False)
    author_name=db.Column(db.String(50),unique=True,nullable=False)
    reviews=db.Column(db.String(450),nullable=True)
    first_publish_year=db.Column(db.Integer(),unique=True,nullable=True)
    #cover_i no se que es
    #num_readers creo que no va acá
    #num_comments 
    languages=db.Column
    publishers
    publisher_places
    excerpt
    typeOfBook
    num_stars