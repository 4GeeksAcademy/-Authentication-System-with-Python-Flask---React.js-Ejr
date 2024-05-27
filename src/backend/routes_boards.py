from flask import request, jsonify, Blueprint
from .models import db, Board, List, Style, Tag
from .utils import parse_int
from . import api_utils

# ---------------------------------------------------------------------------- boards.keqqu.com/* ----------------------------------------------------------------------------

boards= Blueprint('boards', __name__, subdomain='boards')
@boards.route('/', methods=['GET'])
def handle_boards(): return "boards subdomain", 200

# -------------------------------------- /healthcheck
# basic health check
@boards.route('/healthcheck', methods=['GET'])
def handle_boards_healthcheck():
    return "boards ok", 200

# -------------------------------------- /timestamp
# get timestamp
# required ?id -- the boards id to get the timestamp from
# the implementation is intentional, this has to be as fast as possible
@boards.route('/timestamp', methods=['GET'])
def handle_boards_timestamp():
  try: return Board.get(parse_int(request.args.get("id", -1))).timestamp, 200
  except: return -1, 200
  
# -------------------------------------- /fetch
# get the 'types' ids that require an update for a given 'board_id' and 'timestamp', gets everything if 'timestamp' < 0
@boards.route('/fetch', methods=['POST'])
@api_utils.endpoint_safe( content_type="application/json", required_props=["board_id", "timestamp"] )
def handle_boards_fecth(json):
  
  bid= parse_int(json['board_id'])
  timestamp= parse_int(json['timestamp'])

  board= db.session.get(Board, bid)

  _objects= { "lists": [], "styles": [], "tags": [] }
  if json['lists']: _objects['lists']= board.lists_.query.filter(List.timestamp > timestamp).all()
  if json['tags']: _objects['tags']= board.tags_.query.filter(Tag.timestamp > timestamp).all()
  if json['styles']: _objects['styles']= board.styles_.query.filter(Style.timestamp > timestamp).all()

  result= {
     "lists": [v.id for v in _objects['lists']],
     "styles": [v.id for v in _objects['styles']],
     "tags": [v.id for v in _objects['tags']]
  }

  return api_utils.response_200(result)

# -------------------------------------- /pull
# get the actual objects from a list of ids
@boards.route('/pull', methods=['POST'])
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
@api_utils.endpoint_safe( content_type="application/json" )
def handle_boards_push(json):
  result= {}
  
  

  return api_utils.response_200(result)