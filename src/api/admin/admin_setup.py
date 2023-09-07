# Created by alesanchezr (GitHub: https://github.com/alesanchezr) from 4GeeksAcademy
import os
from flask_admin import Admin
from api.models import User
from api.extensions import db
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    """
    Setup and configure Flask-Admin for the application.

    :param app: The Flask app instance.
    """
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')  # Set the secret key for the app
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'  # Set the Flask-Admin interface theme
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')  # Create a Flask-Admin instance

    # Add your models here, for example, this is how we add the User model to the admin
    admin.add_view(ModelView(User, db.session))

    # You can duplicate that line to add new models
    # admin.add_view(ModelView(YourModelName, db.session))
