"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Event
from api.utils import generate_sitemap, APIException
from flask_cors import CORS 
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


#Create flask app
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != email or password != password:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


@api.route('/hello', methods=['POST', 'GET'])

#TO PROTECT THE ROUTE USE JWT REQUIRED ***************

def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the Google Inspector, and you will see the GET request"
    }

    return jsonify(response_body), 200
    
##### SignUp Route ######

@api.route('/sign-up', methods=['POST'])
def sign_up():
    try:
        # Parse and validate the incoming JSON data
        data = request.json
        required_fields = ['firstName', 'lastName', 'email', 'password']
        for field in required_fields:
            if field not in data:
                raise APIException(f"Missing {field} in request body", status_code=400)

        # Check if the user already exists in the database
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user:
            raise APIException("User with this email already exists", status_code=400)

        # Create a new user and save it to the database
        new_user = User(
            first_name=data['firstName'],
            last_name=data['lastName'],
            email=data['email'],
            password=data['password']
        )
        db.session.add(new_user)
        db.session.commit()

        # Generate JWT token for the new user
        access_token = create_access_token(identity=data['email'])

        # Return success message and token
        return jsonify({
            'message': 'User registered successfully',
            'access_token': access_token
        }), 201

    except Exception as e:
        # Handle any exceptions and return an error message
        return jsonify({'error': str(e)}), 500
    
# Load Default Events #

@api.route('/load_default_events', methods=['POST'])
def load_default_events():
    default_events = [
        {
      "date": "02-02-2022",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel neque eros. Pellentesque pretium faucibus mattis. Phasellus faucibus non diam vitae condimentum.",
      "id": 1,
      "image": None,
      "location": "Thompsons",
      "name": "Event 01",
      "price": "20"
    },
    {
      "date": "06-08-2024",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel neque eros. Pellentesque pretium faucibus mattis. Phasellus faucibus non diam vitae condimentum.",
      "id": 2,
      "image": None,
      "location": "Laverys",
      "name": "Event 02",
      "price": "10"
    },
    {
      "date": "23-12-2024",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel neque eros. Pellentesque pretium faucibus mattis. Phasellus faucibus non diam vitae condimentum.",
      "id": 3,
      "image": None,
      "location": "Ollies",
      "name": "Event 03",
      "price": "15"
    },
    {
      "date": "05-05-2024",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel neque eros. Pellentesque pretium faucibus mattis. Phasellus faucibus non diam vitae condimentum.",
      "id": 6,
      "image": None,
      "location": "4Geeks",
      "name": "Event 04",
      "price": "35"
    },
    {
      "date": "2024-02-24",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel neque eros. Pellentesque pretium faucibus mattis. Phasellus faucibus non diam vitae condimentum.",
      "id": 7,
      "image": None,
      "location": "Voodoo",
      "name": "Event 05",
      "price": "25"
    },
    {
      "date": "2024-02-25",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel neque eros. Pellentesque pretium faucibus mattis. Phasellus faucibus non diam vitae condimentum.",
      "id": 8,
      "image": None,
      "location": "Liquor",
      "name": "Event 06",
      "price": "50"
    },
    {
      "date": "2024-03-15",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel neque eros. Pellentesque pretium faucibus mattis. Phasellus faucibus non diam vitae condimentum.",
      "id": 9,
      "image": None,
      "location": "The SSE Arena",
      "name": "Event 07",
      "price": "30"
    },
    {
      "date": "2024-04-20",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel neque eros. Pellentesque pretium faucibus mattis. Phasellus faucibus non diam vitae condimentum.",
      "id": 10,
      "image": None,
      "location": "Ulster Sports Club",
      "name": "Event 08",
      "price": "15"
    },
    {
      "date": "06-08-2024",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel neque eros. Pellentesque pretium faucibus mattis. Phasellus faucibus non diam vitae condimentum.",
      "id": 11,
      "image": None,
      "location": "Thompsons",
      "name": "Event 09",
      "price": "10"
    },
    {
      "date": "19-05-2024",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel neque eros. Pellentesque pretium faucibus mattis. Phasellus faucibus non diam vitae condimentum.",
      "id": 12,
      "image": None,
      "location": "Boneyard",
      "name": "Event 10",
      "price": "30"
    },
    {
      "date": "19-05-2024",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel neque eros. Pellentesque pretium faucibus mattis. Phasellus faucibus non diam vitae condimentum.",
      "id": 13,
      "image": None,
      "location": "Boneyard",
      "name": "Event 11",
      "price": "30"
    },
    {
      "date": "11-05-2024",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel neque eros. Pellentesque pretium faucibus mattis. Phasellus faucibus non diam vitae condimentum.",
      "id": 14,
      "image": None,
      "location": "Thompsons",
      "name": "Event 12",
      "price": "20"
    },
    ]

    for event_data in default_events:
        new_event = Event(
            name=event_data['name'],
            description=event_data['description'],
            location=event_data['location'],
            date=event_data['date'],
            price=event_data['price'],
            image=event_data.get('image')  # Assume image might not be provided
        )
        db.session.add(new_event)
    db.session.commit()

    return jsonify({"message": "Default events loaded successfully"}), 200
    
