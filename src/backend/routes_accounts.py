from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import jwt_required, get_jwt, get_jwt_identity
from .models import db, User
from .utils import generate_sitemap, APIException
from . import api_utils

# -------------------------------------- accounts.keqqu.com/* --------------------------------------

accounts= Blueprint('accounts', __name__, subdomain='accounts')
@accounts.route('/', methods=['GET'])
def handle_accounts(): return "accounts subdomain", 200

# -------------------------------------- /signup
# optional ?login=1 -- 1 to just login if account already exists and fields are correct
@accounts.route('/signup', methods=['POST'])
def hep_signup():
  def __endpoint__(shell):
    json= shell.data['json']
    admin= api_utils.parse_bool(json['admin'] if 'admin' in json else 0)
    user= User(
      username= json['username'],
      displayname= json['displayname'],
      password= api_utils.hash_password(json['password']),
      email= json['email'],
      avatarurl= json['avatar'] if 'avatar' in json else None,
      permission= 1 if admin else 0
    )
    login= api_utils.parse_bool(json['login'] if 'login' in json else request.args.get("login", 1))
    if not login: user.timestamp= 0
    # try login if already exists, register otherwise
    _user= User.query.filter(User.email==json['email'] or User.username==json['username']).first()
    if _user:
      if not api_utils.check_password(json['password'], _user.password):
          return api_utils.response(400, "email already registered" if _user.email==user.email else "username taken")
      if not login: return api_utils.response_200() 
      user= _user
    else:
      db.session.add(user)
      db.session.commit()
    # login in after creation is optional, but defaults to true, prioritizes json over url
    if login:
      rtoken, atoken= api_utils.create_new_tokens(user)
      if _user: return api_utils.response_200("logged-in") 
      return api_utils.response_201({**user.serialize(), "refresh_token":rtoken, "access_token":atoken }) 
    return api_utils.response_201(user.serialize()) 
  return api_utils.endpoint_safe(__endpoint__, api_utils.get_shell(locals(), content="application/json", props=["username", "displayname", "email", "password"]))

# -------------------------------------- /login
# opposite to logout 
@accounts.route('/login', methods=['POST'])
@jwt_required(optional=True)
def hep_login():
  def __endpoint__(shell):
    json= shell.data['json']
    user= User.query.filter(User.email==json['account'] or User.username==json['account']).first()
    if not user: return api_utils.response(400, "invalid username or email")
    if not api_utils.check_password(json['password'], user.password): return api_utils.response(400, "invalid password")
    user.timestamp= api_utils.current_millis_time() # only tokens whose timestap >= this timestamp will be valid
    db.session.commit()
    rtoken, atoken= api_utils.create_new_tokens(user)
    return api_utils.response_200({**user.serialize(), "refresh_token":rtoken, "access_token":atoken }) 
  return api_utils.endpoint_safe(__endpoint__, api_utils.get_shell(locals(), content="application/json", props=["account", "password"], props_strict=True))

# -------------------------------------- /rotate
# rotates (renews) the user access tokens
# optional ?full=0 -- 1 to also rotate the refresh_token
@accounts.route('/refresh', methods=['GET'])
@jwt_required(refresh=True)
def hep_refresh():
  user_identity = get_jwt_identity()
  error= api_utils.check_user_forbidden() # security auth check
  if error: return error
  full= api_utils.parse_bool(request.args.get("full", False))
  refresh_token, access_token= api_utils.rotate_tokens(user_identity, full)
  res= { "access_token": access_token }
  if refresh_token: res["refresh_token"]= refresh_token
  return api_utils.response_200(res)

# -------------------------------------- /checkexpiry
# returns remaining time for a token to expire
@accounts.route('/checkexpiry', methods=['GET'])
@jwt_required(verify_type=False)
def hep_expire():
    exp= get_jwt()['exp']*1000
    rem= exp - api_utils.current_millis_time()
    return api_utils.response_200({"expire":exp, "remaining": rem if rem > 0 else 0})

# -------------------------------------- /logout
# opposite to login xd
@accounts.route('/logout', methods=['POST'])
@jwt_required()
def hep_logout():
  user, error= api_utils.get_user_with_check_access() # security auth check + get user
  if error: return error
  user.timestamp= 0 # this invalidates all existent refresh and access tokens for this user up to this moment in time
  db.session.commit()
  return api_utils.response_200()

# -------------------------------------- /delete 
# delete account
# the strange name is so nobody enters by accident
@accounts.route('/delete_47b0ee14', methods=['DELETE'])
@jwt_required(refresh=True)
def handle_accounts_delete():
  user, error= api_utils.get_user_with_check_access() # security auth check + get user
  if error: return error
  db.session.delete(user)
  db.session.commit()
  return api_utils.response_200()

# -------------------------------------- /me
# get current user
@accounts.route('/me', methods=['GET'])
@jwt_required(optional=True)
def handle_accounts_me():
  user, error= api_utils.get_user_with_check_access() # security auth check + get user
  if error: return error
  if not user: return api_utils.response(400, "bad token") # shouldn't ever happen
  return api_utils.response_200(user.serialize())

# -------------------------------------- /allowed
# check if authenticated [and allowed]
# optional: ?level=0 -- the minimum permission level to pass
@accounts.route('/auth', methods=['GET'])
@jwt_required(optional=True)
def handle_accounts_auth():
  auth_level= api_utils.parse_int(request.args.get('level', 0))
  if auth_level == -1: return api_utils.response_400()
  error= api_utils.check_user_forbidden(auth_level) # check auth level
  if error: return error
  return api_utils.response(200, "authorized")

# -------------------------------------- /username
# check username availability
@accounts.route('/username', methods=['POST'])
def handle_accounts_username():
  def __endpoint__(shell):
    if User.query.filter_by(username= shell.data['json']['username']).first(): return "n", 403
    return "y", 200
  return api_utils.endpoint_safe(__endpoint__, api_utils.get_shell(locals(), content="application/json", props=["username"], props_strict=True))

# -------------------------------------- /users
# get user lists
@accounts.route('/users', methods=['GET'])
@jwt_required()
def handle_accounts_users():
  error= api_utils.check_user_forbidden(1) # check if admin
  if error: return error

  users= User.query.all()
  if not users or len(users)==0: return "", 204
  return api_utils.response_200([user.serialize() for user in users])

# -------------------------------------- /healthcheck
# basic health check
@accounts.route('/healthcheck', methods=['GET'])
def handle_accounts_healthcheck():
  return "accounts ok", 200