"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Game
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/games', methods=['POST'])
def add_game():
    response_body = {}
    data = request.json

    launch_date = None
    if data.get('launch_date'):
        launch_date = datetime.strptime(data['launch_date'], '%Y-%m-%d').date()

    new_game = Game(
        name=data.get('name'),
        platform=data.get('platform'),
        genre=data.get('genre'),
        description=data.get('description'),
        launch_date=launch_date
    )
    db.session.add(new_game)
    db.session.commit()
    response_body["message"] = "Game added successfully"
    response_body["game"] = data
    return response_body , 201

@api.route('/games', methods=['GET'])
def search_games():
    response_body = {}

    # Leemos los distintos argumentos que podria traer la URL.
    name = request.args.get('name')
    platform = request.args.get('platform')
    genre = request.args.get('genre')

    # Crear la base de la consulta SQL, Si, SQL crudo.
    sql_query = "SELECT * FROM games WHERE 1=1"
    params = {}

    # Añadimos las condiciones si existe el parametro o no.
    if name:
        sql_query += " AND LOWER(name) LIKE :name"
        params['name'] = f'%{name.lower()}%'
    if platform:
        sql_query += " AND platform = :platform"
        params['platform'] = platform
    if genre:
        sql_query += " AND genre = :genre"
        params['genre'] = genre

    # Imprimir la consulta y parámetros para depuración
    print(sql_query)
    print(params)

    # Ejecutar la consulta SQL
    results = db.session.execute(sql_query, params).fetchall()

    # Convertir los resultados a JSON
    games = [
        {
            "id": row.id,
            "name": row.name,
            "platform": row.platform,
            "genre": row.genre,
            "description": row.description,
            "launch_date": row.launch_date.strftime('%Y-%m-%d') if row.launch_date else None
        }
        for row in results
    ]

    response_body["results"] = games
    return response_body, 200
