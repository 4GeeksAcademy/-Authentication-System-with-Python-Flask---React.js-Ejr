"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from datetime import datetime
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import Modalidad, db, User, Programador, Empleador, Ratings, Favoritos, Ofertas, Experience, Proyectos, Contact
from flask_jwt_extended import create_access_token,get_jwt_identity,jwt_required
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
    cif= request.json.get("cif", None)
    if not name or not username or not email or not password or not country:
        return jsonify({'success':False, 'msg':'Todos los campos son necesarios'})
    email_exist = User.query.filter_by(email=email).first()
    if email_exist:
        return jsonify({'success': False, 'msg':'Ya existe una cuenta registrada con el email '+ email}),400

    hashed_password = generate_password_hash(password).decode('utf-8')
    
    new_user = User(name=name, username=username, email=email, password=hashed_password, country=country )
    
    db.session.add(new_user)
    db.session.commit()
    access_token = create_access_token(identity=new_user.id)
   
    if cif is None or cif == '':
        programador = Programador(user_id=new_user.id)
        db.session.add(programador)
        db.session.commit()
        return jsonify({'success': True, 'msg':'Usuario registrado correctamente', 'user':new_user.serialize(), 'token':access_token, 'programador':programador.serialize()}),201
    else:
        empleador = Empleador(user_id=new_user.id,cif=cif)
        db.session.add(empleador)
        db.session.commit()
        return jsonify({'success': True, 'msg':'Usuario registrado correctamente', 'user': new_user.serialize(), 'token': access_token, 'empleador': empleador.serialize()}),201
    

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


#Agregar usuario a Empleador  
@api.route('/user/editEmpleador', methods=['PUT'])
@jwt_required()
def editEmpleador():
    name = request.json.get("name")
    username = request.json.get("username")
    email = request.json.get("email")
    country = request.json.get("country")
    cif = request.json.get('cif')
    metodo_pago = request.json.get('metodo_pago')
    descripcion = request.json.get('descripcion')
    photo = request.json.get('photo')
    id_user = get_jwt_identity()
    user = User.query.get(id_user)
    empleador = user.profile_empleador
    user.name=name
    user.username = username
    user.email=email
    user.country = country
    user.photo = photo
    empleador.cif = cif
    empleador.metodo_pago = metodo_pago
    empleador.descripcion=descripcion
    db.session.commit()
    return jsonify({'editar':True, 'msg': 'Usuario modificado correctamente', 'user': user.serialize(), 'empleador':empleador.serialize()}), 200
    



#Agregar usuario a Programador   
@api.route('/user/editProgramador', methods=['PUT'])
@jwt_required()
def editProgramador():
    user_id = get_jwt_identity()
    name = request.json.get("name")
    username = request.json.get("username")
    email = request.json.get("email")
    country = request.json.get("country")
    precio_hora = request.json.get("precio_hora", None)
    tecnologias = request.json.get("tecnologias", None)
    experiencia = request.json.get("experiencia", None)
    descripcion = request.json.get("descripcion", None)
    user = User.query.get(user_id)
    programador = user.profile_programador
    user.name= name
    user.username=username
    user.email=email
    user.country=country
    programador.precio_hora = precio_hora
    programador.tecnologias = tecnologias
    programador.experiencia = experiencia
    programador.descripcion = descripcion
    db.session.commit()
    return jsonify({'editar':True, 'msg': 'Usuario modificado correctamente', 'user': user.serialize(), 'programador':programador.serialize()}), 200


#Iniciar sesión
@api.route('/login', methods=['POST'])
def login(): 
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user= User.query.filter_by(email=email).first()
    programador = user.profile_programador
    empleador = user.profile_empleador
    if user:
        if (check_password_hash(user.password, password)):
            access_token = create_access_token(identity=user.id)
            return jsonify({'login': True, 'msg': 'Has iniciado sesión', 'user':user.serialize(), 'token': access_token, "empleador":empleador.serialize(), "programador": programador.serialize()}),200
        return jsonify({'login': False, 'msg': 'La contraseña es incorrecta'}),400
    return jsonify({'login': False, 'msg': 'No hay ningún usuario registrado con los datos introducidos'}),404

