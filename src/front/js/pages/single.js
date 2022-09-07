import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/single.css";

export const Single = () => {
  const { store, actions } = useContext(Context);
  const singleId = store.paramSingle;
  const elemento = store.body_response[singleId];
  const [nroFoto, setNroFoto] = useState(0);

  useEffect(() => {
    actions.restoreParamSingle();
  }, []);

  const subeFoto = () => {
    if (nroFoto == elemento.fotos.length - 1) {
      setNroFoto(0);
    } else {
      setNroFoto(nroFoto + 1);
    }
  };
  const bajaFoto = () => {
    if (nroFoto == 0) {
      setNroFoto(elemento.fotos.length - 1);
    } else {
      setNroFoto(nroFoto - 1);
    }
  };

  return (
    <div
      className="contenedor-single container"
      style={{ height: "fit-content" }}
    >
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid" onClick={actions.deleteParamSingle}>
          <Link to={"/dashboard"}>
            <div className="wrap d-flex">
              <div>{"<< Volver a Búsqueda de Propiedades"}</div>
            </div>
          </Link>
        </div>
      </nav>
      <div className="contenedor-carrusel container">
        {/* ------------------------------- INICIO CARRUSEL DE FOTOS ---------------------------------- */}

        {elemento.fotos.length == 0 ? (
          "Aviso no tiene fotos"
        ) : (
          <div className="text-center">
            <div
              className="foto img-fluid"
              style={{ backgroundImage: `url(${elemento.fotos[nroFoto]})` }}
            >
              {/* <img
                style={{ height: "auto", width: "70vw" }}
                src={elemento.fotos[nroFoto]}
                alt="foto"
              /> */}
            </div>
            <div className="container leyenda-fotos mt-2 d-flex justify-content-between text-center">
              {elemento.fotos.length > 1 ? (
                <button
                  onClick={bajaFoto}
                  className="btn btn-info btn-sm text-dark"
                >
                  {"<< Anterior"}
                </button>
              ) : (
                ""
              )}
              {elemento.fotos.length > 0 ? (
                <div>{`Foto ${nroFoto + 1}`}</div>
              ) : (
                ""
              )}
              {elemento.fotos.length > 1 ? (
                <button
                  onClick={subeFoto}
                  className="btn btn-info btn-sm text-dark"
                >
                  {"Siguiente >>"}
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        )}

        {/* -------------------------------------- FIN CARRUSEL DE FOTOS ---------------------------------- */}
      </div>
      <div className="contenedor-datos container">
        <div className="card-body">
          <h5 className="card-title">{`${store.body_response[singleId].tipo_vivienda} en ${store.body_response[singleId].direccion}, ${store.body_response[singleId].provincia}, ${store.body_response[singleId].comunidad}`}</h5>
          <h2 className="card-title">{`${
            store.body_response[singleId].precio
          } ${
            store.body_response[singleId].tipo_operacion != "compra"
              ? " Euros/mes"
              : "Euros"
          }`}</h2>
          <div className="características d-lg-flex wrap justify-content-start pt-4">
            <div className="pe-4">{`Habitaciones: ${store.body_response[singleId].habitaciones}`}</div>
            <div className="pe-4">{`Baños: ${store.body_response[singleId].aseos}`}</div>
            {store.body_response[singleId].piscina ? (
              <div className="pe-4">Piscina</div>
            ) : (
              ""
            )}
            {store.body_response[singleId].terraza ? (
              <div className="pe-4">Terraza</div>
            ) : (
              ""
            )}
          </div>
          <div className="pt-4">
            <p className="card-text">
              {store.body_response[singleId].descripcion}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
