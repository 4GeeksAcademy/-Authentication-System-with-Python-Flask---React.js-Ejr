import api.domain.company.repository as Repository 
import api.utilities.handle_response as Response

def create_company(data):
    if data['user_id'] is None or data['user_id'] == '':
        return Response.response_error('User ID not found', 400)

    if data['cif'] is None or data['cif'] == '':
        return Response.response_error('Company CIF not found', 400)
    
    if data['name'] is None or data['name'] == '':
        return Response.response_error('Company name not found', 400)
    
    return Repository.create_company(data), 201

def get_company_list():
	all_companies = Repository.get_company_list()
	return Response.response_ok('List of all companies', all_companies)

def get_company_by_id(company_id):
    company = Repository.get_company_by_id(company_id)

    if company is None:
        return Response.response_error('Company not found', 404)
    return company

def update_company(update_company, company_id):
    
    update_company = Repository.update_company(update_company, company_id)

    if update_company:
        return Response.response_ok(f'Company with id: {company_id}, has been updated in database.', update_company.serialize())
    else:
        return Response.response_error(f'Company with id: {company_id}, not found in database.', 404)

def delete_company(company_id):
    
    is_deleted_company = Repository.delete_company(company_id) 
    
    if is_deleted_company:
        return Response.response_ok(f'Company with id: {company_id}, has been deleted from database', 200)
    return Response.response_error(f'Company with id: {company_id}, has not been found in database.', 400)