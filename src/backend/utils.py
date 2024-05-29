import os, re, fnvhash, random, struct, urllib3
from datetime import datetime, timezone
from flask import jsonify, url_for

class APIException(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)

#--- parse an int
def parse_int(v, default=-1):
  try: return int(v) if type(v) != int else v
  except: return default

#--- parse a bool
def parse_bool(v, default=False):
  if not v or v=="": return default
  if type(v) == bool: return v
  if type(v) == int or type(v) == float: return v > 0
  if v.isnumeric(): return float(v) > .0
  return v.lower() in ('true', 'yes', 't', 'y', 'claro', 'aro', 'aha', 'mhm', 'sure', 'yep', 'yup', 'sip', 'sipi', 'dale', 'enga', 'check', '100%', 'bet', 'ok', 'k', 'letsago', 'fap', 'lemme_smash')

#--- packs/unpacks an array of ints into a single block of bytes
def pack_array_int(arr):
  return len(arr), b''.join(struct.pack('!I', v) for v in arr)

def unpack_array_int(bytes):
  return [struct.unpack('!I', bytes[i:i+4])[0] for i in range(0, len(bytes), 4)]

#--- gets the current time in seconds, since epoch (1/1/1970)
def get_current_timestamp():
  return int(datetime.now(timezone.utc).timestamp())

#--- gets the current time in milliseconds, since epoch (1/1/1970)
def get_current_millistamp():
  return int(datetime.now(timezone.utc).timestamp()*1000)

#--- gets the passed time in seconds, since timestamp (in seconds)
def get_seconds_since(timestamp):
  return int(datetime.fromtimestamp(timestamp, tz=timezone.utc).timestamp())

#--- gets the passed time in milliseconds, since millistamp
def get_milliseconds_since(millistamp):
  return int(datetime.fromtimestamp(millistamp*.001, tz=timezone.utc).timestamp()*1000)

#--- format time strgin from timestamp (in seconds)
def format_timestamp(timestamp): return datetime.fromtimestamp(timestamp, timezone.utc).ctime()

# verification code functions
def generate_vericode():
  val= int(0xFF3266 + random.randrange(999, 35582314))
  while val > 999999:
    val= int(val-val*.863)
  return val

def get_vericode_string(num):
  val= str(num)
  size= len(val)
  if size < 6:
    val= "0"*(6-size)+val
  return val

# password recovery code functions
def generate_passcode():
  val= int(0x5Fe3aa4 + random.randrange(999, 85338214))
  while val > 99999999:
    val= int(val-val*.927)
  return val

def get_passcode_string(num):
  val= str(num)
  size= len(val)
  if size < 8:
    val= "0"*(8-size)+val
  return val

#--- hashes data, several levels
def fnv132(data, text=False):
  if type(data) == str: data= bytes(data, 'utf-8')
  value= fnvhash.fnv(
    data,
    2166136261,
    16777619,
    0x100000000
  )
  if not text: return value
  hexv= re.search(r"(?<=[Xx]).*$", hex(value) )[0]
  if len(hexv) < 8: hexv= "0"*(8-len(hexv))
  return hexv

def fnv164(data, text=False):
  if type(data) == str: data= bytes(data, 'utf-8')
  value= fnvhash.fnv(
    data, 
    14695981039346656037, 
    1099511628211,
    0x10000000000000000
  )
  if not text: return value
  hexv= re.search(r"(?<=[Xx]).*$", hex(value) )[0]
  if len(hexv) < 16: hexv= "0"*(16-len(hexv))
  return hexv

def fnv1128(data, text=False):
  if type(data) == str: data= bytes(data, 'utf-8')
  value= fnvhash.fnv(
    data, 
    144066263297769815596495629667062367629, 
    309485009821345068724781371,
    0x100000000000000000000000000000000
  )
  if not text: return value
  hexv= re.search(r"(?<=[Xx]).*$", hex(value) )[0]
  if len(hexv) < 32: hexv= "0"*(32-len(hexv))
  return hexv

def fnv1256(data, text=False):
  if type(data) == str: data= bytes(data, 'utf-8')
  value= fnvhash.fnv(
    data, 
    100029257958052580907070968620625704837092796014241193945225284501741471925557, 
    374144419156711147060143317175368453031918731002211,
    0x10000000000000000000000000000000000000000000000000000000000000000
  )
  if not text: return value
  hexv= re.search(r"(?<=[Xx]).*$", hex(value) )[0]
  if len(hexv) < 64: hexv= "0"*(64-len(hexv))
  return hexv

