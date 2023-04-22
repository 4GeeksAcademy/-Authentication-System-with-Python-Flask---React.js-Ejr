
from api.models.index import db, User, Roles
from api.functions import find_role
import bcrypt

def create_user(user_name,password,name,last_name,email):
    roles = find_role("User", Roles)
    new_user = User(user_name,password,name,last_name,email,roles.id)
    db.session.add(new_user)
    db.session.commit()
    return new_user



