from flask import Flask, request, jsonify, Blueprint
import api.utilities.handle_response as Response
import api.domain.company.controller as Controller
import api.domain.users.controller as UserController
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models.index import Company, User

api = Blueprint("api/company", __name__)

@api.route("/register", methods=["POST"])
def create_company():
    body = request.get_json()
    new_company = Controller.create_company(body)

    if isinstance(new_company, Company):
        return Response.response_ok('Company has been created in database.', new_company.serialize())
    else:
        return Response.response_error(new_company['msg'], new_company['status'])

@api.route("/all", methods=["GET"])
def get_companies_list():
    return Controller.get_companies_list()

@api.route("/<int:company_id>", methods=["GET"])
def get_company_by_id(company_id):
    company = Controller.get_company_by_id(company_id)
    return company.serialize()

@api.route("/user", methods=["GET"])
@jwt_required()
def get_company_by_user_id():
    current_user = get_jwt_identity()
    company_by_user_id = Controller.get_company_by_user_id(current_user["id"])
    return company_by_user_id 

@api.route("/<int:company_id>", methods=["PUT"])
@jwt_required()
def update_company(company_id):
    update_company = request.get_json()
    current_user = get_jwt_identity()
    current_user_id = current_user["id"]

    company = Controller.update_company(update_company, company_id, current_user_id)
    
    if isinstance(company, Company):
        return Response.response_ok(f'Your company has been updated in database.', company.serialize())
    else:
        return Response.response_error(company['msg'], company['status'])

@api.route("/delete/<int:company_id>", methods=["PATCH"])
@jwt_required()
def delete_company(company_id):
    current_user = get_jwt_identity()
    current_user_id = current_user["id"] 

    company = Controller.delete_company(company_id, current_user_id)

    if isinstance(company, Company):
        return Response.response_ok(f'Company with id: {company_id}, was deleted from database.', company.serialize())
    else:
        return Response.response_error(company['msg'], company['status'])

