"""
Este módulo se encarga de iniciar el servidor API, cargar la base de datos y agregar los puntos finales.
"""

from flask import Flask, request, jsonify, url_for, Blueprint, redirect, url_for  # Importación de Flask y funciones relacionadas
from api.models import db, User, SecurityQuestion, Role, Permission, RolePermission  # Importación de los modelos de la base de datos
from api.utils import generate_sitemap, APIException  # Importación de funciones de utilidad y excepciones personalizadas
from flask_cors import CORS  # Importación de CORS para permitir solicitudes desde otros dominios
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity  # Importación de JWT para autenticación y autorización basada en tokens
from flask_bcrypt import generate_password_hash, check_password_hash  # Importación de bcrypt para encriptación de contraseñas
from datetime import timedelta  # Importación de timedelta para manejar intervalos de tiempo

#------------------verificar con david --------------------------------

from werkzeug.utils import secure_filename # importacion de secure_filename para manejar imagen



#------------------INICIALIZACION DE LA API----------------------------------------------------------------------------------

api = Blueprint('api', __name__)  # Creación de un Blueprint para agrupar las rutas relacionadas con la API
# Un Blueprint es una forma de organizar y estructurar las rutas de una aplicación Flask en grupos lógicos y modularizados. 
# Es una característica que permite dividir la aplicación en componentes más pequeños y reutilizables, 
# lo que facilita la gestión y mantenimiento del código.

# Allow CORS requests to this API
CORS(api)  # Habilitar CORS para permitir solicitudes cruzadas desde el frontend hacia la API

#-------ENCRIPTACION JWT------
#la inicialización de JWTManager está en la carpeta app.py despues de la declaración del servidor Flask
jwt = JWTManager()  # Inicialización del JWTManager para manejar la generación y verificación de tokens JWT



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200




#-------------------CREAR  TOKEN LOGIN--------------------------------------------------------------------------
@api.route('master/token', methods=['POST'])  # Define un endpoint para agregar un nuevo usuario mediante una solicitud POST a la ruta '/users'
def create_token():  # Define la función que manejará la solicitud
    try:  # Inicia un bloque try para manejar posibles excepciones
        data = request.json  # Obtén los datos JSON enviados en la solicitud
        if not data:  # Verifica si no se proporcionaron datos JSON
            return jsonify({'error': 'No data provided'}), 400  # Devuelve un error con código de estado 400 si no se proporcionaron datos

        if 'email' not in data:  # Verifica si 'email' no está presente en los datos JSON
            return jsonify({'error': 'Email is required'}), 400  # Devuelve un error con código de estado 400 si 'email' no está presente

        if 'password' not in data:  # Verifica si 'password' no está presente en los datos JSON
            return jsonify({'error': 'Password is required'}), 400  # Devuelve un error con código de estado 400 si 'password' no está presente

        existing_user = User.query.filter_by(email=data['email']).first()  # Busca un usuario en la base de datos con el mismo email
        if not existing_user:  # Verifica si ya existe un usuario con el mismo email
            return jsonify({'error': 'Email does not exist.'}), 400  # Devuelve un error con código de estado 409 si ya existe un usuario con el mismo email

        password_user_db = existing_user.password  # Extraemos la contraseña almacenada del usuario existente en la base de datos

        true_o_false = check_password_hash(password_user_db, data['password'])  # Comparamos la contraseña ingresada en el formulario con la contraseña almacenada en la base de datos, después de descifrarla

        if true_o_false:  # Si la comparación es verdadera, es decir, las contraseñas coinciden
            expires = timedelta(days=1)  # Configuramos la duración del token de acceso
            user_id = existing_user.id  # Obtenemos el ID del usuario existente en la base de datos
            access_token = create_access_token(identity=user_id, expires_delta=expires)  # Creamos un token de acceso para el usuario
            return jsonify({'access_token': access_token, 'login': True}), 200  # Devolvemos el token de acceso como respuesta exitosa
        else:  # Si la comparación de contraseñas es falsa, es decir, las contraseñas no coinciden
            return jsonify({'error': 'Incorrect password'}), 400  # Devolvemos un mensaje de error indicando que la contraseña es incorrecta

    except Exception as e:  # Captura cualquier excepción que ocurra dentro del bloque try
        return jsonify({'error': 'Error login user: ' + str(e)}), 500  # Devuelve un mensaje de error con un código de estado HTTP 500 si ocurre una excepción durante el procesamiento



