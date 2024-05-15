import os
from .models import db, Booking, Training_classes, User, Payment, UserMembershipHistory
from datetime import datetime, timedelta  # Importación del módulo datetime para trabajar con fechas y horas
from flask import current_app as app
from flask_mail import Message, Mail
from itsdangerous import URLSafeTimedSerializer as Serializer

mail = Mail()


#Funciones de Servicio
#para facilitar la data de los enpoint

#--------------------------------------------------------FUNCION PARA LA CREACION DE RESERVAS------------------------------
def create_booking(user_id, training_class_id):
    # Busca la clase de entrenamiento por su ID.
    training_class = Training_classes.query.get(training_class_id)
    
    # Comprueba si la clase existe y si hay espacios disponibles.
    if training_class and training_class.available_slots > 0:
        # Crea un nuevo objeto Booking con el usuario y la clase de entrenamiento especificados.
        booking = Booking(user_id=user_id, training_class_id=training_class_id,
                          status='reserved')  # Asegúrate de proporcionar un valor predeterminado aquí para el estado.
        
        # Reduce los espacios disponibles en la clase por uno.
        training_class.available_slots -= 1  # Reduce los espacios disponibles.
        
        # Agrega la nueva reserva a la sesión de la base de datos.
        db.session.add(booking)
        
        # Confirma los cambios en la base de datos.
        db.session.commit()

        # Retorna verdadero y un mensaje de éxito si la reserva se crea correctamente.
        return True, "Booking successful"
    else:
        # Retorna falso y un mensaje de error si la clase está llena o no existe.
        return False, "Class is full or does not exist"



#--------------------------------------------------------FUNCION PARA LA CANCELACION CREACION DE RESERVAS------------------------------
def cancel_booking(booking_id):
    try:
        # Buscar la reserva por ID.
        booking = Booking.query.get(booking_id)
        # Comprueba si la reserva existe.
        if not booking:
            return False, "Booking not found"

        # Comprueba si la reserva ya está cancelada.
        if booking.status == 'cancelled':
            return False, "Booking already cancelled"

        # Opcional: Verificar si el usuario aún puede cancelar la reserva según reglas de negocio.
        # Descomenta y ajusta las siguientes líneas según necesidad.
        # if datetime.now() > booking.booking_date - timedelta(hours=10):  # Ejemplo: no permitir cancelar si falta menos de 10 horas.
        #     return False, "It's too late to cancel this booking"

        # Recuperar la clase asociada a la reserva.
        training_class = booking.training_class
        # Aumenta los slots disponibles si es posible.
        if training_class.available_slots:
            training_class.available_slots += 1  # Aumenta los slots disponibles solo si no se excede la capacidad máxima

        # Recuperar el usuario asociado a la reserva.
        user = User.query.get(booking.user_id)
        # Recuperar la membresía activa del usuario, si la tiene.
        active_membership = user.active_membership
        # Si existe una membresía activa y lleva un conteo de clases, incrementa el número de clases disponibles.
        if active_membership and active_membership.remaining_classes is not None:
            active_membership.remaining_classes += 1  # Devuelve la clase a la membresía activa del usuario

        # Cambiar el estado de la reserva a 'cancelado'.
        booking.status = 'cancelled'
        # Confirma los cambios en la base de datos.
        db.session.commit()
        return True, "Booking cancelled successfully"
    except Exception as e:
        # En caso de error, realiza un rollback para mantener la consistencia de la base de datos.
        db.session.rollback()
        return False, "Error cancelling booking: {}".format(str(e))



#--------------------------------------------------------FUNCION PARA PROCESAR EL PAGO DE RESERVAS------------------------------

def process_payment(payment_data):
    # Aquí iría la lógica para conectar con la API de pagos
    # Simulamos una respuesta positiva del proceso de pago
    return True, "Payment processed successfully"

