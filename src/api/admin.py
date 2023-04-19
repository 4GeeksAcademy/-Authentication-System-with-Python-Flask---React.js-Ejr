  
import os
from flask_admin import Admin
from api.models.index import db, User, Roles, Review, Review_comment, Question, Question_comment, Lawyer, Lawyer_review, Lawyer_review_comment, Favorites, Company
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Roles, db.session))
    admin.add_view(ModelView(Review, db.session))
    admin.add_view(ModelView(Review_comment, db.session))
    admin.add_view(ModelView(Question, db.session))
    admin.add_view(ModelView(Question_comment, db.session))
    admin.add_view(ModelView(Lawyer, db.session))
    admin.add_view(ModelView(Lawyer_review, db.session))
    admin.add_view(ModelView(Lawyer_review_comment, db.session))
    admin.add_view(ModelView(Favorites, db.session))
    admin.add_view(ModelView(Company, db.session))
