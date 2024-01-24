from flask import jsonify, url_for
import hashlib
from flask_bcrypt import Bcrypt
from openai import OpenAI
import os

client = OpenAI(api_key=os.environ.get("OPENAPI_KEY", ""))


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
        rv["message"] = self.message
        return rv


def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)


def generate_sitemap(app):
    links = ["/admin/"]
    for rule in app.url_map.iter_rules():
        # Filter out rules we can't navigate to in a browser
        # and rules that require parameters
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            if "/admin/" not in url:
                links.append(url)

    links_html = "".join(["<li><a href='" + y + "'>" + y + "</a></li>" for y in links])
    return (
        """
        <div style="text-align: center;">
        <img style="max-height: 80px" src='https://storage.googleapis.com/breathecode/boilerplates/rigo-baby.jpeg' />
        <h1>Rigo welcomes you to your API!!</h1>
        <p>API HOST: <script>document.write('<input style="padding: 5px; width: 300px" type="text" value="'+window.location.href+'" />');</script></p>
        <p>Start working on your project by following the <a href="https://start.4geeksacademy.com/starters/full-stack" target="_blank">Quick Start</a></p>
        <p>Remember to specify a real endpoint path like: </p>
        <ul style="text-align: left;">"""
        + links_html
        + "</ul></div>"
    )


def get_openai_response():
    user_messages = [
        {
            "role": "system",
            "content": """
            you are a helpful assistant, you are able to provide all the information useful for a traveler who is planning a trip. You know all the restaurants in the world, all the roads in the world, all the public transports in the world, all the activities in the world. Based on some inputs you are able to tailor and provide an itinerary based on the number of days at disposal, the number of travellers in the group, the age of the travellers, the dietary requirements, the activities suggested. You will return a JSON string.

            Example of input:

            Location: Iceland
            Group: Couple
            Age: 30years old
            Time at disposal: 7 days
            time of the year: February
            Level of fitness: good
            Dietary requirement: vegan
            Budget: 100£ per day
            """,
        },
        {
            "role": "user",
            "content": """
            Location: Iceland
            Group: Couple
            Age: 30years old
            Time at disposal: 7 days
            time of the year: February
            Level of fitness: good
            Dietary requirement: vegan
            Budget: 100£ per day
        """,
        },
    ]

    response = client.completions.create(
        model="gpt-3.5-turbo", messages=user_messages, max_tokens=1024
    )
    assistant_reply = response.choices[0].message.content
    return assistant_reply


def get_hash(string):
    return hashlib.sha256(bytes(string, "utf-8")).hexdigest()


def hash_password(password):
    try:
        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
        return hashed_password
    except Exception as e:
        print(f"Error hashing password: {e}")
        return None


def verify_password(hashed_password, password):
    return bcrypt.check_password_hash(hashed_password, password)
