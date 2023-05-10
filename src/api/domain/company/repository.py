from api.models.index import db, Company

def create_company(body, new_user_id):
    new_company = Company(new_user_id, body['cif'], body['name'], body['description'], body['address'], body['working_schedule'])
    db.session.add(new_company)
    db.session.commit()
    return new_company

def get_companies_list():
    all_companies = Company.query.all()
    serialized_companies = list(map(lambda company: company.serialize(), all_companies))
    return serialized_companies

def get_company_by_id(company_id):
    company = Company.query.get(company_id)
    return company

def get_company_by_user_id(user_id):
    company_by_user_id = Company.query.filter_by(user_id=user_id).first()
    
    if company_by_user_id:
        return company_by_user_id.serialize()
    else:
        return None 


def update_company(update_company, company_id, company):
    if company:
        company.name = update_company['name']
        company.description = update_company['description']
        company.address = update_company['address']
        company.working_schedule = update_company['working_schedule']
        db.session.commit()
        return company
    else:
        return None

def delete_company(company_id):
    company = Company.query.get(company_id)
    db.session.delete(company)
    db.session.commit()
    return company  
    #add delete functions for services, workers and products 
     