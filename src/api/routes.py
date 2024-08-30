"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User, Comentarios, Especialidad, ClaveResetToken,ProfEspecialidad
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, create_refresh_token
from flask import jsonify
from flask_jwt_extended.exceptions import NoAuthorizationError, InvalidHeaderError, RevokedTokenError
from werkzeug.exceptions import Unauthorized
from datetime import datetime, timezone
import os
from dotenv import load_dotenv
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature
from flask_mail import Message


load_dotenv()  # Cargamos las variables del archivo .env
SECRET_KEY = os.getenv("SECRET_KEY")
# Verificamos que la clave secreta se haya cargado correctamente
if not SECRET_KEY:
    raise ValueError("SECRET_KEY no está configurado.")

serializer = URLSafeTimedSerializer(SECRET_KEY)

api = Blueprint('api', __name__)



# Allow CORS requests to this API
CORS(api)

@api.after_request
def apply_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST,PUT, DELETE,OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type"
    response.headers["Cross-Origin-Embedder-Policy"] = "require-corp"
    response.headers["Cross-Origin-Opener-Policy"] = "same-origin"
    return response

    
#Edición de datos de perfil de usuario
@api.route('/editar-perfil', methods=['POST'])
def editar_perfil():
    try:
        data = request.get_json()
        correo = data.get("correo", None)

        # Verificamos que el usuario exista
        existing_user = User.query.filter_by(correo=correo).first()
        
        if not existing_user:
            return jsonify({"msg": "Usuario no encontrado"}), 404

        # Actualizamos los campos solo si se provee un nuevo valor
        if "nombre_usuario" in data:
            existing_user.nombre_usuario = data["nombre_usuario"]
        if "apellido" in data:
            existing_user.apellido = data["apellido"]
        if "descripcion" in data:
            existing_user.descripcion = data["descripcion"]
        if "fechaNacimiento" in data:
            existing_user.fecha_de_nacimiento = data["fechaNacimiento"]
        if "codigoArea" in data:
            existing_user.codigo_de_area = data["codigoArea"]
        if "telefono" in data:
            existing_user.telefono = data["telefono"]

        # Guardamos los cambios en la base de datos
        db.session.commit()

        response_body = {
            "msg": "Perfil actualizado satisfactoriamente.",
            "user": existing_user.serialize()
        }
        return jsonify(response_body), 200
    
    except Exception as e:
        return jsonify({"msg": str(e)}), 500


# Endpoint para enviar correo con la información del usuario que solicita el perfil profesional.
@api.route('/solicitud-profesional', methods=['POST'])
def send_email():
    try:
        # Obtener datos del formulario
        nombre_completo = request.form.get('nombreCompleto')
        cedula = request.form.get('cedula')
        correo = request.form.get('correo')  # Dirección del remitente
        direccion = request.form.get('direccion')
        motivacion = request.form.get('motivacion')
        
        # Obtener el archivo
        escolaridad = request.files.get('escolaridad')

        # Preparar el contenido del correo
        msg = Message(
            subject='Nueva Solicitud Profesional',
            sender=correo,  # Dirección del remitente desde el formulario
            recipients=['hablemosuysaludmental@gmail.com']  # Destinatario fijo
        )

        # Construir el cuerpo del correo
        msg.body = (
            f"Nombre Completo: {nombre_completo}\n"
            f"Cédula: {cedula}\n"
            f"Correo Electrónico: {correo}\n"
            f"Dirección: {direccion}\n"
            f"Motivación: {motivacion}"
        )

        # Adjuntar el archivo si existe
        if escolaridad:
            msg.attach(
                escolaridad.filename,
                escolaridad.content_type,
                escolaridad.read()
            )

        # Enviar el correo
        current_app.mail.send(msg)

        return jsonify({"msg": "Correo enviado exitosamente"}), 201
    
    except Exception as e:
        return jsonify({"msg": str(e)}), 500

