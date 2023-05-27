import os
from flask_admin import Admin
from api.models.index import db, Services, Services_workers, Workers, Company, User, Roles, Products, Shopping_cart, Booking
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(Services, db.session))
    admin.add_view(ModelView(Services_workers, db.session))
    admin.add_view(ModelView(Workers, db.session))
    admin.add_view(ModelView(Company, db.session))
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Roles, db.session))
    admin.add_view(ModelView(Products, db.session))
    admin.add_view(ModelView(Shopping_cart, db.session))
    admin.add_view(ModelView(Booking, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))