import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";

export const Feed = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleClick = (valor) => {
    actions.saveParamSingle(valor);
    navigate("/single");
  };

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
        store.body_response.map((item, index) => (
          <div key={index} className="tarjeta card rounded-0 mt-2">
            <div className="row g-0">
              <div
                className="main-imagen col-md-5"
                style={{ backgroundImage: `url(${item.fotos[0]})` }}
              ></div>
              <div className="col-md-7 p-3">
                <div className="card-body">
                  <div onClick={() => handleClick(index)}>
                    <h4 className="card-title">{`${item.tipo_vivienda} en ${item.direccion}, ${item.provincia}, ${item.comunidad}`}</h4>
                  </div>
                  <h2 className="card-title">{`${item.precio} ${
                    item.tipo_operacion == "alquiler" ? " Euros/mes" : " Euros"
                  }`}</h2>
                  <div className="características d-lg-flex wrap justify-content-start pt-4">
                    <div className="pe-4">{`Habitaciones: ${item.habitaciones}`}</div>
                    <div className="pe-4">{`Baños: ${item.aseos}`}</div>
                    {item.piscina ? <div className="pe-4">Piscina</div> : ""}
                    {item.terraza ? <div className="pe-4">Terraza</div> : ""}
                  </div>
                  <div className="pt-4">
                    <p className="card-text">{item.descripcion}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        ""
      )}
    </div>
  );
};
