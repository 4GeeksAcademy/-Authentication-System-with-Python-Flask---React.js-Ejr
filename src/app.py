import os, sys, signal, urllib3
from datetime import timedelta

from flask import Flask, jsonify, send_from_directory, Blueprint, request, redirect
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import *

from backend.utils import APIException, generate_sitemap_v2
from backend.models import db, User
from backend.admin import setup_admin
from backend.commands import setup_commands
import backend.api_utils as api_utils

from backend.routes_accounts import accounts
from backend.routes_workspaces import workspaces
from backend.routes_boards import boards
from backend.routes_objects import objects
from backend.routes import api

ENV = "dev" if os.environ.get("FLASK_DEBUG", "0") == "1" else "prod"
static_file_dir = os.path.join( os.path.dirname( os.path.realpath(__file__)), '../public/')
#app = Flask(__name__, subdomain_matching=True)
app = Flask(__name__)
app.url_map.strict_slashes = False
app.url_map.redirect_defaults= False
print("Serving static files from: " + static_file_dir)

# config
app.url_map.default_subdomain = ""
app.config['SERVER_NAME']= os.environ.get("SERVER_NAME", "localhost.com:3001")
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URL", "sqlite:///database.db")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config["JWT_SECRET_KEY"]= os.environ.get("FLASK_APP_KEY", "la_coyuntura_de_los_afluentes_tamizados")
app.config["JWT_TOKEN_LOCATION"]= ('cookies')
app.config["JWT_COOKIE_SECURE"] = ENV == "prod" # cookies must be sent over https in production
app.config["JWT_COOKIE_DOMAIN"] = app.config['SERVER_NAME']
app.config["JWT_COOKIE_SAMESITE"] = "strict"
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)

# backend routes blueprints
app.register_blueprint(accounts, subdomain='accounts')
app.register_blueprint(workspaces, subdomain='workspaces')
app.register_blueprint(boards, subdomain='boards')
app.register_blueprint(objects, subdomain='objects')
app.register_blueprint(api, subdomain='api')

www= Blueprint('www', __name__, subdomain='www')
app.register_blueprint(www, subdomain='www')

MIGRATE = Migrate(app, db, compare_type=True)
CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'
db.init_app(app)
setup_admin(app)
setup_commands(app)

jwt = JWTManager(app)

api_utils.current_app= app

@app.before_request
def redirect_www():
  if 'www.' in request.host:
    return redirect(request.url.replace('www.', '', 1), code=301)
    
# root
@app.route('/')
def sitemap():
  print("hello")
  if ENV == "dev": return generate_sitemap_v2(app)
  return send_from_directory(static_file_dir, 'index.html')

@app.route('/reset_database')
def database_reset():
  api_utils.load_rows_from_file("res/defaults.json")
  return api_utils.response_plain(200, "ok")
  
@app.route('/clear_database')
def database_clear():
  api_utils.clear_database(True)
  return api_utils.response_plain(200, "ok")
  
@app.route('/rollback_database')
def database_rollback():
  db.session.rollback()
  db.session.commit()
  return api_utils.response_plain(200, "ok")

# basic health check
@app.route('/healthcheck', methods=['GET'])
def handle_health():
  domain= request.host.replace("www.", "") if 'www.' in request.host else request.host
  subdomains= ("accounts", "workspaces", "boards", "objects", "api")
  responses= [str(urllib3.request('GET', f"{s}.{domain}/healthcheck").data, 'utf-8') for s in subdomains]
  return "<pre>" + "\n".join([r for r in responses]) + "\nroot ok\n\nhave a nice day</pre>", 200

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

# custom override for when trying to access a auth-required endpoint with an expired token
@jwt.expired_token_loader
def handle_expired_token(jwt_header, jwt_payload):
  if jwt_payload['type'] == 'access':
    identity = jwt_payload['sub']
    user= db.session.get(User, identity['i'])
    rtoken= str(user.refreshtoken, 'utf-8') if user.refreshtoken != None else None
    if rtoken:
      fres= api_utils.response_119(user.serialize()) # session refreshed // not standard HTTP
      return api_utils.create_new_access_token(fres, identity)

  return api_utils.response_419() # session expired

# //-- after-request --// automatic token rotator -- cookies
@app.after_request
def refresh_expiring_tokens(response):
  try:
    payload= get_jwt()
    identity= get_jwt_identity()
    if payload and identity: # user has a valid login session
      api_utils.test_rotate_tokens(response, payload, identity)
  except: pass
  return response

# main
if __name__ == '__main__':
  PORT = int(os.environ.get('PORT', 3001))
  app.run(host='0.0.0.0', port=PORT, debug=True)

with app.app_context():
  if 'run' in sys.argv and len(db.engine.table_names()) == 0:
    print("\n\033[1;93mPlease initialize your DB first using \033[91mpipenv run upgrade\033[93m|\033[91mremake\n\033[0m")
    os.kill(os.getpid(), signal.SIGTERM)