













def create_user_by_role(new_user, roles_id):
   correct_user = verificar_usuario(new_user)
   if correct_user.get("error") is not None:
      return correct_user
   hashed = hash_pass(new_user['password']) 
   return Repository.create_user_by_role(new_user['user_name'],hashed.decode(),new_user['name'],new_user['last_name'],new_user['email'], roles_id)  
   