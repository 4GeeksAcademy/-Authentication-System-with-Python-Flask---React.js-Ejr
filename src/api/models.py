from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)  
    profile_picture = db.Column(db.String(250), nullable=False) 
    public_profile = db.Column(db.Boolean, default=False)  
    is_active = db.Column(db.Boolean, default=True)  

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # Do not serialize the password; it's a security breach
        }

class Books(db.Model):
    book_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    author = db.Column(db.String(150), nullable=False)
    isbn = db.Column(db.String(13), unique=True, nullable=False) 
    genre = db.Column(db.Integer, nullable=False ForeignKey("genre.id"))
    avg_rating = db.Column(db.Float, nullable=False) 
    total_ratings = db.Column(db.Integer, nullable=False) 
    cover_img = db.Column(db.Enum('jpg', 'png', 'gif', 'other'), nullable=False)
    status = db.Column(db.Enum('Available', 'Not Available'), nullable=False)

    def __repr__(self):
        return f'<Book {self.title}>'

    def serialize(self):
        return {
            "book_id": self.book_id,
            "title": self.title,
            "author": self.author,
            "isbn": self.isbn,
            "genre": self.genre,
            "avg_rating": self.avg_rating,
            "total_ratings": self.total_ratings, 
            "cover_img": self.cover_img,
        }


class BookGoals(db.Model):
    book_goal_id = db.Column(db.Integer, primary_key=True)
    goal_id = db.Column(db.Integer, nullable=False ForeignKey("goal.id")) 
    user_id = db.Column(db.Integer, nullable=False ForeignKey("user.id"))
    number_of_books = db.Column (db.Integer, nullable=False)
    percentage = db.Column(db.Float, nullable=False )

    def __repr__(self):
        return f'<BookGoals {self.book_goal_id}>'

    def serialize(self):
        return {
            "book_goal_id": self.book_goal_id,
            "goal_id": self.goal_id,
            "user_id": self.user_id,
            "number_of_books": self.number_of_books,
            "percentage": self.percentage
        }



class Reviews(db.Model):
    review_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False ForeignKey("user.id"))
    book_id = db.Column (db.Integer, nullable=False ForeignKey("book.id"))
    review = db.Column (db.String(200))
    rating = db.Column (db.Integer, nullable=False)

    def __repr__(self):
        return f'<Reviews {self.review_id}>'

    def serialize(self):
        return {
            "review_id": self.review_id,
            "user_id": self.user_id,
            "book_id": self.book_id,
            "review": self.review,
            "rating": self.rating
        }

class BookRecommendations(db.Model):
    recommendation_id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer, nullable=False ForeignKey("user.id"))
    user2_id = db.Column(db.Integer, nullable=False ForeignKey("user.id"))
    recommended_book_id = db.Column (db.Integer, nullable=False ForeignKey("book.id"))

    def __repr__(self):
        return f'<BookRecommendations {self.recommendation_id}>'

    def serialize(self):
        return {
            "recommendation_id": self.recommendation_id,
            "user1_id": self.user1_id,
            "user2_id": self.user2_id,
            "recommended_book_id": self.recommended_book_id,
        }

class BookSwapRequest(db.Model):
    request_id = db.Column(db.Integer, primary_key=True)
    sender_user_id = db.Column (db.Integer, nullable=False ForeignKey("user.id"))
    receiver_user_id = db.Column (db.Integer, nullable=False ForeignKey("user.id"))
    book_id = db.Column (db.Integer, nullable=False ForeignKey("book.id"))
    request_status = db.Column (db.Enum('Accepted', 'Pending', 'Rejected'), nullable=False)
    
    def __repr__(self):
        return f'<BookSwapRequest {self.request_id}>'

    def serialize(self):
        return {
            "request_id": self.request_id,
            "sender_user_id": self.sender_user_id,
            "receiver_user_id": self.receiver_user_id,
            "book_id": self.book_id,
            "request_status": self.request_status
        }
    

class Friendship(db.Model):
    friendship_id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column (db.Integer, nullable=False ForeignKey("user.id"))
    user2_id = db.Column (db.Integer, nullable=False ForeignKey("user.id"))
    friendship_status = db.Column (db.Enum('Accepted', 'Pending', 'Rejected'), nullable=False)

    def __repr__(self):
        return f'<Friendship {self.friendship_id}>'

    def serialize(self):
        return {
            "friendship_id": self.friendship_id,
            "user1_id": self.user1_id,
            "user2_id": self.user2_id,
            "friendship_status": self.friendship_status,
        }

class Wishlist(db.Model):
    wishlist_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column (db.Integer, nullable=False ForeignKey("user.id"))
    book_id = db.Column (db.Integer, nullable=False ForeignKey("book.id"))

    def __repr__(self):
        return f'<Wishlist {self.wishlist_id}>'

    def serialize(self):
        return {
            "wishlist_id": self.wishlist_id,
            "user_id": self.user_id,
            "book_id": self.book_id,
        }

class BookOwner(db.Model):
    book_owner_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column (db.Integer, nullable=False ForeignKey("user.id"))
    book_id = db.Column (db.Integer, nullable=False ForeignKey("book.id"))

    def __repr__(self):
        return f'<BookOwner {self.book_owner_id}>'

    def serialize(self):
        return {
            "book_owner_id": self.book_owner_id,
            "user_id": self.user_id,
            "book_id": self.book_id,
        }

class Genres(db.Model):
    genre_id = db.Column(db.Integer, primary_key=True)
    genre_name = db.Column(db.String(150), nullable=False)

    def __repr__(self):
        return f'<Genres {self.genre_id}>'

    def serialize(self):
        return {
            "genre_id": self.genre_id,
            "genre_name": self.genre_name,
        }