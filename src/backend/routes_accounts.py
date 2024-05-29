from flask import request, Blueprint, Response
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required
from .models import db, User
from .utils import parse_int, parse_bool, generate_vericode, get_vericode_string, generate_passcode, get_passcode_string
from .email import send_verification_email, send_recovery_email
from . import api_utils
from .aws_utils import uploadFile, DEFAULT_ICON, DEFAULT_THUMBNAIL
from .utils import get_current_millistamp

# ---------------------------------------------------------------------------- accounts.keqqu.com/* ----------------------------------------------------------------------------

accounts= Blueprint('accounts', __name__, subdomain='accounts')
@accounts.route('/', methods=['GET'])
def handle_accounts(): return "accounts subdomain", 200

# -------------------------------------- /healthcheck
# basic health check
@accounts.route('/healthcheck', methods=['GET'])
def handle_accounts_healthcheck():
  return "accounts ok", 200

# -------------------------------------- /signup
# optional ?login=0 -- 1 to just login if account already exists and fields are correct
# optional ?loginafter=1 -- 1 to login after creation
# optional ?remember=0 -- 1 to login a long session (up to 30 days)
@accounts.route('/signup', methods=['POST'])
@api_utils.jwt_forbidden(400, "already logged in")
@api_utils.endpoint_safe( content_type="application/json", required_props=("username", "displayname", "email", "password"))
def handle_accounts_signup(json):

  login= parse_bool(json['login'] if 'login' in json else request.args.get("login", 0))

  # check if user exists
  user, mode= api_utils.get_user(json['username'], json['email'])
  if user: 
    # if login=1, just try to login
    if login and api_utils.check_password(json['password'], user.password):
      return perform_login(Response(), user, False) # dont do a long session here
    return api_utils.response(400, "username already registered" if mode==1 else "email already registered")
  
  loginafter= parse_bool(json['loginafter'] if 'loginafter' in json else request.args.get("loginafter", 1))
  remember= parse_bool(json['remember'] if 'remember' in json else request.args.get("remember", 0))

  # user doesnt exist, so we creating it
  user= User(
    username= json['username'],
    displayname= json['displayname'],
    password= api_utils.hash_password(json['password']),
    email= json['email'],
    avatar= DEFAULT_ICON['user'],
    permission= 1 if 'creamyfapxd2024' in json else 0,
    millistamp= get_current_millistamp()
  )

  request_verification_email(user)
  db.session.add(user)

  workspace= workspace(
    title="$default.first-workspace",
    thumbnail= DEFAULT_THUMBNAIL['workspace']
  )


  # login after creation
  if loginafter: return perform_login(user, remember) # <- this already do .commit() too

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
  remember= parse_bool(json['remember'] if 'remember' in json else request.args.get("remember", 0))
  return perform_login(user, remember)

# -------------------------------------- /rotate
# manually triggers the token refresher
# the strange name is so nobody randomly navigatest here to exploit token rotation
@accounts.route('/rotate_4da6b724968255957637bec4', methods=['GET'])
@jwt_required()
def handle_accounts_rotate():
  _, error= api_utils.get_user_with_check_access() # security auth check + get user
  if error: return error
  return api_utils.current_app.refresh_expiring_tokens(Response())

# -------------------------------------- /logout
# opposite to login xd
@accounts.route('/logout', methods=['GET'])
@jwt_required()
def handle_accounts_logout():
  print("mipolla")
  user, error= api_utils.get_user_with_check_access() # security auth check + get user
  if user: return api_utils.response(401, "already logged in")
  user.refreshtoken= None # delete refresh token anyway
  db.session.commit()
  return perform_logout(user)

# -------------------------------------- /user
# get current user
@accounts.route('/user', methods=['GET'])
@jwt_required()
def handle_accounts_user_get():
  user, error= api_utils.get_user_with_check_access() # security auth check + get user
  if error: return error
  return api_utils.response_200(user.serialize())

# modify user data
@accounts.route('/user', methods=['PATCH'])
@jwt_required()
@api_utils.endpoint_safe(content_type="multipart/form-data")
def handle_accounts_user_patch(json, files):
    
    user, error= api_utils.get_user_by_identity()
    if error: return error
    
    if not 'current_password' in json: return api_utils.response(400, "current password must be provided", 0)
    if not api_utils.check_password(json['current_password'], user.password): return api_utils.response(401, "invalid password", 1)

    vericode= False

    if 'username' in json:
      if db.session.query(User).filter(User.username== json['username']).first(): return api_utils.response(403, "username is not available", 2)
      user.username= json['username']
      
    if 'email' in json:
      user.email= json['email']
      vericode= True

    if 'password' in json:
      user.password= json['password']

    if 'avatar' in files:
      filestorage = files['avatar']
      s3path= uploadFile(filestorage, "avatar", user.username)
      user.avatar= s3path
      pass

    db.session.commit()
    
    # send vericode again if email has been modified
    if vericode and api_utils.ENV=="prod":
      user.vericode= generate_vericode() # email verification code
      send_verification_email(user)

    return api_utils.response(200, "email verified") 

