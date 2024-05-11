import os
from .models import db, Booking, Training_classes, User, Transaction, UserMembershipHistory
from datetime import datetime, timedelta  # Importación del módulo datetime para trabajar con fechas y horas


#Funciones de Servicio
#para facilitar la data de los enpoint

#--------------------------------------------------------FUNCION PARA LA CREACION DE RESERVAS------------------------------
def create_booking(user_id, training_class_id):
    training_class = Training_classes.query.get(training_class_id)
    if training_class and training_class.available_slots > 0:
        booking = Booking(user_id=user_id, training_class_id=training_class_id,
        status='reserved')  # Asegúrate de proporcionar un valor predeterminado aquí
        training_class.available_slots -= 1  # Reduce the available slots
        db.session.add(booking)
        db.session.commit()

        return True, "Booking successful"
    else:
        return False, "Class is full or does not exist"


#--------------------------------------------------------FUNCION PARA LA CANCELACION CREACION DE RESERVAS------------------------------
def cancel_booking(booking_id):
    try:
        booking = Booking.query.get(booking_id)
        if not booking:
            return False, "Booking not found"

        if booking.status == 'cancelled':
            return False, "Booking already cancelled"

        # # Verificar si el usuario aún puede cancelar la reserva (dependiendo de tus reglas de negocio, por ejemplo, no permitir cancelar si falta menos de X horas para la clase)
        # if datetime.now() > booking.booking_date - timedelta(hours=10):  # Ejemplo: no permitir cancelar si falta menos de 1 hora
        #     return False, "It's too late to cancel this booking"

        training_class = booking.training_class
        if training_class.available_slots:
            training_class.available_slots += 1  # Aumenta los slots disponibles solo si no se excede la capacidad máxima


        user = User.query.get(booking.user_id)
        active_membership = user.active_membership
        if active_membership and active_membership.remaining_classes is not None:
            active_membership.remaining_classes += 1  # Devuelve la clase a la membresía activa del usuario

        booking.status = 'cancelled'
        db.session.commit()
        return True, "Booking cancelled successfully"
    except Exception as e:
        db.session.rollback()
        return False, "Error cancelling booking: {}".format(str(e))



#--------------------------------------------------------FUNCION PARA PROCESAR EL PAGO DE RESERVAS------------------------------

def process_payment(payment_data):
    # Aquí iría la lógica para conectar con la API de pagos
    # Simulamos una respuesta positiva del proceso de pago
    return True, "Payment processed successfully"

#--------------------------------------------------------FUNCION PARA LA CREACIONDE LA TRANSACCION ------------------------------


def create_transaction(user_id, membership_id, amount, payment_method):
    transaction = Transaction(
        user_id=user_id, 
        membership_id=membership_id, 
        amount=amount, 
        payment_method=payment_method,  # Asegúrate de que esto no sea None
        status='completed'
    )
    db.session.add(transaction)
    db.session.commit()
    return transaction

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