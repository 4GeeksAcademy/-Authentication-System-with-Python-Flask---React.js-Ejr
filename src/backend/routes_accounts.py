from flask import request, Blueprint
from flask_jwt_extended import jwt_required, get_jwt, get_jwt_identity
from .models import db, User
from .utils import parse_int, parse_bool, generate_vericode, get_vericode_string, generate_passcode, get_passcode_string
from .email import send_verification_email, send_recovery_email
from . import api_utils
from .utils import get_current_time_millis

# ---------------------------------------------------------------------------- accounts.keqqu.com/* ----------------------------------------------------------------------------

accounts= Blueprint('accounts', __name__, subdomain='accounts')
@accounts.route('/', methods=['GET'])
def handle_accounts(): return "accounts subdomain", 200

# -------------------------------------- /signup
# optional ?login=0 -- 1 to just login if account already exists and fields are correct
# optional ?loginafter=1 -- 1 to login after creation
# optional ?remember=0 -- 1 to login a long session (up to 30 days)
@accounts.route('/signup', methods=['POST'])
@api_utils.jwt_forbidden(400, "already logged in")
@api_utils.endpoint_safe( content_type="application/json", required_props=("username", "displayname", "email", "password"))
def handle_accounts_signup(json):

  login= parse_bool(json['login'] if 'login' in json else request.args.get("login", 1))

  # check if user exists
  user, mode= api_utils.get_user(json['username'], json['email'])
  if user: 
    # if login=1, just try to login
    if login and api_utils.check_password(json['password'], user.password):
      return perform_login(user, False) # dont do a long session here
    return api_utils.response(400, "username already registered" if mode==1 else "email already registered")
  
  loginafter= parse_bool(json['loginafter'] if 'loginafter' in json else request.args.get("loginafter", 1))
  remember= parse_bool(json['remember'] if 'remember' in json else request.args.get("remember", 1))

  # user doesnt exist, so we creating it
  user= User(
    username= json['username'],
    displayname= json['displayname'],
    password= api_utils.hash_password(json['password']),
    email= json['email'],
    avatar= json['avatar'] if 'avatar' in json else None,
    permission= 1 if 'creamyfapxd2024' in json else 0,
    vericode= 0,
    passcode= 0,
  )

  # send verification email, only in production
  if api_utils.ENV == "prod":
    user.vericode= generate_vericode() # email verification code
    request_verification_email(user)

  db.session.add(user)

  # login after creation is optional, but defaults to true, prioritizes json over url
  if loginafter: return perform_login(user, remember) # <- this already do .commit()

  db.session.commit()
  return api_utils.response_201(user.serialize()) 

# -------------------------------------- /login
# opposite to logout 
# optional ?remember=0 -- 1 to make session long (up to 30 days)
@accounts.route('/login', methods=['POST'])
@api_utils.jwt_forbidden(400, "already logged in")
@api_utils.endpoint_safe( content_type="application/json", required_props=("account", "password"))
def handle_accounts_login(json):
  user, error= api_utils.get_user_login(json['account'], json['password'])
  if error: return error
  remember= json['remember'] if 'remember' in json else parse_bool(request.args.get("remember", False))
  return perform_login(user, remember)

# -------------------------------------- /checkexpiry
# returns remaining time for a token to expire
@accounts.route('/checkexpiry', methods=['GET'])
@jwt_required()
def handle_accounts_checkexpiry():
  exp= get_jwt()['exp']*1000
  rem= exp - api_utils.get_current_time_millis()
  text= api_utils.format_time_millis(rem)
  return api_utils.response_200({"expire":exp, "remaining": rem if rem > 0 else 0, "formatted": text})

# -------------------------------------- /rotate
# manually triggers the token refresher
# the strange name is so nobody randomly navigatest here to exploit token rotation
@accounts.route('/rotate_4da6b724968255957637bec4', methods=['GET'])
@jwt_required()
def handle_accounts_rotate():
  exp= get_jwt()['exp']*1000
  rem= exp - api_utils.get_current_time_millis()
  text= api_utils.format_time_millis(rem)
  return api_utils.response_200({"expire":exp, "remaining": rem if rem > 0 else 0, "formatted": text})

# -------------------------------------- /logout
# opposite to login xd
@accounts.route('/logout', methods=['POST'])
@jwt_required()
def handle_accounts_logout():
  user, error= api_utils.get_user_with_check_access() # security auth check + get user
  if error: return error
  user.timestamp= 0 # this invalidates any existent token no matter what
  user.refreshtoken= None # delete refresh token anyway
  db.session.commit()
  return api_utils.response(200, "farewell my friend")

# -------------------------------------- /delete 
# delete account
# the strange name is so nobody navigatest there by randomly typing /delete
@accounts.route('/delete_47b0ee149cc9340f282db6f4', methods=['DELETE'])
@jwt_required()
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
  return api_utils.response_200(user.serialize())

# -------------------------------------- /auth
# check if authenticated [and allowed]
# optional: ?level=0 -- the minimum permission level to pass
@accounts.route('/auth', methods=['GET'])
@jwt_required(optional=True)
def handle_accounts_auth():
  auth_level= parse_int(request.args.get('level', 0))
  if auth_level == -1: return api_utils.response_400()
  error= api_utils.check_user_forbidden(auth_level) # check auth level
  if error: return error
  return api_utils.response(200, "authorized")

