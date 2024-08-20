"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token,get_jwt_identity,jwt_required
from api.models import db, User, Programador, Empleador, Ratings, Favoritos, Ofertas, Experience, Proyectos
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import generate_password_hash , check_password_hash


api = Blueprint('api', __name__)


# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#Registrar el usario
@api.route('/register', methods=['POST'])
def register():
    name = request.json.get("name", None)
    username = request.json.get("username", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    country = request.json.get("country", None)
    if not name or not username or not email or not password or not country:
        return jsonify({'success':False, 'msg':'Todos los campos son necesarios'})
    email_exist = User.query.filter_by(email=email).first()
    if email_exist:
        return jsonify({'success': False, 'msg':'Ya existe una cuenta registrada con el email '+ email}),400

    hashed_password = generate_password_hash(password).decode('utf-8')
    
    new_user = User(name=name, username=username, email=email, password=hashed_password, country=country )
    access_token = create_access_token(identity=new_user.id)
        return jsonify({'register': False, 'msg':'Ya existe una cuenta registrada con el email '+ email}),400

    hashed_password = generate_password_hash(password).decode('utf-8')
    
    new_user = User(name=name, username=username, email=email, password=hashed_password, country=country )
    access_token = create_access_token(identity=new_user.id)
        return jsonify({'register': False, 'msg':'Ya existe una cuenta registrada con el email '+ email}),400

    hashed_password = generate_password_hash(password).decode('utf-8')
    
    new_user = User(name=name, username=username, email=email, password=hashed_password, country=country )
    access_token = create_access_token(identity=new_user.id)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'success': True, 'msg':'Usuario registrado correctamente', 'user':new_user.serialize(), 'token':access_token}),201

#Mostrar el usuario con ese id
@api.route('/getUsers/<int:id>', methods=['GET'])
def getUsers(id):
    user = User.query.get(id)
    if user:
        return jsonify({'user': user.serialize()}),200
    return jsonify({'msg':'Usuario no encontrado'}),404

#Mostrar todos los usuarios
@api.route('/getAllUsers', methods=['GET'])
def getAllUsers():
    users = User.query.all()
    users=[user.serialize() for user in users]
    if users:
        return jsonify({'user': users}),200
    return jsonify({'msg':'Ningún usuario encontrado'}),404


#Agregar usuario a Empleador  PENDIENTE
#@api.route('/user/editEmpleador', methods=['PUT'])
#@jwt_required()
#def editEmpleador():
    name = request.json.get("name", None)
    username = request.json.get("username", None)
    email = request.json.get("email", None)
    country = request.json.get("country", None)
    cif = request.json.get('cif', None)
    metodo_pago = request.json.get('metodo_pago', None)
    descripcion = request.json.get('descripcion', None)
    photo = request.json.get('photo', None)
    id = get_jwt_identity
    user = User.query.get(id)
    empleador = Empleador.query.get(user.profile_empleador)
    user.name=name
    user.username = username
    user.email=email
    user.country = country
    user.photo = photo
    empleador.cif = cif
    empleador.metodo_pago = metodo_pago
    empleador.descripcion=descripcion
    db.session.commit()
    return jsonify({'msg': 'OK', 'user': user.serialize()}), 200
    



#Agregar usuario a Programador   PENDIENTE
#@api.route('/user/editProgramador', methods=['PUT'])
#@jwt_required
#def editProgramador():
    user_id = get_jwt_identity
    precio_hora = request.json.get("precio_hora", None)
    tecnologias = request.json.get("tecnologias", None)
    experiencia = request.json.get("experiencia", None)
    descripcion = request.json.get("descripcion", None)
    id_exist = Programador.query.get(id)
    if id_exist:
        return jsonify({'msg':'el usuario ya es programador'}
        )
    else:
        programador = Programador(user_id=id,precio_hora=precio_hora, tecnologias=tecnologias, descripcion=descripcion, experiencia=experiencia)
        db.session.add(programador)
        db.session.commit()
        return jsonify({'msg':'Programador creado correctamente', 'user':programador.serialize()}), 201


#Iniciar sesión
@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user= User.query.filter_by(email=email).first()
    if user:
        if (check_password_hash(user.password, password)):
            access_token = create_access_token(identity=user.id)
            return jsonify({'login': True, 'msg': 'Has iniciado sesión', 'user':user.serialize(), 'token': access_token}),200
        return jsonify({'login': False, 'msg': 'La contraseña es incorrecta'}),400
    return jsonify({'login': False, 'msg': 'No hay ningún usuario registrado con los datos introducidos'}),404

if __name__ == '__main__':
    api.run(host='0.0.0.0', port=3245, debug=True)
        
@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user= User.query.filter_by(email=email).first()
    if user:
        if (check_password_hash(user.password, password)):
            access_token = create_access_token(identity=user.id)
            return jsonify({'login': True, 'msg': 'Has iniciado sesión', 'user':user.serialize(), 'token': access_token}),200
        return jsonify({'login': False, 'msg': 'La contraseña es incorrecta'}),400
    return jsonify({'login': False, 'msg': 'No hay ningún usuario registrado con los datos introducidos'}),404

if __name__ == '__main__':
    api.run(host='0.0.0.0', port=3245, debug=True)
        
@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user= User.query.filter_by(email=email).first()
    if user:
        if (check_password_hash(user.password, password)):
            access_token = create_access_token(identity=user.id)
            return jsonify({'login': True, 'msg': 'Has iniciado sesión', 'user':user.serialize(), 'token': access_token}),200
        return jsonify({'login': False, 'msg': 'La contraseña es incorrecta'}),400
    return jsonify({'login': False, 'msg': 'No hay ningún usuario registrado con los datos introducidos'}),404

if __name__ == '__main__':
    api.run(host='0.0.0.0', port=3245, debug=True)




