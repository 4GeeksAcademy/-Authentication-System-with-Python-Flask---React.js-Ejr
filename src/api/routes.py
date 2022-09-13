"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User , Platos, FavPlatos , Veget , Dulce
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required


api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/registro', methods=['POST'])
def set_user():
    datos = request.get_json()
    if (datos is None):
        return 'Falta información'
    if ('email' not in datos):
        return 'Falta email'
    if ('password' not in datos):
        return 'Falta Password'
    new_user = User.query.filter_by(email = datos['email']).first()
    if (new_user is None):
        new_user = User(name = datos['name'], email = datos['email'], password = datos['password'], is_active = True)
    db.session.add(new_user)
    db.session.commit()
    return 'Usuario Registrado'

@api.route("/token", methods=["POST"])
def token():
    body = request.get_json()
    user = User.query.filter_by(email=body['email']).first()
    #print(user)
    #Si no se coloca el first entrega un arreglo con 1 dato, con first entrega el dato solo
    if(user):
        #Validacion de usuario
        if(user.password== body['password']):
            #Valida, otorga token
            #expiracion = datetime.timedelta(minutes=1)
            token = create_access_token(identity=body['email'])
            return jsonify({
                "email": body['email'],
                "password": body['password'],
                "token": token
            })
        else:
            return jsonify({"mensaje": 'usuario o contraseña erroneo'})
    else:
        return jsonify({"mensaje": 'user no existe'})
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)



@api.route('/platos', methods=['GET'])
def getPlatos():
    all_platos = Platos.query.all()
    serializados = list( map( lambda platos: platos.serialize(), all_platos))
    print(all_platos)

    return jsonify({
        "mensaje": "Todos los Platos",
        "platos": serializados
    }), 200
@api.route('/veget', methods=['GET'])
def getVeget():
    all_veget = Veget.query.all()
    serializados = list( map( lambda veget: veget.serialize(), all_veget))
    print(all_veget)

    return jsonify({
        "mensaje": "Todos los Veget",
        "veget": serializados
    }), 200
@api.route('/dulce', methods=['GET'])
def getDulce():
    all_dulce = Dulce.query.all()
    serializados = list( map( lambda dulce: dulce.serialize(), all_dulce))
    print(all_dulce)

    return jsonify({
        "mensaje": "Todos los dulces",
        "dulce": serializados
    }), 200


@api.route('/platos/<int:idplatos>', methods=['GET'])
def dinamycPlatos(idplatos):
    one = Platos.query.filter_by(uid=idplatos).first()
    if(one):
        return jsonify({
            "id": idplatos,
            "platos": one.serialize()
        }), 200

    else:
        return jsonify({
                "id": idplatos,
                "platos": "not found!"
        }), 404
@api.route('/veget/<int:idveget>', methods=['GET'])
def dinamycVeget(idveget):
    one = Veget.query.filter_by(uid=idveget).first()
    if(one):
        return jsonify({
            "id": idveget,
            "veget": one.serialize()
        }), 200

    else:
        return jsonify({
                "id": idveget,
                "veget": "not found!"
        }), 404
@api.route('/dulce/<int:iddulce>', methods=['GET'])
def dinamycDulce(iddulce):
    one = Dulce.query.filter_by(uid=iddulce).first()
    if(one):
        return jsonify({
            "id": iddulce,
            "dulce": one.serialize()
        }), 200

    else:
        return jsonify({
                "id": iddulce,
                "dulce": "not found!"
        }), 404


@api.route("/favorite/platos/<int:platos_id>", methods=['POST'])
def postPlatosFav(platos_id):
    body = request.get_json() #recibir datos del usuario
    #people_id = 4
    #email = freddyloboq@gmail.com
    newFav = FavPlatos(user=body['email'], people = platos_id)
    db.session.add(newFav)
    db.session.commit()
    return "nuevo favorito agregado"


@api.route("/favorite/platos/<int:position>", methods=['DELETE'])
def deletePlatosFav(position):
    FavPlatos.query.filter(FavPlatos.id == position).delete()
    db.session.commit()
    return "favorito Eliminado"

@api.route("/favorite/veget/<int:veget_id>", methods=['POST'])
def postVegetFav(veget_id):
    body = request.get_json() #recibir datos del usuario
    #people_id = 4
    #email = freddyloboq@gmail.com
    newFav = FavPlatos(user=body['email'], people = veget_id)
    db.session.add(newFav)
    db.session.commit()
    return "nuevo favorito agregado"


@api.route("/favorite/veget/<int:position>", methods=['DELETE'])
def deleteVegetFav(position):
    FavPlatos.query.filter(FavPlatos.id == position).delete()
    db.session.commit()
    return "favorito Eliminado"

@api.route("/favorite/dulce/<int:dulce_id>", methods=['POST'])
def postDulceFav(dulce_id):
    body = request.get_json() #recibir datos del usuario
    #people_id = 4
    #email = freddyloboq@gmail.com
    newFav = FavPlatos(user=body['email'], people = dulce_id)
    db.session.add(newFav)
    db.session.commit()
    return "nuevo favorito agregado"


@api.route("/favorite/dulce/<int:position>", methods=['DELETE'])
def deleteDulceFav(position):
    FavPlatos.query.filter(FavPlatos.id == position).delete()
    db.session.commit()
    return "favorito Eliminado"