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

class Beer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
   # brewery_id = db.Column(db.Integer, db.ForeignKey('brewery.id'), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    bjcp_style = db.Column(db.String(120))
    IBUs = db.Column(db.String(120))
    volALC = db.Column(db.String(120))
    description = db.Column(db.String(120))
    picture_of_beer_url = db.Column(db.String(250), nullable=True) 


    def __repr__(self):
        return f'Beer {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
    #        "brewery_id": self.brewery_id,
            "name": self.name,
            "bjcp_style": self.bjcp_style,
            "IBUs": self.IBUs,
            "volALC": self.volALC,
            "description": self.description,
            "picture_of_beer_url": self.picture_of_beer_url   
        }
