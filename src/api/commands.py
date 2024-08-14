
import click,json, os
from api.models import db, User,Product

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

    @app.cli.command("insert-test-products")
    def insert_test_products():
        script_dir = os.path.dirname(__file__) #<-- absolute dir the script is in
        rel_path = "json/products.json"
        abs_file_path = os.path.join(script_dir, rel_path)
        with open(abs_file_path) as f:
            d = json.load(f)
            print(d)
            for product in d:
                new_product = Product(name=product["name"], cost=product["cost"])
                db.session.add(new_product)
            db.session.commit()

           