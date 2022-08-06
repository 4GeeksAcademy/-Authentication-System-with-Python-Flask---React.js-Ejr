  
import os
from flask_admin import Admin
from .models import db, Usuario, Empresa, Reporte, Colacion, Casino, Principal, Pedidos, Postre, Bebida, Ensalada
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(Usuario, db.session))
    admin.add_view(ModelView(Empresa, db.session))
    admin.add_view(ModelView(Pedidos, db.session))
    admin.add_view(ModelView(Colacion, db.session))
    admin.add_view(ModelView(Casino, db.session))
    admin.add_view(ModelView(Principal, db.session))
    admin.add_view(ModelView(Ensalada, db.session))
    admin.add_view(ModelView(Postre, db.session))
    admin.add_view(ModelView(Bebida, db.session))
    admin.add_view(ModelView(Reporte, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))