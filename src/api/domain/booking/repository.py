from api.models.index import db, Booking

def create_new_booking(body, current_user_id, company_id, service_workers_id):
    new_booking = Booking(current_user_id, company_id, service_workers_id, body['start_service'], body['description'])
    db.session.add(new_booking)
    db.session.commit()
    return new_booking

def admin_create_new_booking(user_id, body, company_id, service_workers_id):
    new_booking = Booking(user_id, company_id, service_workers_id, body['start_service'], body['description'])
    db.session.add(new_booking)
    db.session.commit()
    return new_booking

def get_booking(booking_id):
    return Booking.query.get(booking_id)

def get_bookings_by_company(company_id):
    bookings_by_company = Booking.query.filter_by(company_id=company_id).all()
    return bookings_by_company

def get_bookings_by_user_id(current_user_id):
    return Booking.query.filter_by(user_id=current_user_id).all()

def delete_booking(booking):
    db.session.delete(booking)
    db.session.commit()
    return booking