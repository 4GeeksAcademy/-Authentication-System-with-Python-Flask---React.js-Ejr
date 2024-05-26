import json, os, re, fnvhash, time
from types import SimpleNamespace
from flask import jsonify, request
from flask_jwt_extended import create_refresh_token, create_access_token, get_jwt_identity
from scrypt import hash
from . import utils
from .models import User

APP_SECRET_KEY= "una_paja_a_la_crema_es_una_buena_paja"
AUTH_TOKEN_HEADER= 'Auth-Token'

CONTENT_TYPE_JSON= {'Content-Type': 'application/json'}

# common configurable tests for endpoints, just to avoid writing it everytime
def endpoint_safe(f, shell):
  try:
    body, data= None, None
    # force content to be given type
    if 'content' in shell.options:
      content= shell.options["content"]
      if not 'Content-Type' in request.headers or not request.headers['Content-Type'] == content: return response(400, f"Content-Type is not '{content}'")
      if not request.data: return response(400, "body must contain data")
      if 'data' in shell.options: return response(400, "cannot define shell data-type if content-type is beign defined")
      if 'json' in content: body= "json"
    elif 'data' in shell.options: body= shell.options['data']
    # load data automatically
    if body=="json":
      try:
        data= request.get_json(force=True)
        if not data: return response(400, "body contains no JSON")
        shell.data["json"]= data
      except: return response(400, "body contains no valid JSON")
    # check missing or invalid properties
    if 'props' in shell.options:
      if not data: return response(400, "given required properties but no data received")
      props= shell.options["props"]
      for p in props:
        if not p in data: return response(400, f"missing required property '{p}'")
        if not data[p] or (type(data[p])== str and data[p]== ""): return response(400, f"empty required property '{p}'")
      if 'props_strict' in shell.options and len(data.keys()) > len(props): return response(400, f"data contains extra garbage properties")
    # execute the endpoint function if everything else went right
    return f(shell)
  except Exception as e:
    print(e)
    return response_500(repr(e))

# check a list of properties against data
def check_missing_properties_manual(data, props):
  for p in props:
    if not p in data:
      return f"missing required property '{p}'"
  return None

def get_shell(locals, **options): return SimpleNamespace(**{ "namespace": SimpleNamespace(**locals), "data": {}, "options": options})

def response(status:int, msg:str, data=None, debug=None) -> tuple[dict, int, dict]:
  obj= { "msg": msg }
  if data: obj['res']= data
  if debug: obj['_']= json.loads(json.dumps(debug, default=json_object_safe))
  return jsonify(obj), status, CONTENT_TYPE_JSON

def response_200(data=None, debug=None): return response(200, "ok", data, debug)
def response_201(data=None, debug=None): return response(201, "created", data, debug)
def response_400(data=None, debug=None): return response(400, "bad request", data, debug)
def response_401(data=None, debug=None): return response(401, "unauthorized", data, debug)
def response_403(data=None, debug=None): return response(403, "forbidden", data, debug)
def response_500(data=None, debug=None): return response(500, "server error", data, debug)

def json_object_safe(obj):
  dict= obj.__dict__
  return dict if dict else type(obj).__name__

# create both refresh and access tokens for a given user
def create_new_tokens(user):
  _identity= {"u":user.username, "e":user.email, "p":user.permission, "t":user.timestamp}
  return (
    create_refresh_token(identity=_identity), 
    create_access_token(identity=_identity)
  )

# rotates the tokens
def rotate_tokens(identity_, full):
  user_identity= identity_.copy()
  user_identity['t']= utils.current_millis_time()
  return (
    create_refresh_token(identity=user_identity) if full else None,
    create_access_token(identity=user_identity)
  )

# check valid access for a token and returns the user
def get_user_with_check_access(identity=None):
  if not identity: 
    identity = get_jwt_identity()
    if not identity: return None, response_401() # unauthorized -- NOT logged-in
  user= User.query.filter((User.username==identity['u'] and User.email==identity['e'])).first()
  if not user: return None, response(400, "bad token") # shouldn't ever happen
  t= parse_int(identity['t'])
  if t is None: return None, response(400, "bad timestamp") # shouldn't ever happen
  if user.timestamp==0 or t < user.timestamp: None, response(401, "expired", {"token":t, "user":user.timestamp})
  return user, None

