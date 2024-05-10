import os
from flask import Flask, request, jsonify, send_from_directory
from flask_migrate import Migrate
from backend.utils import APIException, generate_sitemap
from backend.models import db
from backend.routes import root, api
from backend.admin import setup_admin
from backend.commands import setup_commands

ENV = "dev" if os.environ.get("FLASK_DEBUG", "0") == "1" else "prod"
static_file_dir = os.path.join( os.path.dirname( os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False
print("Serving static files from: " + static_file_dir)

# config
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URL", "sqlite:////database.db")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)
setup_admin(app)
setup_commands(app)

# backend routes blueprints
app.register_blueprint(root)
app.register_blueprint(api, url_prefix='/api')

# root
@app.route('/')
def sitemap():
    if ENV == "dev": return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# basic health check
@app.route('/healthcheck', methods=['GET'])
def handle_health():
    return "ok", 200

# for every unused path
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)): path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

# error handling
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# main
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)