from flask import Blueprint, request
import api.domain.booking.controller as Controller
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models.index import Booking
import api.utilities.handle_response as Response

api = Blueprint('api/booking', __name__)

@api.route('/<int:company_id>/', methods=["POST"])
@jwt_required()
def create_new_booking(company_id):
    current_user = get_jwt_identity()
    current_user_id = current_user['id']
    
    body = request.get_json()

    new_booking = Controller.create_new_booking(company_id, current_user_id, body)

    if isinstance(new_booking, Booking):
        return Response.response_ok('New booking created successfully!', new_booking.serialize())
    else:
        return Response.response_error(new_booking['msg'], new_booking['status'])


@api.route('/admin/<int:company_id>', methods=["POST"])
@jwt_required()
def admin_create_new_booking(company_id):
    current_user = get_jwt_identity()
    current_user_id = current_user['id']
    
    body = request.get_json()

    new_booking = Controller.admin_create_new_booking(company_id, current_user_id, body)

    if isinstance(new_booking, Booking):
        return Response.response_ok('New booking created successfully!', new_booking.serialize_admin_booking())
    else:
        return Response.response_error(new_booking['msg'], new_booking['status'])

@api.route('/<int:booking_id>', methods=['GET'])
@jwt_required()
def get_booking(booking_id):
    current_user = get_jwt_identity()
    current_user_id = current_user['id']

    booking = Controller.get_booking(booking_id, current_user_id)

    if isinstance(booking, Booking):
        return Response.response_ok(f'Booking with id: {booking_id}, was found in database.', booking.serialize())
    else:
        return Response.response_error(booking['msg'], booking['status'])


@api.route('/company/<int:company_id>', methods=['GET'])
@jwt_required()
def get_bookings_by_company(company_id):
    current_user = get_jwt_identity()
    current_user_id = current_user['id']

    bookings_by_company = Controller.get_bookings_by_company(company_id, current_user_id)

    if isinstance(bookings_by_company, list):
        serialized_bookings = list(map(lambda booking: booking.serialize_admin_booking(), bookings_by_company))
        return Response.response_ok(f'List of all bookings of the company with id: {company_id}.', serialized_bookings)
    else:
        return Response.response_error(bookings_by_company['msg'], bookings_by_company['status'])

@api.route('/user', methods=['GET'])
@jwt_required()
def get_bookings_by_user_id():
    current_user = get_jwt_identity()

    bookings_by_user_id = Controller.get_bookings_by_user_id(current_user['id'])

    if isinstance(bookings_by_user_id, list):
        serialized_bookings = list(map(lambda booking: booking.serialize(), bookings_by_user_id))
        return Response.response_ok('List of all bookings', serialized_bookings)
    else:
        return Response.response_error(bookings_by_user_id['msg'], bookings_by_user_id['status'])

@api.route('/<int:booking_id>', methods=['PUT'])
@jwt_required()
def update_booking(booking_id):
    current_user = get_jwt_identity()
    current_user_id = current_user['id']

    update_booking = request.get_json()

    booking = Controller.update_booking(booking_id, current_user_id, update_booking)

    if isinstance (booking, Booking):
        return Response.response_ok(f'Booking with id: {booking_id} has been updated in database', booking.serialize())
    else: 
        return Response.response_error(booking['msg'], booking['status'])

@api.route('/<int:booking_id>', methods=['DELETE'])
@jwt_required()
def delete_booking(booking_id):
    current_user = get_jwt_identity()
    current_user_id = current_user['id']

    deleted_booking = Controller.delete_booking(booking_id, current_user_id)

    if isinstance(deleted_booking, Booking):
        return Response.response_ok(f'This booking with id: {booking_id}, was deleted from database', deleted_booking.serialize_admin_booking())
    else:
        return Response.response_error(deleted_booking['msg'], deleted_booking['status'])
        