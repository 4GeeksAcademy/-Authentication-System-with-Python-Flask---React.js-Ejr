import api.domain.users.repository as Repository
from api.models.index import User
import api.utilities.handle_response as Response
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, get_jwt
import bcrypt


def create_new_user(body, role_type):
    email = body['email']
    username = body['username']

    email = User.query.filter_by(email=email).first()

    username = User.query.filter_by(username=username).first()

    if email:
        return {'msg': 'Email already exists in database', 'status': 400}
    
    if username:
        return {'msg': 'Username already exists in database', 'status': 400}

    hashed = bcrypt.hashpw(body['password'].encode(), bcrypt.gensalt())
    body['password'] = hashed.decode()
    
    return Repository.create_new_user(body, role_type)


def get_users_list():

	all_users = Repository.get_users_list()
	return all_users

def get_single_user(user_id):
    user = Repository.get_single_user(user_id)
    if user is None:
        return {'msg': f'User with id: {user_id}, do not exists in this database.', 'status': 404}
    return user

def update_user(update_user, user_id, current_user_id):
    user = User.query.get(user_id)

    user_id = user.id

    if current_user_id == user_id: 
        updated_user = Repository.update_user(update_user, user_id, user)
        return updated_user
    else:
        return {'msg': 'You do not have rights to update this user!', 'status': 403}  

def delete_user(current_user_id):
    user = User.query.get(current_user_id)

    if user is None:
        return {'msg': 'User does not exist in this database.', 'status': 404}
    else:
        deleted_user = Repository.delete_user(user)
        return deleted_user
          
def verify_user_email_and_pass(user):
    if user['email'] is None or user['email'] == "":
        return {"msg": "'Email is not valid'", "status": 400 }
    
    if user['password'] is None or user['password'] == "":
        return {"msg": "Password is not valid", "status": 400 }  
    
    return user

def login(body):
    user_verify = verify_user_email_and_pass(body)
    if user_verify.get('error') is not None:
        return user_verify

    user = Repository.get_user_by_email(body['email'])

    if user is None: 
        return {"msg": "User not found", "status": 404 }

    user_role_type = user.roles.type
    
    if bcrypt.checkpw(body['password'].encode(), user.password.encode()):
        new_token = create_access_token(identity=user.serialize())
        return {"token": new_token, "role": user_role_type}

    return user

def update_profile(username, firstname, lastname, email, avatar, current_user_id):
    img = upload(avatar)
    url_avatar = img['secure_url']
    return Repository.update_profile(username, firstname, lastname, email, url_avatar, current_user_id)

def verify_user(user):
    verified_user = Repository.get_user_by_email(user['email'])
    if verified_user is None: 
        return {"msg": "User not found", "status": 404 }
    return verified_user