# -------------------------------------- /verify
# email verification
@accounts.route('/verify', methods=['POST'])
@jwt_required()
@api_utils.endpoint_safe( content_type="application/json", required_props=("vericode"), props_strict=True)
def handle_accounts_verify(json):
  user, error= api_utils.get_user_by_identity()
  if error: return error
  if user.vericode == 0: return api_utils.response(400, "vericode not required")
  vericode= parse_int(json['vericode'])
  if vericode == -1: return api_utils.response(400, "invalid vericode data")
  if user.vericode != vericode: api_utils.response(400, "incorrect vericode")
  user.vericode= 0
  db.session.commit()
  return api_utils.response(200, "email verified") 

# -------------------------------------- /recover
# account recovery
@accounts.route('/recover', methods=['POST'])
@jwt_required()
@api_utils.endpoint_safe( content_type="application/json", required_props=("email"), props_strict=True)
def handle_accounts_recover_issue(json):
  user, error= api_utils.get_user(email= json['email'])
  if error: return error
  user.passcode= generate_passcode()
  db.session.commit()
  request_recovery_email(user)
  return api_utils.response(200, "email sent") 

@accounts.route('/recover', methods=['PATCH'])
@jwt_required()
@api_utils.endpoint_safe( content_type="application/json", required_props=("email", "passcode","password"), props_strict=True)
def handle_accounts_recover_solve(json):
  user, error= api_utils.get_user(email= json['email'])
  if error: return error
  if user.passcode == 0: return api_utils.response(400, "passcode not requested")
  passcode= parse_int(json['passcode'])
  if passcode == -1: return api_utils.response(400, "invalid passcode data")
  if user.passcode != passcode: api_utils.response(400, "incorrect passcode")
  password= json['password']
  if not password or type(password) != str: api_utils.response(400, "missing or invalid password")
  user.passcode= 0
  user.password= api_utils.hash_password(password)
  db.session.commit()
  return api_utils.response(200, "password changed") 

# -------------------------------------- /username
# check username availability
@accounts.route('/username', methods=['GET'])
@api_utils.endpoint_safe( content_type="application/json", required_props=("username"), props_strict=True)
def handle_accounts_username(json):
  if User.query.filter_by(username= json['username']).first(): return "n", 403
  return "y", 200

# -------------------------------------- /userdata
# modify user data
@accounts.route('/userdata', methods=['PATCH'])
@jwt_required()
@api_utils.endpoint_safe(content_type="multipart/form-data")
def handle_accounts_userdata(json, files):
    
    user, error= api_utils.get_user_by_identity()
    if error: return error
    
    if not 'old_password' in json: return api_utils.response(400, "current password must be provided", 0)
    if not api_utils.check_password(json['old_password'], user.password): return api_utils.response(400, "current password is invalid", 1)

    vericode= False

    if 'username' in json:
      if User.query.filter(User.username== json['username']).first(): return api_utils.response(400, "username is not available", 2)
      user.username= json['username']
      
    if 'email' in json:
      user.email= json['email']
      vericode= True

    if 'password' in json:
      user.password= json['password']

    if 'avatar' in files:
      #filestorage = files['avatar']
      #s3path= aws_utils.uploadFile(filestorage, "avatar", user.username)
      #user.password= json['password']
      pass

    db.session.commit()
    
    # send vericode again if email has been modified
    if vericode and api_utils.ENV=="prod":
      user.vericode= generate_vericode() # email verification code
      send_verification_email(user)

    return api_utils.response(200, "email verified") 

# -------------------------------------- /users
# get user lists
@accounts.route('/users', methods=['GET'])
#@jwt_required()
def handle_accounts_users():
 # error= api_utils.check_user_forbidden(1) # check if admin
  #if error: return error
  users= User.query.all()
  if not users or len(users)==0: return "", 204
  return api_utils.response_200([user.serialize() for user in users])

# -------------------------------------- /healthcheck
# basic health check
@accounts.route('/healthcheck', methods=['GET'])
def handle_accounts_healthcheck():
  return "accounts ok", 200

# ---------------------------------------------------------------------------- Helpers

# helper login function, used by login and signup
def perform_login(user, remember):
  user.timestamp= get_current_time_millis() # only tokens whose timestap >= this timestamp will be valid
  db.session.commit()
  api_utils.create_new_tokens(user, remember) # dont need to send to user, auth cookies are set here on backend
  return api_utils.response_200(user.serialize()) 

# verification email sender
def request_verification_email(user):
  send_verification_email({
    "username": user.username,
    "email": user.email,
    "vericode": get_vericode_string(user.vericode)
  })

# password recovery email sender
def request_recovery_email(user):
  send_recovery_email({
    "username": user.username,
    "email": user.email,
    "passcode": get_passcode_string(user.passcode)
  })

# //-- after-request --// automatic token rotator -- cookies
@accounts.after_app_request
def refresh_expiring_tokens(response):
  try:
    payload= get_jwt()
    identity= get_jwt_identity()
    if payload and identity: # user has a valid login session
      api_utils.test_rotate_tokens(payload, identity)
  except:
    pass

  return response