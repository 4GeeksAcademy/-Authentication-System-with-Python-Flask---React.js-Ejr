import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import casa from "../../img/casa-lujo-playa_98.webp";
import { Link, Navigate, useNavigate } from "react-router-dom";
// import { useRoutes } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    actions.backhome;
  }, []);

  return (
    <>
      <div
        className="contenedor-foto container d-flex justify-content-center"
        style={{ backgroundImage: `url(${casa})` }}
      >
        <div className="formulario container rounded-3 bg-light">
          <div className="titulo container ps-4 pt-3 pb-2">
            <h3>Elige tu propiedad</h3>
          </div>

          {/*--------------------------------------------- INICIO DE LOS FILTROS SELECT ----------------------------------------------*/}
          <div className="filtros container d-xl-flex justify-content-evenly pt-3 pb-4">
            {/* tipo de operacion */}
            <div className="selector mx-3">
              <div className="pb-2 text-center">
                <span className="">Tipo de Operación</span>
              </div>
              <select
                onChange={actions.updateOperacion}
                className="form-select mb-3"
                aria-label="Default select example"
                value={store.operacion}
              >
                <option className="">{"<elegir>"}</option>
                <option className="">alquiler</option>
                <option className="">compra</option>
              </select>
            </div>
            {/* comunidad */}
            <div className="selector mx-3">
              <div className="pb-2 text-center">
                <span className="">Comunidad Autónoma</span>
              </div>
              <select
                onChange={actions.updateComunidad}
                className="form-select mb-3"
                aria-label="Default select example"
                value={store.comunidad}
              >
                <option className="">todas</option>
                {store.listacomunidades.map((item) => {
                  let comunidad = Object.keys(item);
                  return (
                    <option key={comunidad} className="">
                      {comunidad}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* provincia */}
            <div className="selector mx-3">
              <div className="pb-2 text-center">
                <span className="">Provincia</span>
              </div>
              <select
                onChange={actions.updateProvincia}
                className="form-select mb-3"
                aria-label="Default select example"
                value={store.provincia}
              >
                <option className="">todas</option>
                {store.listaprovincias.map((elem) => (
                  <option key={elem} className="">
                    {elem}
                  </option>
                ))}
              </select>
            </div>
            {/* rango de precio */}
            <div className="selector mx-3">
              <div className="pb-2 text-center">
                <span className="">Rango de Precio</span>
              </div>
              <div className="d-flex">
                <select
                  onChange={actions.updatePreciomin}
                  className="form-select me-1 mb-3"
                  aria-label="Default select example"
                  value={store.preciomin}
                >
                  <option className="">Mín</option>
                  <option className="">1000</option>
                  <option className="">2000</option>
                  <option className="">3000</option>
                  <option className="">5000</option>
                </select>
                <select
                  onChange={actions.updatePreciomax}
                  className="form-select ms-1 mb-3"
                  aria-label="Default select example"
                  value={store.preciomax}
                >
                  <option className="">Máx</option>
                  {/* <option className="">Sin límite</option> */}
                  {store.preciomin >= 1000 ? (
                    ""
                  ) : (
                    <option className="">1000</option>
                  )}
                  {store.preciomin >= 2000 ? (
                    ""
                  ) : (
                    <option className="">2000</option>
                  )}
                  {store.preciomin >= 3000 ? (
                    ""
                  ) : (
                    <option className="">3000</option>
                  )}
                  {store.preciomin >= 5000 ? (
                    ""
                  ) : (
                    <option className="">5000</option>
                  )}
                </select>
              </div>
            </div>
            {/*--------------------------------------------- FIN DE LOS FILTROS SELECT ----------------------------------------------*/}

            {/*--------------------------------------------- BOTON DE PASE AL DASHBOARD----------------------------------------------*/}
            <div className="row align-items-end text-center">
              <Link to={store.operacion != "todas" ? "/dashboard" : ""}>
                {/* <!-- Button trigger modal --> */}
                <button
                  // onClick={() => {
                  //   if (store.operacion != "todas") {
                  //     actions.fillLocalStorage;
                  //     // Navigate("/dashboard");
                  //   }
                  // }}
                  type="button"
                  className="btn btn-primary mb-3"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Ver propiedades
                </button>
                {/* <!-- Modal --> */}
                {/*-------------------------------------ALERTA DEL BOTON DE PASE AL DASHBOARD-----------------------------------------*/}

                {store.operacion != "todas" ? (
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
                          debes seleccionar al menos el tipo de operación
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
