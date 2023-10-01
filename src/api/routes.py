"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from api.models import db, User, Books, BookGoals, BookOwner, BookRecommendations, BookSwapRequest, Friendship, Wishlist, Genres, Reviews
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import get_jwt_identity, create_access_token, jwt_required, JWTManager

api = Blueprint('api', __name__)


# Route to register user
@api.route('/register', methods=['POST'])
def create_user():
    data = request.get_json()
    if not data:
        return jsonify({"message": "Invalid request data"}), 400
    # Check if the provided email already exists in the database
    existing_user = User.query.filter_by(email=data.get("email")).first()
    if existing_user:
        return jsonify({"message": "Email already registered"}), 401
    new_user = User(
        email=data.get("email"),
        username=data.get("username"),
        password=data.get("password"),
        profile_picture=data.get("profile_picture"),
        is_active=True
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created successfully"}), 201

# Route for token
@api.route('/token', methods=['POST'])
def generate_token():
    data = request.get_json()
    if not data:
        return jsonify({"message": "Invalid request data"}), 400
    email = data.get("email")
    password = data.get("password")
    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"message": "Invalid email or password"}), 401
    access_token = create_access_token(identity=user.user_id)
    return jsonify({"access_token": access_token}), 200

# GET all users
@api.route('/users', methods=['GET'])
@jwt_required()
def get_all_users():
    users = User.query.all()
    user_list = [user.serialize() for user in users]
    return jsonify(user_list), 200

# GET one user public version
@api.route('/users/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify(user.serialize()), 200
    else:
        return jsonify({"User not found"}), 404

# GET user info
@api.route('/user_information', methods=['GET'])
@jwt_required()
def get_user_information():
    user_id = get_jwt_identity()
    if user_id is None:
        return jsonify({"User not authenticated"}), 401
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"User not found"}), 404
    return jsonify(user), 200

