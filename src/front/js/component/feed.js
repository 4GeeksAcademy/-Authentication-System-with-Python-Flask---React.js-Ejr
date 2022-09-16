import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";

export const Feed = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const pasarAlSingle = (index) => {
    localStorage.setItem(
      "resp_element",
      JSON.stringify(store.body_response[index])
    );
    console.log("la data ha sido guardada en localstorage");
    navigate("/single/" + store.body_response[index].id);
  };

  return (
    <div className="container-fluid feed-properties ps-0 pe-2 mt-2 mb-0">
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
            <div className="row g-0 align-items-center">
              {item.fotos.length == 0 ? (
                <div
                  onClick={() => pasarAlSingle(index)}
                  className="main-image col-md-5 py-5"
                  style={{ background: "rgb(233,238,241)", height: "40vh" }}
                >
                  <h3 className="text-center py-5">Aviso no tiene fotos</h3>
                </div>
              ) : (
                <div
                  onClick={() => pasarAlSingle(index)}
                  className="main-imagen col-md-5"
                  style={{ backgroundImage: `url(${item.fotos[0]})` }}
                ></div>
              )}
              <div className="col-md-7 p-3">
                <div className="card-body p-0">
                  <div onClick={() => pasarAlSingle(index)}>
                    <div
                      className="card-title text-primary"
                      style={{ fontSize: "1.3em" }}
                    >
                      {`${item.tipo_vivienda} en ${item.direccion}, ${item.provincia}, ${item.comunidad}`}
                    </div>
                  </div>
                  <h3 className="card-title">
                    {item.tipo_operacion == "alquiler" &&
                    store.periodo_alquiler == "por meses"
                      ? `${item.precio} Euros/mes`
                      : item.tipo_operacion == "alquiler" &&
                        store.periodo_alquiler == "por días"
                      ? `${Math.floor(item.precio / 25 + 1)} Euros/día`
                      : item.tipo_operacion == "compra"
                      ? `${item.precio} Euros`
                      : "Información no encontrada"}
                  </h3>
                  <div className="características d-lg-flex wrap justify-content-start pt-2">
                    <div className="pe-2">{`Habitaciones: ${item.habitaciones}`}</div>
                    <div className="pe-2">{`, Baños: ${item.baños}`}</div>
                    {item.piscina ? (
                      <div className="pe-2">, con Piscina</div>
                    ) : (
                      ""
                    )}
                    {item.terraza ? (
                      <div className="pe-2">, con Terraza</div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="pt-2">
                    <p className="card-text">{`${item.descripcion.slice(
                      0,
                      50
                    )}...`}</p>
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
