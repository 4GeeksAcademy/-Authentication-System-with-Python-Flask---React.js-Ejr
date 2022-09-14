from api.models import db, User, Inmueble, Imagen, Message
from api.utils import generate_sitemap, APIException
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

class User_Handler:

    def __init__(self):
        self.user = []
    
    def signup(self, request_body):
        if request_body["username"].strip() == '' or request_body["password"].strip() == '' or request_body["fullName"].strip() == '' or request_body["email"].strip() == '':
            raise APIException('Error: empty field', status_code=400)
        new_user = User(username = request_body["username"], password = request_body["password"], full_name = request_body["fullName"], email = request_body["email"])
        db.session.add(new_user)
        db.session.commit()
        return jsonify('User created'), 200
    
    def login(self, request_body):
        query = User.query.filter_by(username = request_body['username'], password = request_body['password']).first()
        if not query:
            raise APIException('Error: username not found', status_code= 400)
        user = query.serialize()
        access_token = create_access_token(identity=user['id'])
        response = {"access_token": access_token, "user":user}
        return response

    def get_messages(self, current_user_id):
        messages = list(Message.query.filter_by(recipient_id = current_user_id))
        response = []
        for message in messages:
            list_item = message.serialize()
            response.append(list_item)
        if not response:
            response = "The user does not have any messages"
        return response
    
    def send_message(self, request_body):
        if request_body["full_name"].strip() == '' or request_body["email"].strip() == '' or request_body["message_body"].strip() == '' or request_body["phone"].strip() == '':
            raise APIException('Error: empty field', status_code=400)
        new_message = Message(body = request_body["message_body"], sender_phone = request_body["phone"], sender_name = request_body["full_name"], sender_email = request_body["email"], recipient_id = request_body["recipient_id"], inmueble_id = request_body["property_id"])
        db.session.add(new_message)
        db.session.commit()
        return 'Message posted'

    def get_listings(selg, current_user_id):
        listings = list(Inmueble.query.filter_by(user_id = current_user_id))
        if not listings:
            return "The user does not have any listings"
        all_listings = []
        all_images = []
        for listing in listings:
            list_item = listing.serialize()
            images = list(Imagen.query.filter_by(inmueble_id = list_item["id"]))
            for image in images:
                item = image.serialize()
                all_images.append(item) 
            all_listings.append(list_item)
        response = {"inmuebles": all_listings, "imagenes": all_images}
        return response

    def edit_user(self, request_body, current_user_id):
        user = User.query.filter_by(id = current_user_id).first()
        updated = False
        if len(request_body["full_name"].strip()) != 0 and user.full_name != request_body["full_name"]:
            user.full_name = request_body["full_name"]
            updated = True
        if len(request_body["email"].strip()) != 0 and user.email != request_body["email"]:
            user.email = request_body["email"]
            updated = True
        if len(request_body["password"].strip()) != 0 and user.password != request_body["password"]:
            user.password = request_body["password"]
            updated = True
        if updated:
            db.session.commit()
            user_info = user.serialize()
            response = {"message": "Updated user succesfully", "user_info": user_info}
            return response
        else:
            response = {"message":"Nothing to update"}
            return response

    def delete_user(self, current_user_id):
        user = User.query.filter_by(id = current_user_id).first()
        db.session.delete(user)
        db.session.commit()
        return "user deleted"