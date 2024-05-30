  
import os
from flask_admin import Admin
from .models import db, User, Workspace, Board, List, Task, Tag, Style, ReadWriteRules, UserReadWriteRule
from flask_admin.contrib.sqla import ModelView

def setup_admin(app, index):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'la_coyuntura_de_los_afluentes_tamizados')
    app.config['FLASK_ADMIN_SWATCH'] = 'slate'
    admin = Admin(app, endpoint="_admin", url="/_admin", name='Admin', template_mode='bootstrap3')

    admin.add_views(
      ModelView(User, db.session),
      ModelView(Workspace, db.session),
      ModelView(Board, db.session),
      ModelView(List, db.session),
      ModelView(Task, db.session),
      ModelView(Tag, db.session),
      ModelView(Style, db.session),
      ModelView(ReadWriteRules, db.session),
      ModelView(UserReadWriteRule, db.session)
    )