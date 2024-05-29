from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required
from .models import db, Workspace, Board
from .utils import parse_int, parse_bool
from . import api_utils
from .aws_utils import uploadFile, DEFAULT_THUMBNAIL
from .utils import get_current_millistamp

# ---------------------------------------------------------------------------- workspaces.keqqu.com/* ----------------------------------------------------------------------------

workspaces= Blueprint('workspaces', __name__, subdomain='workspaces')
@workspaces.route('/', methods=['GET'])
def handle_workspaces(): return "workspaces subdomain", 200

# -------------------------------------- /user
# get all workspaces available for the current user
# required ?workspaces=0 -- the workspaces id to get the millistamp from
# required ?boards=0 -- the workspaces id to get the millistamp from
@workspaces.route('/user', methods=['GET'])
@jwt_required()
@api_utils.endpoint_safe( content_type="application/json", required_params=("workspaces", "boards") )
def handle_workspaces_user(params):
  
  user, error= api_utils.get_user_by_identity()
  if error: return error
  
  types= (
    parse_bool(params['worskpaces']),
    parse_bool(params['boards'])
  )

  if not types[0] or types[1]: return api_utils.response(400, "no types selected")
  result={ 'workspaces':{}, 'boards':{} }

  if(types[0]):

    last= db.session.get(Workspace, user.last_workspace_id)
    result['workspaces']= {
      "last": last.serialize() if last else None,
      "owned": [v.serialize() for v in user.workspaces_owned_] if user.workspaces_owned_ else {},
      "active": [v.serialize() for v in user.workspaces_] if user.workspaces_owned_ else {},
    }
  
  if(types[1]):

    last= db.session.get(Board, user.last_board_id)
    result['boards']= {
      "last": last.serialize() if last else None,
      "owned": [v.serialize() for v in user.boards_owned_] if user.boards_owned_ else {},
      "active": [v.serialize() for v in user.boards_] if user.boards_owned_ else {},
    }
  
  return api_utils.response_200(result)

# -------------------------------------- /fetch
# get the board ids that require an update for a given 'board_id' and 'millistamp', gets everything if 'millistamp' < 0
@workspaces.route('/fetch', methods=['GET'])
@jwt_required()
@api_utils.endpoint_safe( content_type="application/json", required_props=("workspace_id", "millistamp") )
def handle_workspaces_fetch(json):
  return api_utils.response_200()

# -------------------------------------- /create
# create a workspace
@workspaces.route('/create', methods=['POST'])
@jwt_required()
def handle_workspaces_new():
  
  user, error= api_utils.get_user_by_identity()
  if error: return error

  workspace= Workspace(
    title='$default.title-workspace',
    thumbnail= DEFAULT_THUMBNAIL['workspace'],
    owner_id= user.id,
    millistamp= get_current_millistamp()
  )

  db.session.add(workspace)
  
  return api_utils.response_200()

# -------------------------------------- /list
# get workspaces lists
@workspaces.route('/list', methods=['GET'])
@jwt_required(optional=True)
def handle_workspaces_list():
  if api_utils.ENV == "prod":
    error= api_utils.check_user_forbidden(1) # check if admin if we on production
    if error: return error
  workspaces= db.query(Workspace).all()
  if not workspaces or len(workspaces)==0: return api_utils.response(204, "no workspaces")
  return api_utils.response_200([v.serialize() for v in workspaces])

# -------------------------------------- /millistamp
# get millistamp
# required ?id -- the workspaces id to get the millistamp from
# the implementation is intentional, this has to be as fast as possible
@workspaces.route('/millistamp', methods=['GET'])
def handle_workspaces_millistamp():
  try: return db.session.get(Workspace, parse_int(request.args.get("id"))).millistamp, 200, 
  except: return api_utils.response_plain(200, "-1")

# -------------------------------------- /healthcheck
# basic health check
@workspaces.route('/healthcheck', methods=['GET'])
def handle_workspaces_healthcheck():
    return "workspaces ok", 200