import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import { Card } from "./card.js";

export const Feed = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid feed-properties ps-0 pe-2 mb-2">
      {typeof store.body_response === "string" ? (
        <div className="m-5 p-5">
          <h3>{store.body_response}</h3>
        </div>
      ) : Array.isArray(store.body_response) &&
        store.body_response.length == 0 ? (
        <div className="m-5 p-5">
          <h3>No se encontró propiedades, intente una búsqueda distinta</h3>
        </div>
      ) : Array.isArray(store.body_response) &&
        store.body_response.length != 0 ? (
        store.body_response.map((item) => (
          <Card
            key={item.id}
            foto={item.fotos[0]}
            tipovivienda={item.tipo_vivienda}
            direccion={item.direccion}
            provincia={item.provincia}
            comunidad={item.comunidad}
            precio={item.precio}
            habitaciones={item.habitaciones}
            baños={item.aseos}
            piscina={item.piscina}
            terraza={item.terraza}
            descripcion={item.descripcion}
            periodo={
              item.tipo_operacion == "alquiler" ? " Euros/mes" : " Euros"
            }
          />
        ))
      ) : (
        ""
      )}
    </div>
  );
};
