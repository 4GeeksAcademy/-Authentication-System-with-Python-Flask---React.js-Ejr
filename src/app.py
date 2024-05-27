import os, sys, signal
from datetime import timedelta
from flask import Flask, jsonify, send_from_directory, Blueprint, request, redirect
from flask_migrate import Migrate
from flask_cors import CORS
from backend.utils import APIException, generate_sitemap_v2
from backend.models import db
from backend.routes_accounts import accounts
from backend.routes import workspaces, boards, api
from backend.admin import setup_admin
from backend.commands import setup_commands
from flask_jwt_extended import JWTManager

import backend.api_utils as api_utils

ENV = "dev" if os.environ.get("FLASK_DEBUG", "0") == "1" else "prod"
static_file_dir = os.path.join( os.path.dirname( os.path.realpath(__file__)), '../public/')
app = Flask(__name__, subdomain_matching=True)
app.url_map.strict_slashes = False
print("Serving static files from: " + static_file_dir)

# config
app.config['SERVER_NAME']= os.environ.get("SERVER_NAME", "localhost.com:3001")
app.url_map.default_subdomain = ""
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URL", "sqlite:///database.db")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config["JWT_SECRET_KEY"]= os.environ.get("FLASK_APP_KEY", "la_coyuntura_de_los_afluentes_tamizados")
app.config["JWT_TOKEN_LOCATION"]= ('cookies')
app.config["JWT_COOKIE_SECURE"] = ENV == "prod" # cookies must be sent over https in production
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=15)

# backend routes blueprints
app.register_blueprint(accounts, subdomain='accounts')
app.register_blueprint(workspaces, subdomain='workspaces')
app.register_blueprint(boards, subdomain='boards')
app.register_blueprint(api, subdomain='api')

www= Blueprint('www', __name__, subdomain='www')
app.register_blueprint(www, subdomain='www')

MIGRATE = Migrate(app, db, compare_type=True)
CORS(app)
db.init_app(app)
setup_admin(app)
setup_commands(app)

jwt = JWTManager(app)

api_utils.current_app= app

@app.before_request
def redirect_www():
    """Redirect www requests to non-www."""
    urlparts = request.host.split('.')
    if urlparts[0].lower() == 'www':
        new_url = request.url.replace('www.', '', 1)
        return redirect(new_url, code=301)
    
# root
@app.route('/')
def sitemap():
  if ENV == "dev": return generate_sitemap_v2(app)
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

# custom override for when no valid token given on a jwt_required() endpoint
@jwt.unauthorized_loader
def handle_missing_required_jwt(header):
  return api_utils.response_401()

# main
if __name__ == '__main__':
  PORT = int(os.environ.get('PORT', 3001))
  app.run(host='0.0.0.0', port=PORT, debug=True)

with app.app_context():
  if 'run' in sys.argv and len(db.engine.table_names()) == 0:
    print("\n\033[1;93mPlease initialize your DB first using \033[91mpipenv run upgrade\033[93m|\033[91mremake\n\033[0m")
    os.kill(os.getpid(), signal.SIGTERM)