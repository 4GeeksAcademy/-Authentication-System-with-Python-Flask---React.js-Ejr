from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

""" class User(db.Model):
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
     """
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    email = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)
    my_vehicle_in_rent = db.relationship('MyVehicleInRent', backref='user', lazy=True)
    favorites_vehicles = db.relationship('FavoriteVehicle', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email
        }

class Vehicle(db.Model):
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    marca_modelo = db.Column(db.String(50), nullable=False)
    matricula = db.Column(db.String(50), nullable=False)
    motor = db.Column(db.String(50), nullable=False)
    tipo_cambio = db.Column(db.String(50), nullable=False)
    asientos = db.Column(db.String(50), nullable=False)
    precio = db.Column(db.String(50), nullable=False)
    my_vehicle_for_rent = db.relationship('MyVehicleInRent', backref='vehicle', lazy=True)
    favorites_vehicles = db.relationship('FavoriteVehicle', backref='vehicle', lazy=True)

    def __repr__(self):
        return f'<Vehicle {self.matricula}>'

    def serialize(self):
        return {
            "id": self.id,
            "marca_modelo": self.marca_modelo,
            "matricula": self.matricula,
            "motor": self.motor,
            "tipo_cambio": self.tipo_cambio,
            "asientos": self.asientos,
            "precio": self.precio
        }

class FavoriteVehicle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicle.id'))

    def __repr__(self):
        return f'<FavoriteVehicle {self.id}>'

    def serialize(self):
        result = Vehicle.query.filter_by(id=self.vehicle_id).first()
        return {
            "id": self.id,
            "user_id": self.user_id,
            "vehicle_id": result.serialize()["matricula"]
        }
class MyVehicleInRent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicle.id'))

    def __repr__(self):
        return f'<MyVehicleInRent {self.id}>'

    def serialize(self):
        result = Vehicle.query.filter_by(id=self.vehicle_id).first()
        return {
            "id": self.id,
            "user_id": self.user_id,
            "vehicle_id": result.serialize()["matricula"]
        }