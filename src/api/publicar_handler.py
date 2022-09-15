from api.models import db, User, Inmueble, Imagen, Message
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException


class Publicar_Handler:

    def registerInmuebles(self, request, pics):

        # ------------- LECTURA DE VARIABLES DEL REQUEST--------------------------------------------------------
        user_id = int(request["user_id"])
        pub_operacion = request["pub_operacion"]
        pub_comunidad = request["pub_comunidad"]
        pub_provincia = request["pub_provincia"]
        pub_municipio = request["pub_municipio"]
        pub_direccion = request["pub_direccion"]
        pub_longitude = float(request["pub_longitude"])
        pub_latitude = float(request["pub_latitude"])
        pub_descripcion = request["pub_descripcion"]
        pub_precio = int(request["pub_precio"])
        pub_vivienda = request["pub_vivienda"]
        pub_pet = bool(request["pub_pet"])
        pub_garage = bool(request["pub_garage"])
        pub_piscina = bool(request["pub_piscina"])
        pub_terraza = bool(request["pub_terraza"])
        pub_habitaciones = int(request["pub_habitaciones"])
        pub_baños = int(request["pub_baños"])
        # fotos = str(request["fotos"])
        pub_premium = bool(request["pub_premium"])
        
        # ------------- CREACION DE NUEVA INSTANCIA--------------------------------------------------------
        propiedad1 = Inmueble(user_id = user_id, tipo_operacion = pub_operacion, comunidad = pub_comunidad, provincia = pub_provincia, municipio = pub_municipio, direccion = pub_direccion, descripcion = pub_descripcion, precio = pub_precio, tipo_vivienda = pub_vivienda, habitaciones = pub_habitaciones, baños = pub_baños, pet = pub_pet, piscina = pub_piscina, terraza = pub_terraza, garage = pub_garage, latitud = pub_latitude, longitud = pub_longitude, premium = pub_premium)
        db.session.add(propiedad1)
        db.session.commit() #hasta aqui funciona bien

        # -------------  OBTENER ID DE INMUEBLE  --------------------------------------------------------
        inmuebles_all = Inmueble.query.all()
        inmuebles_selected = list(filter(lambda x: x.direccion==request["pub_direccion"] and x.tipo_operacion==request["pub_operacion"] and x.user_id==request["user_id"] , inmuebles_all))

        nuevo_inmueble_id = None
        if len(inmuebles_selected)==0:
            raise APIException('error: corregir el metodo de busqueda de id', status_code=405)
        else:
            nuevo_inmueble_id = inmuebles_selected[0].id
            for x in inmuebles_selected:
                if x.id > nuevo_inmueble_id:
                    nuevo_inmueble_id = x.id

        # ------------------ REGISTRAR IMAGENES DEL NUEVO INMUEBLE Y RESPONSE ----------------------------------
        fotos = pics
        cantidad_fotos = len(pics)

        if cantidad_fotos == 0:  
            return "inmueble sin fotos creado con el id: " + nuevo_inmueble_id
        elif cantidad_fotos > 0:  
            for x in fotos:
                imagen = Imagen(imagen_url=x, inmueble_id = nuevo_inmueble_id)
                db.session.add(imagen)
                db.session.commit()
            # return "inmueble con " + str(cantidad_fotos) + " fotos creado con el id " + str(nuevo_inmueble_id) ### usar este mensaje para pruebas
            return "se ha publicado una propiedad con " + str(cantidad_fotos) + " fotos"


