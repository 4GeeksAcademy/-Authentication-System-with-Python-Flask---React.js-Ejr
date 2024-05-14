"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post, Comment, Like, Suggestion
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)



@api.route('/user', methods=['GET'])
def handle_hello():
    response_body = {
        "msg": "Hello, this is your GET /user response "
    }
    return jsonify(response_body), 200

#---------------CREACION DE UN POST --------------------
@api.route('/post', methods=['POST'])
def handle_create_post():
    data = request.json 
    if 'img' not in data or 'bodytext' not in data:
        return jsonify({"msg": "Missing data"}), 400 
    
    new_post = Post(img=data['img'], bodytext=data['bodytext'])
    db.session.add(new_post)
    db.session.commit()

    # Construir la respuesta JSON
    response_body = {
        "user": {
            "id": new_post.id,
            "img": new_post.img,
            "bodytext": new_post.bodytext,
        },
        "msg": "El segundo post fue creado por Maikel y Jose"
    }
    return jsonify(response_body), 200



#--------------------------------------------------------
@api.route('/wipeall', methods=['GET'])
def database_wipe():
    try:
        db.reflect()
        db.drop_all()
        db.session.commit()
    except Exception as e:
        return "mec", 500
    return "ok", 200