#--------------------------------------------------------FUNCION PARA LA CREACIONDE LA TRANSACCION ------------------------------
def create_transaction(user_id, membership_id, amount, payment_method):
    # Crear un nuevo objeto Payment con los detalles proporcionados.
    payment = Payment(
        user_id=user_id,  # ID del usuario que realiza el pago.
        membership_id=membership_id,  # ID de la membresía que se está comprando.
        amount=amount,  # Monto del pago.
        payment_method=payment_method,  # Método de pago utilizado.
        status='completed'  # Estado del pago. Asumimos que el pago es completado al momento de crearlo.
    )

    # Asegúrate de que el método de pago no sea None antes de proceder.
    if payment_method is None:
        raise ValueError("Payment method must be provided and not None")

    # Agrega el nuevo pago a la sesión de la base de datos.
    db.session.add(payment)

    # Intenta guardar los cambios en la base de datos.
    try:
        db.session.commit()
        return payment  # Retorna el objeto Payment si el proceso es exitoso.
    except Exception as e:
        # En caso de error, realiza un rollback y lanza una excepción para manejarla en el nivel superior.
        db.session.rollback()
        raise Exception(f"Failed to create transaction: {str(e)}")


#--------------------------------------------------------FUNCION PARA LA ACTIVCACION DEL PLAN------------------------------

def activate_membership(user_id, membership_id, duration_days, classes_per_month):
    # Calcula la fecha de finalización de la membresía basándote en la duración
    start_date = datetime.now()
    end_date = start_date + timedelta(days=duration_days)

    # Crea una nueva membresía en el historial
    new_membership_history = UserMembershipHistory(
        user_id=user_id,
        membership_id=membership_id,
        start_date=start_date,
        end_date=end_date,
        remaining_classes=classes_per_month,
        is_active=True
    )
    db.session.add(new_membership_history)
    db.session.commit()

    # Actualiza la membresía activa del usuario
    user = User.query.get(user_id)
    user.active_membership_id = new_membership_history.id
    db.session.commit()



#--------------------------------------------------------FUNCION PARA EL ENVIO DE EMAIL ACTIVACION USUARIO------------------------------


#funciones para el envio de email de configuracion
#funciones para el envio de email de configuracion
def generate_confirmation_token_email(email):
    serializer = Serializer(app.config['SECRET_KEY'])
    return serializer.dumps(email, salt=app.config['SECURITY_PASSWORD_SALT'])

# def send_email(subject, recipient, html):
#     msg = Message(subject, sender=app.config['MAIL_USERNAME'], recipients=[recipient])
#     msg.html = html
#     mail.send(msg)

def send_email(subject, recipient, html):
    # Crea un objeto Message que será usado para enviar el correo.
    # Configura el asunto, el remitente (extraído de la configuración de la app) y los destinatarios.
    msg = Message(subject, sender=app.config['MAIL_USERNAME'], recipients=[recipient])
    
    # Establece el contenido HTML del mensaje.
    msg.html = html
    
    # Utiliza el objeto 'mail' para enviar el mensaje. 'mail' debe ser configurado previamente en la app.
    try:
        mail.send(msg)
    except Exception as e:
        # Manejo de errores al intentar enviar el correo, podría loggearse o manejar de otra manera según las necesidades.
        print(f"Error sending email: {e}")


def confirm_token_email(token, expiration=3600):
    # Configura el serializador con la clave secreta de la aplicación.
    serializer = Serializer(app.config['SECRET_KEY'])
    
    try:
        # Intenta decodificar el token para extraer el email.
        # Utiliza una sal específica y un tiempo de expiración (por defecto 3600 segundos, o 1 hora).
        email = serializer.loads(token, salt=app.config['SECURITY_PASSWORD_SALT'], max_age=expiration)
    except:
        # Si ocurre un error al decodificar (por ejemplo, token malformado, expirado, etc.), retorna False.
        return False
    
    # Retorna el email decodificado si el token es válido y no ha expirado.
    return email
