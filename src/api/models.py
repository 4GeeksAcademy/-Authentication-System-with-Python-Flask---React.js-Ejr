from flask_sqlalchemy import SQLAlchemy  # Importación del módulo SQLAlchemy para interactuar con la base de datos
from datetime import datetime  # Importación del módulo datetime para trabajar con fechas y horas
import json  # Importación del módulo json para trabajar con datos en formato JSON
db = SQLAlchemy()
    
# Tabla de Usuarios
class User(db.Model):  # Define una clase que representa la tabla de usuarios en la base de datos
    id = db.Column(db.Integer, primary_key=True)  # Define una columna para el ID de usuario como clave primaria
    email = db.Column(db.String(120), unique=True, nullable=False)  # Columna para el correo electrónico único y no nulo
    password = db.Column(db.String(80), unique=False, nullable=False)  # Columna para la contraseña no nula
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)  # Columna para el estado de activación del usuario
    name = db.Column(db.String(80), nullable=False)  # Columna para el nombre del usuario
    last_name = db.Column(db.String(80), nullable=False)  # Columna para el nombre del usuario
    username = db.Column(db.String(80), nullable=False)  # Columna para el nombre del usuario
    registration_date = db.Column(db.DateTime, default=datetime.now)  # Columna para la fecha de registro del usuario
    last_update_date = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)  # Nueva columna para la fecha de última modificación
    image_url = db.Column(db.String(255), nullable=True)  # Almacena la ruta de la imagen
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'), nullable=False)  # Clave foránea para el ID de módulo

    # module_master = db.Column(db.Boolean(), unique=False, nullable=False)  # Columna para el estado de activación del usuario
    # module_admin = db.Column(db.Boolean(), unique=False, nullable=False)  # Columna para el estado de activación del usuario
    # module_coach = db.Column(db.Boolean(), unique=False, nullable=False)  # Columna para el estado de activación del usuario
    # module_athlete = db.Column(db.Boolean(), unique=False, nullable=False)  # Columna para el estado de activación del usuario
    # module_store = db.Column(db.Boolean(), unique=False, nullable=False)  # Columna para el estado de activación del usuario

    security_questions = db.relationship("SecurityQuestion", back_populates="user", lazy=True)  # Relación uno a muchos con la tabla de preguntas de seguridad
    role = db.relationship("Role")  # Relación con la tabla de módulos

    def __repr__(self):  # Método para representar un objeto de usuario como una cadena
        return '<User %r>' % self.id
    
    def serialize(self):  # Método para serializar un objeto de usuario a un diccionario JSON
        return {  # Devolver un diccionario con los atributos del usuario
            "id": self.id,
            "email": self.email,
            "image": self.image_url,
            "username": self.username,  # Faltó definir este atributo en la clase
            "name": self.name, 
            "last_name": self.last_name,  # Faltó definir este atributo en la clase
            "role": self.role.name,
            "permissions": [perm.permission.serialize() for perm in self.role.role_permissions],
            "security_questions_question1": self.security_questions[0].question,
            "security_questions_answer1": self.security_questions[0].answer,
            "security_questions_question2": self.security_questions[1].question,
            "security_questions_answer2": self.security_questions[1].answer,
            "password": self.password,
            "register_date": self.registration_date.isoformat(),  # Formato ISO de la fecha
            "account_update": self.last_update_date.isoformat()  # Formato ISO de la fecha
        }
    
    
# Tabla de Asignación de Preguntas de Seguridad
class SecurityQuestion(db.Model):  # Define una clase que representa la tabla de asignación de preguntas de seguridad en la base de datos
    id = db.Column(db.Integer, primary_key=True)  # Define una columna para el ID de asignación como clave primaria
    question = db.Column(db.String(255), nullable=False)  # Columna para la pregunta de seguridad
    answer = db.Column(db.String(255), nullable=False)  # Columna para la respuesta de seguridad
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # Clave foránea para el ID de usuario


    user = db.relationship("User", back_populates="security_questions")  # Relación con la tabla de usuarios

    def __repr__(self):  # Método para representar un objeto de pregunta de seguridad como una cadena
        return '<SecurityQuestion %r>' % self.id
    
    def serialize(self):  # Método para serializar un objeto de pregunta de seguridad a un diccionario JSON
        return {  # Devolver un diccionario con los atributos de la pregunta de seguridad
            "id": self.id,
            "question": self.question,
            "answer": self.answer
        }


 #Tabla de Módulos
class Role(db.Model):  # Define una clase que representa la tabla de módulos en la base de datos
    id = db.Column(db.Integer, primary_key=True)  # Define una columna para el ID de módulo como clave primaria
    name = db.Column(db.String(50), nullable=False)  # Columna para el nombre del módulo
    description = db.Column(db.String(255), nullable=False)  # Columna para la descripción del módulo

    def __repr__(self):  # Método para representar un objeto de módulo como una cadena
        return '<Role %r>' % self.id
    
    def serialize(self):  # Método para serializar un objeto de módulo a un diccionario JSON
        return {  # Devolver un diccionario con los atributos del módulo
            "id": self.id,
            "description": self.description,
            "Type_role": self.name,
            "permissions": [perm.permission.serialize() for perm in self.role_permissions]
}
    
class RolePermission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'), nullable=False)
    permission_id = db.Column(db.Integer, db.ForeignKey('permission.id'), nullable=False)
    
    role = db.relationship("Role", backref=db.backref("role_permissions", lazy='dynamic'))
    permission = db.relationship("Permission", backref=db.backref("role_permissions", lazy='dynamic'))

    def __repr__(self):
        return '<RolePermission %r>' % self.id
    
class Permission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=True)

    def __repr__(self):
        return '<Permission %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name}

