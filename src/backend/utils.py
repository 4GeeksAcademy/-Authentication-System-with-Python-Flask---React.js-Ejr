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

def generate_sitemap(app):
    links = ['/admin/']
    for rule in app.url_map.iter_rules():
        # Filter out rules we can't navigate to in a browser
        # and rules that require parameters
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            if "/admin/" not in url:
                links.append(url)

    links_html = "".join(["<li><a href='" + y + "'>" + y + "</a></li>" for y in links])
    return f"""
    <head>
        <title>-- BACKEND --</title>
        <link href="/admin/static/bootstrap/bootstrap3/swatch/slate/bootstrap.min.css?v=3.3.5" rel="stylesheet">
    </head>
    <body>
        <div style="text-align: center;">
            <p>HOST: <script>document.write('<input style="padding: 5px; width: 300px" type="text" value="'+window.location.href+'" />');</script></p>
            <ul style="text-align: left;">
                {links_html}
            </ul>
        </div>
    </body>"""

# TODO: @sopze92 swagger renderer
def display_swagger():

    html= open(url_for("/src/res/index.html"),'r').read()
    types= ["css","icon","js"]
    files= [
        [ url_for("/src/res/swagger-ui.css"), url_for("/src/res/index.css") ], 
        [ url_for("/src/res/favicon16.png"), url_for("/src/res/favicon32.png") ], 
        [ url_for("/src/res/swagger-ui-bundle.js"), url_for("/src/res/swagger-ui-standalone-preset.js"), url_for("/src/res/swagger-initializer.js") ]
    ]

    for ri in range(len(types)):
        rtype, rfiles= types[ri], files[ri]
        for ei in range(len(rfiles)):
            html= html.replace(f"%{rtype}{ei}%", rfiles[ei])

    return html
