import React, { useContext } from "react";
import { Context } from "../store/appContext";
// import "../../styles/home.css";

export const Dashboard = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container d-flex">
      {/* ----------------------------------------- */}
      {/* A partir de aqui el lateral de filtros    */}
      {/* ----------------------------------------- */}
      <div className="col-3">
        <div className="contenedor-filtros container rounded-3 col-10 bg-light">
          <div className="titulo container ps-4 py-3">
            <h2>Criterios de Búsqueda</h2>
          </div>
          <div className="filtros container py-4">
            {/* comunidad */}
            <div className="row align-items-center pb-5">
              <select
                onChange={actions.updateComunidad}
                className="form-select"
                aria-label="Default select example"
                defaultValue={"<comunidad autónoma>"}
              >
                <option className="text-center" disabled>
                  {"<comunidad autónoma>"}
                </option>
                {store.listacomunidades.map((item) => {
                  let comunidad = Object.keys(item);
                  return <option className="">{comunidad}</option>;
                })}
              </select>
            </div>
            {/* provincia */}
            <div className="row align-items-center pb-5">
              <select
                onChange={actions.updateProvincia}
                className="form-select"
                aria-label="Default select example"
                defaultValue={"<provincia>"}
              >
                <option className="text-center" disabled>
                  {"<provincia>"}
                </option>
                {store.comunidad == "" ? (
                  <option className="" disabled>
                    {"elija comunidad"}
                  </option>
                ) : (
                  store.listaprovincias.map((elem) => (
                    <option className="">{elem}</option>
                  ))
                )}
              </select>
            </div>
            {/* rango de precio */}
            <div className="row align-items-center pb-5">
              <select
                onChange={actions.updatePrecio}
                className="form-select"
                aria-label="Default select example"
                defaultValue={"<precio>"}
              >
                <option className="text-center" disabled>
                  {"<precio>"}
                </option>
                <option className="text-center">todos los precios</option>
                <option className="">de 0 a 1000</option>
                <option className="">de 1001 a 2500</option>
                <option className="">de 2501 a 5000</option>
                <option className="">de 5001 a más</option>
              </select>
            </div>
            {/* filtro A */}
            <div className="row align-items-center pb-5">
              <select
                // onChange={actions.updatePrecio}
                className="form-select"
                aria-label="Default select example"
                defaultValue={"<filtro A>"}
              >
                <option className="text-center" disabled>
                  {"<filtro A>"}
                </option>
                <option className="text-center">filtro A</option>
                <option className="">filtro A</option>
                <option className="">filtro A</option>
                <option className="">filtro A</option>
                <option className="">filtro A</option>
              </select>
            </div>
            {/* filtro A */}
            <div className="row align-items-center pb-5">
              <select
                // onChange={actions.updatePrecio}
                className="form-select"
                aria-label="Default select example"
                defaultValue={"<filtro A>"}
              >
                <option className="text-center" disabled>
                  {"<filtro A>"}
                </option>
                <option className="text-center">filtro A</option>
                <option className="">filtro A</option>
                <option className="">filtro A</option>
                <option className="">filtro A</option>
                <option className="">filtro A</option>
              </select>
            </div>
            {/* filtro A */}
            <div className="row align-items-center pb-5">
              <select
                // onChange={actions.updatePrecio}
                className="form-select"
                aria-label="Default select example"
                defaultValue={"<filtro A>"}
              >
                <option className="text-center" disabled>
                  {"<filtro A>"}
                </option>
                <option className="text-center">filtro A</option>
                <option className="">filtro A</option>
                <option className="">filtro A</option>
                <option className="">filtro A</option>
                <option className="">filtro A</option>
              </select>
            </div>
            {/* filtro A */}
            <div className="row align-items-center pb-5">
              <select
                // onChange={actions.updatePrecio}
                className="form-select"
                aria-label="Default select example"
                defaultValue={"<filtro A>"}
              >
                <option className="text-center" disabled>
                  {"<filtro A>"}
                </option>
                <option className="text-center">filtro A</option>
                <option className="">filtro A</option>
                <option className="">filtro A</option>
                <option className="">filtro A</option>
                <option className="">filtro A</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* ----------------------------------------- */}
      {/* A partir de aqui el tablero de resultados */}
      {/* ----------------------------------------- */}
      <div className="col-9">
        <nav className="d-flex justify-content-between">
          {/* Botones Alquiler y Compra */}
          {store.operacion == "alquiler" || store.operacion == "" ? (
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                className="nav-link active"
                type="button"
                onClick={actions.updateAlquiler}
              >
                Alquiler
              </button>
              <button
                className="nav-link"
                type="button"
                onClick={actions.updateCompra}
              >
                Compra
              </button>
            </div>
          ) : (
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                className="nav-link"
                type="button"
                onClick={actions.updateAlquiler}
              >
                Alquiler
              </button>
              <button
                className="nav-link active"
                type="button"
                onClick={actions.updateCompra}
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
                onClick={actions.updateListado}
              >
                Listado
              </button>
              <button
                className="nav-link"
                type="button"
                onClick={actions.updateMapa}
              >
                Mapa
              </button>
            </div>
          ) : (
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                className="nav-link"
                type="button"
                onClick={actions.updateListado}
              >
                Listado
              </button>
              <button
                className="nav-link active"
                type="button"
                onClick={actions.updateMapa}
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
    </div>
  );
};
