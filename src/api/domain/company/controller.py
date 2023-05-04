import api.domain.company.repository as Repository 
from api.models.index import db, Company, User
import api.domain.users.controller as UserController

def create_company(body):
    cif = body['cif']
    name = body['name']

    company_cif = Company.query.filter_by(cif=cif).all()

    company_name = Company.query.filter_by(name=name).all()

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
    
    company_by_id = Repository.get_company_by_id(company_id)
    if company_by_id is None:
        return {'msg': f'Company with id: {company_id}, do not exists in this database.', 'status': 404}
    
    company = Repository.get_company_by_id(company_id)
    return company

def update_company(update_company, company_id, current_user_id):
    company = Company.query.get(company_id)
    print(company)

    company_user_id = company.user_id
    
    if current_user_id == company_user_id and company.user.role_id == 1:
        updated_company = Repository.update_company(update_company, company_id, company)
        return updated_company
    else: 
        return {'msg': 'You do not have rights to update this company!', 'status': 403}  


def delete_company(company_id, current_user_id):
    company = Company.query.get(company_id)
    
    company_user_id = company.user_id

    if current_user_id != company_user_id:
        return {'msg': 'You do not have rights to delete this company!', 'status': 403}

    deleted_company = Repository.delete_company(company_id) 
    return deleted_company
    