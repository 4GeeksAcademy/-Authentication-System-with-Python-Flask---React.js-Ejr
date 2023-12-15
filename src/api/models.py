from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)


    def __repr__(self):
        return f'<Patient {self.first_name}>'

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
class Specialist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_physiotherapist = db.Column(db.Boolean(), unique=False, nullable=False)
    is_nurse = db.Column(db.Boolean(), unique=False, nullable=False)
    picture = db.Column(db.String(120), unique=False, nullable=True)
    certificate = db.Column(db.String(120), unique=False, nullable=True)
    description = db.Column(db.String(250), unique=False, nullable=True)
    language = db.Column(db.String(120), unique=False, nullable=True)

    def __repr__(self):
        return f'<Specialist {self.first_name}>'

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "is_physiotherapist": self.is_physiotherapist,
            "is_nurse": self.is_nurse,
            "picture": self.picture,
            "certificate": self.certificate,
            "description": self.description,
            "language": self.language
        }



# class Img(db.Model):
#     id=db.Column(db.Integer, primary_key=True)
#     img=db.Column(db.Text,unique=True, nullable=False)
#     name=db.Column(db.Text, nullable=False)
#     mimetype=db.Column(db.Text,nullable=False)