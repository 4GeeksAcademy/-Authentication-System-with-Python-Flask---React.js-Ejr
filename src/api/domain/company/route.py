from flask import Flask, request, jsonify, Blueprint
from api.models.index import db, Company, User
import api.utilities.handle_response as Response
import api.domain.company.controller as Controller
from flask_jwt_extended import jwt_required, get_jwt_identity

api = Blueprint('api/company', __name__)

@api.route('/register', methods=['POST'])
def create_company():
    body = request.get_json()
    new_company = Controller.create_company(body)
    return jsonify(new_company), 201

@api.route('/all', methods=['GET'])
def get_company_list():
    return Controller.get_company_list()

@api.route('/<int:company_id>', methods=['GET'])
def get_company_by_id(company_id):
    return Controller.get_company_by_id(company_id)

@api.route('/<int:company_id>', methods=['PUT'])
@jwt_required()
def update_company(company_id):
    update_company = request.get_json()
    current_user = get_jwt_identity()
    current_user_id = current_user['id']
    
    company = Company.query.get(company_id)
    company_user_id = company.user_id

    if current_user_id != company_user_id:
        return Response.response_error("User is not the company admin", 400)
    return Controller.update_company(update_company, company_id)

@api.route('/<int:company_id>', methods=['DELETE'])
@jwt_required()
def delete_company(company_id):
    current_user = get_jwt_identity()
    current_user_id = current_user['id']
    
    company = Company.query.get(company_id)
    company_user_id = company.user_id

    if current_user_id != company_user_id:
        return Response.response_error("User is not the company admin", 400)
    return Controller.delete_company(company_id)
    

    

