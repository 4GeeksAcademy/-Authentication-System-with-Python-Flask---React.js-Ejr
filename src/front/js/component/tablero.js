import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";

export const Tablero = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="col-8 col-lg-9">
      <nav className="d-flex justify-content-between">
        {/* Botones Alquiler y Compra */}
        {store.operacion == "alquiler" || store.operacion == "" ? (
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              className="nav-link active"
              type="button"
              onClick={actions.updateOperacionAlquiler}
            >
              Alquiler
            </button>
            <button
              className="nav-link"
              type="button"
              onClick={actions.updateOperacionCompra}
            >
              Compra
            </button>
          </div>
        ) : (
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              className="nav-link"
              type="button"
              onClick={actions.updateOperacionAlquiler}
            >
              Alquiler
            </button>
            <button
              className="nav-link active"
              type="button"
              onClick={actions.updateOperacionCompra}
            >
              Compra
            </button>
          </div>
        )}
        {/* Botones Listado y Mapa */}
        {store.vista == "listado" ? (
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              className="nav-link active"
              type="button"
              onClick={actions.updateVistaListado}
            >
              Listado
            </button>
            <button
              className="nav-link"
              type="button"
              onClick={actions.updateVistaMapa}
            >
              Mapa
            </button>
          </div>
        ) : (
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              className="nav-link"
              type="button"
              onClick={actions.updateVistaListado}
            >
              Listado
            </button>
            <button
              className="nav-link active"
              type="button"
              onClick={actions.updateVistaMapa}
            >
              Mapa
            </button>
          </div>
        )}
      </nav>
      {/* Renderizacion de contenido de páginas */}
      <div className="tab-content" id="nav-tabContent">
        {store.vista == "listado" &&
        (store.operacion == "alquiler" || store.operacion == "") ? (
          <div className="p-5 h1">Alquiler en Listado</div>
        ) : store.vista == "listado" && store.operacion == "compra" ? (
          <div className="p-5 h1">Compra en Listado</div>
        ) : store.vista == "mapa" && store.operacion == "compra" ? (
          <div className="p-5 h1">Compra en Mapa</div>
        ) : store.vista == "mapa" && store.operacion == "alquiler" ? (
          <div className="p-5 h1">Alquiler en Mapa</div>
        ) : (
          <div className="p-5 h1">"Elija la operacion"</div>
        )}
      </div>
    </div>
  );
};