#Crear Oferta
@api.route('/crearOferta', methods=['POST'])
@jwt_required()
def crear_oferta():
    empleador_id = get_jwt_identity()

    empleador = Empleador.query.filter_by(user_id=empleador_id).first()
    if not empleador:
        return jsonify({"success": False, "msg": "El usuario no es un empleador"}), 400

    name = request.json.get("name")
    descripcion = request.json.get("descripcion")
    salario = request.json.get("salario")
    plazo = request.json.get("plazo")
    modalidad = request.json.get("modalidad")
    experiencia_minima = request.json.get("experiencia_minima")
    fecha_publicacion_str = request.json.get("fecha_publicacion")
    
    if not name or not descripcion or not salario or not plazo or not modalidad or not fecha_publicacion_str or not experiencia_minima:
        return jsonify({"success": False, "msg": "Todos los campos son requeridos"}), 400
    
    
    print(Modalidad(modalidad))
    try:
        modalidad_enum = Modalidad(modalidad)
    except ValueError:
        return jsonify({"success": False, "msg": "Modalidad no válida"}), 400

    try:
        fecha_publicacion = datetime.strptime(fecha_publicacion_str, "%Y-%m-%d")
    except ValueError:
        return jsonify({"success": False, "msg": "Fecha de publicación no válida"}), 400

    nueva_oferta = Ofertas(
        name=name,
        descripcion=descripcion,
        salario=salario,
        plazo=plazo,
        modalidad=modalidad_enum,
        experiencia_minima=experiencia_minima,
        fecha_publicacion=fecha_publicacion,
        empleador_id=empleador.id
    )

    try:
        db.session.add(nueva_oferta)
        db.session.commit()
        return jsonify({"success": True, "msg": "Oferta creada exitosamente", "oferta": nueva_oferta.serialize()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "msg": f"Error al crear la oferta: {str(e)}"}), 500
    
@api.route('/ofertas', methods=['GET'])
def get_all_offers():
    try:
        ofertas = Ofertas.query.all()
        if ofertas:
            return jsonify({"success": True, "ofertas": [oferta.serialize() for oferta in ofertas]}), 200
        return jsonify({"success": False, "msg": "No hay ofertas disponibles"}), 404
    except Exception as e:
        return jsonify({"success": False, "msg": f"Error al obtener las ofertas: {str(e)}"}), 500


@api.route('/oferta/<int:id>', methods=['GET'])
def get_offer(id):
    try:
        oferta = Ofertas.query.get(id)

        if not oferta:
            return jsonify({"success": False, "msg": "Oferta no encontrada"}), 404
        return jsonify({"success": True,"msg": 'Oferta encontrada', "oferta": oferta.serialize()}), 200

    except Exception as e:
        return jsonify({"success": False, "msg": f"Error al obtener la oferta: {str(e)}"}), 500


#contact
@api.route('/contact', methods=['POST'])
def contact():
    data = request.json
    new_contact = Contact(
        name=data.get('name'),
        lastName=data.get('lastName'),
        email=data.get('email'),
        message=data.get('message'),
        privacy_policy_accepted=data.get('privacy_policy_accepted', False)  
    )
    db.session.add(new_contact)
    db.session.commit()
    return jsonify(new_contact.serialize()), 201

@api.route('/getAllContacts', methods=['GET'])
def get_contacts():
    contacts = Contact.query.all() 
    
    if contacts:
        return jsonify([contact.serialize() for contact in contacts]), 200
    return jsonify({'msg':'Ningún contacto encontrado'}),404

if __name__ == '__main__':
    api.run(host='0.0.0.0', port=3245, debug=True)
