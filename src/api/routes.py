"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Favorite,Component,Plan,Payment
from api.utils import generate_sitemap, APIException
import json
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required




api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


# # # # # USER 👨👨👨👨👨👨

@api.route('/signup', methods=['POST'])
def signup_user():
    body = json.loads(request.data)
    # pw_hash = current_app.bcrypt.generate_password_hash(body["password"]).decode('utf-8')

    new_user = User(
        name = body["name"],
        last_name = body["last_name"],
        email = body["email"],
        password = body["password"],
        is_active= body["is_active"],

    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "usuario creado"}), 200 


@api.route('/login', methods=['POST'])
def login_user():
    body = json.loads(request.data)

    email=body["email"]
    password = body["password"]
    
    user = User.query.filter_by(email=email).first()

    if user is None: 
        return jsonify({"msg": "not found"}), 404
    
    if email !=user.email or password != user.password:
        return jsonify({"msg": "email or password are incorrect"}), 401 
    
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200


# # # # # COMPONENT 🔳🔳🔳🟧🟨🟩🟦

@api.route('/components', methods=['GET'])
def get_components():
    #/components?page=1&per_page=10 #get first page, 10 components.
    #/components?page=2&per_page=10 #get second page, 10 components.

    page = request.args.get('page', default=1, type=int)
    per_page = request.args.get('per_page', default=10, type=int)

    start_index = (page - 1) * per_page
    end_index = start_index + per_page

    component_query = Component.query.slice(start_index, end_index).all() # Pagination
    #component_query = Component.query.all() # No pagination 

    results = list(map(lambda item: item.serialize(), component_query))
    response_body = { "msg": "All components:",
                     "results": results}
    
    return jsonify(response_body), 200


@api.route('/component/<int:component_id>', methods=['GET'])
def get_one_component(component_id):

    component = Component.query.filter_by(id=component_id).first()
    if not component:
        return jsonify({"msg": "Component not found"}), 404

    response_body = { "msg": "Component:",
                     "results": component.serialize()}
    
    return jsonify(response_body), 200


@api.route('/component/add', methods=['POST']) # TODO >> only admin jwt
def add_component():
    request_body = request.get_json(force=True)
     
    new_component = Component(
                                name=request_body["name"], 
                                type = request_body["type"], 
                                html_code = request_body["html_code"],
                                css_code = request_body["css_code"],
                                js_code = request_body["js_code"],
                                react_code = request_body["react_code"],
                             )

    db.session.add(new_component)
    db.session.commit()
   
    return { "msg": "Component created", 
            "response": new_component.serialize()
            }


@api.route('/component/delete/<int:component_id>', methods=['DELETE']) # TODO >> only admin jwt
def delete_component(component_id):
    # component exist ?
    component = Component.query.get(component_id)
    if not component:
        return jsonify({"msg": "Component not found"}), 404
    else:
        db.session.delete(component)
        db.session.commit()
        return jsonify({"msg": f"Component {component_id} has been removed from database"}), 200


@api.route('/component/update/<int:component_id>', methods=['PUT'])  # TODO >> only admin jwt
def update_component(component_id):
    # component exist ?
    component = Component.query.get(component_id)
    if not component:
        return jsonify({"msg": "Component not found"}), 404

    request_body = request.get_json(force=True)

    # Update the component attributes
    component.name = request_body.get("name", component.name)
    component.type = request_body.get("type", component.type)
    component.html_code = request_body.get("html_code", component.html_code)
    component.css_code = request_body.get("css_code", component.css_code)
    component.js_code = request_body.get("js_code", component.js_code)
    component.react_code = request_body.get("react_code", component.react_code)

    db.session.commit()

    return jsonify({"msg": f"Component {component_id} has been updated",
                    "response": component.serialize() }), 200
