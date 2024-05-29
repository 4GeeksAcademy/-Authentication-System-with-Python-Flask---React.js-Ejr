import os
from .models import db, Booking, Training_classes, User, Payment, UserMembershipHistory
from datetime import datetime, timedelta  # Importación del módulo datetime para trabajar con fechas y horas
from flask import current_app as app
from flask_mail import Message, Mail
from itsdangerous import URLSafeTimedSerializer as Serializer
from werkzeug.utils import secure_filename # importacion de secure_filename para manejar imagen
import base64

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}


mail = Mail()


#Funciones de Servicio
#para facilitar la data de los enpoint

#--------------------------------------------------------FUNCION PARA EL ENVIO DE EMAIL ACTIVACION USUARIO------------------------------


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


#--------------------------------------------------------FUNCION PARA LA CANCELACION DE CLASES------------------------------

def cancel_class_and_update_bookings(training_class):
    try:
        # Marcar la clase como no activa
        training_class.Class_is_active = False  # Se establece la propiedad 'Class_is_active' del objeto 'training_class' a False.
        
        # Obtener todas las reservas activas para esta clase
        bookings = Booking.query.filter_by(training_class_id=training_class.id, status='reserved').all()
        # Se realiza una consulta a la base de datos para obtener todas las reservas donde el 'training_class_id' 
        # corresponde al ID de la clase actual y el estado es 'reserved'. Esto retorna una lista de objetos 'Booking'.
        
        # Cancelar cada reserva y actualizar la membresía del usuario
        for booking in bookings:  # Itera sobre cada objeto 'Booking' en la lista 'bookings'.
            booking.status = 'cancelled'  # Actualiza el estado de cada reserva a 'cancelled'.
            
            # Reintegrar la clase a la membresía del usuario
            membership_history = UserMembershipHistory.query.filter(
                UserMembershipHistory.user_id == booking.user_id,  # Filtra por 'user_id' de la reserva.
                UserMembershipHistory.is_active == True,  # Se asegura que la membresía esté activa.
                UserMembershipHistory.end_date >= datetime.utcnow()  # La membresía no debe haber expirado.
            ).first()  # Obtiene la primera membresía activa que cumple con las condiciones o None si no hay ninguna.
            
            if membership_history and membership_history.remaining_classes is not None:
                # Si existe una membresía activa y se lleva un conteo de clases disponibles:
                membership_history.remaining_classes += 1  # Incrementa en uno las clases disponibles.
        
        db.session.commit()  # Guarda los cambios realizados en la base de datos.
        return True, "Class cancelled and bookings updated successfully"  # Retorna True y un mensaje de éxito.
    except Exception as e:  # Si ocurre alguna excepción durante el proceso:
        db.session.rollback()  # Deshace todos los cambios si hay un error.
        return False, "Error cancelling class and updating bookings: {}".format(str(e))
        # Retorna False y el mensaje de error.




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
        return True, "Booking successful", booking.id  # Devolver también el ID de la reserva
    else:
        # Retorna falso y un mensaje de error si la clase está llena o no existe.
        return False, "Class is full or does not exist", None  # Devolver None como ID porque no se creó reserva
    

def send_class_booking_email(email, username, booking_id, training_class_id):
    training_class = Training_classes.query.get(training_class_id)
    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
    </head>
    <body>
        <div style="margin: 0 auto; width: 80%; padding: 20px; border: 1px solid #ccc; border-radius: 5px; box-shadow: 0 2px 3px #ccc;">
            <h1 style="color: #333;">Class Booking Confirmation</h1>
            <p>Hello {username},</p>
            <p>Thank you for booking a class with us! Here are the details of your reservation:</p>
            <ul>
                <li>Class: {training_class.name}</li>
                <li>Date: {training_class.dateTime_class}</li>
                <li>Time: {training_class.start_time}</li>
                <li>Duration: {training_class.duration_minutes} minutes</li>
            </ul>
            <p>We look forward to seeing you!</p>
        </div>
    </body>
    </html>
    """
    send_email('Class Booking Confirmation', email, html)



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

        # Verificar si el usuario aún puede cancelar la reserva según reglas de negocio.
        # Combinar la fecha y hora de la clase para obtener un datetime completo
        # class_datetime = datetime.combine(booking.training_class.date_class, booking.training_class.start_time)
        

        # Comprobar si faltan menos de 2 horas para la clase
        if datetime.utcnow() > booking.training_class.dateTime_class - timedelta(hours=2):
            return False, "It's too late to cancel this booking"

        # Recuperar la clase asociada a la reserva.
        training_class = booking.training_class
        # Aumenta los slots disponibles si es posible.
        if training_class.available_slots:
            training_class.available_slots += 1  # Aumenta los slots disponibles solo si no se excede la capacidad máxima

        # Recuperar el usuario asociado a la reserva.
        user = User.query.get(booking.user_id)
        # Recuperar la membresía activa del usuario.
        active_membership = user.get_active_membership()
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
    

def send_class_cancellation_email(email, username, training_class_id):
    training_class = Training_classes.query.get(training_class_id)
    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
    </head>
    <body>
        <div style="margin: 0 auto; width: 80%; padding: 20px; border: 1px solid #ccc; border-radius: 5px; box-shadow: 0 2px 3px #ccc;">
            <h1 style="color: #333;">Class Cancellation Confirmation</h1>
            <p>Hello {username},</p>
            <p>We regret to inform you that your class reservation has been cancelled. Here are the details of the cancelled class:</p>
            <ul>
                <li>Class: {training_class.name}</li>
                <li>Date: {training_class.dateTime_class}</li>
                <li>Time: {training_class.start_time}</li>
                <li>Duration: {training_class.duration_minutes} minutes</li>
            </ul>
            <p>We hope to see you in another class soon!</p>
        </div>
    </body>
    </html>
    """
    send_email('Class Cancellation Confirmation', email, html)



