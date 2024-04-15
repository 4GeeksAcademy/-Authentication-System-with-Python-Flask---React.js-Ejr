import click
from api.models import db, User, Cities, Status 

statuses = [{"name": "Amateur","points": {"points_min": 0, "points_max":99, "image": "https://res.cloudinary.com/dxzhssh9m/image/upload/v1712952499/1_dgp6wp.png"}},
            {"name": "Bronze" , "points":{"points_min": 100, "points_max":199, "image": "https://res.cloudinary.com/dxzhssh9m/image/upload/v1712952499/2_cf8hd4.png"}},
            {"name": "Silver", "points":{"points_min": 200, "points_max":299, "image": "https://res.cloudinary.com/dxzhssh9m/image/upload/v1712952499/3_da89wu.png"}},
            {"name": "Gold", "points":{"points_min": 300, "points_max":499, "image": "https://res.cloudinary.com/dxzhssh9m/image/upload/v1712952499/4_jw9ixh.png"}},
            {"name": "Platinum", "points":{"points_min": 500, "points_max":699, "image": "https://res.cloudinary.com/dxzhssh9m/image/upload/v1712952500/5_bgqk87.png"}},
            {"name": "Diamond", "points":{"points_min": 700, "points_max":999, "image": "https://res.cloudinary.com/dxzhssh9m/image/upload/v1712952499/6_nc29qr.png"}},
            {"name": "Legendary", "points":{"points_min": 1000, "points_max":10000000, "image": "https://res.cloudinary.com/dxzhssh9m/image/upload/v1712952499/7_j6fuph.png"}},]

cities = [
    {"name": "A Coruña"},
    {"name": "Alicante"},
    {"name": "Asturias"},
    {"name": "Barcelona"},
    {"name": "Bilbao"},
    {"name": "Cádiz"},
    {"name": "Granada"},
    {"name": "Las Palmas"},
    {"name": "Lanzarote"},  
    {"name": "Madrid"},
    {"name": "Málaga"},
    {"name": "Murcia"},
    {"name": "Navarra"},
    {"name": "Oviedo"},
    {"name": "Palma de Mallorca"},
    {"name": "Pontevedra"},
    {"name": "Sevilla"},
    {"name": "Tenerife"},
    {"name": "Valencia"},
    {"name": "Valladolid"},
    {"name": "Zaragoza"}
]

def setup_commands(app):
    
    @app.cli.command("insert-test-users") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_users(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = User()
            user.email = "test_user" + str(x) + "@test.com"
            user.password = "123456"
            user.is_active = True
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")

        print("All test users created")

    @app.cli.command("insert-status")
    def insert_status():
        with app.app_context():  
            print("Creating Status")
        for x in range(0, len(statuses)):
            status = Status()
            status.name = statuses[x]["name"]
            status.points_min = statuses[x]["points"]["points_min"]
            status.points_max = statuses[x]["points"]["points_max"]
            status.image = statuses[x]["points"]["image"]
            db.session.add(status)
            db.session.commit()
            print("Status {} creado!".format(statuses[x]["name"]))
        print("Todos los status creados")

    @app.cli.command("insert-cities")
    def insert_cities():
        print("Creating Cities")
        for x in range(0,len(cities)):
            new_city = Cities()
            new_city.name = cities[x]["name"]
            db.session.add(new_city)
            db.session.commit()
            print("City {} creada!".format(cities[x]["name"]))
        print("Todas las ciudades creadas")
        
    @app.cli.command("insert-test-data")
    def insert_test_data():
        pass
