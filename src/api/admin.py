  
import os
from flask_admin import Admin
from .models import db, Business_user, Offers, Trip, User, Review, Post, Favorites, 
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

  
    admin.add_view(ModelView(User, db.session))

    admin.add_view(ModelView(Review, db.session))
    
    admin.add_view(ModelView(Post, db.session))

    admin.add_view(ModelView(Favorites, db.session))

    admin.add_view(ModelView(Business_user, db.session))
   
    admin.add_view(ModelView(Offers, db.session))
    
    admin.add_view(ModelView(Trip, db.session))
