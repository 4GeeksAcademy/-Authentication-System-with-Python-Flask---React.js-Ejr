import os
from flask_admin import Admin
from api.models.index import db, Technician, Service, User, Farmer, Crop, Message, Review
from flask_admin.contrib.sqla import ModelView


def setup_admin(app):
    app.secret_key = os.environ.get("FLASK_APP_KEY", "sample key")
    app.config["FLASK_ADMIN_SWATCH"] = "cerulean"
    admin = Admin(app, name="4Geeks Admin", template_mode="bootstrap3")

    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(Service, db.session))
    admin.add_view(ModelView(Technician, db.session))
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Farmer, db.session))
    admin.add_view(ModelView(Crop, db.session))
    admin.add_view(ModelView(Message, db.session))
    admin.add_view(ModelView(Review, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
