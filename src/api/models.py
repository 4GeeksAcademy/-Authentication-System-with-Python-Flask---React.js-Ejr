from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import cast, func, Float, Integer
from decimal import Decimal
db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    typeUser = db.Column(db.String(45), nullable=True)
    userName = db.Column(db.String(100), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    passWord = db.Column(db.String(100), nullable=False)
    isActive = db.Column(db.Boolean(), unique=False, nullable=False)
   
    def __repr__(self):
        return "<User %r>" % self.userName
    
    def serialize(self):
        return {
            "id": self.id,
            "typeUser": self.typeUser,
            "userName": self.userName,
            "email": self.email,
            "passWord": self.passWord,
            "isActive": self.isActive,
        }

    def add_user(_typeUser, _userName, _email, _passWord, _isActive):
        new_user = User(typeUser=_typeUser, userName=_userName, email=_email, passWord=_passWord, isActive=_isActive)
        db.session.add(new_user)
        db.session.commit()
    
    def get_user(self, _id):
        return [User.serialize(User.query.filter_by(id=_id).first())]
    
    def get_all_users(self):
        return [User.serialize(user) for user in User.query.all()]
    
    def update_user(self, _id, _typeUser, _userName, _email, _passWord, _isActive):
        user_to_update = User.query.filter_by(id=_id).first()
        user_to_update.typeUser = _typeUser if _typeUser is not None else user_to_update.typeUser
        user_to_update.userName = _userName if _userName is not None else user_to_update.userName
        user_to_update.email = _email if _email is not None else user_to_update.email        
        user_to_update.passWord = _passWord if _passWord is not None else user_to_update.passWord
        user_to_update.isActive = _isActive if _isActive is not None else user_to_update.isActive
        db.session.commit()

    def delete_user(_username):
        User.query.filter_by(userName=_username).delete()
        db.session.commit()

class Category(db.Model):
    __tablename__ = 'category'
    id = db.Column(db.Integer, primary_key=True)
    name_category = db.Column(db.String(50), nullable=True)

   def __repr__(self):
        return "<Category %r>" % self.name

class Subcategory(db.Model):
    __tablename__ = 'subcategory'
    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name_subcategory = db.Column(db.Integer, nullable=False)
    user= db.relationship('User',         
        backref=db.backref('subcategory', lazy=True, uselist=False))     


    def __repr__(self):
        return "<Subcategory %r>" % self.name

    def serialize(self):
        return {
            "id": self.id,
            "category_id": self.category_id,
            "user_id": self.user_id,
           }
    
   

class Servicios_prestados(Base):
    __tablename__ = 'servicios_prestadps'
    id = Column(Integer, primary_key=True)
    user_id = db.Column(db.String(100), nullable=True, unique=True)
    movie_id =  db.Column(db.String(50), nullable=False)
    comment_text= Column(String(250), nullable=False)

    def __repr__(self):
        return "<Comment %r>" % self.name

class Servicios_registrados(db.Model):
    #__tablename__ = 'rate'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    movie_id =  db.Column(db.String(10), db.ForeignKey('movie.id'),nullable=False)
    rate = db.Column(db.Float, nullable=False)
    year = db.Column(db.Integer, nullable=False)
    poster =  db.Column(db.String(250), nullable=False)
    title =  db.Column(db.String(250), nullable=False)
    user= db.relationship('User',
        backref=db.backref('rate', lazy=True))
    movie= db.relationship('Movie',
        backref=db.backref('rate', lazy=True))
    
    def __repr__(self):
        return "<Rate %r>" % self.rate
    
    def serialize(self):
        return {
            "Id": self.id,
            "user_id": self.user_id,
            "movie_id": self.movie_id,
            "rate": self.rate,
            "Year": self.year,
            "Poster": self.poster,
            "Title": self.title,
        }
    
    def rate_movie(self,_idUser, _idMovie, _rate, _year, _poster, _title):
        new_rate = Rate(user_id=_idUser, movie_id=_idMovie, rate=_rate, year=_year, poster=_poster, title=_title)
        db.session.add(new_rate)
        db.session.commit()

    def movies_rates_avgs():
        db.session.commit()
        #print (db.session.query(Rate.movie_id, cast(func.avg(Rate.rate), Float).\
        #            label('rate_avg')).\
        #            group_by(Rate.movie_id).all())
        return [Rate.serialize(movierateavg) for movierateavg in db.session.query(cast(0, Integer).label('id'), cast(0, Integer).label('user_id'), Rate.movie_id, cast(func.round(func.avg(Rate.rate), 1), Float).label('rate'), Rate.year, Rate.poster, Rate.title\
                     ).\
                     group_by(Rate.movie_id, Rate.year, Rate.poster, Rate.title).all()]
    
    def get_user_rates(_id):
        db.session.commit()
        return [Rate.serialize(movierate) for movierate in db.session.query(Rate.id, Rate.user_id, Rate.movie_id, cast(Rate.rate, Float).label('rate'), Rate.year, Rate.poster, Rate.title\
                     ).filter_by(user_id=_id).all()]
    


class MovieRateAVG(db.Model):
    movie_id = db.Column(db.String(10), primary_key=True)
    rate_avg = db.Column(db.Float, nullable=False)

    def serialize(self):
        return {
            "movie_id": self.movie_id,
            "rate_avg": self.rate_avg,
        }

class MovieRate(db.Model):
    movie_id = db.Column(db.String(10), primary_key=True)
    rate = db.Column(db.Float, nullable=False)

    def serialize(self):
        return {
            "movie_id": self.movie_id,
            "rate": self.rate,
        }

  
        
# ## Draw from SQLAlchemy base
# render_er(Base, 'diagram.png')

class favoritos(Base):
    __tablename__ = 'favoritos'
    id = Column(Integer, primary_key=True)
    user_id = db.Column(db.String(100), nullable=True, unique=True)
    movie_id =  db.Column(db.String(50), nullable=False)
    comment_text= Column(String(250), nullable=False)

    def __repr__(self):
        return "<Comment %r>" % self.name
 
 # def add_favorite(self, _movie_id, _user_id, year, poster, title):
    #     new_favorite = Favorites(movie_id=_movie_id, user_id=_user_id, year=year, poster=poster, title=title)
    #     db.session.add(new_favorite)
    #     db.session.commit()

    # def get_favorites_by_user(self, idUser):
    #     db.session.commit()
    #     favorites = Favorites.query.filter_by(user_id = idUser).all()
    #     return list(map(lambda favorite: favorite.serialize(), favorites))

    # def delete_favorite(_id):
    #     Favorites.query.filter_by(id=_id).delete()
    #     db.session.commit()