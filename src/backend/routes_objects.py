from flask import request, jsonify, Blueprint
from .models import db, Board, Style, Tag
from .utils import parse_int
from . import api_utils

# ---------------------------------------------------------------------------- objects.keqqu.com/* ----------------------------------------------------------------------------

objects= Blueprint('objects', __name__, subdomain='objects')
@objects.route('/', methods=['GET'])
def handle_saved(): return "objects subdomain", 200

# -------------------------------------- /healthcheck
# basic health check
@objects.route('/healthcheck', methods=['GET'])
def handle_objects_healthcheck():
    return "objects ok", 200

# -------------------------------------- /fetch
# get all styles & tags id's that require an update for a given board and millistamp
@objects.route('/fetch', methods=['GET'])
@api_utils.endpoint_safe( content_type="application/json", required_props=["board_id", "millistamp"], props_strict=True )
def handle_objects_fetch(json):
  
  bid= parse_int(json['board_id'])
  millistamp= parse_int(json['millistamp'])

  board= db.session.get(Board, bid)

  styles= board.styles_.query.filter(Style.millistamp > millistamp).all()
  tags= board.tags_.query.filter(Tag.millistamp > millistamp).all()

  result= {
     "styles": [v.id for v in styles],
     "tags": [v.id for v in tags]
  }

  return api_utils.response_200(result)

# -------------------------------------- /pull
# get all styles &| tags from a list of ids
@objects.route('/pull', methods=['GET'])
@api_utils.endpoint_safe( content_type="application/json", required_props=["tags", "styles"], props_strict=True )
def handle_objects_pull(json):
  result= {}
  intags= json['tags']
  if intags and len(intags) > 0: result['tags']= [db.session.get(Tag, i) for i in intags]
  instyles= json['styles']
  if instyles and len(instyles) > 0: result['styles']= [db.session.get(Style, i) for i in instyles]
  return api_utils.response_200(result)