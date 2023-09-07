from flask import jsonify, Blueprint
from api.models import User  # Import models if needed
from api.extensions import bcrypt
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

# Example route
@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    """
    A simple example endpoint that returns a welcome message.

    :return: A JSON response with a welcome message.
    """
    users = [user.serialize() for user in User.query.all()]
    response_body = {
        "users": users,
        "message": "Hello! I'm a message that came from the backend. Check the network tab in your browser's inspector to see the GET request."
    }
    return jsonify(response_body), 200

# Example route
@api.route('/login', methods=['POST'])
def handle_test():
    """
    Example login route for demonstrating password hashing and JWT token creation.

    :return: A JSON response with password information and an access token.
    """
    password = 'MySecr3tP4sSw0rd'
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    is_valid = bcrypt.check_password_hash(hashed_password, password)
    if is_valid:
        access_token = create_access_token(identity="user")
        return jsonify({"password": password, "hashed_password": hashed_password, "is_valid": is_valid, "access_token": access_token}), 200
    return jsonify({"message": "Invalid password."}), 401

# Protect a route with jwt_required, which will require a valid JWT to access.
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    """
    Example protected route that requires a valid JWT for access.

    :return: A JSON response with the identity of the current user.
    """
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
