from flask import Flask, request, jsonify, url_for, Blueprint
from api.models.index import db, User, Company
import api.domain.company.controller as Controller
import api.handle_response as Response


company_bp = Blueprint('company_bp', __name__)

@company_bp.route("/", methods= ["GET"])
def get_companies():
    return Controller.get_companies()

@company_bp.route("/", methods= ["POST"])
def register_company():
    data = request.get_json()

    new_company = Controller.register_company(data)

    if isinstance(new_company, User):   
        return Response.response_ok(new_company.serialize(), "New company added successfully", 201)
   
    return Response.response_error("Error adding the company", 401)