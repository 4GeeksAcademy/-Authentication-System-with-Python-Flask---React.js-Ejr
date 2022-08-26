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
            {/* tipo de operacion */}
            <div className="row align-items-center pb-5">
              <select
                onChange={actions.updateOperacion}
                className="form-select"
                aria-label="Default select example"
                defaultValue={"<tipo de operación>"}
              >
                <option className="text-center" disabled>
                  {"<tipo de operación>"}
                </option>
                <option className="">alquiler</option>
                <option className="">compra</option>
              </select>
            </div>
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
          </div>
        </div>
      </div>
      {/* ----------------------------------------- */}
      {/* A partir de aqui el tablero de resultados */}
      {/* ----------------------------------------- */}
      <div className="col-9">
        <nav className="d-flex justify-content-between">
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              className="nav-link active"
              id="nav-alquiler-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-alquiler"
              type="button"
              role="tab"
              aria-controls="nav-alquiler"
              aria-selected="false"
            >
              Alquiler
            </button>
            <button
              className="nav-link"
              id="nav-compra-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-compra"
              type="button"
              role="tab"
              aria-controls="nav-compra"
              aria-selected="false"
            >
              Compra
            </button>
          </div>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              className="nav-link active"
              id="nav-alquiler-tab"
              data-bs-toggle="tab"
              type="button"
              role="tab"
              aria-controls="nav-listado"
              aria-selected="false"
              onClick={actions.updateListado}
            >
              Listado
            </button>
            <button
              className="nav-link"
              id="nav-compra-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-compra"
              type="button"
              role="tab"
              aria-controls="nav-compra"
              aria-selected="false"
              onClick={actions.updateMapa}
            >
              Mapa
            </button>
          </div>
        </nav>
        {store.vista == "listado" ? (
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active p-5 h1"
              id="nav-alquiler"
              role="tabpanel"
              aria-labelledby="nav-alquiler-tab"
              tabIndex="0"
            >
              contenido 1 Listado
            </div>
            <div
              className="tab-pane fade p-5 h1"
              id="nav-compra"
              role="tabpanel"
              aria-labelledby="nav-compra-tab"
              tabIndex="0"
            >
              contenido 2 Listado
            </div>
          </div>
        ) : (
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active p-5 h1"
              id="nav-alquiler"
              role="tabpanel"
              aria-labelledby="nav-alquiler-tab"
              tabIndex="0"
            >
              contenido 1 Mapa
            </div>
            <div
              className="tab-pane fade p-5 h1"
              id="nav-compra"
              role="tabpanel"
              aria-labelledby="nav-compra-tab"
              tabIndex="0"
            >
              contenido 2 Mapa
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
