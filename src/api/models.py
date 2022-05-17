from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "role_id": self.role_id
            
        }
    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

class Profile(db.Model):
    __tablename__ = 'profiles'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String, nullable=False)
    lastname = db.Column(db.String, nullable=False)
    salary = db.Column(db.Integer, nullable=False)
    side_income = db.Column(db.Integer, nullable=False)
    deudas = db.Column(db.Integer, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "lastname": self.lastname,
            "salary": self.salary,
            "side_income": self.side_income,
            "deudas": self.deudas
            
        }
    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

class Company(db.Model):
    __tablename__ = 'companies'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    rut = db.Column(db.String, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "rut": self.rut,
            "email": self.email,       
        }


    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

class Project(db.Model):
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False)
    address = db.Column(db.String, nullable=False)
    size = db.Column(db.Integer, nullable=False)
    typology = db.Column(db.String, nullable=False)
    monto_reserva = db.Column(db.Integer, nullable=False)
    bono_pie = db.Column(db.Integer, nullable=False)
    parking_spots = db.Column(db.Integer, nullable=False)
    bodega = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Integer, nullable=False)
    pictures = db.Column(db.String, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "address": self.address,
            "size": self.size,
            "typology": self.typology,  
            'monto_reserva': self.monto_reserva,
            'bono_pie': self.bono_pie,
            'parking_spots': self.parking_spots,
            'bodega': self.bodega,
            'total_price': self.total_price,
            'pictures': self.pictures
        }
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

class Rol(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,           
        }
    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()



class Postulacion(db.Model):
    __tablename__ = 'postulaciones'
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    date = db.Column(db.String, nullable=False)
    status = db.Column(db.String, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "project_id": self.project_id,  
            "user_id": self.user_id,
            "date": self.date,
            "status": self.status        
        }
    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
