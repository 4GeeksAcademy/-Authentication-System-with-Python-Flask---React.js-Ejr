from api.models.index import db, Services

def create_new_service(body, company_id):
    new_service = Services(company_id, body['name'], body['description'], body['service_duration'], body['price'])
    db.session.add(new_service)
    db.session.commit()
    return new_service

def get_services_by_company(company_id):
    services_by_company = Services.query.filter_by(company_id=company_id).all()
    return services_by_company

def get_single_service(service_id):
    service = Services.query.get(service_id)
    return service

def update_service( update_service, service):
    if service:
        service.name = update_service['name']
        service.description = update_service['description']
        service.service_duration = update_service['service_duration']
        service.price = update_service['price']
        db.session.commit()
        return service
    else:
        return None

def delete_service(service):
    if service:
        service.is_active = False
        db.session.commit()
    else:
        return None
    return service

