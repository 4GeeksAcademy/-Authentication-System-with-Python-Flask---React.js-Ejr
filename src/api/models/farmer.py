from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

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
