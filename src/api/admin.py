import os
from flask_admin import Admin
from .models import db, User, Client, Product, ImageBlob, Products_View
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='Pura Vida Mart Admin', template_mode='bootstrap4')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Client, db.session))
    admin.add_view(ModelView(Product, db.session))    
    admin.add_view(ModelView(ImageBlob, db.session))
    admin.add_view(ModelView(Products_View, db.session))
    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))