# -------------------------------------- /delete 
# delete account
# the strange name is so nobody navigatest there by randomly typing /delete
@accounts.route('/delete', methods=['POST'])
@jwt_required()
@api_utils.endpoint_safe( content_type="application/json", required_props=("email", "password"))
def handle_accounts_delete(json):
  user_current, error= api_utils.get_user_with_check_access() # security auth check + get user
  if error: return error
  if user_current.permission == 1: # admins can remove accounts by just typing the username/email
    user, _= api_utils.get_user_by_username_or_email(json['email'])
    if not user: return api_utils.response_404()
  else: 
    user, _= api_utils.get_user(email=json['email'])
    if user: return error
    if user_current.id != user.id: return api_utils.response_403()
  result= user.serialize()
  db.session.delete(user)
  db.session.commit()
  return api_utils.response_200(result)

# -------------------------------------- /auth
# check if authenticated [and allowed]
# optional: ?level=0 -- the minimum permission level to pass
@accounts.route('/auth', methods=['GET'])
@jwt_required(optional=True)
@api_utils.endpoint_safe()
def handle_accounts_auth():
  auth_level= parse_int(request.args.get('level', 0))
  if auth_level == -1: return api_utils.response_400()
  error= api_utils.check_user_forbidden(auth_level) # check auth level
  if error: return error
  return api_utils.response(200, "authorized")

# -------------------------------------- /verify
# email verification (request email)
@accounts.route('/verify', methods=['GET'])
@jwt_required()
@api_utils.endpoint_safe()
def handle_accounts_verify_request():
  user, error= api_utils.get_user_by_identity()
  if error: return error
  request_verification_email(user)
  return api_utils.response(200, "email sent") 

# email verification (validate code)
@accounts.route('/verify', methods=['POST'])
@jwt_required()
@api_utils.endpoint_safe( content_type="application/json", required_props=("vericode"), props_strict=True)
def handle_accounts_verify_validate(json):
  user, error= api_utils.get_user_by_identity()
  if error: return error
  if user.vericode == 0: return api_utils.response(400, "vericode not required")
  vericode= parse_int(json['vericode'])
  if vericode == -1: return api_utils.response(400, "invalid vericode data")
  if user.vericode != vericode: api_utils.response(400, "incorrect vericode")
  user.vericode= 0
  db.session.commit()
  return api_utils.response(200, "email verified") 

# -------------------------------------- /verified
# get if current user is verified
@accounts.route('/verified', methods=['GET'])
@jwt_required()
def handle_accounts_verify_check():
  user, error= api_utils.get_user_with_check_access() # security auth check + get user
  if error: return error
  return api_utils.response_200({ "status":  user.vericode == 0 })

# -------------------------------------- /recover
# account recovery (request email)
@accounts.route('/recover', methods=['GET'])
@api_utils.jwt_forbidden()
@api_utils.endpoint_safe( content_type="application/json", required_props=("email"), props_strict=True)
def handle_accounts_recover_issue(json):
  user, error= api_utils.get_user(email= json['email'])
  if error: return error
  user.passcode= generate_passcode()
  db.session.commit()
  request_recovery_email(user)
  return api_utils.response(200, "email sent")

# account recovery (submit code & password)
@accounts.route('/recover', methods=['POST'])
@api_utils.jwt_forbidden()
@api_utils.endpoint_safe( content_type="application/json", required_props=("email", "passcode", "password"), props_strict=True)
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
# check username registered
@accounts.route('/username/<name>', methods=['GET'], defaults={'name':'__name__'})
def handle_accounts_username(name):
  if db.session.query(User).filter(User.username== name).first(): return api_utils.response_plain(200, "1")
  return api_utils.response_plain(204, "0")

# -------------------------------------- /userlist
# get user lists
@accounts.route('/userlist', methods=['GET'])
@jwt_required(optional=True)
def handle_accounts_users():
  #if api_utils.ENV == "prod":
  #  error= api_utils.check_user_forbidden(1) # check if admin
  #  if error: return error
  users= User.query.all()
  if not users or len(users)==0: return api_utils.response(204, "no users")
  return api_utils.response_200([user.serialize() for user in users])

# ---------------------------------------------------------------------------- Helpers

# helper login function, used by login and signup
def perform_login(user, remember):
  user.passcode= 0 # invalidate password reset codes upon login
  db.session.commit()
  return api_utils.create_new_tokens(api_utils.response_200(user.serialize()), user, remember) # dont need to send to user, auth cookies are set here on backend

# helper logout function
def perform_logout(user):
  db.session.commit()
  return api_utils.remove_token_cookie() # dont need to send to user, auth cookies are set here on backend

# verification email sender
def request_verification_email(user):

  # send verification email, only in production
  #if api_utils.ENV == "prod":
    user.vericode= generate_vericode() # email verification code
    db.session.commit()
    
    send_verification_email({
      "username": user.username,
      "email": user.email,
      "vericode": get_vericode_string(user.vericode)
    })

# password recovery email sender
def request_recovery_email(user):

  #if api_utils.ENV == "prod":
    user.passcode= generate_passcode() # account recovery code
    db.session.commit()

    send_recovery_email({
      "username": user.username,
      "email": user.email,
      "passcode": get_passcode_string(user.passcode)
    })