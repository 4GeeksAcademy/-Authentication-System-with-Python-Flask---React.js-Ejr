from api.models.db import db
from api.models.user import User

# POST USER - SIGNUP
def sign_in_user(email, passw, role):
    user = User(email, passw, role)
    db.session.add(user)
    db.session.commit()
    return user