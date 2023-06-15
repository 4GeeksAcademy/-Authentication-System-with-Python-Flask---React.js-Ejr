import os
from flask import Flask, request, jsonify, Blueprint, redirect
import api.utilities.handle_response as Response
import api.domain.users.controller as Controller
from api.models.index import User
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
import bcrypt
# import stripe

# stripe.api_key = os.environ['STRIPE_API_TEST_KEY']
# MY_DOMAIN = os.environ['BACKEND_URL']

api = Blueprint('api/users', __name__)

@api.route("/register", methods=["POST"])
def create_new_user():
    body = request.get_json()
    
    user = Controller.create_new_user(body, 'client')
    
    if isinstance(user, User):
        return Response.response_ok('User has been created in database.', user.serialize())
    else:
        return Response.response_error(user['msg'], user['status'])

@api.route('/', methods=["GET"])
def get_users_list():
    return Controller.get_users_list()

@api.route('/<int:user_id>', methods=['GET'])
@jwt_required()
def get_single_user(user_id):
    current_user = get_jwt_identity()
    current_user_id = current_user["id"]

    user = Controller.get_single_user(user_id, current_user_id)
    
    if isinstance(user, User):
        return Response.response_ok('User has been retrieved from database.', user.serialize())
    else:
        return Response.response_error(user['msg'], user['status']) 

@api.route('/profile', methods=['GET'])
@jwt_required()
def get_user_profile():
    info_token = get_jwt()
    current_user = info_token['sub']
    verified_user = Controller.verify_user(current_user)

    if isinstance(verified_user, User):
        return Response.response_ok('User exists in this database.', verified_user.serialize())
    else:
        return Response.response_error(verified_user['msg'], verified_user['status'])

@api.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    current_user = get_jwt_identity()
    current_user_id = current_user["id"]

    try:
        avatar = request.files.get('avatar')
        body = request.form.to_dict()
        updated_profile = Controller.update_profile(body['username'], body['firstname'], body["lastname"], body['email'], avatar, current_user_id)
        return Response.response_ok('User was successfully updated.', updated_profile.serialize())
    except Exception as error:
        return Response.response_error('Internal error...', 500)

@api.route('/delete/<int:user_id>', methods=['PATCH'])
@jwt_required()
def delete_user(user_id):
    current_user = get_jwt_identity()
    current_user_id = current_user["id"]

    user = Controller.delete_user(user_id, current_user_id)
    if isinstance(user, User):
        return Response.response_ok('User was deleted from database.', user.serialize())
    else:
        return Response.response_error(user['msg'], user['status'])

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    token_and_role_type = Controller.login(body)

    if token_and_role_type.get('token'):
        return Response.response_ok('This is a valid token', token_and_role_type)
    return Response.response_error(token_and_role_type['msg'], token_and_role_type['status'])


# @api.route('/checkout', methods=['POST'])
# def create_checkout_session():
#     try:
#         checkout_session = stripe.checkout.Session.create(
#             line_items=[
#                 {
#                     # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
#                     'price': '{{PRICE_ID}}',
#                     'quantity': 1,
#                 },
#             ],
#             mode='payment',
#             success_url=MY_DOMAIN + '?success=true',
#             cancel_url=MY_DOMAIN + '?canceled=true',
#         )
#     except Exception as e:
#         return str(e)

#     return redirect(checkout_session.url, code=303)


