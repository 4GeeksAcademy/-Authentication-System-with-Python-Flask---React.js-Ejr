from api.models.index import db, User, Roles
from flask import jsonify


def create_new_user(user, role_type):
    role = Roles.query.filter_by(type=role_type).first()
    new_user = User(user['username'], user['firstname'], user['lastname'], user['email'], user['password'], role.id)
    db.session.add(new_user)
    db.session.commit()
    return new_user

def get_users_list():
    all_users = User.query.all()
    serialized_users = list(map(lambda user: user.serialize(), all_users))
    return serialized_users

def get_single_user(user_id):
    user = User.query.get(user_id)
    return user

def delete_user(user_id):
    user = User.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return True
    else:
        return False

def update_user(update_user, user_id):
    user = User.query.get(user_id)
    if user:
        user.username = update_user['username']
        user.firstname = update_user['firstname']
        user.lastname = update_user['lastname']
        user.email = update_user['email']
        db.session.commit()
        return user
    else:
        return None
    
def get_user_by_email(email):
    user = User.query.filter_by(email=email).first()
    return user
