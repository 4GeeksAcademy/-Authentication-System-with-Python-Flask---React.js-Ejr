from flask import Flask, request, jsonify, Blueprint
import api.domain.service_worker.controller as Controller
import api.utilities.handle_response as Response
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models.index import db, Services_workers, Company
import api.domain.services.controller as ServiceController

api = Blueprint("api/service_worker", __name__)


@api.route("/<int:company_id>", methods=["POST"])
@jwt_required()
def create_service_worker(company_id):
    current_user = get_jwt_identity()
    current_user_id = current_user["id"]

    body = request.get_json()
    
    service_worker = Controller.create_service_worker(company_id ,current_user_id, body)
    
    if isinstance(service_worker, Services_workers):
        return Response.response_ok("New service_worker created successfully!", service_worker.serialize())
    else:
        return Response.response_error(service_worker["msg"], service_worker["status"])

@api.route("/service/<int:service_id>", methods=["GET"])
def get_workers_by_service(service_id):
    workers_by_service = Controller.get_workers_by_service(service_id)

    if isinstance(workers_by_service, list):
        serialized_workers_by_service = list(map(lambda workers: workers.serialize_workers(), workers_by_service))
        return Response.response_ok(f'List of all workers of the service with id: {service_id}', serialized_workers_by_service)
    else:
        return Response.response_error(workers_by_service['msg'], workers_by_service['status'])

@api.route("/worker/<int:worker_id>", methods=['GET'])
def get_services_by_worker(worker_id):

    services_by_worker = Controller.get_services_by_worker(worker_id)

    if isinstance(services_by_worker, list):
        serialized_services_by_worker = list(map(lambda services: services.serialize_services(), services_by_worker))
        return Response.response_ok(f'List of all services of the worker with id: {worker_id}', serialized_services_by_worker)
    else:
        return Response.response_error(services_by_worker['msg'], services_by_worker['status'])

@api.route("/<int:service_worker_id>", methods=["DELETE"])
@jwt_required()
def delete_service_worker(service_worker_id):
    current_user = get_jwt_identity()
    current_user_id = current_user["id"]

    service_worker = Controller.delete_service_worker(service_worker_id, current_user_id)
    
    if isinstance(service_worker, Services_workers):
        return Response.response_ok(f'Service_worker with id: {service_worker_id}, was deleted from database', service_worker.serialize())
    
    return service_worker