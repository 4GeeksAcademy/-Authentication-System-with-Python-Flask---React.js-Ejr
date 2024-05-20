
import click
from api.models import db, User, Electric, Acoustic, Classical, Favorites

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

    @app.cli.command("insert-test-data")
    def insert_test_data():
        db.drop_all()
        db.create_all()
        try: 
            users = [
                    User(email="victoria@gmail.com",
                        password="Victoria32++",
                        first_name="Victoria",
                        last_name="Smith",
                        is_active=True),
                    User(email="rose@gmail.com",
                        password="Rose32++",
                        first_name="Rose",
                        last_name="Johnson",
                        is_active=True),
                    User(email="osianjorge@gmail.com",
                        password="Osian42++",
                        first_name="Osian",
                        last_name="Jorge",
                        is_active=True),
                    User(email="frankluis1923@gmail.com",
                        password="Frank32++",
                        first_name="Frank",
                        last_name="Luis",
                        is_active=True),
                    User(email="b.muruacarreras@gmail.com",
                        password="Bruno22++",
                        first_name="Bruno",
                        last_name="Murua",
                        is_active=True),
                    User(email="lucy_daldeau@outlook.com",
                        password="Lucia30++",
                        first_name="Lucy",
                        last_name="Daldeau",
                        is_active=True)
                ]
            db.session.add_all(users)
            db.session.commit()

            electrics = [
                Electric(model="Stratocaster",
                         scale=25,
                         price=1500,
                         color="Red",
                         manufacturer="Fender",
                         pickups="Single-coil",
                         image="https://images.unsplash.com/photo-1557683304-673a23048d34"),
                Electric(model="Les Paul",
                         scale=24,
                         price=2000,
                         color="Black",
                         manufacturer="Gibson",
                         pickups="Humbucker",
                         image="https://images.unsplash.com/photo-1505948279461-87a5d25323a5"),
                Electric(model="SG",
                         scale=24,
                         price=1800,
                         color="Cherry",
                         manufacturer="Gibson",
                         pickups="Humbucker",
                         image="https://images.unsplash.com/photo-1567598031066-7b22f4e8c5a0"),
                Electric(model="Telecaster",
                         scale=25,
                         price=1400,
                         color="Butterscotch",
                         manufacturer="Fender",
                         pickups="Single-coil",
                         image="https://images.unsplash.com/photo-1606787366044-d6d4f0f2b0f4"),
                Electric(model="Jazzmaster",
                         scale=25,
                         price=1600,
                         color="Sunburst",
                         manufacturer="Fender",
                         pickups="Single-coil",
                         image="https://images.unsplash.com/photo-1556228453-df7a0657c8e7"),
            ]
            db.session.add_all(electrics)
            db.session.commit()
            
            acoustics = [
                Acoustic(model="D-28",
                         scale=25,
                         price=3000,
                         color="Natural",
                         manufacturer="Martin",
                         image="https://images.unsplash.com/photo-1511895426328-dc8714191300"),
                Acoustic(model="J-45",
                         scale=24,
                         price=2500,
                         color="Sunburst",
                         manufacturer="Gibson",
                         image="https://images.unsplash.com/photo-1503185912284-5271ff81b9a8"),
                Acoustic(model="FG800",
                         scale=25,
                         price=500,
                         color="Natural",
                         manufacturer="Yamaha",
                         image="https://images.unsplash.com/photo-1534705867302-3fb6478431ab"),
                Acoustic(model="000-15M",
                         scale=25,
                         price=1300,
                         color="Mahogany",
                         manufacturer="Martin",
                         image="https://images.unsplash.com/photo-1511376720533-57f5f0eb7f08"),
                Acoustic(model="DR-100",
                         scale=25,
                         price=150,
                         color="Natural",
                         manufacturer="Epiphone",
                         image="https://images.unsplash.com/photo-1490806844715-4e4776b09e5a"),
            ]
            db.session.add_all(acoustics)
            db.session.commit()
            
            classicals = [
                Classical(model="C5",
                          scale=25,
                          price=400,
                          color="Natural",
                          manufacturer="Cordoba",
                          image="https://images.unsplash.com/photo-1564325250467-96b8ea435ec7"),
                Classical(model="CG122MCH",
                          scale=25,
                          price=350,
                          color="Natural",
                          manufacturer="Yamaha",
                          image="https://images.unsplash.com/photo-1564767609342-620cb19b2357"),
                Classical(model="C40",
                          scale=25,
                          price=150,
                          color="Natural",
                          manufacturer="Yamaha",
                          image="https://images.unsplash.com/photo-1507883037834-ef7c5757c5b2"),
                Classical(model="GC1CE",
                          scale=25,
                          price=500,
                          color="Natural",
                          manufacturer="Takamine",
                          image="https://images.unsplash.com/photo-1598978259645-3427b241c81d"),
                Classical(model="Protege C1M",
                          scale=25,
                          price=200,
                          color="Natural",
                          manufacturer="Cordoba",
                          image="https://images.unsplash.com/photo-1590835571700-81275e08aa27"),
            ]
            db.session.add_all(classicals)
            db.session.commit()

            print("Demo database successfully created.")
        except Exception as e:
            db.session.rollback()
            print(f"Error while running the script: {e}")