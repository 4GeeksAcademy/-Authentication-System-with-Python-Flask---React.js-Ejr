  
import os
from flask_admin import Admin
from .models import db, User, Itinerary, Comments, Reports, Tags, Itenerary_Tags_Rel, Follows_Followers_Rel, Score, Contacts
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Itinerary, db.session))
    admin.add_view(ModelView(Comments, db.session))
    admin.add_view(ModelView(Reports, db.session))
    admin.add_view(ModelView(Tags, db.session))
    admin.add_view(ModelView(Itenerary_Tags_Rel, db.session))
    admin.add_view(ModelView(Follows_Followers_Rel, db.session))
    admin.add_view(ModelView(Score, db.session))
    admin.add_view(ModelView(Contacts, db.session))
    

    

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))