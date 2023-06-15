import api.domain.users.repository as Repository
from api.models.index import User, Company, Workers
import api.utilities.handle_response as Response
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, get_jwt
import bcrypt
from cloudinary.uploader import upload

def create_new_user(body, role_type):
    body_email = body['email']
    body_username = body['username']

    model_email = User.query.filter_by(email=body_email).first()
    model_username = User.query.filter_by(username=body_username).first()

    if model_email:
        return {'msg': 'Email already exists in database', 'status': 400}
    
    if model_username:
        return {'msg': 'Username already exists in database', 'status': 400}

    hashed = bcrypt.hashpw(body['password'].encode(), bcrypt.gensalt())
    body['password'] = hashed.decode()
    
    return Repository.create_new_user(body, role_type)

def get_users_list():

	all_users = Repository.get_users_list()
	return all_users

def get_single_user(user_id, current_user_id):
    #need to check that admin and worker belong to same company 
    user = Repository.get_single_user(user_id)
    current_user = User.query.get(current_user_id)

    if user is None:
        return {'msg': 'User does not exist in this database.', 'status': 404} 

    if current_user.roles.type == 'client':
        return {'msg': 'User has no rights to view this profile,', 'status': 404 }
    return user



def update_profile(username, firstname, lastname, email, avatar, current_user_id):
   
    if avatar:
        img = upload(avatar)
        url_avatar = img['secure_url']
    else:
        user = Repository.get_single_user(current_user_id)
        url_avatar = user.avatar  
    
    return Repository.update_profile(username, firstname, lastname, email, url_avatar, current_user_id)

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

    if user_role_type == 'admin':
        company = Company.query.filter_by(user_id=user.id).first()

        if bcrypt.checkpw(body['password'].encode(), user.password.encode()):
            new_identity = user.serialize()

            new_token = create_access_token(identity=new_identity)
            return {"token": new_token, "role": user_role_type, "company_id": company.id}

    if user_role_type == 'worker':
        worker = Workers.query.filter_by(user_id=user.id).first()
        
        if bcrypt.checkpw(body['password'].encode(), user.password.encode()):
            new_identity = user.serialize()

            new_token = create_access_token(identity=new_identity)
            return {"token": new_token, "role": user_role_type, "company_id": worker.company_id, "worker_id": worker.id}

    if user_role_type == 'client':
        if bcrypt.checkpw(body['password'].encode(), user.password.encode()):
            new_identity = user.serialize()

            new_token = create_access_token(identity=new_identity)
            return {"token": new_token, "role": user_role_type, "company_id": None}
        
    return user

def verify_user(user):
    verified_user = Repository.get_user_by_email(user['email'])
    if verified_user is None: 
        return {"msg": "User not found", "status": 404 }
    return verified_user