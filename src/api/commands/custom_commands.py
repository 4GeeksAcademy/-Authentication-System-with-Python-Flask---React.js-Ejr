import click
from api.models import User
from api.extensions import db

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator.
Flask commands are useful to run cron jobs or tasks outside of the API but still in integration
with your database, for example: importing the price of bitcoin every night at 12 am.
"""

def setup_commands(app):
    """
    Set up custom Flask commands for the application.

    :param app: The Flask app instance.
    """

    """
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add.
    """
    @app.cli.command("insert-test-users")  # Name of our command
    @click.argument("count")  # Argument of our command
    def insert_test_users(count):
        """
        Insert test users into the database.

        :param count: The number of test users to add.
        """
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
        """
        Insert test data into the database.
        """
        pass  # Placeholder for adding functionality to insert test data
