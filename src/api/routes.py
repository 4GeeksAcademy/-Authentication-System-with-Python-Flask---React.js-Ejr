"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Usuario, Empresa, Casino
from api.utils import generate_sitemap, APIException
import os
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)



@api.route('/register', methods=['POST'])
def Usuario_add():
    request_body_usuario = request.get_json()

    nombre = request.json.get('nombre', None)
    apellido = request.json.get('apellido', None)
    telefono = request.json.get('telefono', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    direccion = request.json.get('direccion', None)

    if nombre is None:
        return 'Escriba su nombre', 400
    if apellido is None:
        return 'Escriba su apellido', 400
    if telefono is None:
        return 'Escriba su telefono', 400
    if email is None:
        return 'Escriba su email', 400
    if password is None:
        return 'Escriba su password', 400
    if direccion is None:
        return 'Escriba su direccion', 400

    usuario = Usuario.query.filter_by(email=email).first()

    if usuario:
        return jsonify({"msg": "User already exists"})
    else:
        new_usuario = Usuario(nombre=request_body_usuario['nombre'],
                              apellido=request_body_usuario['apellido'],
                              telefono=request_body_usuario['telefono'],
                              email=request_body_usuario['email'],
                              password=request_body_usuario['password'],
                              direccion=request_body_usuario['direccion'],
                              )
        db.session.add(new_usuario)
        db.session.commit()
        return jsonify({"msg": "User added successfully!"}), 200



#creación, actualización y eliminación de emperesa | también get para verlas
@api.route('empresa', methods=['GET', 'POST'])
@api.route('empresa/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def get_company(id = None):
    if request.method == 'GET':
        if id is not None:
            empresa: Empresa.query.get(id)
            if not empresa: return jsonify({ "msg": "No encontramos la empresa" }), 404
            return jsonify(empresa.serialize()), 200
        else:
            empresas = Empresa.query.all()
            empresas = list(map(lambda empresa: empresa.serialize(), empresas))

            return jsonify(empresas), 200
    
    if request.method == 'POST':
        nombre = request.json.get("nombre")
        telefono = request.json.get("telefono")
        email = request.json.get("email")
        direccion = request.json.get("direccion", "")
        password = request.json.get("password")
 

        if not nombre: return jsonify({ "msg": "El nombre es obligatorio" }), 400
        if not telefono: return jsonify({ "msg": "El teléfono es obligatorio" }), 400
        if not email: return jsonify({ "msg": "La email es obligatoria" }), 400
        if not password: return jsonify({ "msg": "El password es obligatorio" }), 400

        empresa = Empresa()
        empresa.nombre = nombre
        empresa.telefono = telefono
        empresa.email = email
        empresa.direccion = direccion
        empresa.password = password
        empresa.save()

        return jsonify(empresa.serialize()), 201
    
    if request.method == 'PUT':
        nombre = request.json.get("nombre")
        telefono = request.json.get("telefono")
        email = request.json.get("email")
        direccion = request.json.get("direccion", "")
        password = request.json.get("password")
 

        if not nombre: return jsonify({ "msg": "El nombre es obligatorio" }), 400
        if not telefono: return jsonify({ "msg": "El teléfono es obligatorio" }), 400
        if not email: return jsonify({ "msg": "El email es obligatorio" }), 400
        if not password: return jsonify({ "msg": "El password es obligatorio" }), 400

        empresa = Empresa.query.get(id)
        if not empresa: return jsonify({ "msg": "No encontramos la empresa" }), 404
        empresa.nombre = nombre
        empresa.telefono = telefono
        empresa.email = email
        empresa.direccion = direccion
        empresa.password = password
        empresa.update()

        return jsonify(empresa.serialize()), 200
    
    if request.method == 'DELETE':
        empresa = Empresa.query.get(id)
        if not empresa: return jsonify({ "msg": "No encontramos la empresa" }), 404

        empresa.delete()
        return jsonify({ "msg": "Empresa eliminada" }), 200


#La empresa crea contactos, puede obtenerlos todo, a uno de ellos, actualizar o borrar:
@api.route('empresa/usuarios', methods=['GET', 'POST'])
@api.route('empresa/usuarios/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def get_users(id = None):
    if request.method == 'GET':
        if id is not None:
            usuario: Usuario.query.get(id)
            if not usuario: return jsonify({ "msg": "No encontramos el usuario" }), 404
            return jsonify(usuario.serialize()), 200
        else:
            usuarios = Usuario.query.all()
            usuarios = list(map(lambda usuario: usuario.serialize(), usuarios))

            return jsonify(usuarios), 200
    
    if request.method == 'POST':
        nombre = request.json.get("nombre")
        apellido = request.json.get("apellido")
        telefono = request.json.get("telefono")
        email = request.json.get("email")
        direccion = request.json.get("direccion", "")
        password = request.json.get("password") 
        empresa_id = request.json.get("empresa_id")   
    
        if not nombre: return jsonify({ "msg": "El nombre es obligatorio" }), 400
        if not apellido: return jsonify({ "msg": "El apellido es obligatorio" }), 400
        if not telefono: return jsonify({ "msg": "El teléfono es obligatorio" }), 400
        if not email: return jsonify({ "msg": "El email es obligatorio" }), 400
        if not password: return jsonify({ "msg": "El password es obligatorio" }), 400
        if not empresa_id: return jsonify({ "msg": "La empresa es obligatorio" }), 400

        usuario = Usuario()
        usuario.nombre = nombre
        usuario.apellido = apellido
        usuario.telefono = telefono
        usuario.email = email
        usuario.direccion = direccion
        usuario.password = password
        usuario.empresa_id = empresa_id
        usuario.save()

        return jsonify(usuario.serialize()), 201

    if request.method == 'PUT':
        nombre = request.json.get("nombre")
        telefono = request.json.get("telefono")
        email = request.json.get("email")
        direccion = request.json.get("direccion", "")
        password = request.json.get("password")
 

        if not nombre: return jsonify({ "msg": "El nombre es obligatorio" }), 400
        if not telefono: return jsonify({ "msg": "El teléfono es obligatorio" }), 400
        if not email: return jsonify({ "msg": "El email es obligatorio" }), 400
        if not password: return jsonify({ "msg": "El password es obligatorio" }), 400

        usuario = Usuario.query.get(id)
        if not usuario: return jsonify({ "msg": "No encontramos el usuario" }), 404
        usuario.nombre = nombre
        usuario.telefono = telefono
        usuario.email = email
        usuario.direccion = direccion
        usuario.password = password
        usuario.update()

        return jsonify(usuario.serialize()), 200
    
    if request.method == 'DELETE':
        usuario = Usuario.query.get(id)
        if not usuario: return jsonify({ "msg": "No encontramos el usuario" }), 404

        usuario.delete()
        return jsonify({ "msg": "Usuario eliminado" }), 200

#Get a la empresa con sus usuarios
@api.route('empresa/lista-usuarios', methods=['GET'])
def get_users_company():
    if request.method == 'GET':

            empresas = Empresa.query.all()
            empresas = list(map(lambda empresa: empresa.serialize_con_usuarios(), empresas))

            return jsonify(empresas), 200

#El usuario necesita un post para el login | un put para actualizar 
@api.route('/login/user', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    usuario = Usuario.query.filter_by(email=email).first()
    if not usuario:
        return jsonify({"msg":"Usuario/Contraseña no coinciden"}), 400

    if not check_password_hash(usuario.password, password): 
        return jsonify({"msg":"Usuario/Contraseña no coinciden"}), 400

    access_token  = create_access_token(identity=usuario.email)

    data ={
        "access_token":access_token,
        "user": usuario.serialize()

    }

    return jsonify(data), 200

#El usuario necesita un put para actualizar sus datos
@api.route('usuario', methods=['GET', 'POST'])
@api.route('usuario/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def acutalizacion_datos(id = None):

    if request.method == 'GET':
        if id is not None:
            usuario: Usuario.query.get(id)
            if not usuario: return jsonify({ "msg": "No encontramos la empresa" }), 404
            return jsonify(usuario.serialize()), 200
        else:
            usuarios = Usuario.query.all()
            usuarios = list(map(lambda usuario: usuario.serialize(), usuarios))

            return jsonify(usuarios), 200
    
    if request.method == 'POST':
        nombre = request.json.get("nombre")
        telefono = request.json.get("telefono")
        email = request.json.get("email")
        direccion = request.json.get("direccion", "")
        password = request.json.get("password")
 

        if not nombre: return jsonify({ "msg": "El nombre es obligatorio" }), 400
        if not telefono: return jsonify({ "msg": "El teléfono es obligatorio" }), 400
        if not email: return jsonify({ "msg": "La email es obligatoria" }), 400
        if not password: return jsonify({ "msg": "El password es obligatorio" }), 400

        usuario = Usuario()
        usuario.nombre = nombre
        usuario.telefono = telefono
        usuario.email = email
        usuario.direccion = direccion
        usuario.password = password
        usuario.save()

        return jsonify(usuario.serialize()), 201
    
    if request.method == 'PUT':
        nombre = request.json.get("nombre")
        telefono = request.json.get("telefono")
        email = request.json.get("email")
        direccion = request.json.get("direccion", "")
        password = request.json.get("password")
 

        if not nombre: return jsonify({ "msg": "El nombre es obligatorio" }), 400
        if not telefono: return jsonify({ "msg": "El teléfono es obligatorio" }), 400
        if not email: return jsonify({ "msg": "El email es obligatorio" }), 400
        if not password: return jsonify({ "msg": "El password es obligatorio" }), 400

        usuario = Usuario.query.get(id)
        if not usuario: return jsonify({ "msg": "No encontramos al usuario" }), 404
        usuario.nombre = nombre
        usuario.telefono = telefono
        usuario.email = email
        usuario.direccion = direccion
        usuario.password = password
        usuario.update()

        return jsonify(usuario.serialize()), 200
    
    if request.method == 'DELETE':
        usuario = Usuario.query.get(id)
        if not usuario: return jsonify({ "msg": "No encontramos al usuario" }), 404

        usuario.delete()
        return jsonify({ "msg": "Usuario eliminado" }), 200

#Creación, actualización y delete de casino
@api.route('casino', methods=['GET', 'POST'])
@api.route('casino/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def get_casino(id = None):


    if request.method == 'GET':
        if id is not None:
            casino: Casino.query.get(id)
            if not casino: return jsonify({ "msg": "No encontramos el casino" }), 404
            return jsonify(casino.serialize()), 200
        else:
            casinos = Casino.query.all()
            casinos = list(map(lambda casino: casino.serialize(), casinos))

            return jsonify(casinos), 200
    
    if request.method == 'POST':
        nombre = request.json.get("nombre")
        telefono = request.json.get("telefono")
        email = request.json.get("email")
        direccion = request.json.get("direccion", "")
        password = request.json.get("password")
 

        if not nombre: return jsonify({ "msg": "El nombre es obligatorio" }), 400
        if not telefono: return jsonify({ "msg": "El teléfono es obligatorio" }), 400
        if not email: return jsonify({ "msg": "La email es obligatoria" }), 400
        if not password: return jsonify({ "msg": "El password es obligatorio" }), 400

        casino = Casino()
        casino.nombre = nombre
        casino.telefono = telefono
        casino.email = email
        casino.direccion = direccion
        casino.password = password
        casino.save()

        return jsonify(casino.serialize()), 201
    
    if request.method == 'PUT':
        nombre = request.json.get("nombre")
        telefono = request.json.get("telefono")
        email = request.json.get("email")
        direccion = request.json.get("direccion", "")
        password = request.json.get("password")
 

        if not nombre: return jsonify({ "msg": "El nombre es obligatorio" }), 400
        if not telefono: return jsonify({ "msg": "El teléfono es obligatorio" }), 400
        if not email: return jsonify({ "msg": "El email es obligatorio" }), 400
        if not password: return jsonify({ "msg": "El password es obligatorio" }), 400

        casino = Casino.query.get(id)
        if not casino: return jsonify({ "msg": "No encontramos el casino" }), 404
        casino.nombre = nombre
        casino.telefono = telefono
        casino.email = email
        casino.direccion = direccion
        casino.password = password
        casino.update()

        return jsonify(casino.serialize()), 200

# Ver la empresa y los usuarios asignados a un casino #quedó error pendiente por ver
@api.route('casino/empresa', methods=['GET'])
def lista_empresa():
    listas: Casino.query.all()
    listas: list(map(lambda lista: lista.serialize_casino_empresa(), listas))

    return jsonify(listas), 200

# menús