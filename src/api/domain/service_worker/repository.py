from api.models.index import db, Services_workers, Services, Workers


def get_service_worker_by_id(service_id):
    service_worker = Services_workers.query.get(service_id)
    if service_worker is None:
        return service_worker
    return service_worker.serialize()


def get_services_workers_by_company(company_id):
    services_workers_by_company = db.session.query(Services_workers).join(Services).filter(Services.company_id == company_id).join(Workers).all()
    return services_workers_by_company

def create_service_worker(service_id, worker_id):
    new_service_worker = Services_workers(worker_id, service_id)
    db.session.add(new_service_worker)
    db.session.commit()
    return new_service_worker


def delete_worker_service_id(service_id):
    worker_service_id = Services_workers.query.get(service_id)
    if worker_service_id is not None:
        db.session.delete(worker_service_id)
        db.session.commit()
        return True
    else:
        return False
