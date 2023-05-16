import api.domain.workers.repository as Repository
import api.domain.company.controller as CompanyController
import api.domain.users.controller as UserController
from api.models.index import Company, Workers

def create_worker(body, company_id):

    company = CompanyController.get_company_by_id(company_id)
    
    worker = UserController.create_new_user(body, 'worker')

    return Repository.create_worker(company_id, worker.id)

def get_workers_by_company(company_id):
    company = Company.query.get(company_id)
    if company is None:
        return {'msg': f'The Company with id: {company_id}, does not exists in this database.', 'status': 404}

    workers_by_company = Repository.get_workers_by_company(company_id)
    
    if workers_by_company == []:
        return {'msg': 'There are no workers registered to this company.', 'status': 404}
    
    return workers_by_company

def get_single_worker(worker_id):

    worker = Repository.get_single_worker(worker_id)
    
    if worker is None:
        return {'msg': f'Worker with id: {worker_id}, do not exists in this database', 'status': 404}
    return worker

def delete_worker(worker_id, current_user_id):
    worker = Workers.query.get(worker_id)

    if worker is None:
        return {'msg': f'The worker with id: {worker_id}, does not exist in this database.', 'status': 404}

    worker_company_id = worker.company_id

    company = Company.query.get(worker_company_id)
    company_user_id = company.user_id

    if current_user_id == company_user_id:
        deleted_worker = Repository.delete_worker(worker)
        return deleted_worker
    else:
        return {'msg': 'You do not have rights to delete this worker!', 'status': 403}