#-------------------CONSULTAR TODOS LOS USUARIOS--------------------------------------------------------------------------
@api.route('/users', methods=['GET'])
@jwt_required() # Decorador para requerir autenticación con JWT
def get_users():
    try:
        users = User.query.all()
        if not users:
            return jsonify({'message': 'No users found'}), 404
        
        response_body = [user.serialize() for user in users]
        return jsonify(response_body), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


#-------------------CONSULTAR UN USUARIO UNICO--------------------------------------------------------------------------

@api.route('/user', methods=['GET'])
@jwt_required() 
def get_user_by_email():
    try:

        current_user_id = get_jwt_identity() # Obtiene la id del usuario del token
        user = User.query.get(current_user_id) # Buscar al usuario por su ID
        if not user:
            return jsonify({'message': 'User not found'}), 404
        return jsonify(user.serialize()), 200 # Devolver los datos del usuario encontrado
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
#-------------------CREAR  USUARIOS PARA INTERFAL MASTER--------------------------------------------------------------------------
@api.route('master/users', methods=['POST'])  # Define un endpoint para agregar un nuevo usuario mediante una solicitud POST a la ruta '/users'
@jwt_required() # Decorador para requerir autenticación con JWT
def create_new_user():  # Define la función que manejará la solicitud
    try:  # Inicia un bloque try para manejar posibles excepciones
        data = request.json  # Obtén los datos JSON enviados en la solicitud
        if not data:  # Verifica si no se proporcionaron datos JSON
            return jsonify({'error': 'No data provided'}), 400  # Devuelve un error con código de estado 400 si no se proporcionaron datos

        if 'email' not in data:  # Verifica si 'email' no está presente en los datos JSON
            return jsonify({'error': 'Email is required'}), 400  # Devuelve un error con código de estado 400 si 'email' no está presente

        if 'username' not in data:  # Verifica si 'username' no está presente en los datos JSON
            return jsonify({'error': 'Username is required'}), 400  # Devuelve un error con código de estado 400 si 'username' no está presente

        if 'password' not in data:  # Verifica si 'password' no está presente en los datos JSON
            return jsonify({'error': 'Password is required'}), 400  # Devuelve un error con código de estado 400 si 'password' no está presente

        # Verifica si se proporcionan las preguntas y respuestas de seguridad en los datos JSON
        if 'security_questions' not in data or len(data['security_questions']) != 2:
            return jsonify({'error': 'Security questions and answers are required'}), 400
        
        if 'role' not in data:  # Verifica si 'password' no está presente en los datos JSON
            return jsonify({'error': 'role is required'}), 400  # Devuelve un error con código de estado 400 si 'password' no está presente

        existing_user = User.query.filter_by(email=data['email']).first()  # Busca un usuario en la base de datos con el mismo email
        if existing_user:  # Verifica si ya existe un usuario con el mismo email
            return jsonify({'error': 'Email already exists.'}), 409  # Devuelve un error con código de estado 409 si ya existe un usuario con el mismo email

        existing_username = User.query.filter_by(username=data['username']).first()  # Busca un usuario en la base de datos con el mismo username
        if existing_username:  # Verifica si ya existe un usuario con el mismo username
            return jsonify({'error': 'Username already exists.'}), 409  # Devuelve un error con código de estado 409 si ya existe un usuario con el mismo username

        # Búsqueda del rol especificado
        role = Role.query.filter_by(name=data['role']).first()
        if not role:
            return jsonify({'error': 'Role does not exist'}), 404
        
        password_hash = generate_password_hash(data['password']).decode('utf-8')

        # Crea un nuevo usuario con los datos proporcionados                                                                      #acualmente se esta activando pero debe inplementarse la activacion por email
        new_user = User(email=data['email'], password=password_hash, username=data['username'], name=data.get('name'), last_name=data.get('last_name'), is_active=True, role_id=role.id)
       
        # Agrega las preguntas y respuestas de seguridad al usuario
        for question_answer in data['security_questions']:
            new_question = SecurityQuestion(
                question=question_answer['question'],
                answer=question_answer['answer']
            )
            new_user.security_questions.append(new_question)

        db.session.add(new_user)  # Agrega el nuevo usuario a la sesión de la base de datos
        db.session.commit()  # Confirma los cambios en la base de datos
 
        return jsonify({'message': 'User created successfully'}), 201  # Devuelve un mensaje de éxito con el ID del nuevo usuario y un código de estado 201
   
    except Exception as e:  # Captura cualquier excepción que ocurra dentro del bloque try
        return jsonify({'error': 'Error in user creation: ' + str(e)}), 500  # Devuelve un mensaje de error con un código de estado HTTP 500 si ocurre una excepción durante el procesamiento