#Get All Events Route ######

@api.route('/events', methods=['GET'])
def get_events():
    # Get all events from the database
    events = Event.query.all()

    # Format events data for response
    event_list = []
    for event in events:
        event_data = {
            'id': event.id,
            'name': event.name,
            'description': event.description,
            'location': event.location,
        #    'date': event.date.strftime('%Y-%m-%d %H:%M:%S'),  # Format date as string
            'date': event.date,  # Format date as string
            'price': event.price,
            'image': event.image
        }
        event_list.append(event_data)

    # Return events data
    return jsonify({'events': event_list}), 200

# Get Single Event Route #

@api.route('/event/<int:event_id>', methods=['GET'])
def get_event(event_id):
    # Query the database for the event with the provided ID
    event = Event.query.get(event_id)
    if not event:
        return jsonify({'message': 'Event not found'}), 404

    # Format event data for response
    event_data = {
        'id': event.id,
        'name': event.name,
        'description': event.description,
        'location': event.location,
        'date': event.date,  # Assuming you want to send the date as is
        'price': event.price,
        'image': event.image
    }

    # Return event data
    return jsonify({'event': event_data}), 200

# Create Event Route #

@api.route('/create-event', methods=['POST'])
def create_event():
    data = request.json

    new_event = Event(
        name=data['name'],
        description=data['description'],
        location=data['location'],
        date=data['date'],
        price=data['price'],
        image=data['image']
    )

    # Save event to database 
    db.session.add(new_event)
    db.session.commit()

    return jsonify({'message': 'Event created successfully'}), 201

# Edit Event Route #

@api.route('/edit-event/<int:event_id>', methods=['PATCH'])
def edit_event(event_id):
    data = request.json

    event = Event.query.get(event_id)
    if not event:
        return jsonify({'message': 'Event not found'}), 404

    # Update event fields if provided in the request data
    if 'name' in data:
        event.name = data['name']
    if 'description' in data:
        event.description = data['description']
    if 'location' in data:
        event.location = data['location']
    if 'date' in data:
        event.date = data['date']
    if 'price' in data:
        event.price = data['price']
    if 'image' in data:
        event.image = data['image']

    # Commit changes to the database
    db.session.commit()

    return jsonify({'message': 'Event updated successfully'}), 200


# Delete Event Route #

@api.route('/delete-event/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    event = Event.query.get(event_id)
    if not event:
        return jsonify({'message': 'Event not found'}), 404

    # Delete the event from the database
    db.session.delete(event)
    db.session.commit()

    return jsonify({'message': 'Event deleted successfully'}), 200

