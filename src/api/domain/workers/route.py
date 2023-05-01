from flask import Flask, request, jsonify, Blueprint
import api.domain.workers.controller as Controller
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models.index import db, Company

api = Blueprint("api/workers", __name__)


@api.route("/add_work/<int:company_id>", methods=["POST"])
def create_work(company_id):
    body = request.get_json()
    new_work = Controller.create_work(body, company_id)
    return jsonify(new_work.serialize()), 201


@api.route("/all", methods=["GET"])
def get_worker_list():
    return Controller.get_worker_list()


@api.route("/<int:company_id>", methods=["GET"])
def get_worker_by_id(company_id):
    worker_by_id = Controller.get_worker_by_id(company_id)
    return worker_by_id


@api.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_worker(worker_id):
    current_worker = get_jwt_identity()
    current_worker_id = current_worker["id"]

    worker = Worker.query.get(worker_id)
    worker_user_id = worker.company_id
    if current_worker_id != worker_user_id:
        return Response.response_error("Worker is not found", 400)
    eliminate_workers = Controller.delete_worker(workers_id)
    return jsonify(eliminate_workers)
