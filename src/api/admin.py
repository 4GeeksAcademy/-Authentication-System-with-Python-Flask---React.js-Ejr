  
import os
from flask_admin import Admin
from .models import db, User, UserProfile, CommentsVenue, Events, PartnerProfile, Payment, Favorites, Venue, CommentsEvents
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(UserProfile, db.session))
    admin.add_view(ModelView(PartnerProfile, db.session))
    admin.add_view(ModelView(Events, db.session))
    admin.add_view(ModelView(Venue, db.session))
    admin.add_view(ModelView(Payment, db.session))
    admin.add_view(ModelView(CommentsEvents, db.session))
    admin.add_view(ModelView(CommentsVenue, db.session))
    admin.add_view(ModelView(Favorites, db.session))
    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))