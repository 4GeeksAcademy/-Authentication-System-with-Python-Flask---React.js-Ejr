"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Inmueble, Imagen, Message
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/properties', methods=['POST'])
def filterInmuebles():

    # -------------- VALIDACION DEL BODY --------------------------------------------------------
    body_inmo = request.get_json()
    if body_inmo is None:
        raise APIException('error: body is empty', status_code=403)
    if body_inmo["operacion"]== "todas":
        raise APIException('error: operation was not selected', status_code=405)

    # ------------- EXTRACCION DE LA BD--------------------------------------------------------
    inmuebles = Inmueble.query.all()
    
    # ------------- OPERACION------------------------------------------------------------------
    inmuebles = list(filter(lambda item: item.tipo_operacion==body_inmo["operacion"], inmuebles))

    # -------------- UBICACION ----------------------------------------------------------------
    if body_inmo["comunidad"] != "todas":
        inmuebles = list(filter(lambda item: item.comunidad==body_inmo["comunidad"], inmuebles))

    if body_inmo["provincia"] != "todas":
        inmuebles = list(filter(lambda item: item.provincia==body_inmo["provincia"], inmuebles))

    # --------------- PRECIO (filtro numerico) ------------------------------------------------
    if body_inmo["preciomin"] != 0:
        inmuebles = list(filter(lambda item: int(item.precio)>=int(body_inmo["preciomin"]), inmuebles))

    if body_inmo["preciomax"] != 999999999:
        inmuebles = list(filter(lambda item: int(item.precio)<=int(body_inmo["preciomax"]), inmuebles))

    # ---------- HABITACIONES Y BAÑOS (filtro numerico)  ---------------------------------------
    if body_inmo["habitaciones"]=="3 a más":
        inmuebles = list(filter(lambda item: int(item.habitaciones)>=3, inmuebles))
    elif body_inmo["habitaciones"]!="cualquiera":
        inmuebles = list(filter(lambda item: int(item.habitaciones)==int(body_inmo["habitaciones"]), inmuebles))

    if body_inmo["baños"]=="3 a más":
        inmuebles = list(filter(lambda item: int(item.aseos)>=3, inmuebles) )
    elif body_inmo["baños"]!="cualquiera":
        inmuebles = list(filter(lambda item: int(item.aseos)==int(body_inmo["baños"]), inmuebles))

    # -------- CARACTERISTICAS (BOOLEANOS) ------------------------------------------------------
    if body_inmo["caracteristica_garage"]==True:
        inmuebles = list(filter(lambda item: item.garage==True, inmuebles))

    if body_inmo["caracteristica_pet"]==True:
        inmuebles = list(filter(lambda item: item.pet==True, inmuebles))

    if body_inmo["caracteristica_piscina"]==True:
        inmuebles = list(filter(lambda item: item.piscina==True, inmuebles))

    if body_inmo["caracteristica_terraza"]==True:
        inmuebles = list(filter(lambda item: item.terraza==True, inmuebles))
    
    # -------------- TIPO DE VIVIENDA (ALTERNATIVOS NO EXCLUYENTES) -------------------------------------
    tipos = []

    if body_inmo["vivienda_chalet"]==True:
        tipos.append("Chalet")
    if body_inmo["vivienda_piso"]==True:
        tipos.append("Piso")
    if body_inmo["vivienda_villa"]==True:
        tipos.append("Villa")
        
    if len(tipos)!=0 and len(tipos)!=3: 
        inmuebles = list(filter(lambda item: item.tipo_vivienda in tipos, inmuebles))

    # ------------------ RESPONSE ---------------------------------------------------------------------
    inmuebles_ser = list(map(lambda item: item.serialize(), inmuebles))
    return jsonify(inmuebles_ser), 200