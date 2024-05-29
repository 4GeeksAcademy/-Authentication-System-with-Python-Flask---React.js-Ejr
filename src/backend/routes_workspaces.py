from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required
from .models import db, Workspace
from .utils import parse_int
from . import api_utils

# ---------------------------------------------------------------------------- workspaces.keqqu.com/* ----------------------------------------------------------------------------

workspaces= Blueprint('workspaces', __name__, subdomain='workspaces')
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

# -------------------------------------- /get
# get all workspaces available for the current user
@workspaces.route('/get', methods=['GET'])
@jwt_required()
@api_utils.endpoint_safe( content_type="application/json" )
def handle_workspaces_get(json):
  
  user, error= api_utils.get_user_by_identity()
  if error: return error

  last= db.session.get(Workspace, user.last_workspace_id)
  result= {
    "last": last.serialize() if last else None,
    "owned": [v.serialize() for v in user.workspaces_owned_] if user.workspaces_owned_ else {},
    "active": [v.serialize() for v in user.workspaces_] if user.workspaces_owned_ else {},
  }
  
  return api_utils.response_200(result)

# -------------------------------------- /fetch
# get the board ids that require an update for a given 'board_id' and 'millistamp', gets everything if 'millistamp' < 0
@workspaces.route('/fetch', methods=['GET'])
@jwt_required()
@api_utils.endpoint_safe( content_type="application/json", required_props=("workspace_id", "millistamp") )
def handle_workspaces_fetch(json):
  
  user, error= api_utils.get_user_by_identity()
  if error: return error

  workspace= db.session.get(Workspace, id)

  if not workspace: return api_utils.response(404, "invalid id" if bid == -1 else "board not found")

  last= db.session.get(Workspace, user.last_workspace_id)
  result= {
    "last": last.serialize() if last else None,
    "owned": [v.serialize() for v in user.workspaces_owned_],
    "all": [v.serialize() for v in user.workspaces_],
  }
  
  return api_utils.response_200(result)