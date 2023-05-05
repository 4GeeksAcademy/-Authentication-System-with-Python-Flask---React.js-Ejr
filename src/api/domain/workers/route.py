from flask import Flask, request, jsonify, Blueprint
import api.domain.workers.controller as Controller
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models.index import db, Workers
import api.utilities.handle_response as Response


api = Blueprint("api/workers", __name__)


@api.route("/add_work/<int:company_id>", methods=["POST"])
def create_work(company_id):
    body = request.get_json()
    new_work = Controller.create_worker(body, company_id)
    return jsonify(new_work.serialize()), 201


@api.route("/<int:worker_id>", methods=["GET"])
def get_worker_by_id(worker_id):
    worker_by_id = Controller.get_worker_by_id(worker_id)
    return worker_by_id


@api.route("/company/<int:company_id>", methods=["GET"])
def list_worker_in_company(company_id):
    list_of_worker = Controller.get_list_worker_company(company_id)
    return list_of_worker


@api.route("/<int:worker_id>", methods=["DELETE"])
@jwt_required()
def delete_worker(worker_id):
    current_user = get_jwt_identity()
    current_user_id = current_user["id"]
    worker = Workers.query.get(worker_id)

    if worker is None:
        return Response.response_error("Worker is not found", 400)

    if current_user_id != worker.company.user_id:
        return Response.response_error(
            "You do not have permission to delete this worker", 401
        )

    eliminated = Controller.delete_worker(worker_id)
    if eliminated:
        return Response.response_ok(
            f"Worker with id: {worker_id} has been deleted", 200
        )
    else:
        return Response.response_error(
            f"Error deleting worker with id: {worker_id}", 500
        )
