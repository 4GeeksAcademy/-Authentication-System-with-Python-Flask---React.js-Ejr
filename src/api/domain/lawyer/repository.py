from api.models.index import db, User, Lawyer, Roles
from api.domain.user.controller import create_user_by_role
from flask import request, jsonify
import bcrypt
from api.functions import hash_pass, find_role


def get_lawyers():
    all_lawyers = Lawyer.query.all()
    users = User.query.filter(User.roles.has(description='Lawyer')).all()
    lawyer_serialized = list(map(lambda abogado : abogado.serialize(), all_lawyers))
    users_serialized = list(map(lambda user: user.serialize(), users))
    return users_serialized

def register_lawyer(data, address, city, cp, col_number):

    roles = find_role('Lawyer', Roles)

    user = create_user_by_role(data, roles.id)

    new_lawyer = Lawyer(address, city, cp, col_number)  
    
    user.lawyer.append(new_lawyer)
    
    db.session.add(user)
    db.session.commit()

    return user