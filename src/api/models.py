from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship




db = SQLAlchemy()

class User(db.Model):
    #__tablename__="user"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    first_name=db.Column(db.String(120), unique=True, nullable=False)
    last_name=db.Column(db.String(120), unique=True, nullable=False)
    birth_day=db.Column(db.Integer, unique=True, nullable=False)
    birth_month=db.Column(db.Integer, unique=True, nullable=False)
    birth_year=db.Column(db.Integer, unique=True, nullable=False)
    gender=db.Column(db.String(120), unique=True, nullable=False)
    phone=db.Column(db.Integer, unique=True, nullable=False)
    suscription = db.Column(db.Boolean(), unique=False, nullable=False)
    pedidos=db.relationship("Pedidos")
    
    def __repr__(self):
        return f'<User {self.email}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "email":self.email,
            "is_active": self.is_active,
            "first_name":self.first_name,
            "last_name":self.last_name,
            "birth_day":self.birth_day,
            "birth_month":self.birth_month,
            "birth_year":self.birth_year,
            "gender": self.gender,
            "phone": self.phone,
            "suscription": self.suscription
        }


class Restaurant(db.Model):
    # __tablename__="restaurant"
    id = db.Column(db.Integer, primary_key=True)
    # user_id=db.Column(db.Integer, db.Foreignkey = ("User.id"))
    name = db.Column(db.String(120), unique=True, nullable=False)
    platos = db.Column(db.Integer, db.ForeignKey("platos.id"))
    ubicaciones = db.Column(db.String(80), unique=False, nullable=False)
    pedido=db.relationship("Pedidos")
    detalles_de_pedido=db.relationship("DetalleDePedidos")

    def __repr__(self):
        return f'<Restaurant {self.name}>'
    
    def serialize(self):
        return {
            "id":self.id,
            "name":self.name,
            "platos":self.platos,
            "ubicaciones":self.ubicaciones 
        }

class Platos(db.Model):
    #__tablename__="platos"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    description=db.Column(db.String(500), unique=True, nullable=False)
    price=db.Column(db.Integer, unique=True, nullable=False)
    restaurante=db.relationship("Restaurant")
    detalles_de_pedido=db.relationship("DetalleDePedidos")
    #agregar propiedad para agregar url de imagen

    def __repr__(self):
        return f'<Platos {self.name}>'
    
    def serialize(self):
        return {
            "id":self.id,
            "name":self.name,
            "price": self.price,
            "description": self.description
            }


class Pedidos(db.Model):
    # __tablename__="pedidos"
    id = db.Column(db.Integer, primary_key=True)
    restaurant_id= db.Column(db.Integer, ForeignKey("restaurant.id"))
    # plato=relationship("Restaurant")
    usuario_id=db.Column(db.Integer, ForeignKey("user.id"))
    # usuario=relationship("User")

    def __repr__(self):
        return f'<Pedidos {self.id}>'
    
    def serialize(self):
        return {
            "id":self.id,
            "restaurant_id":self.restaurant_id,
            "usuario_id": self.usuario_id,
        }




class DetalleDePedidos(db.Model):
    # __tablename__="detalleDePedidos"
    id = db.Column(db.Integer, primary_key=True)
    platos_id=db.Column(db.Integer, ForeignKey("platos.id"))
    # pedido=relationship("Pedidos")
    restaurant_id=db.Column(db.Integer, ForeignKey("restaurant.id"))
    # resturante=relationship("Restaurant")

    def __repr__(self):
        return f'< DetalleDePedidos {self.id}>'
    
    def serialize(self):
        return {
            "id":self.id,
            "restaurant_id":self.restaurant_id,
            "platos_id": self.platos_id
        }



    

class TokenBlockedList(db.Model):
    # __tablename__="token_blocked_list"
    id=db.Column(db.Integer, primary_key=True)
    jti=db.Column(db.String(40), nullable=False)

    def __repr__(self):
        return f'< TokenBlockedList {self.id}>'
    
    def serialize(self):
        return {
            "id":self.id,
            "jti":self.jti,
        }   