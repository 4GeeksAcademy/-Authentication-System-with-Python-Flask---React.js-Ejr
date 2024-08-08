from flask_sqlalchemy import SQLAlchemy 
db = SQLAlchemy()

# id	id-role	name	email	pasword	address	phone	is_active
class User(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        id_role = db.Column(db.Integer,db.ForeignKey("role.id"), nullable=False)
        name = db.Column(db.String(120), unique=True, nullable=False)
        email = db.Column(db.String(120), unique=True, nullable=False)
        password = db.Column(db.String(80), unique=False, nullable=False)
        address = db.Column(db.String(80), unique=False, nullable=False)
        phone = db.Column(db.String(80), unique=False, nullable=False)
        is_active = db.Column(db.Boolean(), unique=False, nullable=False)
        favorites = db.relationship("Favorite", backref="user")
        car = db.relationship("Car", backref="user")

        def __repr__(self):
            return f'<User {self.email}>'

        def serialize(self):
            return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
            "address":self.address,
            "phone": self.phone,
            "is_active":self.is_active
        }
class Role(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        name = db.Column(db.String(120), unique=True, nullable=False)
        roles = db.relationship("User", backref="role")


        def __repr__(self):
            return f'<Role {self.name}>'

        def serialize(self):
            return {
            "id": self.id,
            "name": self.name,
        }
class Profession(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        name = db.Column(db.String(120), unique=True, nullable=False)

        def __repr__(self):
            return f'<Profession {self.id}>'

        def serialize(self):
            return {
            "id": self.id,
            "name": self.name
        }

#  id	id-user	id-profesion	importe       
class Fee(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        id_user = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
        id_profession = db.Column(db.Integer,db.ForeignKey("profession.id"), nullable=False)
        importe = db.Column(db.Float, nullable=False)

        def __repr__(self):
            return f'<Fee {self.id}>'

        def serialize(self):
            return {
        "id": self.id,
        "id_user": self.id_user,
        "id_profession": self.id_profession,
        "importe": self.importe
    }
    # Favorite id	id-user	fav.rec	fav product
class Favorite(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        id_user = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
        fav_recipe = db.Column(db.Integer,db.ForeignKey("recipe.id") ,nullable=False)
        fav_product = db.Column(db.Integer,db.ForeignKey("product.id"), nullable=False)

        def __repr__(self):
            return f'<Favorite {self.id}>'

        def serialize(self):
            return {
            "id": self.id,
            "id_user": self.id_user,
            "fav_recipe": self.fav_recipe,
            "fav_product": self.fav_product
    }   
# Recipe id		name	instr
class Recipe(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        name = db.Column(db.String(120), nullable=False)
        instructions = db.Column(db.String(120),nullable=False)
        favorites = db.relationship("Favorite", backref="recipe")
        recipe_ingredients= db.relationship("RecipeIngredient", backref="recipe")


        def __repr__(self):
            return f'<Recipe {self.id}>'

        def serialize(self):
            return {
            "id": self.id,
            "name": self.name,
            "instructions": self.instructions
    }   
# ingredients id	name
class Ingredient(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        name = db.Column(db.String(120), nullable=False)
        recipe_ingredients= db.relationship("RecipeIngredient", backref="ingredient")


        def __repr__(self):
            return f'<Ingredient {self.id}>'

        def serialize(self):
            return {
            "id": self.id,
            "name": self.name
    }   
# recipe-igredients: id	id-ingredients	id-recipe	quantity	unit
class RecipeIngredient(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        id_ingredients= db.Column(db.Integer, db.ForeignKey("ingredient.id"), nullable=False)
        id_recipe= db.Column(db.Integer, db.ForeignKey("recipe.id"), nullable=False)
        quantity= db.Column(db.Float, nullable=False)
        unit= db.Column(db.String(120), nullable=False)

        def __repr__(self):
            return f'<RecipeIgredient {self.id}>'

        def serialize(self):
            return {
            "id": self.id,
            "id_ingredients": self.id_ingredients,
            "id_recipe": self.id_recipe,
            "quantity": self.quantity,
            "unit": self.unit
    }   
# product:id	name	cost
class Product(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        name= db.Column(db.String(120), nullable=False)
        cost= db.Column(db.Float, nullable=False)
        favorites = db.relationship("Favorite", backref="product")
        car = db.relationship("Car", backref="product")

        def __repr__(self):
            return f'<Product {self.id}>'

        def serialize(self):
            return {
            "id": self.id,
            "name": self.name,
            "cost": self.cost,
    }  
# car:id	id-user	id-product	units	importe-total
class Car(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        id_user= db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
        id_product= db.Column(db.Integer,db.ForeignKey("product.id"), nullable=False)
        units= db.Column(db.Integer, nullable=False)
        total= db.Column(db.Float, nullable=False)
        order = db.relationship("Order", backref="car")
        
        def __repr__(self):
            return f'<Car {self.id}>'

        def serialize(self):
            return {
            "id": self.id,
            "id_user": self.id_user,
            "id_product": self.id_product,
            "units": self.units,
            "total": self.total
    }  
#order:id	id-car	date	payment-method	total
class Order(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        id_car= db.Column(db.Integer, db.ForeignKey("car.id"), nullable=False)
        date= db.Column(db.String(120), nullable=False)
        payment_method= db.Column(db.Float, nullable=False)
        total= db.Column(db.Float, nullable=False)

        def __repr__(self):
            return f'<Order {self.id}>'

        def serialize(self):
            return {
            "id": self.id,
            "id_car": self.id_car,
            "date": self.date,
            "payment_method": self.payment_method,
            "total": self.total
    }  