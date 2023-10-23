"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint, redirect, url_for
from api.models import db, User, Books, BookGoals, BookOwner, BookRecommendations, BookSwapRequest, Friendship, Wishlist, Genres, Reviews
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import get_jwt_identity, create_access_token, jwt_required, JWTManager
from io import BytesIO
from sqlalchemy import or_


api = Blueprint('api', __name__)


# Route to register user
@api.route('/register', methods=['POST'])
def create_user():
    data = request.get_json()
    print(data)
    print(data)
    if not data:
        return jsonify({"message": "Invalid request data"}), 400
    # Check if the provided email already exists in the database
    existing_user = User.query.filter_by(email=data.get("email")).first()
    if existing_user:
        return jsonify({"message": "Email already registered"}), 401

    new_user = User(
        email=data.get("email"),
        username=data.get("username"),
        name=data.get("name"),
        lastname=data.get("lastname"),
        password=data.get("password"),
        profileimg=data.get("profileimg"),
        is_active=True
    )

    print(new_user)
    print(new_user)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created successfully"}), 201

# Route to update user


@api.route('/update_user', methods=['PUT'])
@jwt_required()
def update_user():
    data = request.get_json()
    print(data)
    user_id = get_jwt_identity()
    if user_id is None:
        return jsonify({"User not authenticated"}), 401
    user = User.query.get(user_id)
    if not data:
        return jsonify({"message": "Invalid request data"}), 400
    if data.get("email", None):
        user.email = data["email"]
    if data.get("name", None):
        user.name = data["name"]
    if data.get("lastname", None):
        user.lastname = data["lastname"]
    if data.get("profileimg", None):
        user.profileimg = data["profileimg"]
    if data.get("currentpassword", None) and data.get("newpassword", None):
        if user.password == data["currentpassword"]:
            user.password = data["newpassword"]
    print(data)
    db.session.commit()
    return jsonify({"message": "User updated successfully"}), 201

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
    return jsonify(user.serialize()), 200

# DELETE user, action deleteAccount


@api.route('/users', methods=['DELETE'])
@jwt_required()
def delete_user():
    token_user_id = get_jwt_identity()
    user = User.query.get(token_user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted successfully"}), 200
    else:
        return jsonify({"message": "User not found"}), 404

# GET all books public, action getAllBooks


@api.route('/books', methods=['GET'])
# @jwt_required()
def get_all_books():
    search_term = request.args.get('q', '')
    genre = request.args.get('genre', '')
    if genre:
        books = Books.query.filter(Books.genre == genre).filter(
            Books.author.ilike(f'%{search_term}%') | Books.title.ilike(f'%{search_term}%'))
    else:
        books = Books.query.filter(Books.author.ilike(
            f'%{search_term}%') | Books.title.ilike(f'%{search_term}%'))
    results = [book.serialize() for book in books]
    return jsonify(results), 200

# GET all genres public, action getGenres


@api.route('/genres', methods=['GET'])
# @jwt_required()
def get_all_genres():
    search_term = request.args.get('q', '')
    queryset = Genres.query.filter(Genres.genre_name.ilike(f'%{search_term}%'))
    results = [obj.serialize() for obj in queryset]
    return jsonify(results), 200

# GET a specific book public, action getBookInformationById


@api.route('/books/<int:book_id>', methods=['GET'])
# @jwt_required()
def get_book(book_id):
    book = Books.query.get(book_id)
    if book:
        return jsonify(book.serialize()), 200
    else:
        return jsonify({"Book not found"}), 404

# GET all the favorites/wishlist that belong to a current user


@api.route('/users/wishlist/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user_wishlist_by_id(user_id):

    token_user_id = get_jwt_identity()
    if user_id != token_user_id:
        return jsonify({"message": "Unauthorized access to user's wishlist"}), 403

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
    valid_wishlist = Wishlist.query.filter_by(
        user_id=user_id, book_id=book_id).first()
    if valid_wishlist:
        return jsonify({"Book is already a favorite"}), 400
    new_wishlist = Wishlist(user_id=user_id, book_id=book_id)
    db.session.add(new_wishlist)
    db.session.commit()
    return jsonify({"Book added to wishlist"}), 201


# DELETE to remove a specific book from the wishlist


@api.route('/wishlist/book/<int:book_id>', methods=['DELETE'])
@jwt_required()
def delete_wishlist_book(book_id):
    user_id = get_jwt_identity()
    if user_id is None:
        return jsonify({"User not authenticated"}), 401
    wishlist = Wishlist.query.filter_by(
        user_id=user_id, item_type='book', item_id=book_id).first()
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
    return jsonify({"Book swap request declined"}), 200


# POST to add friend, action friendshipRequest


@api.route('/friend_requests/<int:user_id>', methods=['POST'])
@jwt_required()
def add_friend_request(user_id):
    request_user_id = get_jwt_identity()
    if request_user_id is None:
        return jsonify({"User not authenticated"}), 401
    request_user = User.query.get(request_user_id)
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"User not found"}), 404
    existing_friendship = Friendship.query.filter_by(
        user1_id=request_user_id, user2_id=user_id).first()
    if existing_friendship:
        return jsonify({"Friendship already requested"}), 400
    new_request = Friendship(
        user1_id=request_user_id,
        user2_id=user_id,
        friendship_status="Pending",
    )
    db.session.add(new_request)
    db.session.commit()
    return jsonify(new_request.serialize()), 201

