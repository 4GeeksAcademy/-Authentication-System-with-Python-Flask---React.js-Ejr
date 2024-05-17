from flask_sqlalchemy import SQLAlchemy  # Importación del módulo SQLAlchemy para interactuar con la base de datos
from datetime import datetime  # Importación del módulo datetime para trabajar con fechas y horas
import json  # Importación del módulo json para trabajar con datos en formato JSON
db = SQLAlchemy()
    


#-----------------------------------------------------------------TABLAS PARA USER Y SEGURITY_QUESTION--------------------------------------------

# Tabla de Usuarios
class User(db.Model):  # Define una clase que representa la tabla de usuarios en la base de datos
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(250), unique=False, nullable=False)  # Columna para la contraseña no nula
    is_active = db.Column(db.Boolean(), unique=False, nullable=True)  # Columna para el estado de activación del usuario
    name = db.Column(db.String(80), nullable=False)  # Columna para el nombre del usuario
    last_name = db.Column(db.String(80), nullable=False)  # Columna para el nombre del usuario
    username = db.Column(db.String(80), nullable=False)  # Columna para el nombre del usuario
    registration_date = db.Column(db.DateTime, default=datetime.utcnow)  # Columna para la fecha de registro del usuario
    last_update_date = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)  # Nueva columna para la fecha de última modificación
    image_url = db.Column(db.String(255), nullable=True)  # Almacena la ruta de la imagen
    role_id = db.Column(db.Integer, db.ForeignKey('role.id', ondelete='SET NULL'), nullable=True)

    # Relación con SecurityQuestion configurada para eliminar en cascada
    security_questions = db.relationship('SecurityQuestion', back_populates='user', cascade='all, delete-orphan')
    role = db.relationship("Role")  # Relación con la tabla de módulos
    
    # Relaciones sin eliminar en cascada para Membership History y Payments
    memberships_history = db.relationship('UserMembershipHistory', backref='user', lazy='dynamic')
    payments = db.relationship('Payment', backref='user', lazy=True)

    #NOTA: siempre que se haga un eliminacion de base de datos se debe comentar active_membership_id y active_membership ya que tiene una relacion circular y una depende de otra


    def __repr__(self):  # Método para representar un objeto de usuario como una cadena
        return '<User %r>' % self.id
    
    def get_active_membership(self):
        # Obtener la membresía activa basada en la fecha y el estado
        return self.memberships_history.filter(
            UserMembershipHistory.end_date >= datetime.utcnow(),
            UserMembershipHistory.is_active == True
        ).first()

    def has_active_membership(self):
        # Verificar si el usuario tiene una membresía activa
        active_membership = self.get_active_membership()
        return active_membership is not None and active_membership.end_date > datetime.utcnow()

    def has_remaining_classes(self):
        # Verificar si el usuario tiene clases restantes en su membresía
        active_membership = self.get_active_membership()
        return active_membership and active_membership.remaining_classes > 0

    def consume_class(self):
        # Consumir una clase de la membresía del usuario
        active_membership = self.get_active_membership()
        if self.has_active_membership() and self.has_remaining_classes():
            active_membership.remaining_classes -= 1
            db.session.commit()
            return True
        return False

    # def activate_membership(self, membership):
    #     # Activar una membresía para el usuario
    #     self.membership = membership
    #     db.session.commit()  # Guardar los cambios en la base de datos
    
    def serialize(self):  # Método para serializar un objeto de usuario a un diccionario JSON
        active_membership = self.get_active_membership()  # Obtiene la membresía activa usando el nuevo método
        return {  # Devolver un diccionario con los atributos del usuario
            "id": self.id,
            "email": self.email,
            "image": self.image_url,
            "username": self.username,
            "name": self.name,
            "last_name": self.last_name,
            "role": self.role.name if self.role else "N/A",  # Mostrar "N/A" si no hay rol
            "security_questions_question1": self.security_questions[0].question if self.security_questions else "N/A",
            "security_questions_answer1": self.security_questions[0].answer if self.security_questions else "N/A",
            "security_questions_question2": self.security_questions[1].question if self.security_questions else "N/A",
            "security_questions_answer2": self.security_questions[1].answer if self.security_questions else "N/A",
            "password": self.password,  # Generalmente no es buena práctica incluir la contraseña en información serializada.
            "register_date": self.registration_date.isoformat(),  # Formato ISO de la fecha
            "account_update": self.last_update_date.isoformat(),  # Formato ISO de la fecha
            "active_membership_is_active": active_membership.is_active if active_membership else "N/A",
            "membership_start_date": active_membership.start_date.isoformat() if active_membership else "N/A",
            "membership_end_date": active_membership.end_date.isoformat() if active_membership else "N/A",
            "membership_description": active_membership.membership.description if active_membership and active_membership.membership else "N/A",
            "membership_remaining_classes": active_membership.remaining_classes if active_membership else "N/A",
        }

    
    
# Tabla de Asignación de Preguntas de Seguridad
class SecurityQuestion(db.Model):  # Define una clase que representa la tabla de asignación de preguntas de seguridad en la base de datos
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(255), nullable=False)  # Columna para la pregunta de seguridad
    answer = db.Column(db.String(255), nullable=False)  # Columna para la respuesta de seguridad
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)


    user = db.relationship("User", back_populates="security_questions")

    def __repr__(self):  # Método para representar un objeto de pregunta de seguridad como una cadena
        return '<SecurityQuestion %r>' % self.id
    
    def serialize(self):  # Método para serializar un objeto de pregunta de seguridad a un diccionario JSON
        return {  # Devolver un diccionario con los atributos de la pregunta de seguridad
            "id": self.id,
            "question": self.question,
            "answer": self.answer
        }


