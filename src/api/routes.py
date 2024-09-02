"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from datetime import datetime
from flask import Flask, request, jsonify, url_for, Blueprint
import os
from api.models import Modalidad, Postulados, db, User, Programador, Empleador, Ratings, Favoritos, Ofertas, Experience, Proyectos, Contact
from flask_jwt_extended import create_access_token,get_jwt_identity,jwt_required
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import generate_password_hash , check_password_hash
import stripe



api = Blueprint('api', __name__)



# API KEY STRIPE
stripe.api_key = 'sk_test_51PsqIxG3cEcyZuNprPRA1UTti31vG7fgiVVBfefTiZ61KUnQpESthKWS5oV9QFWCQoVsWzLbAJLmGP7npT9Wejth00qZpNlIhY'

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
    if not name or not email or not password or not country:
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
    if user:
        if (check_password_hash(user.password, password)):
            access_token = create_access_token(identity=user.id)
            return jsonify({'login': True, 'msg': 'Has iniciado sesión', 'user':user.serialize(), 'token': access_token}),200
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
    nombre_empresa = request.json.get("nombre_empresa")
    descripcion = request.json.get("descripcion")
    salario = request.json.get("salario")
    localidad = request.json.get("localidad")
    tipo_contrato = request.json.get("tipo_contrato")
    estudios_minimos = request.json.get("estudios_minimos")
    horario = request.json.get("horario")
    requisitos_minimos = request.json.get("requisitos_minimos")
    idiomas = request.json.get("idiomas")
    plazo = request.json.get("plazo")
    modalidad = request.json.get("modalidad")
    experiencia_minima = request.json.get("experiencia_minima")
    fecha_publicacion_str = request.json.get("fecha_publicacion")
    
    if not name or not nombre_empresa or not descripcion or not localidad or not plazo or not modalidad or not fecha_publicacion_str or not experiencia_minima:
        return jsonify({"success": False, "msg": "Todos los campos son requeridos"}), 400

    try:
        modalidad_enum = Modalidad(modalidad)
    except ValueError:
        return jsonify({"success": False, "msg": "Modalidad no válida"}), 400

    try:
        fecha_publicacion = datetime.strptime(fecha_publicacion_str, "%Y-%m-%d")
        print(fecha_publicacion)
    except ValueError:
        return jsonify({"success": False, "msg": "Fecha de publicación no válida"}), 400

    nueva_oferta = Ofertas(
        name=name,
        nombre_empresa=nombre_empresa,
        descripcion=descripcion,
        salario=salario,
        localidad=localidad,
        tipo_contrato=tipo_contrato,
        idiomas=idiomas,
        estudios_minimos=estudios_minimos,
        horario=horario,
        requisitos_minimos=requisitos_minimos,
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
    

@api.route('/postulados', methods=['POST'])
@jwt_required()
def create_postulado():
    user_id = get_jwt_identity()

    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "Usuario no permitido"}), 401
    
    if not user.profile_programador:
        return jsonify({"msg": "Solo pueden postularse programadores."}), 403
    
    oferta_id = request.json.get("oferta_id")
    oferta = Ofertas.query.get(oferta_id)
    if not oferta:
        return jsonify({"msg": "Oferta no encontrada o ID inválido"}), 404
    
    postulado_existente = Postulados.query.filter_by(user_id=user.id, oferta_id=oferta.id).first()
    if postulado_existente:
        return jsonify({"msg": "Ya estás inscrito en esta oferta"}), 409
    
    nuevo_postulado = Postulados(user_id=user.id, oferta_id=oferta.id)
    db.session.add(nuevo_postulado)
    db.session.commit()
    
    return jsonify({"msg": "Inscripcion realizada con éxito."}),200

@api.route('/ofertas/<int:oferta_id>/postulados', methods=['GET'])
@jwt_required(optional=True)  
def get_numero_postulados(oferta_id):

    oferta = Ofertas.query.get(oferta_id)
    if not oferta:
        return jsonify({"msg": "Oferta no encontrada"}), 404

    numero_postulados = Postulados.query.filter_by(oferta_id=oferta_id).count()
    return jsonify({"numero_postulados": numero_postulados}), 200

@api.route('/postulados/<int:oferta_id>', methods=['DELETE'])
@jwt_required()
def delete_postulado(oferta_id):
    user_id = get_jwt_identity()  

    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "Usuario no permitido"}), 401

    oferta = Ofertas.query.get(oferta_id)
    if not oferta:
        return jsonify({"msg": "Oferta no encontrada o ID inválido"}), 404

    postulado = Postulados.query.filter_by(user_id=user.id, oferta_id=oferta.id).first()
    if not postulado:
        return jsonify({"msg": "No estás inscrito en esta oferta"}), 404

    db.session.delete(postulado)
    db.session.commit()

    return jsonify({"msg": "Desinscripción realizada con éxito."}), 200

# Mostrar todas las calificaciones
@api.route('/ratings', methods=['GET'])
def get_all_ratings():
    try:
        ratings = Ratings.query.all()
        if ratings:
            return jsonify({"success": True, "ratings": [rating.serialize() for rating in ratings]}), 200
        return jsonify({"success": False, "msg": "No hay calificaciones disponibles"}), 404
    except Exception as e:
        return jsonify({"success": False, "msg": f"Error al obtener las calificaciones: {str(e)}"}), 500

# Mostrar una calificación específica
@api.route('/ratings/<int:id>', methods=['GET'])
def get_rating(id):
    try:
        rating = Ratings.query.get(id)
        if not rating:
            return jsonify({"success": False, "msg": "Calificación no encontrada"}), 404
        return jsonify({"success": True, "rating": rating.serialize()}), 200
    except Exception as e:
        return jsonify({"success": False, "msg": f"Error al obtener la calificación: {str(e)}"}), 500

