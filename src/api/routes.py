"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, User_Details, Provider, Provider_Details, Category, Product , Product_Details, Inventory, Movement_Inventory
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route('/provider',methods=['GET'])
def listProvider():
    provider = Provider.query.all()
    provider_serialized = list(map(lambda data: data.serialize(), provider))
    return jsonify(provider_serialized),200

@api.route('/provider',methods=['POST'])
def addProvider():
    request_body = request.get_json()
    provider = Provider(id_Provider=request_body["id_Provider"],
                         name_Provider=request_body["name_Provider"],
                         active_Provider=request_body["active_Provider"])
    properties = Provider_Details(
                            id_Provider_Details=request_body["id_Provider"],
                            id_Provider=request_body["id_Provider"],
                            email_Provider_Details=request_body["email_Provider_Details"], 
                            phone_Provider_Details=request_body["phone_Provider_Details"],
                            address_Provider_Details=request_body["address_Provider_Details"],
                            payment_Type_Provider_Details=request_body["payment_Type_Provider_Details"])

@api.route('/category',methods=['GET'])
def listCategory():
    category = Provider.query.all()
    provider_serialized = list(map(lambda data: data.serialize(), category))
    return jsonify(provider_serialized),200

@api.route('/category',methods=['POST'])
def addCategory():
    request_body = request.get_json()
    category = Category(id_Category=request_body["id_Category"],
                        name_Category=request_body["name_Category"],
                        description_Category=request_body["description_Category"],
                        active_Product=request_body["active_Product"]
    print(request_body)
    db.session.add(provider)
    db.session.add(properties)
    db.session.add(category)
    db.session.commit()
    return jsonify("All good"), 200