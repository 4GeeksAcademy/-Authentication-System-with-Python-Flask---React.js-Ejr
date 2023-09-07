from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

# Initialize extensions here

# CORS (Cross-Origin Resource Sharing) extension for handling cross-origin requests
cors = CORS()

# SQLAlchemy extension for database operations
db = SQLAlchemy()

# Flask-Migrate extension for database migrations
migrate = Migrate()

# Flask-Bcrypt extension for password hashing
bcrypt = Bcrypt()

# Flask-JWT-Extended extension for JSON Web Tokens (JWT) authentication
jwt = JWTManager()
