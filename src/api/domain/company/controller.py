import api.domain.company.repository as Repository 
from api.models.index import db, Company, User
import api.domain.users.controller as UserController

def create_company(body):
    cif = body['cif']
    name = body['name']

    company_cif = Company.query.filter_by(cif=cif).first()

    company_name = Company.query.filter_by(name=name).first()

    if company_cif: 
        return {'msg': 'Company CIF already exists in database', 'status': 400}
    
    if company_name: 
        return {'msg': 'Company name already exists in database', 'status': 400}
    
    new_user = UserController.create_new_user(body, 'admin')

    return Repository.create_company(body, new_user.id)

def get_companies_list():
	all_companies = Repository.get_companies_list()
	return all_companies

def get_company_by_id(company_id):
    company = Repository.get_company_by_id(company_id)
    if company is None:
        return {'msg': f'Company with id: {company_id}, does not exist in this database.', 'status': 404}
    return company

def get_company_by_user_id(user_id):
    user = User.query.get(user_id)
    if user is None: 
        return {'msg': f'The User with id: {user_id}, does not exist in this database.', 'status': 404}
    
    company_by_user_id = Repository.get_company_by_user_id(user_id)
    if company_by_user_id == []:
        return {'msg': f'The user: {user_id}, has no existing companies in this database.', 'status': 404}

    return company_by_user_id

def update_company(update_company, company_id, current_user_id):
    company = Company.query.get(company_id)

    company_user_id = company.user_id
    
    if current_user_id == company_user_id and company.user.role_id == 1:
        updated_company = Repository.update_company(update_company, company_id, company)
        return updated_company
    else: 
        return {'msg': 'You do not have rights to update this company!', 'status': 403}  

def delete_company(company_id, current_user_id):
    company = Company.query.get(company_id)
    
    if company is None:
        return {'msg': f'The company with id: {company_id}, does not exists in this database.', 'status': 404}

    if company is None:
        return {'msg': f'The company with id: {company_id}, does not exists in this database.', 'status': 404}
    company_user_id = company.user_id

    if current_user_id == company_user_id:
        deleted_company = Repository.delete_company(company) 
        return deleted_company
    else:
        return {'msg': 'You do not have rights to delete this company!', 'status': 403}

    