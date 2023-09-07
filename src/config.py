import os

class Config:
    """Common configurations"""
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Disable SQLAlchemy modification tracking
    PORT = int(os.environ.get('PORT', 3001))  # Set the port for the application, default is 3001
    ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"  # Determine the environment based on Flask's debug mode
    STATIC_FILE_DIR = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')  # Define the directory for static files
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:////tmp/test.db").replace("postgres://", "postgresql://")  # Set the database URL
    JWT_SECRET_KEY = os.getenv('FLASK_APP_KEY')  # Set the JWT secret key for authentication
    SQLALCHEMY_DATABASE_URI = DATABASE_URL  # Set the SQLAlchemy database URI

class DevelopmentConfig(Config):
    """Configuration settings for development"""
    DEBUG = True  # Enable debugging mode
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL').replace("postgres://", "postgresql://")  # Override the database URL for development

class TestingConfig(Config):
    """Configuration settings for testing"""
    TESTING = True  # Enable testing mode
    SQLALCHEMY_DATABASE_URI = 'sqlite:///testing.db'  # Use an SQLite database for testing

class ProductionConfig(Config):
    """Configuration settings for production"""
    DEBUG = False  # Disable debugging mode for production
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL').replace("postgres://", "postgresql://")  # Override the database URL for production

config_by_name = {
    'development': DevelopmentConfig,  # Development configuration
    'testing': TestingConfig,  # Testing configuration
    'production': ProductionConfig  # Production configuration
}
