from flask import Blueprint
from .models import db
from . import api_utils

# ---------------------------------------------------------------------------- api.keqqu.com/* ----------------------------------------------------------------------------

if api_utils.IS_PRODUCTION:
  api= Blueprint('api', __name__, subdomain='api')
else:
  api= Blueprint('api', __name__, url_prefix='/api')

@api.route('/', methods=['GET'])
def handle_api(): return "api subdomain", 200

# -------------------------------------- /healthcheck
# basic health check
@api.route('/healthcheck', methods=['GET'])
def handle_api_healthcheck():
    return "api ok", 200