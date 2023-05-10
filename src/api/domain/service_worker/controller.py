import api.domain.service_worker.repository as Repository
import api.domain.services.controller as ServiceController
import api.domain.workers.controller as WorkerController
import api.domain.company.controller as CompanyController
import api.utilities.handle_response as Response
from api.models.index import Company


def get_service_worker_by_id(service_id):
    service_worker = Repository.get_service_worker_by_id(service_id)
    if service_worker is None:
        return Response.response_error("user no found", 404)
    return service_worker

def get_services_workers_by_company(company_id):
    company = Company.query.get(company_id)
    if company is None:
        return {'msg': f'The Company Services Worker with id: {company_id}, does not exists in this database.', 'status': 404}

    services_worker = Repository.get_services_workers_by_company(company_id)
    return services_worker

def create_service_worker(service_id, current_user_id, body):
    
    # Verificar que el usuario actual tiene permisos para crear servicio a un trabajador
    company = CompanyController.get_company_by_user_id(current_user_id)
    if company is None:
        return {
            "msg": "You do not have permission to create a service worker!",
            "status": 403,
        }
    
    # Verificar si el servicio existe
    # service_id = body["service_id"]
    service = ServiceController.get_single_service(service_id)
    
    if service is None:
        return {
            "msg": f"The Service with id: {service_id}, does not exist in this database.",
            "status": 404,
        }
    
    # Verificar si el trabajador existe
    worker_id = body["worker_id"]
    worker = WorkerController.get_worker_by_id(worker_id)
    if worker is None:
        return {
            "msg": f"The Worker with id: {worker_id}, does not exist in this database.",
            "status": 404,
        }
    
    # Verificar que el trabajador y el servicio pertenecen a la misma compañía
    if company["id"] == worker["company_id"] and company["id"] == service.company_id:
        Repository.create_service_worker(service_id, worker_id)
        return {
        "msg": "Service worker created successfully!",
        "status": 201,
        }
    # Si las condiciones no se cumplen quiere decir que hay 
    # conflictos y no se esta pasando lo que corresponde.
    return {
        "msg": "Service worker have conflicts ",
        "status": 409,
    }

def delete_worker_service_id(service_id, current_user_id):


    # Verificar que el usuario actual tiene permisos para crear servicio a un trabajador
    company = CompanyController.get_company_by_user_id(current_user_id)
    if company is None:
        return {
            "msg": "You do not have permission to create a service worker!",
            "status": 403,
        }
    service = Repository.get_service_worker_by_id(service_id)
    if service is None:
        return {
            "msg": f"The Worker service with id: {service_id}, does not exist in this database.",
            "status": 404,
        }
    # aqui obtendia una comparacion entre la compañia y el servicio
    if company["id"] == service["service_id"]:
        Repository.delete_worker_service_id(service_id)
        return Response.response_ok(
            {"msg": f"Worker Service with id: {service_id}, has been deleted from database."},
            200,
        )
    else:
        return Response.response_error(
            f"Worker Service with id: {service_id}, not found in database.", 404
        )

    