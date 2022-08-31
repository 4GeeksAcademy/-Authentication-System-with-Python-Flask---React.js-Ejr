import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import { Card } from "./card.js";

export const Feed = () => {
  const { store, actions } = useContext(Context);
  const properties = store.body_response;

  return (
    <div className="container-fluid feed-properties px-0 mb-2">
      {properties.map((item) => (
        <Card
          key={item.id}
          foto={item.imagenes[0]}
          tipovivienda={item.tipo_vivienda}
          direccion={item.direccion}
          provincia={item.provincia}
          precio={item.precio}
          habitaciones={item.habitaciones}
          baños={item.baños}
          piscina={item.piscina}
          terraza={item.terraza}
          descripcion={item.descripcion}
        />
      ))}
    </div>
  );
};

{
  /* <div className="p-5 h1">{`${store.operacion} en ${store.vista}`}</div>; */
}