#--------------------------------------------------------FUNCION PARA PROCESAR EL PAGO DE RESERVAS------------------------------

def process_payment(payment_data):
    # Aquí iría la lógica para conectar con la API de pagos
    # Simulamos una respuesta positiva del proceso de pago
    return True, "Payment processed successfully"



#--------------------------------------------------------FUNCION PARA LA CREACIONDE LA TRANSACCION ------------------------------
def create_transaction(user_id, membership_id, payment_data):
    # Verifica si payment_data es None y lanza un ValueError si lo es
    if payment_data is None:
        raise ValueError("Payment data must be provided and not None")

    # Crear un nuevo objeto Payment con los detalles proporcionados.
    payment = Payment(
        user_id=user_id,  # ID del usuario que realiza el pago
        membership_id=membership_id,  # ID de la membresía asociada al pago
        amount=payment_data['amount'],  # Monto del pago
        payment_method=payment_data['payment_method'],  # Método de pago utilizado (e.g., 'paypal')
        currency=payment_data.get('currency', 'USD'),  # Moneda del pago, por defecto 'USD' si no se proporciona
        description=payment_data.get('description', ''),  # Descripción del pago, por defecto una cadena vacía si no se proporciona
        transaction_reference=payment_data.get('transaction_reference', None),  # Referencia de la transacción, por defecto None si no se proporciona
        payment_date=datetime.now(),  # Fecha y hora en que se realiza el pago
        card_number_last4=payment_data.get('card_number', '')[-4:] if 'card_number' in payment_data else None,  # Últimos 4 dígitos del número de tarjeta, por defecto None si no se proporciona
        cardholder_name=payment_data.get('cardholder_name', None),  # Nombre del titular de la tarjeta, por defecto None si no se proporciona
        card_type=payment_data.get('card_type', None),  # Tipo de tarjeta (e.g., 'Visa'), por defecto None si no se proporciona
        status='completed',  # Estado del pago, por defecto 'completed'
    )

    # Agrega el nuevo pago a la sesión de la base de datos.
    db.session.add(payment)

    # Intenta guardar los cambios en la base de datos.
    try:
        db.session.commit()  # Intenta confirmar la transacción en la base de datos
        return payment  # Retorna el objeto Payment si el proceso es exitoso.
    except Exception as e:
        # En caso de error, realiza un rollback y lanza una excepción para manejarla en el nivel superior.
        db.session.rollback()  # Revierte la transacción en caso de error
        raise Exception(f"Failed to create transaction: {str(e)}")  # Lanza una excepción con un mensaje de error detallado





#--------------------------------------------------------FUNCION PARA LA ACTIVCACION DEL PLAN------------------------------

def activate_membership(user_id, membership_id, duration_days, classes_per_month):
    # Calcula la fecha de inicio y fin de la membresía basándote en la duración
    start_date = datetime.now()  # Establece la fecha y hora actual como la fecha de inicio
    end_date = start_date + timedelta(days=duration_days)  # Calcula la fecha de finalización sumando la duración a la fecha de inicio

    # Crea una nueva entrada en el historial de membresías del usuario
    new_membership_history = UserMembershipHistory(
        user_id=user_id,  # ID del usuario que está activando la membresía
        membership_id=membership_id,  # ID de la membresía que se está activando
        start_date=start_date,  # Fecha de inicio de la membresía
        end_date=end_date,  # Fecha de finalización de la membresía
        remaining_classes=classes_per_month,  # Número de clases restantes por mes
        is_active=True  # Establece la membresía como activa
    )
    db.session.add(new_membership_history)  # Agrega la nueva entrada de historial de membresía a la sesión de la base de datos
    db.session.commit()  # Confirma la transacción en la base de datos para guardar la nueva entrada de historial de membresía

    # Actualiza la membresía activa del usuario en la tabla de usuarios
    user = User.query.get(user_id)  # Obtiene el objeto User correspondiente al user_id
    user.active_membership_id = new_membership_history.id  # Actualiza el ID de la membresía activa del usuario
    db.session.commit()  # Confirma la transacción en la base de datos para guardar los cambios en el usuario

    return start_date, end_date  # Retorna las fechas de inicio y fin de la membresía









#--------------------------------------------------------FUNCION PARA LA VERIFICACION DEL TIPO DE ARCHIVO A CARGAR------------------------------
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


