  
import os
from flask_admin import Admin
from .models import db, User, Programador, Empleador, Postulados, Ratings, Favoritos, Ofertas, Proyectos, Contact
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Programador, db.session))
    admin.add_view(ModelView(Empleador, db.session))
    admin.add_view(ModelView(Postulados, db.session))
    admin.add_view(ModelView(Ratings, db.session))
    admin.add_view(ModelView(Favoritos, db.session))
    admin.add_view(ModelView(Ofertas, db.session))
    admin.add_view(ModelView(Proyectos, db.session))
    admin.add_view(ModelView(Contact, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))