# Crea una ruta para autenticar a tus usuarios y devolver los JWT.
# La función create_access_token() se utiliza para generar el JWT   
@api.route("/login", methods=["POST"])
def login():
    correo = request.json.get("correo", None)
    clave = request.json.get("clave", None)
    # Consulta si el usuario existe en la base de datos
    user_query = User.query.filter_by(correo=correo).first()
     # Verifica si el usuario existe y si la contraseña es correcta
    if not user_query or not user_query.check_password(clave):
        return jsonify({"msg": "Correo o clave incorrectos"}), 401 
    # Verifica si el usuario proporcionó ambos datos
    if not correo or not clave:
        return jsonify({"msg": "Correo y clave son requeridos"}), 400
    # Verifica si el correo electrónico ha sido confirmado antes de permitir el inicio de sesión
    if not user_query.correo_verificado:
        return jsonify({"msg": "Por favor, verifica tu correo electrónico antes de iniciar sesión."}), 403
    
    access_token = create_access_token(identity=user_query.id)
    refresh_token = create_refresh_token(identity=user_query.id)
    return jsonify({"access_token":access_token,"refresh_token": refresh_token,"logged":True, "user": user_query.serialize()}), 200

# Proteje una ruta con jwt_required, que expulsará las solicitudes
# sin un JWT válido presente.
@api.route("/perfil/usuario/<int:id>", methods=["GET"])
@jwt_required()
def get_perfil(id):
    try:
        current_user = get_jwt_identity()       
        if not current_user:
            return jsonify({"error": "Usuario no encontrado"}), 404
        
        # Simulando la obtención de más datos del usuario desde la base de datos
        user = User.query.filter_by(id=id).first()
        if not user:
            return jsonify({"error": "Usuario no encontrado en la base de datos"}), 404
        #print(vars(user))
        # Suponiendo que `user` tiene los atributos `nombre_usuario`, `correo`, `foto`,  `telefono`, y  `descripcion`
        return jsonify(user.serialize()), 200    
    except NoAuthorizationError:
        return jsonify({"error": "Autorización no proporcionada"}), 401
    except InvalidHeaderError:
        return jsonify({"error": "Encabezado de autorización inválido"}), 422
    except RevokedTokenError:
        return jsonify({"error": "El token ha sido revocado"}), 401
    except Unauthorized:
        return jsonify({"error": "No autorizado"}), 403
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Validación de TOKEN
@api.route("/valid-token", methods=["GET"])
@jwt_required()
def valid_token():
    # Acceda a la identidad del usuario actual con get_jwt_identity
    current_user = get_jwt_identity()
    user_exist= User.query.filter_by(id=current_user).first()
    # Validación del ID
    if current_user is None or not isinstance(current_user, int):
            return jsonify({"error": "Token inválido o no se puede obtener la identidad"}), 400
    if not user_exist:
        return jsonify(logged=False), 404
    return jsonify(logged=True,user=user_exist.serialize()), 200

 # Endpoint para refrescar el access_token
