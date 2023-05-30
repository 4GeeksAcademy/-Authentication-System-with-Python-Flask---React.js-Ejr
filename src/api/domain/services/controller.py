from api.models.index import db, Company, Services
import api.domain.services.repository as Repository

def create_new_service(company_id, current_user_id, body):
    company = Company.query.get(company_id)

    if company is None:
        return {'msg': f'The Company with id: {company_id}, do not exists in this database.', 'status': 404}

    if current_user_id == company.user_id:
        return Repository.create_new_service(body, company_id)
    else:
        return {'msg': 'You do not have rights to create new services!', 'status': 403}

def get_services_by_company(company_id):
    company = Company.query.get(company_id)
    if company is None:
        return {'msg': f'The Company with id: {company_id}, does not exists in this database.', 'status': 404}

    services = Repository.get_services_by_company(company_id)
    return services

def get_single_service(service_id):
    service = Repository.get_single_service(service_id)
    if service is None:
        return {'msg': f'The service with id: {service_id}, does not exists in this database.', 'status': 404}

    return service

def update_service(service_id, update_service,  current_user_id):
    service = Services.query.get(service_id)
    user_id = service.company.user_id
    
    if current_user_id == user_id:
        updated_service = Repository.update_service( update_service, service )
        return updated_service
    else:
        return {'msg': 'You do not have rights to update this user!', 'status': 403} 

def delete_service(service_id, current_user_id):
    service = Services.query.get(service_id)

    if service is None:
        return {'msg': f'The service with id: {service_id}, does not exists in this database.', 'status': 404}

    service_company_id = service.company_id
    company = Company.query.get(service_company_id)

    if current_user_id == company.user_id:
        deleted_service = Repository.delete_service(service)
        return deleted_service
    else:
        return {'msg': 'You do not have rights to delete services!', 'status': 403}