#estructura para de datos que le debe legar a POST, PUT
# { 
# "email": "aaaa@gmail.com",
# "name": "aaaa", 
# "last_name": "bbbb", 
# "username": "aaabbb", 
# "password": "11",
# "role": "Administrador (Admin)",
# "security_questions": [ 
# {"question": "perro", "answer": "nava"}, 
# {"question": "gato", "answer": "no"}]
# }


#------ actualizar el usuario---------
@api.route('master/users/<int:user_id>', methods=['PUT'])  # Define un endpoint para actualizar un usuario mediante una solicitud PUT
@jwt_required() # Requiere autenticación con JWT para acceder a esta ruta
def update_user(user_id):  # Define la función para manejar las solicitudes PUT de actualización de usuario, con el parámetro de ID de usuario
    try:  # Inicia un bloque try-except para manejar posibles errores durante la ejecución

        data = request.json  # Obtén los datos JSON enviados en la solicitud
        if not data:  # Verifica si no se proporcionaron datos JSON
            return jsonify({'error': 'No data provided'}), 400  # Devuelve un error con código de estado 400 si no se proporcionaron datos
        
        user = User.query.get(user_id) # Busca al usuario por su ID

        if not user:  # Verifica si el usuario no fue encontrado en la base de datos
            return jsonify({'error': 'User not found'}), 404  # Devuelve un error con código de estado 404 si el usuario no fue encontrado
    
        for key, value in data.items():  # Itera sobre cada par llave-valor en el JSON recibido
            # Verifica si el usuario tiene un atributo con el nombre de la llave
            if hasattr(user, key):  # Si el usuario tiene un atributo con el nombre de la llave
                if  key == 'password': # Verifica si el atributo es 'password'
                    # Hashea la nueva contraseña y la asigna al atributo correspondiente del usuario
                    password_hash = generate_password_hash(value).decode('utf-8') # Hashea la nueva contraseña
                    setattr(user, key, password_hash) # Asigna la contraseña hasheada al atributo correspondiente del usuario
                elif key == 'role':  # Verifica si el atributo es 'role'
                    # Busca el objeto Role utilizando el nombre proporcionado en `value`
                    role = Role.query.filter_by(name=value).first()
                    if role:
                        setattr(user, key, role)
                    else:
                        return jsonify({'error': 'Role not found'}), 404
                elif key == 'security_questions':  # Verifica si el atributo es 'security_questions'
                    # Elimina las preguntas de seguridad existentes y añade las nuevas
                    SecurityQuestion.query.filter_by(user_id=user.id).delete()
                    new_questions = [
                        SecurityQuestion(question=q['question'], answer=q['answer'], user=user)
                        for q in value
                    ]
                    user.security_questions = new_questions
                else:
                    # Para otros campos, asigna el valor directamente al atributo correspondiente del usuario
                    setattr(user, key, value)

        db.session.commit()  # Confirma los cambios en la base de datos
        return jsonify({'message': 'User updated successfully'})  # Devuelve un mensaje de éxito indicando que el usuario se actualizó correctamente
    
    except Exception as e:  # Captura cualquier excepción que ocurra durante la ejecución
        return jsonify({'error': str(e)}), 500  # Devuelve un mensaje de error con el código de estado 500 (Internal Server Error)



