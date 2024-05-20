  
import os
from flask_admin import Admin
from .models import db, User, Electric, Acoustic, Classical, Favorites
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'darkly'
    admin = Admin(app, name='Guitar Blog Admin', template_mode='bootstrap3')

    
   #Special MODELview for favorite table
    class FavoritesView(ModelView):
        column_list = ('electric_id', 'acoustic_id', 'classical_id', 'user_id')
        form_columns = ('electric_id', 'acoustic_id', 'classical_id', 'user_id')  


    # Add your models here, for example this is how we add a the User model to the admin
        
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Electric, db.session))
    admin.add_view(ModelView(Acoustic, db.session))
    admin.add_view(ModelView(Classical, db.session))
    admin.add_view(FavoritesView(Favorites, db.session))
    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))