@api.route('/refresh-token', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()

    new_access_token = create_access_token(identity=current_user)
    return jsonify({"access_token": new_access_token}), 200

# Generamos un token único y lo envíamos al correo del usuario para recuperar su clave
@api.route('/reset_password', methods=['POST'])
def reset_password():
    correo = request.json.get("correo", None)
    clave = request.json.get("clave", None)
    user = User.query.filter_by(correo=correo).first()

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404 # Generamos el token
    serializer = URLSafeTimedSerializer(os.getenv('SECRET_KEY'))
    token = serializer.dumps(user.correo, salt=os.getenv('SECRET_KEY'))
    # Guardamos el token en la base de datos
    reset_token = ClaveResetToken(user_id=user.id, token=token, expiration=datetime.now())
    db.session.add(reset_token)
    db.session.commit()
    # Enviamos el correo electrónico
    reset_url = f"{os.getenv('FRONTEND_URL')}/reset-password/{token}"
    msg = Message(subject="Password Reset", sender=os.getenv('MAIL_DEFAULT_SENDER'), recipients=[correo])
    msg.body = f'Para restablecer tu contraseña, haz clic en el siguiente enlace: {reset_url}'
    current_app.mail.send(msg)

    return jsonify({"msg": "Correo enviado para restablecer la contraseña"}), 200

# Verificamos el token y permitimos al usuario restablecer su contraseña.
@api.route('/reset_password/<token>', methods=['POST'])
def reset_password_token(token):
    serializer = URLSafeTimedSerializer(os.getenv('SECRET_KEY'))
    try:
        correo = serializer.loads(token, salt=os.getenv('SECRET_KEY'), max_age=3600)
        clave = request.json['clave']
    except SignatureExpired:
        return jsonify({"msg": "El token ha expirado."}), 400
    except BadSignature:
        return jsonify({"msg": "El token es inválido."}), 400
    except Exception as e:
        return jsonify({"msg": f"Error: {str(e)}"}), 500

    user = User.query.filter_by(correo=correo).first()

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    # Asignamos la nueva contraseña cifrada al atributo clave de nuestra tabla User
    user.set_password(clave)
    db.session.commit()

    return jsonify({"msg": "Contraseña actualizada con éxitoo"}), 200

#Esta ruta verifica el token que se envió al correo del usuario para verificar el registro.
@api.route("/verify_email/<token>", methods=["GET"])
def verify_email(token):
    try:
        correo = serializer.loads(token, salt='email-confirm', max_age=7200)  # El token expira en 2 horas
    except SignatureExpired:
        return jsonify({"msg": "El enlace de verificación ha expirado."}), 400
    except BadSignature:
        return jsonify({"msg": "Enlace de verificación inválido."}), 400

    user = User.query.filter_by(correo=correo).first()
    if not user:
        return jsonify({"msg": "Usuario no encontrado."}), 404

    user.correo_verificado = True
    db.session.commit()

    return jsonify({"msg": "Correo verificado con éxito. Ahora puedes iniciar sesión."}), 200


#CREAR USUARIO
@api.route('/user', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        correo = request.json.get("correo", None)
        existing_user = User.query.filter_by(correo=data["correo"]).first()
       # print(data)
        
        if existing_user:
            return jsonify({"msg": "Email already exists"}), 400

        user_created = User(
            nombre_usuario=data["nombre_usuario"],
            apellido=data["apellido"],
            descripcion=data.get("descripcion"),
            fecha_de_nacimiento=data["fecha_de_nacimiento"],
            codigo_de_area=data["codigo_de_area"],
            telefono=data["telefono"],
            correo=data["correo"],
            clave=data["clave"],
            is_active=data.get('is_active', True),
            foto=data.get("foto"),
            is_psicologo=data.get('is_psicologo', False)
        )
         # Hasheamos y almacenamos la contraseña
        if data["clave"]:
            user_created.set_password(data["clave"])

        db.session.add(user_created)
        db.session.commit()

         # Generamos un token de verificación
        token = serializer.dumps(user_created.correo, salt='email-confirm')

        # Enviamos el correo de verificación
        link =  f"{os.getenv('FRONTEND_URL')}/vista-login/{token}"
        msg = Message(subject="Verificación de correo", sender=os.getenv('MAIL_DEFAULT_SENDER'), recipients=[correo])
        msg.body = f'Haz clic en el siguiente enlace para verificar tu correo: {link}'
        current_app.mail.send(msg)

        response_body = {
            "msg": "Usuario creado satisfactoriamente. Correo enviado para verificar tu cuenta.",
            "user": user_created.serialize()
        }
        return jsonify(response_body), 201
    
    except Exception as e:
        return jsonify({"msg": str(e)}), 500
    
#CREAR ESPECIALIDAD
@api.route('/especialidad', methods=['POST'])
def create_especialidad():
    try:
        data = request.get_json()
        nueva_especialidad = Especialidad(especialidad=data['especialidad'])

        db.session.add(nueva_especialidad)
        db.session.commit()

        return jsonify({"msg": "Especialidad creada exitosamente"}), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 500
    #CREAR COMENTARIO/RESEÑA
@api.route('/comentario', methods=['POST'])
def create_comentario():
    try:
        data = request.get_json()

        # Verificar que id_profesional corresponde a un usuario que es psicólogo
        profesional = User.query.filter_by(id=data['id_profesional'], is_psicologo=True).first()
        if not profesional:
            return jsonify({"msg": "El profesional especificado no es un psicólogo válido"}), 400

        nuevo_comentario = Comentarios(
            id_usuario=data['id_usuario'],
            id_profesional=data['id_profesional'],
            comentario=data['comentario'],
            puntaje=data['puntaje'],
            fecha_de_publicacion=datetime.now(timezone.utc)
        )

        db.session.add(nuevo_comentario)
        db.session.commit()

        return jsonify({"msg": "Comentario creado exitosamente"}), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 500
    
# #OBTENER TODOS LOS USUARIOS
@api.route('/usuarios', methods=['GET'])
def get_users():
     try:
        users = User.query.all()
        users_serialized = [user.serialize() for user in users]

        return jsonify(users_serialized), 200
     except Exception as e:
        return jsonify({"msg": str(e)}), 500

#OBTENER TODOS LOS PROFESIONALES
@api.route('/psicologos', methods=['GET'])
def get_psicologos():
    try:
        users = User.query.filter_by(is_psicologo=True).all()
        users_serialized = [user.serialize() for user in users]

        return jsonify(users_serialized), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 500
    

#OBTENER TODOS LOS COMENTARIOS 
@api.route('/comentarios', methods=['GET'])
def get_comentarios():
    try:
        comentarios = Comentarios.query.all()
        comentarios_serialized = [comentario.serialize() for comentario in comentarios]

        return jsonify(comentarios_serialized), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 500

 #MODIFICAR USUARIO
@api.route('/usuario/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        data = request.get_json()
        user = User.query.get(user_id)

        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404

        user.nombre_usuario = data.get("nombre_usuario", user.nombre_usuario)
        user.apellido = data.get("apellido", user.apellido)
        user.descripcion = data.get("descripcion", user.descripcion)
        user.fecha_de_nacimiento = data.get("fecha_de_nacimiento", user.fecha_de_nacimiento)
        user.codigo_de_area = data.get("codigo_de_area", user.codigo_de_area)
        user.telefono = data.get("telefono", user.telefono)
        user.correo = data.get("correo", user.correo)
        user.clave = data.get("clave", user.clave)
        user.is_psicologo = data.get("is_psicologo", user.is_psicologo)
        user.foto = data.get("foto", user.foto)

        db.session.commit()

        return jsonify({"msg": "Usuario actualizado exitosamente"}), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 500   
#MODIFICAR FOTO USUARIO
@api.route('/usuario/<int:user_id>/foto', methods=['PUT'])
def update_user_photo(user_id):
    try:
        data = request.get_json()
        user = User.query.get(user_id)

        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404

        # Actualiza solo la foto de perfil
        user.foto = data.get("foto", user.foto)

        db.session.commit()

        return jsonify({"msg": "Foto de perfil actualizada exitosamente"}), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 500
#ELIMINAR USUARIO
@api.route('/usuario/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        user = User.query.get(user_id)

        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404

        db.session.delete(user)
        db.session.commit()

        return jsonify({"msg": "Usuario eliminado exitosamente"}), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 500

# Modificar un comentario 
@api.route('/comentarios/<int:comentario_id>', methods=['PUT'])
def update_comentario(comentario_id):
    try:
        data = request.get_json()
        comentario = Comentarios.query.get(comentario_id)

        if not comentario:
            return jsonify({"msg": "Comentario no encontrado"}), 404

        comentario.comentario = data.get("comentario", comentario.comentario)
        comentario.puntaje = data.get("puntaje", comentario.puntaje)
        comentario.fecha_de_publicacion = datetime.now(timezone.utc)

        db.session.commit()

        return jsonify({"msg": "Comentario actualizado exitosamente"}), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 500

# Eliminar un comentario 
@api.route('/comentarios/<int:comentario_id>', methods=['DELETE'])
def delete_comentario(comentario_id):
    try:
        comentario = Comentarios.query.get(comentario_id)

        if not comentario:
            return jsonify({"msg": "Comentario no encontrado"}), 404

        db.session.delete(comentario)
        db.session.commit()

        return jsonify({"msg": "Comentario eliminado exitosamente"}), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 500
# MODIFICAR FOTO USUARIO USANDO CORREO
@api.route('/usuario/foto', methods=['PUT'])
def update_user_photo_by_email():
    try:
        data = request.get_json()
        user = User.query.filter_by(correo=data.get("correo")).first()

        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404

        # Actualiza solo la foto de perfil
        user.foto = data.get("foto", user.foto)

        db.session.commit()

        return jsonify({"msg": "Foto de perfil actualizada exitosamente"}), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 500
    
@api.route('/especialidades', methods=['GET'])
@jwt_required()
def get_especialidades():
    try:
    
        especialidades = Especialidad.query.all()
        especialidades_serializadas = [especialidad.serialize() for especialidad in especialidades]
        return jsonify(especialidades_serializadas), 200
    except Exception as e:
        
        return jsonify({"msg": str(e)}), 500
@api.route('/save-especialidad', methods=['POST'])
@jwt_required()
def save_especialidades():
    data = request.get_json()
    user_id = get_jwt_identity()
    
    # especialidades_nombres = data.get('especialidades')  # Lista de nombres de especialidades

    if not "especialidad_id" in data: 
        return jsonify({"message": "especialidad_id is required"}), 403
    especialidad_exist = ProfEspecialidad.query.filter_by(id_profesional=user_id, especialidad_id=data["especialidad_id"]).first()
    if especialidad_exist:
        return jsonify({"message": "speciality already exist, baby"}), 409
    new_especialidad=ProfEspecialidad(id_profesional=user_id,especialidad_id=data["especialidad_id"])
    db.session.add(new_especialidad)
    db.session.commit()
    db.session.refresh(new_especialidad)
    return jsonify(new_especialidad.serialize()), 200

# @api.route('/especialidades-por-profesional', methods=['GET'])
# @jwt_required()
# def especialidades_por_profesional():
#     # Obtener el ID del profesional autenticado
#     profesional_id = get_jwt_identity()

#     # Verificar si el profesional existe
#     profesional = User.query.get(profesional_id)
#     if not profesional:
#         return jsonify({'error': 'Profesional no encontrado'}), 404

#     # Obtener las especialidades relacionadas con el profesional
#     especialidades = ProfEspecialidad.query.filter_by(id_profesional=profesional_id).all()
#     especialidades_data = [esp.especialidad.serialize() for esp in especialidades]
    
#     return jsonify(especialidades_data), 200

@api.route('/especialidades-por-profesional', methods=['GET', 'DELETE'])
@jwt_required()
def especialidades_por_profesional():
    # Obtener el ID del profesional autenticado
    profesional_id = get_jwt_identity()

    # Verificar si el profesional existe
    profesional = User.query.get(profesional_id)
    if not profesional:
        return jsonify({'error': 'Profesional no encontrado'}), 404

    if request.method == 'GET':
        # Obtener las especialidades relacionadas con el profesional
        especialidades = ProfEspecialidad.query.filter_by(id_profesional=profesional_id).all()
        especialidades_data = [esp.serialize() for esp in especialidades]
        return jsonify(especialidades_data), 200

    elif request.method == 'DELETE':
        # Obtener el ID de la especialidad a eliminar desde los parámetros de la solicitud
        especialidad_id = request.args.get('especialidad_id')
       # print(especialidad_id)
        if not especialidad_id:
            return jsonify({'error': 'ID de especialidad no proporcionado'}), 400
        
        # Buscar la relación especialidad-profesional
        especialidad_a_eliminar = ProfEspecialidad.query.filter_by(id_profesional=profesional_id, especialidad_id=especialidad_id).first()
      
        if not especialidad_a_eliminar:
            return jsonify({'error': 'Especialidad no encontrada para este profesional'}), 404
        
        # Eliminar la especialidad
        db.session.delete(especialidad_a_eliminar)
        db.session.commit()
        
        return jsonify({'message': 'Especialidad eliminada exitosamente'}), 200