#-------------------CONSULTAR LOS ROLES PARA INTERFAL MASTER--------------------------------------------------------------------------
#------todos los ROLE-------
@api.route('master/roles', methods=['GET'])  # Define una ruta para obtener todos los roles
@api.route('master/roles/<int:roles_id>', methods=['GET'])  # Define una ruta para obtener un rol específico por su ID
@jwt_required() # Decorador para requerir autenticación con JWT
def get_roles(roles_id=None):  # Define una función para manejar las solicitudes GET relacionadas con los roles
    try:  # Inicia un bloque de manejo de excepciones para capturar posibles errores
        if roles_id:  # Comprueba si se proporcionó un ID de roles específico
            # Buscar un permiso específico por su ID
            roles_id = Role.query.get(roles_id)  # Busca el rol en la base de datos por su ID
            if not roles_id:  # Comprueba si el rol no se encontró en la base de datos
                return jsonify({'error': 'Permission not found'}), 404  # Devuelve un mensaje de error si el rol no se encontró
            return jsonify(roles_id.serialize()), 200  # Devuelve los detalles del rol si se encuentra correctamente

        roles = Role.query.all()  # Obtiene todos los roles de la base de datos
        roles_data = []  # Inicializa una lista para almacenar los datos de los roles
        for role in roles:  # Itera sobre cada rol obtenido de la base de datos
            role_permissions = role.role_permissions  # Obtiene los permisos asociados con el rol actual
            permissions_list = [  # Inicializa una lista para almacenar los detalles de los permisos asociados
                {
                    'id': rp.permission.id,  # ID del permiso
                    'name': rp.permission.name,  # Nombre del permiso
                    'description': rp.permission.description  # Descripción del permiso
                } for rp in role_permissions  # Itera sobre cada permiso asociado al rol
            ]
            role_data = {  # Define un diccionario con los detalles del rol actual
                'id': role.id,  # ID del rol
                'name': role.name,  # Nombre del rol
                'description': role.description,  # Descripción del rol
                'permissions': permissions_list  # Lista de permisos asociados al rol
            }
            roles_data.append(role_data)  # Agrega los detalles del rol a la lista de datos de roles

        return jsonify({'roles': roles_data}), 200  # Devuelve todos los roles con sus detalles y permisos asociados

    except Exception as e:  # Captura cualquier excepción que ocurra durante el procesamiento
        return jsonify({'error': 'Error retrieving roles: ' + str(e)}), 500  # Devuelve un mensaje de error con detalles si ocurre un error durante la recuperación de roles

    
 #-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
#estructura para de datos que le debe legar a POST, PUT
# {
#     "name": "Gerente de Gimnasio",
#     "description": "Responsable de la gestión diaria del gimnasio, incluyendo personal, finanzas y operaciones.",
#     "permissions": [1, 2, 3] --> ESTE ES EL ID DE LOS PERMISOS (SI EXISTEN)
# }


#------CREACION DE NUEVO ROLE----------------------------

