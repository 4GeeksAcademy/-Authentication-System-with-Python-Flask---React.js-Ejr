  
import os
from flask_admin import Admin
from .models import db, User
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'la_coyuntura_de_los_afluentes_tamizados')
    app.config['FLASK_ADMIN_SWATCH'] = 'slate'
    admin = Admin(app, name='Admin', template_mode='bootstrap3')

    admin.add_view(ModelView(User, db.session))