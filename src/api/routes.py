"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User, Comentarios, Especialidades, ClaveResetToken
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
    response.headers["Access-Control-Allow-Methods"] = "GET, POST,PUT, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type"
    response.headers["Cross-Origin-Embedder-Policy"] = "require-corp"
    response.headers["Cross-Origin-Opener-Policy"] = "same-origin"
    return response


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
    access_token = create_access_token(identity=user_query.id)
    refresh_token = create_refresh_token(identity=user_query.id)
    return jsonify({"access_token":access_token,"refresh_token": refresh_token,"logged":True}), 200

# Proteje una ruta con jwt_required, que expulsará las solicitudes
# sin un JWT válido presente.
@api.route("/perfil/usuario", methods=["GET"])
@jwt_required()
def get_perfil():
    try:
        current_user = get_jwt_identity()       
        if not current_user:
            return jsonify({"error": "Usuario no encontrado"}), 404
        
        # Simulando la obtención de más datos del usuario desde la base de datos
        user = User.query.filter_by(id=current_user).first()
        if not user:
            return jsonify({"error": "Usuario no encontrado en la base de datos"}), 404
      
        # Suponiendo que `user` tiene los atributos `nombre_usuario`, `correo`, `foto`,  `telefono`, y  `descripcion`
        return jsonify({
            "logged": True,
            "nombre_usuario": user.nombre_usuario,
            "apellido": user.apellido,
            "correo": user.correo,
            "foto": user.foto,
            "telefono": user.telefono,
            "is_psicologo": user.is_psicologo,
            "descripcion": user.descripcion
        }), 200    
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
    return jsonify(logged=True), 200

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
#CREAR USUARIO
@api.route('/user', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        existing_user = User.query.filter_by(correo=data["correo"]).first()
        print(data)
        
        if existing_user:
            return jsonify({"msg": "Email already exists"}), 400
        
        fecha_de_nacimiento = datetime.strptime(data['fecha_de_nacimiento'], '%Y-%m-%d').date()

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

        response_body = {
            "msg": "User created successfully",
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
        nueva_especialidad = Especialidades(especialidad=data['especialidad'])

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
    
#OBTENER TODAS LAS ESPECIALIDADES  
@api.route('/especialidades', methods=['GET'])
def get_especialidades():
    try:
        especialidades = Especialidades.query.all()
        especialidades_serialized = [especialidad.serialize() for especialidad in especialidades]

        return jsonify(especialidades_serialized), 200
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
