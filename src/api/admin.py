import os
from flask_admin import Admin
from .models import db, User, Books, BookGoals, BookOwner, BookRecommendations, BookSwapRequest, Friendship, Wishlist, Genres, Reviews
from flask_admin.contrib.sqla import ModelView
def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Books, db.session))
    admin.add_view(ModelView(BookGoals, db.session))
    admin.add_view(ModelView(BookOwner, db.session))
    admin.add_view(ModelView(BookRecommendations, db.session))
    admin.add_view(ModelView(BookSwapRequest, db.session))
    admin.add_view(ModelView(Friendship, db.session))
    admin.add_view(ModelView(Wishlist, db.session))
    admin.add_view(ModelView(Genres, db.session))
    admin.add_view(ModelView(Reviews, db.session))
    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))