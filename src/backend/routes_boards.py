from flask import request, Blueprint
from flask_jwt_extended import jwt_required
from .models import db, Board, List, Style, Tag
from .utils import parse_int, parse_bool
from . import api_utils
from .aws_utils import uploadFile, DEFAULT_THUMBNAIL
from .utils import get_current_millistamp

# ---------------------------------------------------------------------------- boards.keqqu.com/* ----------------------------------------------------------------------------

boards= Blueprint('boards', __name__, subdomain='boards')
@boards.route('/', methods=['GET'])
def handle_boards(): return "boards subdomain", 200

# -------------------------------------- /user
# get all boards available for the current user
@boards.route('/user', methods=['GET'])
@jwt_required()
def handle_workspaces_user():
  
  user, error= api_utils.get_user_by_identity()
  if error: return error

  last= db.session.get(Board, user.last_board_id)
  result= {
    "last": last.serialize() if last else None,
    "owned": [v.serialize() for v in user.boards_owned_] if user.boards_owned_ else {},
    "active": [v.serialize() for v in user.boards_] if user.boards_owned_ else {},
  }
  
  return api_utils.response_200(result)

# -------------------------------------- /get
# get the actual objects from a list of ids
@boards.route('/get', methods=['GET'])
@jwt_required(optional=True)
@api_utils.endpoint_safe( content_type="application/json", required_props=("board_id") )
def handle_boards_get(json):
  
  board, error= get_board_by_id(json['board_id'])
  if error: return error


  return api_utils.response_200()
  
# -------------------------------------- /fetch
# get the 'types' ids that require an update for a given 'board_id' and 'millistamp', gets everything if 'millistamp' < 0
@boards.route('/fetch', methods=['GET'])
@jwt_required(optional=True)
@api_utils.endpoint_safe( content_type="application/json", required_props=["board_id", "millistamp"] )
def handle_boards_fecth(json):
  
  board, error= get_board_by_id(json['board_id'])
  if error: return error
  
  # check here if board is public OR user has access to it

  millistamp= parse_int(json['millistamp'])

  _objects= { "lists": [], "styles": [], "tags": [] }
  if json['lists']: _objects['lists']= board.lists_.query.filter(List.millistamp > millistamp).all()
  if json['tags']: _objects['tags']= board.tags_.query.filter(Tag.millistamp > millistamp).all()
  if json['styles']: _objects['styles']= board.styles_.query.filter(Style.millistamp > millistamp).all()

  result= {
    "lists": [v.id for v in _objects['lists']] if _objects['lists'] else {},
    "styles": [v.id for v in _objects['styles']] if _objects['styles'] else {},
    "tags": [v.id for v in _objects['tags']] if _objects['tags'] else {}
  }

  return api_utils.response_200(result)

# -------------------------------------- /pull
# get the actual objects from a list of ids
@boards.route('/pull', methods=['GET'])
@jwt_required(optional=True)
@api_utils.endpoint_safe( content_type="application/json" )
def handle_boards_pull(json):
  result= {}
  if json['lists']: result['lists']= [db.session.get(List, i) for i in json['lists']]
  if json['tags']: result['tags']= [db.session.get(Tag, i) for i in json['tags']]
  if json['styles']: result['styles']= [db.session.get(Style, i) for i in json['styles']]
  return api_utils.response_200(result)

# -------------------------------------- /push
# replace objects on the board
@boards.route('/push', methods=['POST'])
@jwt_required(optional=True)
@api_utils.endpoint_safe( content_type="application/json" )
def handle_boards_push(json):
  result= {}

  return api_utils.response_200(result)

# -------------------------------------- /list
# get boards list
@boards.route('/list', methods=['GET'])
@jwt_required(optional=True)
def handle_boards_list():
  if api_utils.ENV == "prod":
    error= api_utils.check_user_forbidden(1) # check if admin if we on production
    if error: return error
  boards= db.session.query(Board).all()
  if not boards or len(boards)==0: return api_utils.response(204, "no boards")
  return api_utils.response_200([v.serialize() for v in boards])

# -------------------------------------- /millistamp
# get millistamp
# required ?id -- the boards id to get the millistamp from
# the implementation is intentional, this has to be as fast as possible
@boards.route('/millistamp', methods=['GET'])
def handle_boards_millistamp():
  millis= -1
  try: millis= db.session.get(Board, parse_int(request.args.get("id", -1))).millistamp
  except: return api_utils.response_plain(200, str(millis))


# -------------------------------------- /healthcheck
# basic health check
@boards.route('/healthcheck', methods=['GET'])
def handle_boards_healthcheck():
    return "boards ok", 200

# ---------------------------------------------------------------------------- HELPERS ----------------------------------------------------------------------------

def get_board_by_id(string_id):
  bid= parse_int(string_id)
  if bid == -1: return None, api_utils.response(400, "invalid id")
  board= db.session.get(Board, bid)
  if not board: return None, api_utils.response(404, "board not found")
  return board, None

def check_jwt_user_access(board):
  return True