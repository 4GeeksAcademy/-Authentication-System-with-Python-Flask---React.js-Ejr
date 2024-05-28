from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required
from .models import db, Workspace
from .utils import parse_int
from . import api_utils

# ---------------------------------------------------------------------------- workspaces.keqqu.com/* ----------------------------------------------------------------------------

workspaces= Blueprint('workspaces', __name__, subdomain='workspaces') if api_utils.IS_PRODUCTION else Blueprint('workspaces', __name__, url_prefix='/workspaces')

@workspaces.route('/', methods=['GET'])
def handle_workspaces(): return "workspaces subdomain", 200

# -------------------------------------- /healthcheck
# basic health check
@workspaces.route('/healthcheck', methods=['GET'])
def handle_workspaces_healthcheck():
    return "workspaces ok", 200

# -------------------------------------- /millistamp
# get millistamp
# required ?id -- the workspaces id to get the millistamp from
# the implementation is intentional, this has to be as fast as possible
@workspaces.route('/millistamp', methods=['GET'])
def handle_workspaces_millistamp():
  try: return db.session.get(Workspace, parse_int(request.args.get("id", -1))).millistamp, 200, 
  except: return api_utils.response_plain(200, "-1")

# -------------------------------------- /fetch
# get all styles & tags id's that require an update for a given board and millistamp
@workspaces.route('/fetch', methods=['GET'])
@jwt_required()
@api_utils.endpoint_safe( content_type="application/json",)
def handle_workspaces_fetch(json):
  
  user, error= api_utils.get_user_by_identity()
  if error: return error

  last= db.session.get(Workspace, user.last_workspace_id)
  result= {
    "last": last.serialize() if last else None,
    "owned": [v.serialize() for v in user.workspaces_owned_],
    "all": [v.serialize() for v in user.workspaces_],
  }
  
  return api_utils.response_200(result)