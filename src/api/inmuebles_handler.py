from api.models import db, User, Inmueble, Imagen, Message
from flask import Flask, request, jsonify, url_for, Blueprint

class Inmuebles_Handler:

    def __init__(self):
        self.inmuebles = []

    def filterInmuebles(self, data):

        # ------------- EXTRACCION DE LA BD--------------------------------------------------------
        inmuebles = Inmueble.query.all()
        
        # ------------- OPERACION------------------------------------------------------------------
        inmuebles = list(filter(lambda item: item.tipo_operacion==data["operacion"], inmuebles))

        # -------------- UBICACION ----------------------------------------------------------------
        if data["comunidad"] != "todas":
            inmuebles = list(filter(lambda item: item.comunidad==data["comunidad"], inmuebles))

        if data["provincia"] != "todas":
            inmuebles = list(filter(lambda item: item.provincia==data["provincia"], inmuebles))

        # --------------- PRECIO (filtro numerico) ------------------------------------------------
        if data["preciomin"] != 0:
            inmuebles = list(filter(lambda item: int(item.precio)>=int(data["preciomin"]), inmuebles))

        if data["preciomax"] != 999999999:
            inmuebles = list(filter(lambda item: int(item.precio)<=int(data["preciomax"]), inmuebles))

        # ---------- HABITACIONES Y BAÑOS (filtro numerico)  ---------------------------------------
        if data["habitaciones"]=="3 a más":
            inmuebles = list(filter(lambda item: int(item.habitaciones)>=3, inmuebles))
        elif data["habitaciones"]!="cualquiera":
            inmuebles = list(filter(lambda item: int(item.habitaciones)==int(data["habitaciones"]), inmuebles))

        if data["baños"]=="3 a más":
            inmuebles = list(filter(lambda item: int(item.aseos)>=3, inmuebles) )
        elif data["baños"]!="cualquiera":
            inmuebles = list(filter(lambda item: int(item.aseos)==int(data["baños"]), inmuebles))

        # -------- CARACTERISTICAS (BOOLEANOS) ------------------------------------------------------
        if data["caracteristica_garage"]==True:
            inmuebles = list(filter(lambda item: item.garage==True, inmuebles))

        if data["caracteristica_pet"]==True:
            inmuebles = list(filter(lambda item: item.pet==True, inmuebles))

        if data["caracteristica_piscina"]==True:
            inmuebles = list(filter(lambda item: item.piscina==True, inmuebles))

        if data["caracteristica_terraza"]==True:
            inmuebles = list(filter(lambda item: item.terraza==True, inmuebles))
        
        # -------------- TIPO DE VIVIENDA (ALTERNATIVOS NO EXCLUYENTES) -------------------------------------
        tipos = []

        if data["vivienda_chalet"]==True:
            tipos.append("Chalet")
        if data["vivienda_piso"]==True:
            tipos.append("Piso")
        if data["vivienda_villa"]==True:
            tipos.append("Villa")
            
        if len(tipos)!=0 and len(tipos)!=3: 
            inmuebles = list(filter(lambda item: item.tipo_vivienda in tipos, inmuebles))

        imagenes = []
        for elem in inmuebles:  # elem es un objeto
            pics = Imagen.query.filter_by(inmueble_id=elem.id) #array de objetos de imagenes del elem 
            for x in pics:
                imagenes.append(x)

        # ------------------ RESPONSE ---------------------------------------------------------------------
        inmuebles_ser = list(map(lambda item: item.serialize(), inmuebles))
        imagenes_ser = list(map(lambda item: item.serialize(), imagenes))

        response = jsonify({"inmuebles": inmuebles_ser, "imagenes": imagenes_ser})

        return response