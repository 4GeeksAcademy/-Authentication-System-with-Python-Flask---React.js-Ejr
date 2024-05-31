
import random, click
from .models import db, User
from . import api_utils

def setup_commands(app):
    
    @app.cli.command("devins-users")
    @click.argument("count")
    def devins_users(count):
        print(f"Creating {count} test users")
        s= (" "*len("  User created: ")," "*(24-len("username")), " "*(32-len("email")))
        print(f"  USERNAME{s[1]}EMAIL{s[2]}PASSWORD\n {('-'*64)}")
        for x in range(1, int(count) + 1):
            password= "123456"
            user = User()
            user.username = f"username_user_{x}"
            user.email = "test_user" + str(x) + "@test.com"
            user.password = api_utils.hash_password(password)
            user.is_active = random.random > .5
            db.session.add(user)
            db.session.commit()

            s= ({" "*(24-len(user.username))}, {" "*(24-len(user.email))})

            print(f"  {user.username}{s[0]}{user.email}{s[1]}{password}{s[1]}")

        print("All test users created")

    @app.cli.command("devins-board")
    def insert_board():
        pass

    # this one wipes the db, dont use it
    @app.cli.command("wipe-db")
    def wipe_db():
        db.reflect()
        db.drop_all()
        db.session.commit()
        print("Database wiped, everything dropped")