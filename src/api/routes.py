"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Profile, Company, Project, Rol, Postulacion
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from werkzeug.security import generate_password_hash, check_password_hash
import datetime



api = Blueprint('api', __name__)


@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email")
    password = request.json.get("password")
    print(email)
    user = User.query.filter_by(email=email).first()

    if not user: return jsonify({"status": "fail", "message": "email/password incorrect!"} ), 401

    if not check_password_hash(user.password, password): return jsonify({"status": "fail", "message": "email/password incorrect!" }), 401

    expires = datetime.timedelta(minutes=30)
    access_token = create_access_token(identity=email, expires_delta=expires)

    data = {
        "status": "Success!",
        "message": "Logged in succesfully!",
        "access_token": access_token,
        "user": user.serialize()
    }

    return jsonify(data), 200

@api.route("/register", methods=["POST"])
def register():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    user = User()
    user.email = email
    user.password = generate_password_hash(password)
    user.save()

    return jsonify({"status": "success", "message": "Register successfull!. Please login."}), 200






#USER ENDPOINTS
@api.route("/users", methods=['GET'])
def get_users():
    users = User.query.all()
    users = list(map(lambda user: user.serialize(), users))
    return jsonify(users), 200

@api.route("/users/<int:user_id>", methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    return jsonify(user.serialize()), 200

@api.route('/users', methods=['POST'])
def create_user():
    user = User()
    user.email = request.json.get('email')
    password = request.json.get("password", None)
    user.password = generate_password_hash(password)
    user.role_id = request.json.get('role_id')
    user.save()

    return jsonify(user.serialize()), 201

@api.route("/users/<int:user_id>", methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)
    user.email = request.json.get('email')
    password = request.json.get("password", None)
    user.password = generate_password_hash(password)
    user.role_id = request.json.get('role_id')
    user.update()

    data = {
        "code": 200,
        "message": "User updated successfully!",
        "status": "ok",
        "role": user.serialize()
    }
    return jsonify(data), 200


@api.route("/users/<int:user_id>", methods=['DELETE'])
def delete_user(user_id):
    deleted_user = User.query.get(user_id)
    deleted_user.delete()

    return jsonify({"mensaje": "El usuario ha sido eliminado"} ), 200

#USER PROFILE ENDPOINTS
@api.route("/profiles", methods=['GET'])
def get_profiles():
    profiles = Profile.query.all()
    profiles = list(map(lambda profile: profile.serialize(), profiles))
    return jsonify(profiles), 200

@api.route("/profiles/<int:profile_id>", methods=['GET'])
def get_profile(project_id):
    profile = Profile.query.get(profile_id)
    return jsonify(profile.serialize()), 200

@api.route('/profiles', methods=['POST'])
def create_profile():
    profile = Profile()
    profile.user_id = request.json.get('user_id')
    profile.name = request.json.get('name')
    profile.lastname = request.json.get('lastname')
    profile.salary = request.json.get('salary')
    profile.side_income = request.json.get('side_income')
    profile.deudas = request.json.get('deudas')
    profile.save()

    return jsonify(profile.serialize()), 201

@api.route("/profiles/<int:profile_id>", methods=['PUT'])
def update_profile(profile_id):
    profile = Profile.query.get(profile_id)
    profile.user_id = request.json.get('user_id')
    profile.name = request.json.get('name')
    profile.lastname = request.json.get('lastname')
    profile.salary = request.json.get('salary')
    profile.side_income = request.json.get('side_income')
    profile.deudas = request.json.get('deudas')
    profile.update()
    
    data = {
        "code": 200,
        "message": "Profile updated successfully!",
        "status": "ok",
        "role": profile.serialize()
    }
    return jsonify(data), 200

@api.route("/profiles/<int:profile_id>", methods=['DELETE'])
def delete_profile(profile_id):
    deleted_profile = Profile.query.get(profile_id)
    deleted_profile.delete()

    return jsonify({"mensaje": "El perfil ha sido eliminado"} ), 200


#COMPANY ENDPOINTS
@api.route("/companies", methods=['GET'])
def get_companies():
    companies = Company.query.all()
    companies = list(map(lambda company: company.serialize(), companies))
    return jsonify(companies), 200

@api.route("/companies/<int:company_id>", methods=['GET'])
def get_company(company_id):
    company = Company.query.get(company_id)
    return jsonify(company.serialize()), 200

@api.route("/companies", methods=['POST'])
def create_company():
    company = Company()
    company.role_id = request.json.get('role_id')
    company.name = request.json.get('name')
    password = request.json.get("password", None)
    company.password = generate_password_hash(password)
    company.rut = request.json.get('rut')
    company.email = request.json.get('email')
    company.save()

    return jsonify(company.serialize()), 201

@api.route("/companies/<int:company_id>", methods=['PUT'])
def update_company(company_id):
    company = Company.query.get(company_id)
    company.role_id = request.json.get('role_id')
    company.name = request.json.get('name')
    password = request.json.get("password", None)
    company.password = generate_password_hash(password)
    company.rut = request.json.get('rut')
    company.email = request.json.get('email')
    company.update()
    data = {
        "code": 200,
        "message": "Company updated successfully!",
        "status": "ok",
        "role": company.serialize()
    }
    return jsonify(data), 200


@api.route("/companies/<int:company_id>", methods=['DELETE'])
def delete_company(company_id):
    deleted_company = Company.query.get(company_id)
    deleted_company.delete()

    return jsonify({"mensaje": "La compañia ha sido eliminada"} ), 200


#PROJECT ENDPOINTS
@api.route("/projects", methods=['GET'])
def get_projects():
    projects = Project.query.all()
    projects = list(map(lambda project: project.serialize(), projects))
    return jsonify(projects), 200

@api.route("/projects/<int:project_id>", methods=['GET'])
def get_project(project_id):
    project = Project.query.get(project_id)
    return jsonify(project.serialize()), 200


@api.route("/projects", methods=['POST'])
def create_project():
    project = Project()
    project.company_id = request.json.get('company_id')
    project.title = request.json.get('title')
    project.address = request.json.get('address')
    project.comuna = request.json.get('comuna')
    project.ciudad = request.json.get('ciudad')
    project.size = request.json.get('size')
    project.typology = request.json.get('typology')
    project.monto_reserva = request.json.get('monto_reserva')
    project.bono_pie = request.json.get('bono_pie')
    project.parking_spots = request.json.get('parking_spots')
    project.bodega = request.json.get('bodega')
    project.total_price = request.json.get('total_price')
    project.pictures = request.json.get('pictures')
    project.body = request.json.get('body')
    project.perks = request.json.get('perks')
    project.bathrooms = request.json.get('bathrooms')
    project.rooms = request.json.get('rooms')
    project.sale_type = request.json.get('sale_type')
    project.save()

    return jsonify(project.serialize()), 201

@api.route("/projects/<int:project_id>", methods=['PUT'])
def update_project(project_id):
    project = Project.query.get(project_id)
    project.company_id = request.json.get('company_id')
    project.title = request.json.get('title')
    project.address = request.json.get('address')
    project.comuna = request.json.get('comuna')
    project.ciudad = request.json.get('ciudad')
    project.size = request.json.get('size')
    project.typology = request.json.get('typology')
    project.monto_reserva = request.json.get('monto_reserva')
    project.bono_pie = request.json.get('bono_pie')
    project.parking_spots = request.json.get('parking_spots')
    project.bodega = request.json.get('bodega')
    project.total_price = request.json.get('total_price')
    project.pictures = request.json.get('pictures')
    project.body = request.json.get('body')
    project.perks = request.json.get('perks')
    project.bathrooms = request.json.get('bathrooms')
    project.rooms = request.json.get('rooms')
    project.sale_type = request.json.get('sale_type')
    project.update()

    data = {
        "code": 200,
        "message": "project updated successfully!",
        "status": "ok",
        "role": project.serialize()
    }
    return jsonify(data), 200

@api.route("/projects/<int:project_id>", methods=['DELETE'])
def delete_project(project_id):
    deleted_project = Project.query.get(project_id)
    deleted_project.delete()

    return jsonify({"mensaje": "El proyecto ha sido eliminado"} ), 200

#ROLES ENDPOINTS

@api.route("/roles", methods=['GET'])
def get_roles():
    roles = Rol.query.all()
    roles = list(map(lambda rol: rol.serialize(), roles))
    return jsonify(roles), 200

@api.route("/roles/<int:rol_id>", methods=['GET'])
def get_rol(rol_id):
    rol = Rol.query.get(rol_id)
    return jsonify(rol.serialize()), 200

@api.route('/roles', methods=['POST'])
def create_rol():
    rol = Rol()
    rol.name = request.json.get('name') 
    rol.save()

    return jsonify(rol.serialize()), 201

@api.route("/roles/<int:rol_id>", methods=['PUT'])
def update_rol(rol_id):
    rol = Rol.query.get(rol_id)
    rol.name = request.json.get('name')
    rol.update()

    data = {
        "code": 200,
        "message": "Rol updated successfully!",
        "status": "ok",
        "role": rol.serialize()
    }
    return jsonify(data), 200

@api.route("/roles/<int:rol_id>", methods=['DELETE'])
def delete_rol(rol_id):
    deleted_rol = Rol.query.get(rol_id)
    deleted_rol.delete()

    return jsonify({"mensaje": "El rol ha sido eliminado"} ), 200

#POSTULACIONES ENDPOINTS
@api.route("/postulaciones", methods=['GET'])
def get_postulaciones():
    postulaciones = Postulacion.query.all()
    postulaciones = list(map(lambda postulacion: postulacion.serialize(), postulaciones))
    return jsonify(postulaciones), 200

@api.route("/postulaciones/<int:postulacion_id>", methods=['GET'])
def get_postulacion(postulacion_id):
    postulacion = Postulacion.query.get(postulacion_id)
    return jsonify(postulacion.serialize()), 200

@api.route('/postulaciones', methods=['POST'])
def create_postulacion():
    postulacion = Postulacion()
    postulacion.project_id = request.json.get('project_id') 
    postulacion.user_id = request.json.get('user_id') 
    postulacion.date = request.json.get('date') 
    postulacion.status = request.json.get('status') 
    postulacion.save()

    return jsonify(postulacion.serialize()), 201

@api.route("/postulaciones/<int:postulacion_id>", methods=['PUT'])
def update_postulacion(postulacion_id):
    postulacion = Postulacion.query.get(postulacion_id)
    postulacion.project_id = request.json.get('project_id') 
    postulacion.user_id = request.json.get('user_id') 
    postulacion.date = request.json.get('date') 
    postulacion.status = request.json.get('status') 
    postulacion.update()

    data = {
        "code": 200,
        "message": "postulacion updated successfully!",
        "status": "ok",
        "postulaciones": postulacion.serialize()
    }
    return jsonify(data), 200

@api.route("/postulaciones/<int:postulacion_id>", methods=['DELETE'])
def delete_postulacion(postulacion_id):
    deleted_postulacion = Postulacion.query.get(postulacion_id)
    deleted_postulacion.delete()

    return jsonify({"mensaje": "La postulacion ha sido eliminada"} ), 200