def fnv1512(data, text=False):
  if type(data) == str: data= bytes(data, 'utf-8')
  value= fnvhash.fnv(
    data, 
    9659303129496669498009435400716310466090418745672637896108374329434462657994582932197716438449813051892206539805784495328239340083876191928701583869517785, 
    35835915874844867368919076489095108449946327955754392558399825615420669938882575126094039892345713852759,
    0x100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
  )
  if not text: return value
  hexv= re.search(r"(?<=[Xx]).*$", hex(value) )[0]
  if len(hexv) < 128: hexv= "0"*(128-len(hexv))
  return hexv

def fnv11024(data, text=False):
  if type(data) == str: data= bytes(data, 'utf-8')
  value= fnvhash.fnv(
    data, 
    14197795064947621068722070641403218320880622795441933960878474914617582723252296732303717722150864096521202355549365628174669108571814760471015076148029755969804077320157692458563003215304957150157403644460363550505412711285966361610267868082893823963790439336411086884584107735010676915, 
    5016456510113118655434598811035278955030765345404790744303017523831112055108147451509157692220295382716162651878526895249385292291816524375083746691371804094271873160484737966720260389217684476157468082573,
    0x10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
  )
  if not text: return value
  hexv= re.search(r"(?<=[Xx]).*$", hex(value) )[0]
  if len(hexv) < 256: hexv= "0"*(256-len(hexv))
  return hexv

#-- reads a file from backend static
def read_file(url):
  http = urllib3.PoolManager(cert_reqs='CERT_NONE')
  full_url = f"{os.environ.get('PROTOCOL','https://')}{os.environ.get('SERVER_NAME')}/{url}"
  response = http.request('GET', full_url)
  return str(response.data, 'utf-8')

def _get_link(url): return [url, _get_url_color(url), parseurl(url)]

def parseurl(url):
  finds= re.findall(r"\/\/([^.]+)\.[^.]+\.[^/]+(.*)", url)
  if finds: finds= finds[0]
  if finds and len(finds) == 2: return finds[0] + ":" + finds[1]
  else: return url

def _get_url_color(url):
  if "healthcheck" in url: return "other"
  if "admin" in url: return "admin"
  if "accounts" in url: return "accounts"
  if "workspaces" in url: return "workspaces"
  if "boards" in url: return "boards"
  if "objects" in url: return "objects"
  if "api" in url: return "api"
  if url == "/": return "root"
  return "other"

def _get_method(methods):
  if "DELETE" in methods:
    return "DELETE"
  elif "POST" in methods:
    return "POST"
  elif "PATCH" in methods:
    return "PATCH"
  elif "PUT" in methods:
    return "PUT"
  return "GET"

def generate_sitemap_v2(app, entitytypes=None):
  admin_raw_link= '/admin/'
  endpoint_raw_link= []
  endpoint_raw_span= []

  for rule in app.url_map.iter_rules():
    if has_no_empty_params(rule) and not re.search(r'wipe|execute|admin', rule.endpoint):
      link= _get_link(url_for(rule.endpoint, **(rule.defaults or {})))
      if 'admin' not in link[0]:
        endpoint_raw_link.append([_get_method(rule.methods)] + link)

  admin_link= f"<p><a class=\"admin\" href=\"{admin_raw_link}\">Site admin: <span>{admin_raw_link}</span></a></p>"
  endpoint_link = "".join([f"<li><div class=\"method method-{y[0].lower()}\">{y[0]}</div><a class=\"apilink-{y[2]}\" href=\"{y[1]}\">{y[3]}</a></li>" for y in endpoint_raw_link])
  endpoint_span = "".join([f"<li><div class=\"method method-{y[0].lower()}\">{y[0]}</div>{y[3]}</li>" for y in endpoint_raw_span])

  if entitytypes:
    endpoint_link+= "".join([f"<li><div class=\"method method-get\">GET</div><a class=\"apilink-api\" href=\"{l}\">{l}</a></li>" for l in entitytypes])

  html= open("public/res/index.html").read()

  html= html.replace("%SWATCH%", os.environ.get('BOOTSTRAP_THEME', 'slate'))
  html= html.replace("%ADMIN_LINK%",admin_link)
  html= html.replace("%ENDPOINT_LINK%",endpoint_link)
  html= html.replace("%ENDPOINT_SPAN%",endpoint_span)
  html= html.replace("%TOOL_LIST%","UNA BUENA PAJA A LA CREMA")

  return html