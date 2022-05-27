from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=False, nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    name = db.Column(db.String, nullable=False)
    lastname = db.Column(db.String, nullable=False)
    salary = db.Column(db.Integer, nullable=False)
    side_income = db.Column(db.Integer, nullable=False)
    deudas = db.Column(db.Integer, nullable=False)
    postulaciones = db.relationship("Postulacion", backref="user", lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "role_id": self.role_id,
            "rol": self.rol.name,
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
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    name = db.Column(db.String, nullable=False)
    rut = db.Column(db.String, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=False, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            
            "name": self.name,
            "rut": self.rut,
            "email": self.email,
            "rol": self.rol.name       
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
    comuna = db.Column(db.String, nullable=False)
    ciudad = db.Column(db.String, nullable=False)
    size = db.Column(db.Integer, nullable=False)
    sale_type = db.Column(db.String, nullable=False)
    bathrooms = db.Column(db.Integer, nullable=False)
    rooms = db.Column(db.Integer, nullable=False)
    monto_reserva = db.Column(db.Integer, nullable=False)
    bono_pie = db.Column(db.Integer, nullable=False)
    parking_spots = db.Column(db.Integer, nullable=False)
    bodega = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Integer, nullable=False)
    pictures = db.Column(db.String, nullable=False)
    body = db.Column(db.String, nullable=False)
    perks = db.Column(db.String, nullable=False)
    title = db.Column(db.String, nullable=False)
    minimum_value = db.Column(db.Integer, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "company_id": self.company_id,
            "title": self.title,
            "address": self.address,
            "comuna": self.comuna,
            "ciudad": self.ciudad,
            "size": self.size,
            "sale_type": self.sale_type,
            "bathrooms": self.bathrooms, 
            'rooms': self.rooms,
            'monto_reserva': self.monto_reserva,
            'bono_pie': self.bono_pie,
            'parking_spots': self.parking_spots,
            'bodega': self.bodega,
            'total_price': self.total_price,
            'pictures': self.pictures,
            'body': self.body,
            'perks': self.perks,
            'minimum_value': self.minimum_value
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
    users = db.relationship("User", backref="rol")
    companies = db.relationship("Company", backref="rol")
    
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
            "status": self.status,
            "user": self.user.serialize() 
                  
        }
    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
