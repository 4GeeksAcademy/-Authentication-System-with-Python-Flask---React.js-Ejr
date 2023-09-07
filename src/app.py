import os
from flask import Flask, jsonify
from api.utils import APIException
from api.routes import api, root  # Make sure to import the new Blueprint
from api.admin import setup_admin
from api.commands import setup_commands
from api.extensions import cors, db, migrate, bcrypt, jwt

from config import config_by_name  # Import the configurations

def create_app(config_name='development'):
    """
    Create and configure the Flask application.

    :param config_name: The name of the configuration to use, default is 'development'.
    :return: The configured Flask app.
    """
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])  # Use the corresponding configuration object

    # Configuration to allow or disallow trailing slashes in URLs
    app.url_map.strict_slashes = False

    initialize_extensions(app)
    register_blueprints(app)
    setup_error_handlers(app)

    return app

def initialize_extensions(app):
    """
    Initialize various extensions for the Flask app.

    :param app: The Flask app instance.
    """
    # Configure CORS
    cors.init_app(app)

    # Configure the database
    db.init_app(app)
    migrate.init_app(app, db)

    # Configure admin
    setup_admin(app)

    # Configure custom commands
    setup_commands(app)
    
    # Configure bcrypt for password hashing
    bcrypt.init_app(app)

    # Configure JSON Web Tokens (JWT) for authentication
    jwt.init_app(app)

def register_blueprints(app):
    """
    Register Flask Blueprints with the app.

    :param app: The Flask app instance.
    """
    app.register_blueprint(api, url_prefix='/api')
    app.register_blueprint(root)

def setup_error_handlers(app):
    """
    Setup error handling for API exceptions.

    :param app: The Flask app instance.
    """
    @app.errorhandler(APIException)
    def handle_invalid_usage(error):
        return jsonify(error.to_dict()), error.status_code

if __name__ == '__main__':
    config_name = os.getenv('FLASK_CONFIG', 'development')  # You can set the FLASK_CONFIG environment variable
    app = create_app(config_name)
    PORT = app.config.get('PORT', 3001)  # Use the PORT configuration from the app's configuration object
    app.run(host='0.0.0.0', port=PORT, debug=app.config.get('DEBUG', True))
