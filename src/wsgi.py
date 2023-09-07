# This file was created to run the application on Heroku using Gunicorn.
# Read more about it here: https://devcenter.heroku.com/articles/python-gunicorn

from app import create_app  # Import the create_app function instead of the app instance

application = create_app()  # Use the function to create an instance of the application

if __name__ == "__main__":
    application.run()  # Start the application if this script is executed as the main program
