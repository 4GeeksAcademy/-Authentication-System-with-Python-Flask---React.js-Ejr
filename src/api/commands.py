
import click
from api.models import db, User, Vehicle, FavoriteVehicle

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    # @app.cli.command("insert-test-users") # name of our command
    # @click.argument("count") # argument of out command
    # def insert_test_users(count):
    #     print("Creating test users")
    #     for x in range(1, int(count) + 1):
    #         user = User()
    #         user.email = "test_user" + str(x) + "@test.com"
    #         user.password = "123456"
    #         user.is_active = True
    #         db.session.add(user)
    #         db.session.commit()
    #         print("User: ", user.email, " created.")

    #     print("All test users created")

    @app.cli.command("fill-db-with-example-data")
    def fill_db_with_example_data():
        """ Este comando rellenará la base de datos con datos de ejemplo. """
        
        db.drop_all()
        db.create_all()

        try:
            users = [
                User(name="cardimain", email="cardimain@gmail.com", password="111111", is_active=True)
            ]
            db.session.add_all(users)
            db.session.commit()
            # category_id=categories[0].id
            
            
            vehicles = [
                Vehicle(marca_modelo="AUDI PRUEBA", matricula="1234HPW", motor="Gasolina", 
                        tipo_cambio= "Hibrido", asientos= "5", precio= "50", user_id= "1", precio_id_stripe= "1", 
                        url_img= "https://res-console.cloudinary.com/ddfq21pdb/thumbnails/v1/image/upload/v1716157903/aHE3MjBfa3dzamhi/drilldown")
                            
                            # favorites_vehicles = db.relationship('FavoriteVehicle', backref='vehicle', lazy=True)   
            ]
            db.session.add_all(vehicles)
            db.session.commit()
            
            
            favoriteVehicle = [
                FavoriteVehicle(id="Fotografía"),
                FavoriteVehicle(user_id="Ciclismo"),
                FavoriteVehicle(vehicle_id="Dibujo")
                # favorites_vehicles = db.relationship('FavoriteVehicle', backref='vehicle', lazy=True)
                ]
            db.session.add_all(favoriteVehicle)
            db.session.commit()
            print("La base de datos ha sido poblada con datos de ejemplo.")
        except Exception as e:
            db.session.rollback()
            print(f"Error al llenar la base de datos: {e}")