from api.models.db import db

# POST USER - SIGNUP
def log_in_user(user):
    users = User(user)
    print(users)
    db.session.add(users)
    db.session.commit()
    return users.serialize()