import api.domain.user.repository as Repository
import bcrypt
from api.functions import hash_pass, find_role, verificar_usuario
from flask_jwt_extended import create_access_token # PARA PODER CREAR EL TOKEN


def create_user(new_user):
   correct_user = verificar_usuario(new_user)
   if correct_user.get("error") is not None:
      return correct_user
   hashed = hash_pass(new_user['password']) 
   return Repository.create_user(new_user['user_name'],hashed.decode(),new_user['name'],new_user['last_name'],new_user['email']) 


      