# DELETE user
@api.route('/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    user = User.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"User deleted successfully"}), 200
    else:
        return jsonify({"User not found"}), 404

# GET all books
@api.route('/books', methods=['GET'])
@jwt_required()
def get_all_books():
    books = Books.query.all()
    results = [book.serialize() for book in books]
    return jsonify(results), 200

# GET a specific book
@api.route('/books/<int:book_id>', methods=['GET'])
@jwt_required()
def get_book(book_id):
    book = Books.query.get(book_id)
    if book:
        return jsonify(book.serialize()), 200
    else:
        return jsonify({"Book not found"}), 404

# GET all the favorites/wishlist that belong to a current user
@api.route('/users/wishlist', methods=['GET'])
@jwt_required()
def get_user_wishlist():
    user_id = get_jwt_identity()
    wishlist = Wishlist.query.filter_by(user_id=user_id).all()
    serialized_wishlist = [book.serialize() for book in wishlist]
    return jsonify(serialized_wishlist), 200

# POST to add a book to the wishlist
@api.route('/wishlist/book/<int:book_id>', methods=['POST'])
@jwt_required()
def add_wishlist_book(book_id):
    user_id = get_jwt_identity()
    if user_id is None:
        return jsonify({"User not authenticated"}), 401
    book = Books.query.get(book_id)
    if book is None:
        return jsonify({"Book not found"}), 404
    valid_wishlist = Wishlist.query.filter_by(user_id=user_id, item_type='book', item_id=book_id).first()
    if valid_wishlist:
        return jsonify({"Book is already a favorite"}), 400
    new_wishlist = Wishlist(user_id=user_id, item_type='book', item_id=book_id)
    db.session.add(new_wishlist)
    db.session.commit()
    return jsonify({"Book planet added"}), 201

# DELETE to remove a specific book from the wishlist
@api.route('/wishlist/book/<int:book_id>', methods=['DELETE'])
@jwt_required()
def delete_wishlist_book(book_id):
    user_id = get_jwt_identity()
    if user_id is None:
        return jsonify({"User not authenticated"}), 401
    wishlist = Wishlist.query.filter_by(user_id=user_id, item_type='book', item_id=book_id).first()
    if wishlist:
        db.session.delete(wishlist)
        db.session.commit()
        return jsonify({"Wishlist book deleted"}), 200
    else:
        return jsonify({"Wishlist book not found"}), 404

# POST to accept book swap request
@api.route('/book_swap_requests/<int:request_id>/accept', methods=['POST'])
@jwt_required()
def accept_book_swap_request(request_id):
    user_id = get_jwt_identity()
    if user_id is None:
        return jsonify({"User not authenticated"}), 401
    book_swap_request = BookSwapRequest.query.get(request_id)
    if book_swap_request is None:
        return jsonify({"Book swap request not found"}), 404
    if book_swap_request.receiver_user_id != user_id:
        return jsonify({"Unauthorized to accept this request"}), 403
    book_swap_request.request_status = 'Accepted'
    db.session.commit()
    return jsonify({"Book swap request accepted"}), 200

# DELETE to decline book swap request
@api.route('/book_swap_requests/<int:request_id>/decline', methods=['DELETE'])
@jwt_required()
def decline_book_swap_request(request_id):
    user_id = get_jwt_identity()
    if user_id is None:
        return jsonify({"User not authenticated"}), 401
    book_swap_request = BookSwapRequest.query.get(request_id)
    if book_swap_request is None:
        return jsonify({"Book swap request not found"}), 404
    if book_swap_request.receiver_user_id != user_id:
        return jsonify({"Unauthorized to decline this request"}), 403
    book_swap_request.request_status = 'Rejected'
    db.session.commit()
    return jsonify({"Book swap request declined"}), 20

# GET all friends
@api.route('/friendships', methods=['GET'])
@jwt_required()
def get_all_friendships():
    friendships = Friendship.query.all()
    results = [friendship.serialize() for friendship in friendships]
    return jsonify(results), 200

# POST to accept friend request
@api.route('/friend_requests/<int:request_id>/accept', methods=['POST'])
@jwt_required()
def accept_friend_request(request_id):
    user_id = get_jwt_identity()
    if user_id is None:
        return jsonify({"User not authenticated"}), 401
    friend_request = Friendship.query.get(request_id)
    if friend_request is None:
        return jsonify({"Friend request not found"}), 404
    if friend_request.user2_id != user_id:
        return jsonify({"Unauthorized to accept this request"}), 403
    friend_request.friendship_status = 'Accepted'
    db.session.commit()
    return jsonify({"Friend request accepted"}), 200

# DELETE to decline friend request
@api.route('/friend_requests/<int:request_id>/decline', methods=['DELETE'])
@jwt_required()
def decline_friend_request(request_id):
    user_id = get_jwt_identity()
    if user_id is None:
        return jsonify({"message": "User not authenticated"}), 401
    friend_request = Friendship.query.get(request_id)
    if friend_request is None:
        return jsonify({"message": "Friend request not found"}), 404
    if friend_request.user2_id != user_id:
        return jsonify({"message": "Unauthorized to decline this request"}), 403
    friend_request.friendship_status = 'Rejected'
    db.session.commit()
    return jsonify({"message": "Friend request declined"}), 200

# POST to add recommendation to wishlist
@api.route('/recommendations/<int:recommendation_id>/accept', methods=['POST'])
@jwt_required()
def accept_book_recommendation(recommendation_id):
    user_id = get_jwt_identity()
    if user_id is None:
        return jsonify({"User not authenticated"}), 401
    recommendation = BookRecommendations.query.get(recommendation_id)
    if recommendation is None:
        return jsonify({"Book recommendation not found"}), 404
    if recommendation.user2_id != user_id:
        return jsonify({"Unauthorized to accept this recommendation"}), 403
    # Add the recommended book to the user's wishlist
    book_id = recommendation.recommended_book_id
    valid_wishlist = Wishlist.query.filter_by(user_id=user_id, item_type='book', item_id=book_id).first()
    if valid_wishlist:
        return jsonify({"Book is already a favorite"}), 400
    new_wishlist = Wishlist(user_id=user_id, item_type='book', item_id=book_id)
    db.session.add(new_wishlist)
    # Delete the recommendation after adding the book to the wishlist
    db.session.delete(recommendation)
    db.session.commit()
    return jsonify({"Book added to wishlist from recommendation"}), 200

# DELETE to decline recommendation
@api.route('/recommendations/<int:recommendation_id>/decline', methods=['DELETE'])
@jwt_required()
def decline_book_recommendation(recommendation_id):
    user_id = get_jwt_identity()
    if user_id is None:
        return jsonify({"User not authenticated"}), 401
    recommendation = BookRecommendations.query.get(recommendation_id)
    if recommendation is None:
        return jsonify({"Book recommendation not found"}), 404
    if recommendation.user2_id != user_id:
        return jsonify({"Unauthorized to decline this recommendation"}), 403
    db.session.delete(recommendation)
    db.session.commit()
    return jsonify({"Book recommendation declined"}), 200