import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import casa from "../../img/casa-lujo-playa_98.webp";
import { Link, useNavigate } from "react-router-dom";
// import { useRoutes } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div
        className="contenedor-foto container d-flex justify-content-center"
        style={{ backgroundImage: `url(${casa})` }}
      >
        <div className="contenedor-filtros container rounded-3 col-10 bg-light">
          <div className="titulo container ps-4 py-3">
            <h3>Elige tu propiedad</h3>
          </div>
          <div className="filtros container d-xl-flex justify-content-evenly py-4">
            {/* tipo de operacion */}
            <div className="row align-items-center">
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
            <div className="row align-items-center">
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
            <div className="row align-items-center">
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
            <div className="row align-items-center">
              <select
                onChange={actions.updatePrecio}
                className="form-select"
                aria-label="Default select example"
                defaultValue={"<precio>"}
              >
                <option className="text-center" disabled>
                  {"<precio>"}
                </option>
                <option className="">todos los precios</option>
                <option className="">de 0 a 1000</option>
                <option className="">de 1001 a 2500</option>
                <option className="">de 2501 a 5000</option>
                <option className="">de 5001 a más</option>
              </select>
            </div>
            <div className="row align-items-center">
              <Link
                to={
                  store.operacion != "" &&
                  store.comunidad != "" &&
                  store.provincia != ""
                    ? "/dashboard"
                    : ""
                }
              >
                {/* <!-- Button trigger modal --> */}
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Ver propiedades
                </button>
                {/* <!-- Modal --> */}
                {store.operacion != "" &&
                store.comunidad != "" &&
                store.provincia != "" ? (
                  ""
                ) : (
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5
                            className="modal-title text-secondary"
                            id="exampleModalLabel"
                          >
                            Datos incompletos
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body text-secondary">
                          verifica si has seleccionado datos los filtros
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