# Crear una nueva calificación
@api.route('/ratings', methods=['POST'])
@jwt_required()
def create_rating():
    from_id = request.json.get("from_id")
    to_id = request.json.get("to_id")
    value = request.json.get("value")

    if not from_id or not to_id or not value:
        return jsonify({"success": False, "msg": "Todos los campos son requeridos"}), 400

    if value < 1 or value > 5:
        return jsonify({"success": False, "msg": "El valor de la calificación debe estar entre 1 y 5"}), 400

    new_rating = Ratings(from_id=from_id, to_id=to_id, value=value)

    try:
        db.session.add(new_rating)
        db.session.commit()
        return jsonify({"success": True, "msg": "Calificación creada exitosamente", "rating": new_rating.serialize()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "msg": f"Error al crear la calificación: {str(e)}"}), 500

# Actualizar una calificación existente
@api.route('/ratings/<int:id>', methods=['PUT'])
@jwt_required()
def update_rating(id):
    rating = Ratings.query.get(id)
    if not rating:
        return jsonify({"success": False, "msg": "Calificación no encontrada"}), 404

    value = request.json.get("value")
    if value is not None:
        if value < 1 or value > 5:
            return jsonify({"success": False, "msg": "El valor de la calificación debe estar entre 1 y 5"}), 400
        rating.value = value

    try:
        db.session.commit()
        return jsonify({"success": True, "msg": "Calificación actualizada exitosamente", "rating": rating.serialize()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "msg": f"Error al actualizar la calificación: {str(e)}"}), 500

@api.route('/ratings/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_rating(id):
    rating = Ratings.query.get(id)
    if not rating:
        return jsonify({"success": False, "msg": "Calificación no encontrada"}), 404

    try:
        db.session.delete(rating)
        db.session.commit()
        return jsonify({"success": True, "msg": "Calificación eliminada exitosamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "msg": f"Error al eliminar la calificación: {str(e)}"}), 500
    

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

@api.route('/user/programador/addProjects', methods=['POST'])
@jwt_required()
def addProjects(): 
    user_id = get_jwt_identity()
    name = request.json.get("name", None)
    descripcion_corta = request.json.get("descripcion_corta", None)
    git = request.json.get("git", None)
    link = request.json.get("link", None)
    tecnologias = request.json.get("tecnologias", None)

    if not name or not descripcion_corta or not git or not link or not tecnologias:
        return jsonify({'addProject':False, 'msg':'Todos los campos son necesarios'})

    programador = Programador.query.filter_by(user_id=user_id).first()
    print(programador)
    is_exist = Proyectos.query.filter_by(name=name, descripcion_corta=descripcion_corta, git=git, link=link).first()
    print(is_exist)

    if programador:
        if(is_exist):
            return({'addProject': False, 'msg': 'Ya existe el proyecto'})
        else:
            new_project = Proyectos(name=name, descripcion_corta=descripcion_corta, git=git, link=link, tecnologias=tecnologias, programador_id=programador.id )
            db.session.add(new_project)
            db.session.commit()
            return jsonify({'addProject': True, 'msg': 'Ha sido agregado correctamente', 'proyectos':new_project.serialize()}),200
    return jsonify({'addProject': False, 'msg': 'No hay ningún usuario registrado'}),404

@api.route('/reset-password', methods=['POST'])
@jwt_required()
def reset_password():

    user_id=get_jwt_identity()
    password=request.json.get('password')
    user=User.query.get(user_id)
    if not user:
        return jsonify({"msg":"User not found"}), 404
    user.password=user.generate_password_hash(password)
    db.session.commit()
    return jsonify({"msg":"Password updated"}), 200




@api.route('/create-payment', methods=['POST'])
@jwt_required()
def create_payment():
    user_id = get_jwt_identity()
    data = request.get_json()
    amount = 200
    payment = stripe.PaymentIntent.create(
        amount=amount,
        currency='eur',
        payment_method=data['payment_method'],
        payment_method_types=["card"],
        off_session=True,
        confirm=True,
    )
    user = User.query.get(user_id)
    empleador = user.profile_empleador
    if(empleador):
        print(payment)
        empleador.premium=True
        db.session.commit()
        return jsonify({'success': True, 'payment':f'Has sido suscrito con éxito, gracias por confiar en Loopy', "user":user.serialize()}),200
    else:
        return jsonify({'success': False, 'payment':f'Algo ha fallado, por favor vuelva a intentarlo'}),200
    
    
#Favoritos
@api.route('/favoritos', methods=['POST'])
def add_favorito():
    data = request.json

    if not data.get('programador_id') and not data.get('empleador_id') and not data.get('oferta_id'):
        return jsonify({'msg': 'Debe proporcionar al menos un ID de programador, empleador o oferta'}), 400
    
    new_favorite = Favoritos(
        programador_id=data.get('programador_id'),
        empleador_id=data.get('empleador_id'),
        oferta_id=data.get('oferta_id')
    )
    
    db.session.add(new_favorite)
    db.session.commit()

    return jsonify(new_favorite.serialize()), 201


@api.route('/user/<int:user_id>/favoritos', methods=['GET'])
def get_user_favorites(user_id):
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({'msg': 'Usuario no encontrado'}), 404
    
    favoritos = []
    
    if user.profile_programador:
        favoritos.extend(user.profile_programador.favoritos)
    
    if user.profile_empleador:
        favoritos.extend(user.profile_empleador.favoritos)
    
    return jsonify([favorito.serialize() for favorito in favoritos]), 200
