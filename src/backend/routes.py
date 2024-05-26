from flask import Flask, request, jsonify, url_for, Blueprint
from .models import db, User
from .utils import generate_sitemap, APIException

# routes are setup so we acces them through '#shit#.keqqu.com/#endpoint#' instead the classic 'www.'
# to debug that on localhost you'll need to setup some easy shit dont worry

# ----------------------------------------------------------------- ACCOUNTS

accounts= Blueprint('accounts', __name__, subdomain='accounts')
@accounts.route('/', methods=['GET'])
def handle_accounts(): return "accounts subdomain", 200

# basic health check
@accounts.route('/healthcheck', methods=['GET'])
def handle_accounts_healthcheck():
    return "accounts ok", 200

# ----------------------------------------------------------------- WORKSPACES

workspaces= Blueprint('workspaces', __name__, subdomain='workspaces')
@workspaces.route('/', methods=['GET'])
def handle_workspaces(): return "workspaces subdomain", 200

# basic health check
@workspaces.route('/healthcheck', methods=['GET'])
def handle_workspaces_healthcheck():
    return "boards ok", 200

# ----------------------------------------------------------------- BOARDS

boards= Blueprint('boards', __name__, subdomain='boards')
@boards.route('/', methods=['GET'])
def handle_boards(): return "boards subdomain", 200

# basic health check
@boards.route('/healthcheck', methods=['GET'])
def handle_boards_healthcheck():
    return "boards ok", 200

# ----------------------------------------------------------------- API

api= Blueprint('api', __name__, subdomain='api')
@api.route('/', methods=['GET'])
def handle_api(): return "api subdomain", 200

# basic health check
@api.route('/healthcheck', methods=['GET'])
def handle_api_healthcheck():
    return "api ok", 200