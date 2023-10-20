import click
from api.models import db, User, Books, Genres
import os
import requests
"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration
with youy database, for example: Import the price of bitcoin every night as 12am
"""


def setup_commands(app):
    @app.cli.command("insert-books")  # name of our command
    def insert_books():
        # GET books
        payload = {'api-key': os.getenv("BOOK_API_KEY")}
        r = requests.get(
            'https://api.nytimes.com/svc/books/v3/lists/full-overview.json', params=payload)
        book_lists = r.json()
        all_books = []
        for best_list in book_lists['results']['lists']:
            for book in best_list['books']:
                book['genre'] = best_list['display_name']
                print(book)
                all_books.append(book)

        print(len(all_books))
        all_genres_dict = {genre.genre_name:genre.genre_id for genre in Genres.query.all()}
        # Save books
        for book in all_books:
            isbn = book['primary_isbn13']
            cover_img = book.get('book_image','')
            if not cover_img:
                cover_img = ''
            existing_book = Books.query.filter_by(isbn=isbn).first()
            if existing_book:
                existing_book.title = book['title'].title()
                existing_book.author = book['author']
                existing_book.genre = all_genres_dict[book['genre']]
                existing_book.description = book['description']
                existing_book.cover_img = cover_img
            else:
                book_obj = Books(
                    # book_id = int(book['primary_isbn13']),
                    title=book['title'].title(),
                    author=book['author'],
                    isbn=isbn,
                    genre=all_genres_dict[book['genre']],
                    description=book['description'],
                    avg_rating=0,
                    total_ratings=0,
                    cover_img= cover_img,
                    status='Available',
                )
                db.session.add(book_obj)
            db.session.commit()
            #saved_books_isbn.append(isbn)


    @app.cli.command("insert-genres")  # name of our command
    def insert_genres():
        # GET genre
        payload = {'api-key': os.getenv("BOOK_API_KEY")}
        r = requests.get(
            'https://api.nytimes.com/svc/books/v3/lists/names.json', params=payload)
        genre_json = r.json()
        genres_list = genre_json['results']
        for genre in genres_list:
            name = genre['display_name']
            existing_genre = Genres.query.filter_by(genre_name= name).first()
            if existing_genre:
               existing_genre.genre_name = name
            else:
                genre = Genres(genre_name= name)
                db.session.add(genre)
            db.session.commit()
                
    @app.cli.command("insert-users")
    def insert_users():
        users_data = [
            {
                'email': 'user1@example.com',
                'username': 'user1',
                'name': 'User1',
                'lastname': 'Lastname1',
                'password': 'password1',
                'profileimg': 'user1.jpg',
            },
        ]

        for user_data in users_data:
            existing_user = User.query.filter(User.email == user_data['email']).first()

            if existing_user:
                existing_user.email = user_data['email']
                existing_user.username = user_data['username']
                existing_user.name = user_data['name']
                existing_user.lastname = user_data['lastname']
                existing_user.password = user_data['password']
                existing_user.profileimg = user_data['profileimg']
            else:
                print(user_data)
                new_user = User(
                    email=user_data['email'],
                    username=user_data['username'],
                    name=user_data['name'],
                    lastname=user_data['lastname'],
                    password=user_data['password'],
                    profileimg=user_data['profileimg']
                )
                db.session.add(new_user)
        db.session.commit()
        print(user_data)
        
    



    """
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
   