#-----------------------------------------------------------------TABLAS PARA ROLES Y PERMISOS--------------------------------------------


 #Tabla de Módulos
class Role(db.Model):  # Define una clase que representa la tabla de módulos en la base de datos
    id = db.Column(db.Integer, primary_key=True)
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



#-----------------------------------------------------------------TABLAS PARA MEMBRECIAS Y CLASES--------------------------------------------
# Tabla de Membresías
class Membership(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    duration_days = db.Column(db.Integer, nullable=True)  # Duración en días
    classes_per_month = db.Column(db.Integer, nullable=True)  # Cantidad de clases por mes

    membership_history = db.relationship('UserMembershipHistory', backref='membership', lazy='dynamic')
    payments = db.relationship('Payment', backref='membership', lazy=True)

    def __repr__(self):  # Método para representar un objeto de pregunta de seguridad como una cadena
        return '<Membership %r>' % self.id
    
    def serialize(self):  # Método para serializar un objeto de pregunta de seguridad a un diccionario JSON
        return {  # Devolver un diccionario con los atributos de la pregunta de seguridad
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "duration_days": self.price,
            "classes_per_month": self.classes_per_month,
            "price": self.price
        }

# Tabla historial de Membresías del usuario
class UserMembershipHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    membership_id = db.Column(db.Integer, db.ForeignKey('membership.id'))
    start_date = db.Column(db.DateTime, default=datetime.utcnow)
    end_date = db.Column(db.DateTime)
    remaining_classes = db.Column(db.Integer)
    is_active = db.Column(db.Boolean, default=False)

    def __repr__(self):  # Método para representar un objeto de pregunta de seguridad como una cadena
        return '<UserMembershipHistory %r>' % self.id
    
    def serialize(self):  # Método para serializar un objeto de pregunta de seguridad a un diccionario JSON
        return {  # Devolver un diccionario con los atributos de la pregunta de seguridad
            "history_membership_id": self.id,
            "membership_id": self.membership_id,
            "user_id": self.user_id,
            "user_name": self.user.name,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "remaining_classes": self.remaining_classes,
            "is_active": self.is_active
        }
    
    
# Tabla de Clases de Entrenamiento
class Training_classes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    instructor = db.Column(db.String(100), nullable=True)
    dateTime_class = db.Column(db.DateTime)  # Día de la semana (e.g., Lunes, Martes, etc.)
    start_time = db.Column(db.Time, nullable=False)  # Hora de inicio de la clase
    duration_minutes = db.Column(db.Integer, nullable=False)  # Duración en minutos
    available_slots = db.Column(db.Integer, nullable=False)  # Cupos disponibles en la clase
    instructor_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)  # Foreign key para el instructor
    
    instructor = db.relationship("User")  # Relación con la tabla de usuarios

    def __repr__(self):  # Método para representar un objeto de pregunta de seguridad como una cadena
        return '<Training_classes %r>' % self.id
    
    def serialize(self):  # Método para serializar un objeto de pregunta de seguridad a un diccionario JSON
        return {  # Devolver un diccionario con los atributos de la pregunta de seguridad
            "id": self.id,
            "name": self.name,
            "dateTime_class": self.dateTime_class,
            "start_time": self.start_time.strftime('%H:%M'),  # Formato de hora como HH:MM
            "duration_minutes": self.duration_minutes,
            "instructor":self.instructor.name if self.instructor else "",
            "available_slots": self.available_slots,
            "description": self.description,

        }

#--------------- tabla de reservaciones------------------------
# Tabla de reservas de clases
class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    training_class_id = db.Column(db.Integer, db.ForeignKey('training_classes.id'), nullable=False)
    booking_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    status = db.Column(db.String(50), nullable=True,  default='avaible')  # Por ejemplo: 'reserved', 'completed', 'cancelled'

    user = db.relationship("User")
    training_class = db.relationship("Training_classes")

    def __repr__(self):
        return '<Booking %r>' % self.id
    
    def serialize(self):
        return {
            "booking_id": self.id,
            "booking_date": self.booking_date.isoformat(),  # Usar isoformat para evitar problemas de serialización
            "booking_status": self.status,
            "class_id": self.training_class.id,
            "class_name": self.training_class.name,
            "date_class": self.training_class.date_class,
            "class_start_time": self.training_class.start_time.isoformat(),
            "class_instructor": self.training_class.instructor.name  # Asumiendo que 'instructor' también es un objeto serializable
        }

    
# Tabla de Transacciones
class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    membership_id = db.Column(db.Integer, db.ForeignKey('membership.id'), nullable=False)
    payment_date = db.Column(db.DateTime, default=datetime.utcnow)  # Fecha de la transacción
    amount = db.Column(db.Float, nullable=False)
    payment_method = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(50), nullable=False)

    payment_details = db.relationship('PaymentDetail', backref='payment', lazy=True)

    def __repr__(self):  # Método para representar un objeto de pregunta de seguridad como una cadena
        return '<Payment %r>' % self.id
    
    def serialize(self):  # Método para serializar un objeto de pregunta de seguridad a un diccionario JSON
        return {  # Devolver un diccionario con los atributos de la pregunta de seguridad
            "payment_id": self.id,
            "user_id": self.user.id,
            "amount": self.amount,
            "payment_method": self.payment_method,
            "status": self.status

        }


# Tabla de Detalles de la Transacción #aun no defino que deberia ir aca
class PaymentDetail(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    payment_id = db.Column(db.Integer, db.ForeignKey('payment.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    subtotal = db.Column(db.Float, nullable=False)

    def __repr__(self):  # Método para representar un objeto de pregunta de seguridad como una cadena
        return '<PaymentDetail %r>' % self.id