@api.route('master/roles', methods=['POST'])  # Define una ruta para crear un nuevo rol con permisos
@jwt_required()  # Decorador para requerir autenticación con JWT
def create_role_with_permissions():  # Define una función para manejar las solicitudes POST relacionadas con la creación de roles
    try:  # Inicia un bloque de manejo de excepciones para capturar posibles errores
        data = request.json  # Obtiene los datos JSON de la solicitud
        if not data or 'name' not in data or 'description' not in data:  # Comprueba si los datos necesarios no se proporcionaron
            return jsonify({'error': 'Name and description are required'}), 400  # Devuelve un mensaje de error si los datos necesarios no se proporcionaron
        
        if 'permissions' not in data or not isinstance(data['permissions'], list):  # Comprueba si la lista de permisos no se proporcionó o no es una lista
            return jsonify({'error': 'Permissions list is required and must be an array'}), 400  # Devuelve un mensaje de error si la lista de permisos no se proporcionó correctamente
        
        if Role.query.filter_by(name=data['name']).first():  # Comprueba si ya existe un rol con el mismo nombre en la base de datos
            return jsonify({'error': 'Role already exists'}), 409  # Devuelve un mensaje de error si el rol ya existe en la base de datos

        # Creación del nuevo rol
        new_role = Role(name=data['name'], description=data['description'])  # Crea una instancia de Rol con los datos proporcionados
        db.session.add(new_role)  # Agrega el nuevo rol a la sesión de base de datos
        db.session.flush()  # Flush para obtener el ID del rol antes de realizar commit

        # Asignación de permisos al nuevo rol
        for permission_id in data['permissions']:  # Itera sobre los IDs de permisos proporcionados
            permission = Permission.query.get(permission_id)  # Obtiene el permiso correspondiente al ID de la base de datos
            if not permission:  # Comprueba si el permiso no se encontró en la base de datos
                db.session.rollback()  # Revierte la transacción de la base de datos
                return jsonify({'error': f'Permission ID {permission_id} not found'}), 404  # Devuelve un mensaje de error si el permiso no se encontró
            new_role_permission = RolePermission(role_id=new_role.id, permission_id=permission.id)  # Crea una instancia de asignación de permisos para el nuevo rol
            db.session.add(new_role_permission)  # Agrega la asignación de permisos a la sesión de base de datos

        db.session.commit()  # Realiza commit de la transacción en la base de datos

        return jsonify({'message': 'Role and permissions created successfully', 'role_id': new_role.id}), 201  # Devuelve un mensaje de éxito junto con el ID del nuevo rol creado

    except Exception as e:  # Captura cualquier excepción que ocurra durante el procesamiento
        db.session.rollback()  # Revierte la transacción de la base de datos en caso de error
        return jsonify({'error': 'Error in creating role with permissions: ' + str(e)}), 500  # Devuelve un mensaje de error con detalles si ocurre un error durante la creación del rol con permisos


#------EDICION DE  ROLE----------------------------

@api.route('master/roles/<int:role_id>', methods=['PUT'])  # Define una ruta para actualizar un rol específico mediante su ID
@jwt_required()  # Decorador para requerir autenticación con JWT
def update_role(role_id):  # Define una función para manejar las solicitudes PUT relacionadas con la actualización de roles
    try:  # Inicia un bloque de manejo de excepciones para capturar posibles errores
        data = request.json  # Obtiene los datos JSON de la solicitud
        if not data:  # Comprueba si no se proporcionaron datos en la solicitud
            return jsonify({'error': 'No data provided'}), 400  # Devuelve un mensaje de error si no se proporcionaron datos
        
        role = Role.query.get(role_id)  # Obtiene el rol correspondiente al ID proporcionado
        if not role:  # Comprueba si el rol no se encontró en la base de datos
            return jsonify({'error': 'Role not found'}), 404  # Devuelve un mensaje de error si el rol no se encontró
        
        if 'name' in data:  # Comprueba si se proporcionó el nombre del rol en los datos de la solicitud
            role.name = data['name']  # Actualiza el nombre del rol con el valor proporcionado
        if 'description' in data:  # Comprueba si se proporcionó la descripción del rol en los datos de la solicitud
            role.description = data['description']  # Actualiza la descripción del rol con el valor proporcionado

        # Actualizar permisos si se proporcionan en la solicitud
        if 'permissions' in data and isinstance(data['permissions'], list):  # Comprueba si se proporcionó una lista de permisos en los datos de la solicitud
            # Eliminar todos los permisos existentes asociados al rol
            RolePermission.query.filter_by(role_id=role.id).delete()
            # Agregar nuevos permisos al rol
            for permission_id in data['permissions']:  # Itera sobre los IDs de permisos proporcionados
                permission = Permission.query.get(permission_id)  # Obtiene el permiso correspondiente al ID de la base de datos
                if not permission:  # Comprueba si el permiso no se encontró en la base de datos
                    db.session.rollback()  # Revierte la transacción de la base de datos
                    return jsonify({'error': f'Permission ID {permission_id} not found'}), 404  # Devuelve un mensaje de error si el permiso no se encontró
                new_role_permission = RolePermission(role_id=role.id, permission_id=permission.id)  # Crea una nueva asignación de permiso para el rol
                db.session.add(new_role_permission)  # Agrega la asignación de permiso a la sesión de base de datos

        db.session.commit()  # Realiza commit de la transacción en la base de datos

        return jsonify({'message': 'Role updated successfully'}), 200  # Devuelve un mensaje de éxito después de actualizar el rol correctamente

    except Exception as e:  # Captura cualquier excepción que ocurra durante el procesamiento
        db.session.rollback()  # Revierte la transacción de la base de datos en caso de error
        return jsonify({'error': 'Error updating role: ' + str(e)}), 500  # Devuelve un mensaje de error con detalles si ocurre un error durante la actualización del rol


