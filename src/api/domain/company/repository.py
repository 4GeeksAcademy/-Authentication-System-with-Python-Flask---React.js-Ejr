from api.models.index import db, Company


def create_company(data):
    new_company = Company(data['user_id'], data['cif'], data['name'], data['description'], data['address'], data['working_schedule'])
    db.session.add(new_company)
    db.session.commit()
    return new_company.serialize()

def get_company_list():
    all_companies = Company.query.all()
    serialized_companies = list(map(lambda company: company.serialize(), all_companies))
    return serialized_companies

def get_company_by_id(id):
    company = Company.query.get(id)
    return company.serialize()

def update_company(update_company, company_id):
    company = Company.query.get(company_id)
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
    if company is not None:  
        db.session.delete(company)
        db.session.commit()
    else:
        #add delete functions for services, workers and products 
        return company  