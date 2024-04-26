from api.models import db, User, Cities, Status 
from flask_bcrypt import Bcrypt
from flask import Flask

app = Flask(__name__)
bcrypt = Bcrypt(app)

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

users = [
    {"username": "denis9diaz", "email": "denis9diaz@hotmail.com", "password": "123", "user_type": "user", "status_name": "Amateur"},
    {"username": "javi001", "email": "javi@hotmail.com", "password": "123", "user_type": "user", "status_name": "Amateur"},
    {"username": "ernest0", "email": "ernesto@hotmail.com", "password": "123", "user_type": "user", "status_name": "Amateur"},
    {"username": "mariagarcia", "email": "maria@hotmail.com", "password": "123", "user_type": "user", "status_name": "Amateur"},
    {"username": "pedropica", "email": "pedro@hotmail.com", "password": "123", "user_type": "user", "status_name": "Amateur"},
    {"username": "soyelena", "email": "elena@hotmail.com", "password": "123", "user_type": "user", "status_name": "Amateur"},
    {"username": "gonz0", "email": "gonzo@hotmail.com", "password": "123", "user_type": "user", "status_name": "Amateur"},
    {"username": "silvialahouse", "email": "silvia@hotmail.com", "password": "123", "user_type": "user", "status_name": "Amateur"},
    {"username": "pepe33", "email": "pepe@hotmail.com", "password": "123", "user_type": "user", "status_name": "Amateur"},
    {"username": "miriammm", "email": "miriam@hotmail.com", "password": "123", "user_type": "user", "status_name": "Amateur"},
]

companies = [
    {"username": "CocaCola", "email": "cocacola@cocacola.com", "password": "123", "user_type": "company", "status_name": "Amateur"},
    {"username": "Orbit", "email": "orbit@orbit.com", "password": "123", "user_type": "company", "status_name": "Amateur"},
    {"username": "Nike", "email": "nike@nike.com", "password": "123", "user_type": "company", "status_name": "Amateur"},
    {"username": "Adidas", "email": "adidas@adidas.com", "password": "123", "user_type": "company", "status_name": "Amateur"},
    {"username": "Reebok", "email": "reebok@reebok.com", "password": "123", "user_type": "company", "status_name": "Amateur"},
    {"username": "Supreme", "email": "supreme@supreme.com", "password": "123", "user_type": "company", "status_name": "Amateur"},
    {"username": "Relx", "email": "relx@relx.com", "password": "123", "user_type": "company", "status_name": "Amateur"},
    {"username": "Fanta", "email": "fanta@fanta.com", "password": "123", "user_type": "company", "status_name": "Amateur"},
    {"username": "Nestle", "email": "nestle@nestle.com", "password": "123", "user_type": "company", "status_name": "Amateur"},
    {"username": "MediaMarkt", "email": "mediamarkt@mediamarkt.com", "password": "123", "user_type": "company", "status_name": "Amateur"},
]

def setup_commands(app):

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
    
    @app.cli.command("insert-users")
    def insert_users():
        with app.app_context():  
            print("Creating Users")
        for x in range(0, len(users)):
            user = User()
            user.username = users[x]["username"]
            user.email = users[x]["email"]
            user.password = bcrypt.generate_password_hash(users[x]["password"]).decode("utf-8")  
            user.user_type = users[x]["user_type"]
            user.status_name = users[x]["status_name"]
            db.session.add(user)
            db.session.commit()
            print("User {} creado!".format(users[x]["username"]))
        print("Todos los usuarios creados")


    @app.cli.command("insert-companies")
    def insert_companies():
        with app.app_context():
            print("Creating Companies")
        for x in range(0, len(companies)):
            user = User()
            user.username = companies[x]["username"]
            user.email = companies[x]["email"]
            user.password = bcrypt.generate_password_hash(companies[x]["password"]).decode("utf-8")  
            user.user_type = companies[x]["user_type"]
            db.session.add(user)
            db.session.commit()
            print("Company {} creada!".format(companies[x]["username"]))
        print("Todas las empresas creadas")


    @app.cli.command("insert-test-data")
    def insert_test_data():
        pass
