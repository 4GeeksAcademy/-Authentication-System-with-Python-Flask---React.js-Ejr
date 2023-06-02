import api.domain.service_worker.repository as Repository
import api.domain.services.controller as ServiceController
import api.domain.workers.controller as WorkerController
import api.domain.company.controller as CompanyController
import api.utilities.handle_response as Response
from api.models.index import Services_workers, Workers, Services

def create_service_worker(company_id, current_user_id, body):

    company = CompanyController.get_company_by_id(company_id)

    service_id = body["service_id"]
    service = ServiceController.get_single_service(service_id)
    
    worker_id = body["worker_id"]
    worker = WorkerController.get_single_worker(worker_id)

    service_worker = Services_workers.query.filter_by(worker_id=worker_id, service_id=service_id).first()

    if service_worker: 
        return { "msg": "This service has already been asigned to this worker ", "status": 400 }

 
    if company.id == worker.company_id and company.id == service.company_id and current_user_id == company.user_id: 
        return Repository.create_service_worker(worker_id, service_id )
    
    return { "msg": "Service worker have conflicts ", "status": 409}

def get_all_service_workers():

    service_workers = Repository.get_all_service_workers()
    if service_workers is None:
        return { "msg": "An error occured to retrieves service workers", "status": 400}
    
    return service_workers


def get_workers_by_service(service_id):

    service = Services.query.get(service_id)

    if service is None: 
        return {'msg': f'Service with id: {service_id} does not exist in this database', 'status': 404}

    workers_by_service = Repository.get_workers_by_service(service_id)
    
    if workers_by_service == []:
        return {'msg': f'Service with id: {service_id}, has no workers associated', 'status': 404}
    
    return workers_by_service

def get_services_by_worker(worker_id):

    worker = Workers.query.get(worker_id)

    if worker is None: 
        return {'msg': f'Worker with id: {worker_id} does not exist in this database', 'status': 404}

    services_by_worker = Repository.get_services_by_worker(worker_id)
    
    if services_by_worker == []:
        return {'msg': f'Worker with id: {worker_id} has no services associated', 'status': 404}
    
    return services_by_worker

def delete_service_worker(service_worker_id, current_user_id):
    service_worker = Services_workers.query.get(service_worker_id)
    
    if service_worker is None:
        return { "msg": f"The service_worker with id: {service_worker_id}, does not exist in this database.", "status": 404 }

    if service_worker.services.company.user_id == current_user_id:
        deleted_service_worker = Repository.delete_service_worker(service_worker_id)
        return deleted_service_worker
    else: 
        return {'msg': 'You do not have rights to delete this service_worker!', 'status': 403}


    