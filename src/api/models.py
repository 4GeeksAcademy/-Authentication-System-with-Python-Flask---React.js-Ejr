from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=True)
    name = db.Column(db.String(50), unique=False, nullable=True)


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }


class Master(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    phone = db.Column(db.String(20), unique=False, nullable=True)
    alias = db.Column(db.String(20), unique=False, nullable=True)

    transactions = db.relationship('PlantsTransactions', backref='master', lazy=True)
    orders = db.relationship('Order', backref='master', lazy=True)
    
    def __repr__(self):
        return f'<Master {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "phone": self.phone,
            "alias": self.alias
        }

class Shoe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    size_from = db.Column(db.Integer)
    size_to = db.Column(db.Integer)
    # Check documentation for choices field
    # category = db.Column(db.String, nullable=False, server_default='Magnolia', choices=['Magnolia', 'Taco'])
    category = db.Column(db.String, nullable=False)
    photo = db.Column(db.String, nullable=False)


    def __repr__(self):
        return f'<Shoe {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "size_from": self.size_from,
            "size_to": self.size_to,
            "category": self.category,
            "photo": self.photo
        }
        

class Plants(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    size34 = db.Column(db.Integer, nullable=True)
    size35 = db.Column(db.Integer, nullable=True)
    size36 = db.Column(db.Integer, nullable=True)
    size37 = db.Column(db.Integer, nullable=True)
    size38 = db.Column(db.Integer, nullable=True)
    size39 = db.Column(db.Integer, nullable=True)
    size40 = db.Column(db.Integer, nullable=True)
    size41 = db.Column(db.Integer, nullable=True)
    orders = db.relationship('Order', backref='plants', lazy=True)
    transactions = db.relationship('PlantsTransactions', backref='plants', lazy=True)
    def __repr__(self):
        return f'<Plants {self.name}>'
    def short_serializer(self):
        return {
            "id": self.id,
            "name": self.name,
        }
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "size34": self.size34,
            "size35": self.size35,
            "size36": self.size36,
            "size37": self.size37,
            "size38": self.size38,
            "size39": self.size39,
            "size40": self.size40,
            "size41": self.size41,
        }


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    master_id = db.Column(db.Integer, db.ForeignKey('master.id'), nullable=True)
    plant_id = db.Column(db.Integer, db.ForeignKey('plants.id'), nullable=True)
    plant_size = db.Column(db.Integer, nullable=False)
    customer_name = db.Column(db.String(120), nullable=False)
    customer_number = db.Column(db.String(20), nullable=False)
    delivery_date = db.Column(db.Date, nullable=True)
    date = db.Column(db.Date, nullable=False)
    price = db.Column(db.Integer, nullable=True)
    status = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(600), nullable=True)
    
    def __repr__(self):
        return f'<Orders {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "plant": Plants.query.get(self.plant_id).serialize(),
            "master": Master.query.get(self.master_id).serialize(),
            "plant_size": self.plant_size,
            "customer_name": self.customer_name,
            "customer_number": self.customer_number,
            "delivery_date": self.delivery_date,
            "price": self.price,
            "status": self.status,
            "description": self.description
        }


class Costumer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    phone_number = db.Column(db.String(20), unique=False, nullable=False)

    # orders = db.relationship('Order', backref='costumer', lazy=True)

    def __repr__(self):
        return f'<Costumer {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "phone_number": self.phone_number
        }


class PlantsTransactions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200), unique=False, nullable=True)
    master_id = db.Column(db.Integer, db.ForeignKey('master.id'), nullable=True)
    plant_id = db.Column(db.Integer, db.ForeignKey('plants.id'), nullable=False)
    size34 = db.Column(db.Integer, nullable=True)
    size35 = db.Column(db.Integer, nullable=True)
    size36 = db.Column(db.Integer, nullable=True)
    size37 = db.Column(db.Integer, nullable=True)
    size38 = db.Column(db.Integer, nullable=True)
    size39 = db.Column(db.Integer, nullable=True)
    size40 = db.Column(db.Integer, nullable=True)
    size41 = db.Column(db.Integer, nullable=True)

    def __repr__(self):
        return f'<Costumer {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "description": self.description,
            # "master":  Master.query.get(self.master_id).serialize(),
            "plant": Plants.query.get(self.plant_id).serialize(),
            "size34": self.size34,
            "size35": self.size35,
            "size36": self.size36,
            "size37": self.size37,
            "size38": self.size38,
            "size39": self.size39,
            "size40": self.size40,
            "size41": self.size41,
        }