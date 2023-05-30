from api.models.index import db, User, Roles

def create_new_user(body, role_type):
    role = Roles.query.filter_by(type=role_type).first()
    new_user = User(body['username'], body['firstname'], body['lastname'], body['email'], body['password'], role.id)
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

def update_profile(username, firstname, lastname, email, url_avatar, current_user_id):
    user = User.query.get(current_user_id) #token user_id
    if user:
        user.username = username
        user.firstname = firstname
        user.lastname = lastname
        user.email = email
        user.avatar = url_avatar
        db.session.commit()
        return user
    else:
        return None

def delete_user(user):
    if user:
        user.is_active = False
        db.session.commit()
    else:
        return None
        
    return user

def get_user_by_email(email):
    user = User.query.filter_by(email=email).first()
    return user
