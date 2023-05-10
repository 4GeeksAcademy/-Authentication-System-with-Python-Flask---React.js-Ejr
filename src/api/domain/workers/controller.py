import api.domain.workers.repository as Repository
import api.utilities.handle_response as Response
import api.domain.users.controller as UserController
import api.domain.company.controller as CompanyController


def create_worker(data, company_id):
    company = CompanyController.get_company_by_id(company_id)

    if company is None:
        return "Company not found"

    new_user = UserController.create_new_user(data, "worker")

    return Repository.create_worker(company.id, new_user.id, data["working_schedule"])


def get_worker_by_id(worker_id):
    worker = Repository.get_worker_by_id(worker_id)
    if worker is None:
        return Response.response_error("Worker not found", 404)
    return worker.serialize()


def get_list_worker_company(company_id):
    list_worker_by_company = Repository.get_list_worker_company(company_id)
    if list_worker_by_company == []:
        return Response.response_error("Company list  is empty", 404)
    return list_worker_by_company


def delete_worker(worker_id):
    is_deleted_worker = Repository.delete_worker(worker_id)

    if is_deleted_worker:
        return Response.response_ok(
            f"Company with id: {worker_id}, has been deleted from database", 200
        )
    return Response.response_error(
        f"Company with id: {worker_id}, has not been found in database.", 400
    )