# GET my friendships requests, action allFriendshipRequests


@api.route('/friend_requests', methods=['GET'])
@jwt_required()
def friend_request():
    request_user_id = get_jwt_identity()
    if request_user_id is None:
        return jsonify({"User not authenticated"}), 401
    friendship_requests = Friendship.query.filter(
        Friendship.user1_id == request_user_id, Friendship.friendship_status == 'Pending').all()
    for g in friendship_requests:
        print(g.serialize())
        print(g.user2.serialize())
    results = [friendship.serialize() for friendship in friendship_requests]
    return jsonify(results), 200


# POST to accept friend request, action acceptFriendRequest
@api.route('/friend_requests/<int:request_id>/accept', methods=['POST'])
@jwt_required()
def accept_friend_request(request_id):
    user_id = get_jwt_identity()
    if user_id is None:
        return jsonify({"User not authenticated"}), 401
    friend_request = Friendship.query.get(request_id)
    if friend_request is None:
        return jsonify({"Friend request not found"}), 404
    if friend_request.user1_id != user_id:
        return jsonify({"Unauthorized to accept this request"}), 403
    friend_request.friendship_status = 'Accepted'
    db.session.commit()
    return jsonify(
        message="Friend Request Accepted",
        category="Success",
        status=200
    )

# GET my friends list, action getFriendsList


@api.route('/friends', methods=['GET'])
@jwt_required()
def get_friends():
    user_id = get_jwt_identity()
    if user_id is None:
        return jsonify({"User not authenticated"}), 401

    friends = Friendship.query.filter(
        or_((Friendship.user1_id == user_id), (Friendship.user2_id == user_id)),
        Friendship.friendship_status == 'Accepted'
    ).all()
    print(friends)
    results = [friendship.serialize() for friendship in friends]
    return jsonify(results), 200

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


# POST to get review in the database


@api.route('/books/<int:book_id>/review', methods=['POST'])
@jwt_required()
def add_review(book_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    rating = data.get('rating')
    review = data.get('review')
    new_review = Reviews(book_id=book_id, user_id=user_id,
                         rating=rating, review=review)
    db.session.add(new_review)
    db.session.commit()
    return jsonify({"message": "Review added successfully"}), 201

# GET to get average rating for a book


@api.route('/books/<int:book_id>/average_rating', methods=['GET'])
def get_average_rating(book_id):
    avg_rating = db.session.query(db.func.avg(Reviews.rating)).filter(
        Reviews.book_id == book_id).scalar()
    return jsonify({"average_rating": avg_rating}), 200


@api.route('/resetpassword', methods=['POST'])
@jwt_required()
def reset_password():
    email = get_jwt_identity()
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"message": "Invalid email or password"}), 401

    user.password = password
    db.session.commit()

    return jsonify({"msg": "success"}), 200