#------ELIMINAR ROLE POR ID----------------------------

@api.route('master/roles/<int:role_id>', methods=['DELETE'])  # Define una ruta para eliminar un rol específico mediante su ID
@jwt_required()  # Decorador para requerir autenticación con JWT
def delete_role(role_id):  # Define una función para manejar las solicitudes DELETE relacionadas con la eliminación de roles
    try:  # Inicia un bloque de manejo de excepciones para capturar posibles errores
        role = Role.query.get(role_id)  # Obtiene el rol correspondiente al ID proporcionado
        if not role:  # Comprueba si el rol no se encontró en la base de datos
            return jsonify({'error': 'Role not found'}), 404  # Devuelve un mensaje de error si el rol no se encontró
        
        # Actualizar usuarios que tienen este rol a un rol predeterminado o nulo
        default_role_id = 1  # Asumiendo que 1 es el ID de un rol por defecto (SE DEBE ESTABLECER EN NULL)
        users_with_role = User.query.filter_by(role_id=role_id).all()  # Obtiene todos los usuarios que tienen el rol especificado
        for user in users_with_role:  # Itera sobre los usuarios con el rol especificado
            user.role_id = default_role_id  # Actualiza el ID del rol del usuario al rol predeterminado o nulo
        
        # Eliminar asociaciones de permisos
        RolePermission.query.filter_by(role_id=role.id).delete()  # Elimina todas las asociaciones de permisos relacionadas con el rol
        # Eliminar el rol
        db.session.delete(role)  # Elimina el rol de la base de datos
        db.session.commit()  # Realiza commit de la transacción en la base de datos

        return jsonify({'message': 'Role deleted successfully'}), 200  # Devuelve un mensaje de éxito después de eliminar el rol correctamente

    except Exception as e:  # Captura cualquier excepción que ocurra durante el procesamiento
        db.session.rollback()  # Revierte la transacción de la base de datos en caso de error
        return jsonify({'error': 'Error deleting role: ' + str(e)}), 500  # Devuelve un mensaje de error con detalles si ocurre un error durante la eliminación del rol

    
#------------------------------------------- PERMISOS ------------------------------------------------------------------
#------------------ CREAR PERMISO---------------
@api.route('master/permissions', methods=['POST'])  # Define una ruta para crear un nuevo permiso
@jwt_required()  # Decorador para requerir autenticación con JWT
def create_permission():  # Define una función para manejar las solicitudes POST relacionadas con la creación de permisos
    try:  # Inicia un bloque de manejo de excepciones para capturar posibles errores
        data = request.json  # Obtiene los datos JSON enviados en la solicitud
        if not data:  # Comprueba si no se proporcionaron datos JSON
            return jsonify({'error': 'No data provided'}), 400  # Devuelve un mensaje de error si no se proporcionaron datos
        
        # Verifica que los campos necesarios están presentes
        if 'name' not in data or not data['name'].strip():  # Comprueba si el campo 'name' está presente y no está vacío después de eliminar los espacios en blanco
            return jsonify({'error': 'Name is required'}), 400  # Devuelve un mensaje de error si el campo 'name' no está presente o está vacío
        
        # Opcional: Validar otros campos como 'description'
        description = data.get('description', '').strip()  # Obtiene la descripción del permiso del JSON enviado, si no se proporciona, establece una cadena vacía

        # Crear el objeto Permission con los datos proporcionados
        new_permission = Permission(name=data['name'], description=description)  # Crea un nuevo objeto de permiso con el nombre y la descripción proporcionados
        db.session.add(new_permission)  # Añadir el nuevo permiso a la sesión de la base de datos
        db.session.commit()  # Guardar los cambios en la base de datos

        return jsonify({'message': 'Permission created successfully', 'permission_id': new_permission.id}), 201  # Devuelve un mensaje de éxito después de crear el permiso correctamente, junto con su ID

    except Exception as e:  # Captura cualquier excepción que ocurra durante el procesamiento
        return jsonify({'error': str(e)}), 500  # Devuelve un mensaje de error con detalles si ocurre un error durante la creación del permiso


