from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    first_name = db.Column(db.String(50), unique=False, nullable=False)
    last_name = db.Column(db.String(50), unique=False, nullable=False)
    address_one = db.Column(db.String(50), unique=False, nullable=False)
    address_two = db.Column(db.String(50), unique=False, nullable=False)
    phone = db.Column(db.String(50), unique=False, nullable=False)
    city = db.Column(db.String(120), unique=False, nullable=False)
    country = db.Column(db.String(120), unique=False, nullable=False)
    zip_code = db.Column(db.String(10), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "address_one": self.address_one,
            "address_two": self.address_two,
            "phone": self.phone,
            "city": self.city,
            "country": self.country,
            "zip_code": self.zip_code
            # do not serialize the password, its a security breach
        }


class TokenBlockedList(db.Model):
    __tablename__ = "token_blocked_list"
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(1000), nullable=False)


class VehicleType(db.Model):
    __tablename__ = "vehicle_type"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    picture = db.Column(db.String(1000))

    def serialize(self):
        return{"name" : self.name,
        "picture": self.picture,
        }
    
class ShoppingCar(db.Model):
    __tablename__ = "shopping_car"
    id = db.Column(db.Integer, primary_key=True)
    services_id = db.Column(db.Integer, db.ForeignKey("services.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    users = db.relationship(User) 
    services = db.relationship("Services")
    service_name = db.Column(db.String(120))
    service_price = db.Column(db.Integer)
    date = db.Column(db.Date())
    def serialize(self):
        return {
            #"servicesVehicle":self.services.vehicle_type,
            "id":self.id,
            "servicesName":self.service_name,
            "servicesPrice":self.service_price,
            "userName":self.users.first_name, 
            "date":self.date,
            "address":self.users.address_one
            
        }

class Services(db.Model):
    __tablename__ = "services"
    id = db.Column(db.Integer, primary_key=True)
    vehicle_type = db.Column(db.Integer, db.ForeignKey("vehicle_type.id"))
    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(10000), unique=False, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    picture = db.Column(db.String(1000))
    type = db.relationship(VehicleType, backref='vehicle_type', lazy=True)


    def serialize(self):
        return {
            "vehicle_type": self.vehicle_type,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "picture": self.picture,
            "id":self.id
        }


# Crear tabla para carrito, va a tener foreign key del servicio y relación con el usuario
