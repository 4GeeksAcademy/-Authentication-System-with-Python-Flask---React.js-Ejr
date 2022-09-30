from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(40), unique=False, nullable=False)
    apellido = db.Column(db.String(40), unique=False, nullable=False)
    correo = db.Column(db.String(120), unique=True, nullable=False)
    contrasena = db.Column(db.String(80), unique=False, nullable=False)
    telefono = db.Column(db.Integer, unique=True, nullable=False)
   

    def __repr__(self):
        return f'<User {self.correo}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "correo": self.correo,
            "telefono": self.telefono,
        }

class CasasDeCambio(db.Model): 
    __tablename__ = "casasdecambio"
    id = db.Column(db.Integer, primary_key=True)
    nombrecasa = db.Column(db.String(100), unique=True, nullable=False)
    #La columna fecha es String porque puede llevar caracteres para separar los numeros? O simplemente es Integer
    fecha = db.Column(db.String(40), unique=False, nullable=False) 
    moneda = db.Column(db.String(40), unique=True, nullable=False)
    precio = db.Column(db.Integer, unique=True, nullable=False)

    def __repr__(self):
        return f'<CasasDeCambio {self.nombrecasa}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombrecasa": self.nombrecasa,
            "fecha": self.fecha,
            "moneda": self.moneda,
            "precio": self.precio,
        }

class Favoritos(db.Model):
    __tablename__ = "favoritos"
    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer, db.ForeignKey("user.id"))
    nombrecasa = db.Column(db.String(100), db.ForeignKey("casasdecambio.nombrecasa"))
    rel_nombrecasa = db.relationship('CasasDeCambio')
   

    def __repr__(self):
        return f'<Favoritos {self.nombrecasa}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_user": self.id_user,
            "nombrecasa": self.nombrecasa,
            
        }

class Tasacion(db.Model): #Se almacena aqui la informacion que sacamos del scraping
    __tablename__ = "tasacion"
    id = db.Column(db.Integer, primary_key=True)
    nombrecasa = db.Column(db.String(100), db.ForeignKey("casasdecambio.nombrecasa"))
    fecha = db.Column(db.String(40), unique=False, nullable=False) 
    moneda = db.Column(db.String(40), unique=True, nullable=False)
    precio = db.Column(db.Float, unique=False, nullable=False)
    rel_nombrecasa = db.relationship('CasasDeCambio')


    def __repr__(self):
        return f'<Tasacion {self.nombrecasa}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombrecasa": self.nombrecasa,
            "fecha" : self.fecha,
            "moneda" : self.moneda,
            "precio" : self.precio,
        }
            