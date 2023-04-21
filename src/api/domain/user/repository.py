










def create_user_by_role(user_name,password,name,last_name,email, roles_id):
    user_by_role = User(user_name,password,name,last_name,email, roles_id)
    return user_by_role