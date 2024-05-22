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
    @app.cli.command("fill-db")
    def fill_db():
        """ Este comando rellenará la base de datos con datos de ejemplo. """
        
        db.drop_all()
        db.create_all()

        try:
            users = [
                User(email="cardimain@gmail.com", password="11111"),
                User(email="martha@gmail.com", password="22222"),
                User(email="ines@gmail.com", password="33333"),
                User(email="carmelo@gmail.com", password="44444"),
                User(email="diana@gmail.com", password="55555"),
                User(email="carmelo@gmail.com", password="66666")
            ]
            db.session.add_all(users)
            db.session.commit()
            
            vehicles = [
                Vehicle(marca_modelo="AUDI A3",
                        matricula="1234 HPW", 
                        motor="Hibrido", 
                        tipo_cambio= "Automatico", 
                        asientos=5, 
                        precio= 50,
                        user_id= users[0].id, 
                        precio_id_stripe= "price_1PJD3SBy1Y4Nz1OnX0QwLuGy", 
                        url_img1= "https://s03.s3c.es/imag/_v0/1754x857/9/0/d/1024x_AudiA3Allstreet-3.jpg",
                        url_img2= "https://s03.s3c.es/imag/_v0/1754x857/9/0/d/1024x_AudiA3Allstreet-3.jpg",
                        url_img3= "https://s03.s3c.es/imag/_v0/1754x857/9/0/d/1024x_AudiA3Allstreet-3.jpg"
                    ),

                Vehicle(marca_modelo="TOYOTA HILUX",
                        matricula="1834 ABC", 
                        motor="Gasolina", 
                        tipo_cambio= "Manual", 
                        asientos=7, 
                        precio= 70,
                        user_id= users[0].id, 
                        precio_id_stripe= "price_1PJDCTBy1Y4Nz1OnYrUnaAfx", 
                        url_img1= "https://s03.s3c.es/imag/_v0/1754x857/9/0/d/1024x_AudiA3Allstreet-3.jpg",
                        url_img2= "https://s03.s3c.es/imag/_v0/1754x857/9/0/d/1024x_AudiA3Allstreet-3.jpg",
                        url_img3= "https://s03.s3c.es/imag/_v0/1754x857/9/0/d/1024x_AudiA3Allstreet-3.jpg"
                    ),

                Vehicle(marca_modelo="FIAT 500",
                        matricula="1234 ABC", 
                        motor="Diesel", 
                        tipo_cambio= "Manual", 
                        asientos=4, 
                        precio= 30,
                        user_id= users[0].id, 
                        precio_id_stripe= "price_1PJDEWBy1Y4Nz1OnNzfFhOIr", 
                        url_img1= "https://s03.s3c.es/imag/_v0/1754x857/9/0/d/1024x_AudiA3Allstreet-3.jpg",
                        url_img2= "https://s03.s3c.es/imag/_v0/1754x857/9/0/d/1024x_AudiA3Allstreet-3.jpg",
                        url_img3= "https://s03.s3c.es/imag/_v0/1754x857/9/0/d/1024x_AudiA3Allstreet-3.jpg"
                    ),

                Vehicle(marca_modelo="TESLA S",
                        matricula="6666 DIA", 
                        motor="Electrico", 
                        tipo_cambio= "Automatico", 
                        asientos=2, 
                        precio= 105,
                        user_id= users[0].id, 
                        precio_id_stripe= "price_1PJDGOBy1Y4Nz1OnSi8mTu5Z", 
                        url_img1= "https://s03.s3c.es/imag/_v0/1754x857/9/0/d/1024x_AudiA3Allstreet-3.jpg",
                        url_img2= "https://s03.s3c.es/imag/_v0/1754x857/9/0/d/1024x_AudiA3Allstreet-3.jpg",
                        url_img3= "https://s03.s3c.es/imag/_v0/1754x857/9/0/d/1024x_AudiA3Allstreet-3.jpg"
                    ),
                
                Vehicle(marca_modelo="CITROEN C5",
                        matricula="4561 MAR", 
                        motor="Hibrido", 
                        tipo_cambio= "Manual", 
                        asientos=5, 
                        precio= 60,
                        user_id= users[0].id, 
                        precio_id_stripe= "price_1PJDI6By1Y4Nz1OnIaQVCnsZ", 
                        url_img1= "https://s03.s3c.es/imag/_v0/1754x857/9/0/d/1024x_AudiA3Allstreet-3.jpg",
                        url_img2= "https://s03.s3c.es/imag/_v0/1754x857/9/0/d/1024x_AudiA3Allstreet-3.jpg",
                        url_img3= "https://s03.s3c.es/imag/_v0/1754x857/9/0/d/1024x_AudiA3Allstreet-3.jpg"
                    ),

                Vehicle(marca_modelo="MERCEDES VITO",
                        matricula="1818 MLK", 
                        motor="Gasolina", 
                        tipo_cambio= "Automatico", 
                        asientos=9, 
                        precio= 120,
                        user_id= users[0].id, 
                        precio_id_stripe= "price_1PJDI6By1Y4Nz1OnIaQVCnsZ", 
                        url_img1= "https://s03.s3c.es/imag/_v0/1754x857/9/0/d/1024x_AudiA3Allstreet-3.jpg",
                        url_img2= "https://s03.s3c.es/imag/_v0/1754x857/9/0/d/1024x_AudiA3Allstreet-3.jpg",
                        url_img3= "https://s03.s3c.es/imag/_v0/1754x857/9/0/d/1024x_AudiA3Allstreet-3.jpg"
                    ) 
            ]
            db.session.add_all(vehicles)
            db.session.commit()
            
            favoriteVehicle = [
                FavoriteVehicle(user_id=users[0].id, vehicle_id=vehicles[0].id ),
                FavoriteVehicle(user_id=users[0].id, vehicle_id=vehicles[0].id ),
                FavoriteVehicle(user_id=users[0].id, vehicle_id=vehicles[0].id ),
                FavoriteVehicle(user_id=users[0].id, vehicle_id=vehicles[0].id ),
                FavoriteVehicle(user_id=users[0].id, vehicle_id=vehicles[0].id ),
                FavoriteVehicle(user_id=users[0].id, vehicle_id=vehicles[0].id )
                ]
            db.session.add_all(favoriteVehicle)
            db.session.commit()

            print("La base de datos ha sido poblada con datos de ejemplo.")
            
        except Exception as e:
            db.session.rollback()
            print(f"Error al llenar la base de datos: {e}")