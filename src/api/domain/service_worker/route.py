from flask import Flask, request, jsonify, Blueprint
import api.domain.service_worker.controller as Controller
import api.utilities.handle_response as Response
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models.index import db, Services_workers, Company
import api.domain.services.controller as ServiceController

api = Blueprint("api/service_worker", __name__)


@api.route("/<int:id>", methods=["GET"])
def get_service_worker(id):
    return Controller.get_service_worker_by_id(id)

@api.route('/by_company/<int:company_id>', methods=['GET'])
def get_services_workers_by_company(company_id):
    services_worker_by_company = Controller.get_services_workers_by_company(company_id)
    if isinstance(services_worker_by_company, list):
        serialized_services_by_company_id = list(map(lambda service: service.serialize(), services_worker_by_company))
        return Response.response_ok(f'List of all services workers of the company with id: {company_id}', serialized_services_by_company_id)
    else:
        return Response.response_error(services_worker_by_company['msg'], services_worker_by_company['status'])


@api.route("/<int:service_worker_id>", methods=["POST"])
@jwt_required()
def create_service_worker(service_worker_id):
    current_user = get_jwt_identity()
    current_user_id = current_user["id"]
    body = request.get_json()
    
    assign_service_worker = Controller.create_service_worker(service_worker_id ,current_user_id, body)
    
    if isinstance(assign_service_worker, Services_workers):
        return Response.response_ok(
            "New Services_workers created successfully!",
            assign_service_worker.serialize()
        )
    else:
        return Response.response_error(
            assign_service_worker["msg"], assign_service_worker["status"]
        )

@api.route("/<int:service_worker_id>", methods=["DELETE"])
@jwt_required()
def delete_worker_service_id(service_worker_id):
    current_user = get_jwt_identity()
    current_user_id = current_user["id"]
    return Controller.delete_worker_service_id(service_worker_id, current_user_id)