from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from pytz import timezone
spain_tz = timezone('Europe/Madrid')
from enum import Enum

db = SQLAlchemy()

class IdDocument(Enum):
    DNI = 'DNI'
    CIF = 'CIF'

class User_role(Enum): #Solo se pueden usar los roles que pongamos aquí
    BUYER = 'buyer'
    SELLER = 'seller'
    GARAGE = 'garage'




class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nameandsur = db.Column(db.String(100), nullable=False)
    #surname = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    id_document = db.Column(db.Enum(IdDocument), nullable=False, default=IdDocument.DNI)
    id_number = db.Column(db.String(10), unique=True, nullable=False)
    address = db.Column(db.String(120), nullable=True) 
    role = db.Column(db.Enum(User_role), nullable=False, default=User_role.BUYER)
    phone = db.Column(db.Integer, nullable=False) #Podría ser único
    #is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    products = db.relationship('Product', backref='user') # Un usuario puede tener muchos productos asociados (relación de 1 a muchos)
    favorites = db.relationship('Favorites', backref='user') # Un usuario puede tener muchos favoritos asociados (relación de 1 a muchos)
    sales = db.relationship('Sale', backref='user', foreign_keys='Sale.buyer_id') # Un usuario puede buscar buscar las ventas que hizo (1 a muchos)
    



    # seller_reviews = db.relationship('Review', backref='user') # Preguntar a profes si és una relación recíproca (puedo ver las reseñas que me han puesto y las que he puesto)
    # buyer_reviews = db.relationship('Review', backref='user') # Preguntar a profes si és una relación recíproca (puedo ver las reseñas que me han puesto y las que he puesto)


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "nameandsur": self.nameandsur,
            #"surname": self.surname,
            "email": self.email,
            "id_document": self.id_document.value,
            "id_number": self.id_number,
            "address": self.address, 
            "role": self.role,
            "phone": self.phone
            
            # do not serialize the password, its a security breach
        }
    


    


class Favorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)

    def __repr__(self):
        return f'<Favorite {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "product_id": self.product_id
        }
    


class ProductState(Enum):
    NUEVO = 'nuevo'
    SEMINUEVO = 'seminuevo'

class fuel_type(Enum):
    DIESEL = 'diesel'
    GASOLINA = 'gasolina'
    HIBRIDO = 'hibrido'
    ELECTRICO = 'electrico'
    


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    state = db.Column(db.Enum(ProductState), nullable=False)
    price = db.Column(db.Float, nullable=False) #Estuve leyendo y cuando no quieres un número de decimales exactos el FLOAT es buena opción
    description = db.Column(db.String(2000))
    
    year = db.Column(db.Integer)
    km = db.Column(db.Integer)
    fuel = db.Column(db.Enum(fuel_type))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    brand_id = db.Column(db.Integer, db.ForeignKey('brand.id'))
    model_id = db.Column(db.Integer, db.ForeignKey('model.id'))

    images = db.relationship('Image', backref='product')

    def __repr__(self):
        return f'<Products {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "state": self.state,
            "price": self.price,
            "description": self.description,
            "images": self.image,
            "year": self.year,
            "km": self.km,
            "fuel": self.fuel,
            "user_id": self.user_id,
            "brand_id": self.brand_id,
            "model_id": self.model_id
        }

class Garage (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    web = db.Column(db.String(150), nullable=True)
    image_id = db.Column(db.Integer, db.ForeignKey('image.id')) 
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    services = db.relationship('Service', backref='garage')

    def __repr__(self):
        return f'<Garages {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "web" : self.web,
            "image_id": self.image_id,
            "product_id": self.product_id,
            "user_id": self.user_id
        }


class Image (db.Model): # Duda. No sé si debería ir también un relationship de esta tabla en users
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    image = db.Column(db.String(200), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    

    def __repr__(self):
        return f'<Images {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "image": self.image,
            "product_id": self.product_id
        }
    

    
class Service (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(300), nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey('image.id'))
    garage_id = db.Column(db.Integer, db.ForeignKey('garage.id'))

    def __repr__(self):
        return f'<Services {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "description": self.description,
            "image_id": self.image_id,
            "garage_id": self.garage_id
        }

class Rating(Enum):
    ONE_STAR = 1
    TWO_STARS = 2
    THREE_STARS = 3
    FOUR_STARS = 4
    FIVE_STARS = 5

    
class Review(db.Model): # Cambiar la tabla para que se pueda asociar al comrpador y al vendedor
    id = db.Column(db.Integer, primary_key=True)
    given_review_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    recived_review_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    stars = db.Column(db.Enum(Rating), nullable=False) # Revisar Enum con los profes
    comment = db.Column(db.String(250), nullable=True)

    given = db.relationship('User', foreign_keys=[given_review_id])
    recived = db.relationship('User', foreign_keys=[recived_review_id])


    

    #GPT DICE QUE AÑADA ESTO PORQUE SINÓ PUEDE CREAR CONFUSIÓN
    # buyer = db.relationship('User', foreign_keys=[buyer_id], backref='buyer_reviews')
    # seller = db.relationship('User', foreign_keys=[seller_id], backref='seller_reviews')

    def __repr__(self):
        return f'<Reviews {self.id}>'
    
    def serialize(self):
        return{
            "id": self.id,
            "buyer_id": self.buyer_id,
            "seller_id": self.seller_id,
            "product_id": self.product_id,
            "stars": self.stars,
            "comment": self.comment
        }
    
class Sale(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, db.ForeignKey('user.id')) 
    seller_id = db.Column(db.Integer, db.ForeignKey('user.id')) 
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    garage_id = db.Column(db.Integer, db.ForeignKey('garage.id'))
    fecha = db.Column(db.DateTime, nullable=False, default=datetime.now(spain_tz))
    #Posibilidad de añadir reviews en la tabla

    def __repr__(self):
        return f'<Sales {self.id}>'
    
    def serialize(self):
        return{
            "id": self.id,
            "buyer_id": self.buyer_id,
            "seller_id": self.seller_id,
            "product_id": self.product_id,
            "taller_id": self.taller_id,
            "fecha": self.fecha
        }
    
class Brand(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    # models = db.relationship('Model', backref='brands') # Podemos acceder a modelos asociados a una marca 

    def __repr__(self):
        return f'<Brands {self.id}>'
    
    def serialize(self):
        return{
            "id": self.id,
            "name": self.name
        }
    
class Model(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    model = db.Column(db.String(50), nullable=False)
    type = db.Column(db.String(20), nullable=False)
    brand_id = db.Column(db.Integer, db.ForeignKey('brand.id'))

    brands = db.relationship('Brand', backref='models') # Podemos acceder a una marca asociada con modelos 

    def __repr__(self):
        return f'<Models {self.id}>'
    
    def serialize(self):
        return{
            "id": self.id,
            "model": self.model,
            "type": self.type,
            "brand_id": self.brand_id
        }