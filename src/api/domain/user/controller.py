import api.domain.user.repository as Repository
import bcrypt
from api.functions import hash_pass, find_role, verify_user, verify_login
from flask_jwt_extended import create_access_token # PARA PODER CREAR EL TOKEN


def create_user(new_user):
   correct_user = verify_user(new_user)
   if correct_user.get("error") is not None:
      return correct_user
   hashed = hash_pass(new_user['password']) 
   return Repository.create_user(new_user['user_name'],hashed.decode(),new_user['name'],new_user['last_name'],new_user['email']) 

  
def create_user_by_role(new_user, roles_id):
   correct_user = verify_user(new_user)
   if correct_user.get("error") is not None:
      return correct_user
   hashed = hash_pass(new_user['password']) 
   return Repository.create_user_by_role(new_user['user_name'],hashed.decode(),new_user['name'],new_user['last_name'],new_user['email'], roles_id)  

def login_users(user):
   correct_user = verify_login(user)
   if correct_user.get('error') is not None:
      return correct_user
   login_user = Repository.get_user_by_email(user['email'])
   if login_user is None :
      return {"msg":"El email no existe", "error":True,"status":404}
   if bcrypt.checkpw(user['password'].encode(), login_user.password.encode()):    # si la contraseña coincide con lo que le pasamos devuelve el token 
      access_token = create_access_token(identity = login_user.serialize())
      return {"token": access_token}
   return {"msg":"Datos de acceso incorrectos!", "error":True,"status":404} # si la contraseña no es correcta devuelve este mensaje


