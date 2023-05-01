from flask import Flask, request, jsonify
import api.domain.users.repository as Repository
import api.utilities.handle_response as Response
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, get_jwt
import bcrypt


def create_new_user(user):
    if user['email'] is None or user['email'] == "":
        return Response.response_error('Email is not valid', 400)
    
    if user['username'] is None or user['username'] == "":
        return Response.response_error('Username is not valid', 400)

    hashed = bcrypt.hashpw(user['password'].encode(), bcrypt.gensalt())
    user['password'] = hashed.decode()
    new_user = Repository.create_new_user(user)
    return new_user



def get_users_list():
	all_users = Repository.get_users_list()
	return Response.response_ok('List of all users', all_users)

def get_single_user(user_id):
    user = Repository.get_single_user(user_id)
    if user is None:
        return Response.response_error(f'User with id: {user_id}, do not exists in this database.', 404)

    return Response.response_ok(f'User with id: {user_id}, was found in database.',user.serialize())


def delete_user(user_id):
    is_deleted_user = Repository.delete_user(user_id)
    if is_deleted_user:
        return jsonify({"msg": f'User with id: {user_id}, has been deleted from database.'}), 200
    else:
        return Response.response_error(f'User with id: {user_id}, not found in database.', 404)
        

def update_user(update_user, user_id):
    updated_user = Repository.update_user(update_user, user_id)
    if updated_user:
        return Response.response_ok(f'User with id: {user_id}, has been updated in database.', updated_user.serialize())
    else:
        return Response.response_error(f'User with id: {user_id}, not found in database.', 404)

    
def verify_user_email_and_pass(user):
    if user['email'] is None or user['email'] == "":
        return {"msg": "Bad request", "error": True, "status": 400 }
    
    if user['password'] is None or user['password'] == "":
        return {"msg": "Bad request", "error": True, "status": 400 }  
    return user

def login(body):
    user_verify = verify_user_email_and_pass(body)
    if user_verify.get('error') is not None:
        return user_verify

    user = Repository.get_user_by_email(body['email'])

    print('user --> ',user)

    if user is None: 
        return {"msg": "User not found", "error": True, "status": 404 }
    
    if bcrypt.checkpw(body['password'].encode(), user.password.encode()):
        new_token = create_access_token(identity=user.serialize())
        return {"token": new_token}

    return {"msg": "User not found", "error": True, "status": 404 }