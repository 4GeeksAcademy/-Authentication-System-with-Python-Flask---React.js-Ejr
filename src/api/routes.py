"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Transactions
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/users', methods=['POST'])
def create_user():
    data = request.json

    if not data:
        raise APIException("No data provided", status_code=400)


    username = data.get('username')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    password = data.get('password')

    if not username or not first_name or not last_name or not password:
        raise APIException("Missing required fields", status_code=400)

    # Check if the user already exists
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        raise APIException("User already exists", status_code=400)

    # Create a new user
    new_user = User(
        username=username,
        first_name=first_name,
        last_name=last_name,
        password=password
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201


# Create a route to authenticate your users and return JWT Token
# The create_access_token() function is used to actually generate the JWT
@api.route("/token", methods=["POST"])
def create_token():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    # Query your database for username and password
    user = User.query.filter_by(username=username, password=password).first()

    if user is None:
        # The user was not found on the database
        return jsonify({"msg": "Bad username or password"}), 401
    
    # Create a new token with the user id inside
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id, "username": user.username })



@api.route("/transactions", methods=["GET"])
@jwt_required()
def get_transactions():
    current_user_id = get_jwt_identity()  # Get the user ID from the JWT token

    # Query transactions for the current user
    user_transactions = Transactions.query.filter_by(user_id=current_user_id).all()

    # Serialize the transactions
    serialized_transactions = [transaction.serialize() for transaction in user_transactions]

    return jsonify(serialized_transactions), 200




@api.route('/transactions', methods=['POST'])
@jwt_required()
def create_transaction():
    data = request.json

    if not data:
        raise APIException("No data provided", status_code=400)

    user_id = data.get('user_id')
    total_price = data.get('total_price')
    products = data.get('products')
    is_cash = data.get('is_cash')
    created = data.get('created')

    if not user_id or not total_price or not products or not is_cash or not created:
        raise APIException("Missing required fields", status_code=400)

    # Create a new transaction
    new_transaction = Transactions(
        user_id=user_id,
        total_price=total_price,
        products=products,
        is_cash=is_cash,
        created=created
    )

    db.session.add(new_transaction)
    db.session.commit()

    return jsonify({"message": "Transaction added to database successfully"}), 201






