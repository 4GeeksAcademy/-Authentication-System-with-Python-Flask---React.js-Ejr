import os
from flask import Blueprint, send_from_directory, current_app, jsonify
from api.utils import generate_sitemap

root = Blueprint('root', __name__)

@root.route('/')
def sitemap():
    """
    Serve the sitemap or index.html based on the environment.

    If the environment is 'development', it generates the sitemap dynamically.
    Otherwise, it serves the 'index.html' from the static file directory.

    :return: The sitemap or 'index.html' content.
    """
    env = current_app.config['ENV']
    static_file_dir = current_app.config['STATIC_FILE_DIR']
    if env == "development":
        return generate_sitemap(current_app._get_current_object())
    return send_from_directory(static_file_dir, 'index.html')

# This route can be used to serve any other file if needed
@root.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    """
    Serve any other file located in the static file directory if needed.

    This route allows serving files located in the static file directory based on the given path.
    If the requested file does not exist, it defaults to serving 'index.html'.

    :param path: The path to the requested file.
    :return: The content of the requested file or 'index.html' if the file does not exist.
    """
    static_file_dir = current_app.config['STATIC_FILE_DIR']

    # Check if the requested file exists
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'  # Use 'index.html' as the default file

    # Serve the requested file from the static file directory
    response = send_from_directory(static_file_dir, path)

    # Prevent caching of the response
    response.cache_control.max_age = 0

    return response

