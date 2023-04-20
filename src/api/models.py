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

class Farmer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    country = db.Column(db.String(50), unique=False, nullable=False)
    ccaa = db.Column(db.String(50), nullable=False, unique=False)
    company = db.Column(db.String(50),nullable=True, unique=False)
    pac = db.Column(db.Boolean, nullable=True, unique=False)
    pac_num = db.Column(db.Integer, nullable=True, unique=True)
    User_owner = db.Column(db.Integer, ForeignKey('user.id'))
    user = relationship(User)

    def __init__(self, country, ccaa, company, pac, pac_num):
        self.country = country
        self.ccaa = ccaa
        self.company = company
        self.pac = pac
        self.pac_num = pac_num
    
    def serialize(self):
        return{
            "id" : self.id,
            "country": self.id
        }

class Crop(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    dimension_ha = db.Column(db.Integer, nullable=False)
    crop_type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(250), nullable=True)
    property = db.Column(db.Integer, ForeignKey('farmer.id'))
    technician_agr = db.Column(db.Integer, ForeignKey('technician.id'))
    farmer = relationship(Farmer)
    technician = relationship(Technician)

    def __init__(self, dimension_ha, crop_type, description):
        self.dimension_ha = dimension_ha
        self.crop_type = crop_type
        self.description = description

    def serialize(self):
        return{
            "id": self.id,
            "dimension_Ha": self.dimension_Ha,
            "crop_type":self.crop_type
        }

    