# check valid access for a token
def check_user_forbidden(level=0):
  user_identity = get_jwt_identity()
  if not user_identity: return response_401() # unauthorized -- NOT logged-in
  _, error= get_user_with_check_access(user_identity)
  if error: return error
  if user_identity['p'] < level: return response_403() # forbidden -- NOT allowed
  return None
    
#encrypt a password
def hash_password(password):
  return hash(password, APP_SECRET_KEY)

#test a password
def check_password(input, hashed):
  if input == str(hashed): return True
  _new_hash= hash(input, APP_SECRET_KEY)
  return _new_hash == hashed

# parse an int
def parse_int(v, default=-1):
  try: return int(v) if type(v) != int else v
  except: return default

# parse a bool
def parse_bool(v, default=False):
  if type(v) == bool: return v
  if not v or v=="": return default
  if v.isnumeric(): return float(v) > .0
  return v.lower() in ('true', 'yes', 't', 'y', 'claro', 'aro', 'aha', 'mhm', 'sure', 'yep', 'yup', 'sip', 'sipi', 'dale', 'enga', 'check', '100%', 'bet', 'ok', 'k', 'letsago', 'fap', 'lemme_smash')

# gets the current time in millis, since epoch (1/1/1970)
def current_millis_time():
  return int(time.time() * 1000)

# hashes data, several levels
def fnv132(data):
  if type(data) == str: data= bytes(data, 'utf-8')
  value= fnvhash.fnv(
    data,
    2166136261,
    16777619,
    0x100000000
  )
  hexv= re.search(r"(?<=[Xx]).*$", hex(value) )[0]
  if len(hexv) < 8: hexv= "0"*(8-len(hexv))
  return hexv

def fnv164(data):
  if type(data) == str: data= bytes(data, 'utf-8')
  value= fnvhash.fnv(
    data, 
    14695981039346656037, 
    1099511628211,
    0x10000000000000000
  )
  hexv= re.search(r"(?<=[Xx]).*$", hex(value) )[0]
  if len(hexv) < 16: hexv= "0"*(16-len(hexv))
  return hexv

def fnv1128(data):
  if type(data) == str: data= bytes(data, 'utf-8')
  value= fnvhash.fnv(
    data, 
    144066263297769815596495629667062367629, 
    309485009821345068724781371,
    0x100000000000000000000000000000000
  )
  hexv= re.search(r"(?<=[Xx]).*$", hex(value) )[0]
  if len(hexv) < 32: hexv= "0"*(32-len(hexv))
  return hexv

def fnv1256(data):
  if type(data) == str: data= bytes(data, 'utf-8')
  value= fnvhash.fnv(
    data, 
    100029257958052580907070968620625704837092796014241193945225284501741471925557, 
    374144419156711147060143317175368453031918731002211,
    0x10000000000000000000000000000000000000000000000000000000000000000
  )
  hexv= re.search(r"(?<=[Xx]).*$", hex(value) )[0]
  if len(hexv) < 64: hexv= "0"*(64-len(hexv))
  return hexv

def fnv1512(data):
  if type(data) == str: data= bytes(data, 'utf-8')
  value= fnvhash.fnv(
    data, 
    9659303129496669498009435400716310466090418745672637896108374329434462657994582932197716438449813051892206539805784495328239340083876191928701583869517785, 
    35835915874844867368919076489095108449946327955754392558399825615420669938882575126094039892345713852759,
    0x100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
  )
  hexv= re.search(r"(?<=[Xx]).*$", hex(value) )[0]
  if len(hexv) < 128: hexv= "0"*(128-len(hexv))
  return hexv

def fnv11024(data):
  if type(data) == str: data= bytes(data, 'utf-8')
  value= fnvhash.fnv(
    data, 
    14197795064947621068722070641403218320880622795441933960878474914617582723252296732303717722150864096521202355549365628174669108571814760471015076148029755969804077320157692458563003215304957150157403644460363550505412711285966361610267868082893823963790439336411086884584107735010676915, 
    5016456510113118655434598811035278955030765345404790744303017523831112055108147451509157692220295382716162651878526895249385292291816524375083746691371804094271873160484737966720260389217684476157468082573,
    0x10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
  )
  hexv= re.search(r"(?<=[Xx]).*$", hex(value) )[0]
  if len(hexv) < 256: hexv= "0"*(256-len(hexv))
  return hexv