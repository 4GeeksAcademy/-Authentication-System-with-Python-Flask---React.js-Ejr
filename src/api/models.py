from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    first_name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    birthday = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), unique=True, nullable=False)
    address = db.Column(db.String(300), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_active":self.is_active,
            "first_name":self.first_name,
            "last_name":self.last_name,
            "birthday":self.birthday,
            "phone":self.phone,
            "address":self.address
        
            # do not serialize the password, its a security breach
        }

class Platos(db.Model):
    __tablename__ = "platos"
    plato_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    description = db.Column(db.String(250), unique=False, nullable=False)
    price = db.Column(db.Integer, unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)


    def __repr__(self):
        return f'<Platos {self.name}>'

    def serialize(self):
        return {
            "plato_id": self.plato_id,
            "name": self.name,
            "price":self.price,
            "description":self.description,
            "is_active":self.is_active
            
        }

class Pedidos(db.Model):
    __tablename__ = "pedidos"
    pedido_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey("user.id"))
    user = relationship("User", backref='pedidos')
    fecha_del_pedido = db.Column(db.String(120), nullable=False)
    estado = db.Column(db.String(120), nullable=False)
    platos_id= db.Column(db.Integer, ForeignKey("platos.plato_id"))
    

    def __repr__(self):
        return f'<Pedidos {self.pedido_id}>'

    def serialize(self):
        return {
            "pedido_id": self.pedido_id,
            "user_id": self.user_id,
            "fecha_del_pedido": self.fecha_del_pedido,
            "platos_id":self.platos_id,
            "estado": self.estado
        }
    
class DetalleDePedidos(db.Model):
   __tablename__ = "detalledepedidos"
   detalledepedidos_id = db.Column(db.Integer, primary_key=True)
   platos_id = db.Column('plato_id',db.Integer, db.ForeignKey("platos.plato_id")) 
   pedido_id = db.Column('pedido_id',db.Integer, db.ForeignKey("pedidos.pedido_id"))
   pedidos = db.relationship("Pedidos")
   platos = db.relationship("Platos")

   def __repr__(self):
        return f'<DetalleDePedidos {self.pedido_id}>'
   
   def serialize(self):
        return {
            "detalledepedidos_id": self.detalledepedidos_id,
            "pedido_id": self.pedido_id,
            "platos_id": self.platos_id
        }
   
class TokenBlockedList(db.Model):
    __tablename__="token_blocked_list"
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(40),nullable=False)

    def __repr__(self):
        return f'<TokenBlockedList {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "jti": self.jti
        }