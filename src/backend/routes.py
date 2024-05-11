from flask import Flask, request, jsonify, url_for, Blueprint
from backend.models import db, User
from backend.utils import generate_sitemap, APIException

root = Blueprint('root', __name__)
api = Blueprint('api', __name__)

### ROOT ROUTES

### PUBLIC /API ROUTES