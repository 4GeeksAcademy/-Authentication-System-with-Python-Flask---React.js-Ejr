# Created by alesanchezr (GitHub: https://github.com/alesanchezr) from 4GeeksAcademy
from flask import url_for

class APIException(Exception):
    """
    Custom exception class for API errors.

    :param message: The error message.
    :param status_code: The HTTP status code for the error, default is 400 (Bad Request).
    :param payload: Additional data to include in the error response.
    """
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        """
        Convert the exception to a dictionary for JSON representation.

        :return: A dictionary containing the error message and additional data.
        """
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

def has_no_empty_params(rule):
    """
    Helper function to check if a Flask route rule has no empty parameters.

    :param rule: The Flask route rule.
    :return: True if there are no empty parameters, False otherwise.
    """
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)

def generate_sitemap(app):
    """
    Generate a sitemap for the Flask application.

    :param app: The Flask app instance.
    :return: An HTML sitemap containing links to navigable routes.
    """
    links = ['/admin/']
    for rule in app.url_map.iter_rules():
        # Filter out rules we can't navigate to in a browser
        # and rules that require parameters
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            if "/admin/" not in url:
                links.append(url)

    links_html = "".join(["<li><a href='" + y + "'>" + y + "</a></li>" for y in links])
    return """
        <div style="text-align: center;">
        <img style="max-height: 80px" src='https://storage.googleapis.com/breathecode/boilerplates/rigo-baby.jpeg' />
        <h1>Rigo welcomes you to your API!!</h1>
        <p>API HOST: <script>document.write('<input style="padding: 5px; width: 300px" type="text" value="'+window.location.href+'" />');</script></p>
        <p>Start working on your project by following the <a href="https://start.4geeksacademy.com/starters/full-stack" target="_blank">Quick Start</a></p>
        <p>Remember to specify a real endpoint path like: </p>
        <ul style="text-align: left;">"""+links_html+"</ul></div>"
