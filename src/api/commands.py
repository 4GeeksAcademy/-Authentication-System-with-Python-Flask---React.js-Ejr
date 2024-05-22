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
                User(email="cadimain@gmail.com", password="11111"),
                User(email="martha@gmail.com", password="22222"),
                User(email="ines@gmail.com", password="33333"),
                User(email="carmelo@gmail.com", password="44444"),
                User(email="diana@gmail.com", password="55555"),
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
                        url_img2= "https://www.cochesyconcesionarios.com/media/cache/1170x780/uploads/audi/a3/4/ha/audi-a3-sportback-06-0894eac007d60ea7fb591a5db75aeadfafcad408.jpeg",
                        url_img3= "https://cdn.motor1.com/images/mgl/nRVvk/s3/audi-a3-sportback-2020-on-location.jpg"
                    ),

                Vehicle(marca_modelo="TOYOTA HILUX",
                        matricula="1834 ABC", 
                        motor="Gasolina", 
                        tipo_cambio= "Manual", 
                        asientos=7, 
                        precio= 70,
                        user_id= users[0].id, 
                        precio_id_stripe= "price_1PJDCTBy1Y4Nz1OnYrUnaAfx", 
                        url_img1= "https://imagenes.20minutos.es/files/image_1920_1080/uploads/imagenes/2024/04/16/toyota-hilux-2024.jpeg",
                        url_img2= "https://www.autoscout24.es/cms-content-assets/1va66VHm7QTdnwscJMXrgt-9a035eaccb44b7cdd5b4a4e649438bea-prueba-toyota-hilux-gr-768.sport",
                        url_img3= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqa2qptUXL9Z1Jket4pbqKOK8K-IEwhGMp4A&s"
                    ),

                Vehicle(marca_modelo="FIAT 500",
                        matricula="1234 ABC", 
                        motor="Diesel", 
                        tipo_cambio= "Manual", 
                        asientos=4, 
                        precio= 30,
                        user_id= users[0].id, 
                        precio_id_stripe= "price_1PJDEWBy1Y4Nz1OnNzfFhOIr", 
                        url_img1= "https://www.bonavalcar-fcagroup.es/content/dam/ddp-dws/it/master-italia/model_pages_2022/fiat/500_electric/500bev_3_1_RoseGold_modelpage_top.png",
                        url_img2= "https://static.motor.es/fotos-jato/abarth/uploads/abarth-500-651741c4df8ad.jpg",
                        url_img3= "https://www.media.stellantis.com/cache/2/8/9/d/b/289db34041d9f6b4aa5c18646b0e94f66e8f3762.jpeg"
                    ),

                Vehicle(marca_modelo="TESLA S",
                        matricula="6666 DIA", 
                        motor="Electrico", 
                        tipo_cambio= "Automatico", 
                        asientos=2, 
                        precio= 105,
                        user_id= users[0].id, 
                        precio_id_stripe= "price_1PJDGOBy1Y4Nz1OnSi8mTu5Z", 
                        url_img1= "https://imagenes.km77.com/fotos/bbtcontent/clippingnew/KM7KPH20190909_0023/full-original.jpg",
                        url_img2= "https://img.remediosdigitales.com/55c7f7/tesla-model-s-2021/840_560.jpeg",
                        url_img3= "https://static.motor.es/fotos-jato/tesla/uploads/tesla-model-s-64d8c5fb2b66d.jpg"
                    ),
                
                Vehicle(marca_modelo="CITROEN C5",
                        matricula="4561 MAR", 
                        motor="Hibrido", 
                        tipo_cambio= "Manual", 
                        asientos=5, 
                        precio= 60,
                        user_id= users[0].id, 
                        precio_id_stripe= "price_1PJDI6By1Y4Nz1OnIaQVCnsZ", 
                        url_img1= "https://www.avtogermes.ru/images/marks/citroen/c5-aircross/i-restajling/colors/dzm0/001af687d9c759a9ed9e2a58dfe58679.png",
                        url_img2= "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Citroen_C5_Aircross%2C_Paris_Motor_Show_2018%2C_IMG_0197.jpg/1200px-Citroen_C5_Aircross%2C_Paris_Motor_Show_2018%2C_IMG_0197.jpg",
                        url_img3= "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Citroen_C5_Aircross%2C_Paris_Motor_Show_2018%2C_IMG_0197.jpg/1200px-Citroen_C5_Aircross%2C_Paris_Motor_Show_2018%2C_IMG_0197.jpg"
                    ),

                Vehicle(marca_modelo="MERCEDES VITO",
                        matricula="1818 MLK", 
                        motor="Gasolina", 
                        tipo_cambio= "Automatico", 
                        asientos=9, 
                        precio= 120,
                        user_id= users[0].id, 
                        precio_id_stripe= "price_1PJDI6By1Y4Nz1OnIaQVCnsZ", 
                        url_img1= "https://www.diariomotor.com/imagenes/2020/03/mercedes-vito-2020-p.jpg",
                        url_img2= "https://d2e5b8shawuel2.cloudfront.net/vehicle/304841/hrv/original.jpg",
                        url_img3= "https://cdn.drivek.com/configurator-imgs/cars/es/Original/MERCEDES/VITO/44175_VAN-4-DOORS/mercedes-benz-vito-tourer-front-view.jpg"
                    ) 
            ]
            db.session.add_all(vehicles)
            db.session.commit()
            
            favoriteVehicle = [
                FavoriteVehicle(user_id=users[0].id, vehicle_id=vehicles[0].id ),
                FavoriteVehicle(user_id=users[0].id, vehicle_id=vehicles[1].id ),
                FavoriteVehicle(user_id=users[0].id, vehicle_id=vehicles[2].id ),
                FavoriteVehicle(user_id=users[0].id, vehicle_id=vehicles[3].id ),
                FavoriteVehicle(user_id=users[0].id, vehicle_id=vehicles[4].id ),
                FavoriteVehicle(user_id=users[0].id, vehicle_id=vehicles[5].id )
                ]
            db.session.add_all(favoriteVehicle)
            db.session.commit()

            print("La base de datos ha sido poblada con datos de ejemplo.")
            
        except Exception as e:
            db.session.rollback()
            print(f"Error al llenar la base de datos: {e}")