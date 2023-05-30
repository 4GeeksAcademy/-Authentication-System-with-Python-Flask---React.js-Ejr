from flask import Flask, request, jsonify, Blueprint
import api.domain.workers.controller as Controller
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models.index import Workers
import api.utilities.handle_response as Response

api = Blueprint("api/workers", __name__)

@api.route("/<int:company_id>", methods=["POST"])
@jwt_required()
def create_worker(company_id):
    current_user = get_jwt_identity()
    current_user_id = current_user['id']

    body = request.get_json()

    new_worker = Controller.create_worker(body, company_id, current_user_id)

    if isinstance(new_worker, Workers):
        return Response.response_ok('New worker created successfully!', new_worker.serialize())
    else:
        return Response.response_error(new_worker['msg'], new_worker['status'])

@api.route("/company/<int:company_id>", methods=["GET"])
def get_workers_by_company(company_id):
    workers_by_company = Controller.get_workers_by_company(company_id)
    
    if isinstance(workers_by_company, list):
        serialized_workers = list(map(lambda worker: worker.serialize(), workers_by_company))
        return Response.response_ok(f'List of all workers of the company with id: {company_id}', serialized_workers)
    else:
        return Response.response_error(workers_by_company['msg'], workers_by_company['status'])


@api.route("/<int:worker_id>", methods=["GET"])
def get_single_worker(worker_id):
    
    worker = Controller.get_single_worker(worker_id)
    
    if isinstance(worker, Workers):
        return Response.response_ok(f'Worker with id: {worker_id}, has been retrieved from database.', worker.serialize())
    else:
        return Response.response_error(worker['msg'], worker['status']) 

@api.route("/<int:worker_id>", methods=["PATCH"])
@jwt_required()
def delete_worker(worker_id):
    current_user = get_jwt_identity()
    current_user_id = current_user['id']

    worker = Controller.delete_worker(worker_id, current_user_id)
    
    if isinstance(worker, Workers):
        return Response.response_ok(f'Worker with id: {worker_id}, was deleted from database.', worker.serialize())
    else: 
         return Response.response_error(worker['msg'], worker['status'])

@api.route("/<int:worker_id>", methods=["PUT"])
@jwt_required()
def update_worker(worker_id):
    current_user= get_jwt_identity()
    current_user_id = current_user["id"]
    update_worker = request.get_json()

    worker = Controller.update_worker(worker_id, update_worker, current_user_id )
    if isinstance(worker, Workers):
        return Response.response_ok(f'Worker with id: {worker_id}, has been updated in database', worker.serialize())
    else:
        return Response.response_error(worker["msg"], worker['status'])