#------------------ CONSULTAR PERMISO O TODOS LOS PERMISOS---------------

@api.route('master/permissions', methods=['GET'])  # Define una ruta para manejar solicitudes GET a '/master/permissions'
@api.route('master/permissions/<int:permission_id>', methods=['GET'])  # Define otra ruta para manejar solicitudes GET a '/master/permissions/<int:permission_id>', donde <int:permission_id> es una variable para el ID del permiso
@jwt_required()  # Requiere autenticación con JWT para acceder a estas rutas
def get_permissions(permission_id=None):  # Define la función para manejar las solicitudes GET de permisos, con un parámetro opcional de ID de permiso
    try:  # Inicia un bloque try-except para manejar posibles errores durante la ejecución
        if permission_id:  # Comprueba si se proporcionó un ID de permiso
            # Busca un permiso específico por su ID
            permission = Permission.query.get(permission_id)
            if not permission:  # Si no se encuentra el permiso
                return jsonify({'error': 'Permission not found'}), 404  # Devuelve un mensaje de error con el código de estado 404 (Not Found)
            return jsonify(permission.serialize()), 200  # Si se encuentra el permiso, devuelve sus datos serializados con el código de estado 200 (OK)
        else:  # Si no se proporcionó un ID de permiso
            # Obtiene todos los permisos de la base de datos
            permissions = Permission.query.all()
            return jsonify([perm.serialize() for perm in permissions]), 200  # Devuelve todos los permisos serializados con el código de estado 200 (OK)

    except Exception as e:  # Captura cualquier excepción que ocurra durante la ejecución
        return jsonify({'error': str(e)}), 500  # Devuelve un mensaje de error con el código de estado 500 (Internal Server Error)



#------------------ eliminar PERMISOS---------------

@api.route('master/permissions/<int:permission_id>', methods=['DELETE'])  # Define una ruta para manejar solicitudes DELETE a '/master/permissions/<int:permission_id>'
@jwt_required()  # Requiere autenticación con JWT para acceder a esta ruta
def delete_permission(permission_id):  # Define la función para manejar las solicitudes DELETE de permisos, con el parámetro de ID de permiso
    try:  # Inicia un bloque try-except para manejar posibles errores durante la ejecución
        permission = Permission.query.get(permission_id)  # Busca el permiso con el ID proporcionado
        if not permission:  # Si no se encuentra el permiso
            return jsonify({'error': 'Permission not found'}), 404  # Devuelve un mensaje de error con el código de estado 404 (Not Found)

        # Verifica si el permiso está siendo utilizado en alguna parte antes de eliminarlo
        role_permissions = RolePermission.query.filter_by(permission_id=permission_id).all()
        if role_permissions:  # Si el permiso está asignado a algún rol
            # Rechaza la solicitud de eliminación y devuelve un mensaje explicativo
            return jsonify({
                'error': 'Cannot delete permission because it is in use',
                'detail': 'This permission is currently assigned to one or more roles.'
            }), 403  # Código 403 Forbidden es adecuado aquí

        # Si no hay roles utilizando este permiso, procede con la eliminación
        db.session.delete(permission)  # Elimina el permiso de la base de datos
        db.session.commit()  # Confirma los cambios en la base de datos
        return jsonify({'message': 'Permission deleted successfully'}), 200  # Devuelve un mensaje de éxito con el código de estado 200 (OK)

    except Exception as e:  # Captura cualquier excepción que ocurra durante la ejecución
        db.session.rollback()  # Realiza un rollback para evitar inconsistencias en la base de datos
        return jsonify({'error': 'Error deleting permission: ' + str(e)}), 500  # Devuelve un mensaje de error con el código de estado 500 (Internal Server Error)



