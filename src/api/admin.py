  
import os
from flask_admin import Admin
from .models import db, User, Game, Favorite_game, Friend_request, Friendship, Subscription, Session, Session_member
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Game, db.session))
    admin.add_view(ModelView(Favorite_game, db.session))
    admin.add_view(ModelView(Friend_request, db.session))
    admin.add_view(ModelView(Friendship, db.session))
    admin.add_view(ModelView(Subscription, db.session))
    admin.add_view(ModelView(Session, db.session))
    admin.add_view(ModelView(Session_member, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))