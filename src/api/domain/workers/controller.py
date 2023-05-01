import api.domain.workers.repository as Repository
import api.utilities.handle_response as Response
import api.domain.users.controller as UserController
import api.domain.company.controller as CompanyController


def create_work(data, company_id):
    company = CompanyController.get_company_by_id(company_id)
    if company is None:
        return "Company not found"

    new_user = UserController.create_new_user(data)
    if new_user is None:
        return "User not found"

    return Repository.create_work(company.id, worker_id, data["working_schedule"])


def get_worker_list():
    all_workers = Repository.get_worker_list()
    return Response.response_ok("List of all workers", all_workers)


def get_worker_by_id(company_id):
    worker = Repository.get_worker_by_id(company_id)
    if worker is None:
        return Response.response_error("Worker not found", 404)
    return worker.serialize()


def delete_worker(worker_id):
    is_deleted_worker = Repository.delete_worker(workers_id)

    if is_deleted_worker:
        return Response.response_ok(
            f"Company with id: {worker_id}, has been deleted from database", 200
        )
    return Response.response_error(
        f"Company with id: {worker_id}, has not been found in database.", 400
    )
