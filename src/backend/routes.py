from flask import Flask, request, jsonify, url_for, Blueprint
from .models import db, User
from .utils import generate_sitemap, APIException

# ---------------------------------------------------------------------------- api.keqqu.com/* ----------------------------------------------------------------------------

api= Blueprint('api', __name__, subdomain='api')
@api.route('/', methods=['GET'])
def handle_api(): return "api subdomain", 200

# -------------------------------------- /healthcheck
# basic health check
@api.route('/healthcheck', methods=['GET'])
def handle_api_healthcheck():
    return "api ok", 200