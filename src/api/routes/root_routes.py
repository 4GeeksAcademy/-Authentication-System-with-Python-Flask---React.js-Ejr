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

# Any other endpoint will be served as a general message for an invalid endpoint
@root.route('/<path:path>', methods=['GET'])
def invalid_endpoint(path):
    """
    Handle requests to invalid endpoints by returning a JSON message with a 404 status code.

    :param path: The path that was accessed.
    :return: A JSON response with a 404 status code and an error message.
    """
    response_body = {
        "message": "Invalid endpoint",
        "path": path  # Optionally, you can include the path that was attempted to be accessed
    }
    return jsonify(response_body), 404  # 404 is the HTTP status code for "Not Found"

# This route can be used to serve any other file if needed
# @root.route('/<path:path>', methods=['GET'])
# def serve_any_other_file(path):
#     static_file_dir = current_app.config['STATIC_FILE_DIR']
#     if not os.path.isfile(os.path.join(static_file_dir, path)):
#         path = 'index.html'
#     response = send_from_directory(static_file_dir, path)
#     response.cache_control.max_age = 0  # Prevent caching
#     return response
