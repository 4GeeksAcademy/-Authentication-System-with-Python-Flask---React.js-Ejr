from flask import Flask, request, jsonify, url_for, Blueprint
from .models import db, User
from .utils import generate_sitemap, APIException

# routes are divided in several files, otherwhise this would get too big
# to debug endpoints with subdomains in localhost you'll need to setup some easy shit dont worry

# -------------------------------------- WORKSPACES

workspaces= Blueprint('workspaces', __name__, subdomain='workspaces')
@workspaces.route('/', methods=['GET'])
def handle_workspaces(): return "workspaces subdomain", 200

# basic health check
@workspaces.route('/healthcheck', methods=['GET'])
def handle_workspaces_healthcheck():
    return "workspaces ok", 200

# -------------------------------------- BOARDS

boards= Blueprint('boards', __name__, subdomain='boards')
@boards.route('/', methods=['GET'])
def handle_boards(): return "boards subdomain", 200

# basic health check
@boards.route('/healthcheck', methods=['GET'])
def handle_boards_healthcheck():
    return "boards ok", 200

# -------------------------------------- API

api= Blueprint('api', __name__, subdomain='api')
@api.route('/', methods=['GET'])
def handle_api(): return "api subdomain", 200

# basic health check
@api.route('/healthcheck', methods=['GET'])
def handle_api_healthcheck():
    return "api ok", 200