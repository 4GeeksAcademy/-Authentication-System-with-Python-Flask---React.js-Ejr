from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Here we declare our tables (models) with their atributes: 

class Favorites(db.Model):
    __tablename__ = 'favorites'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    electric_id = db.Column(db.Integer, db.ForeignKey('electric.id'))
    acoustic_id = db.Column(db.Integer, db.ForeignKey('acoustic.id'))
    classical_id = db.Column(db.Integer, db.ForeignKey('classical.id'))
    
   


    def __repr__(self):
        return f'<Favorites {self.id}>'  

    def serialize(self):
        return {
            "id": self.id,
            "electric_id": self.electric_id,
            "acoustic_id": self.acoustic_id,
            "classical_id": self.classical_id,
        
        }
    
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(250), nullable=False)
    last_name = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=True)
    is_active = db.Column(db.Boolean(), nullable=False)
    user_favorites = db.relationship(Favorites)

    def __repr__(self):
        return f'<User {self.first_name}>' 

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
        }
    
class Electric(db.Model):
    __tablename__ = 'electric'
    id = db.Column(db.Integer, primary_key=True)
    model = db.Column(db.String(250), nullable=False)
    scale = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    color = db.Column(db.String(250), nullable=False)
    manufacturer = db.Column(db.String(250), nullable=False)
    pickups = db.Column(db.String(250), nullable=False)
    image = db.Column(db.String(500), nullable=True)
    electric_favorites = db.relationship(Favorites)

    def __repr__(self):
        return f'<Electric {self.model}>'  

    def serialize(self):
        return {
            "id": self.id,
            "model": self.model,
            "scale": self.scale,
            "price": self.price,
            "color": self.color,
            "manufacturer": self.manufacturer,
            "pickups": self.pickups,
            "image": self.image,
        }

class Acoustic(db.Model):
    __tablename__ = 'acoustic'
    id = db.Column(db.Integer, primary_key=True)
    model = db.Column(db.String(250), nullable=False)
    scale = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    color = db.Column(db.String(250), nullable=False)
    manufacturer = db.Column(db.String(250), nullable=False)
    image = db.Column(db.String(500), nullable=True)
    acoustic_favorites = db.relationship(Favorites)

    def __repr__(self):
        return f'<Acoustic {self.model}>' 

    def serialize(self):
        return {
            "id": self.id,
            "model": self.model,
            "scale": self.scale,
            "price": self.price,
            "color": self.color,
            "manufacturer": self.manufacturer,
            "image": self.image,
        }
    
class Classical(db.Model):
    __tablename__ = 'classical'
    id = db.Column(db.Integer, primary_key=True)
    model = db.Column(db.String(250), nullable=False)
    scale = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    color = db.Column(db.String(250), nullable=False)
    manufacturer = db.Column(db.String(250), nullable=False)
    image = db.Column(db.String(500), nullable=True)
    classical_favorites = db.relationship(Favorites)

    def __repr__(self):
        return f'<Classical {self.model}>' 

    def serialize(self):
        return {
            "id": self.id,
            "model": self.model,
            "scale": self.scale,
            "price": self.price,
            "color": self.color,
            "manufacturer": self.manufacturer,
            "image": self.image,
        }
