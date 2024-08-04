import os
from flask_admin import Admin
from .models import db, User, Role, Car, Service, Appointment, Comment, Setting, TokenBlockList
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    # Add your models here
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Role, db.session))
    admin.add_view(ModelView(Car, db.session))
    admin.add_view(ModelView(Service, db.session))
    admin.add_view(ModelView(Appointment, db.session))
    admin.add_view(ModelView(Comment, db.session))
    admin.add_view(ModelView(Setting, db.session))
    admin.add_view(ModelView(TokenBlockList, db.session))