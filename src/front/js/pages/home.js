import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
<<<<<<< HEAD
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>HOME</h1>
      <div className="d-flex justify-content-center ">
        <Link to={"/login"}>
          {" "}
          <a href="#" className="btn btn-success me-3">
            {" "}
            Login
          </a>{" "}
        </Link>
        <Link to={"/signup"}>
          {" "}
          <a href="#" className="btn btn-success">
            Signup{" "}
          </a>{" "}
        </Link>
      </div>
    </div>
=======
import casa from "../../img/casa-lujo-playa_98.webp";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    actions.backHome();
  }, []);

  const handleClick = async () => {
    if (store.operacion != "todas") {
      await actions.fillLocalStorage();
      await actions.createRequest();
      await actions.getProperties();
      navigate("/dashboard");
    } else {
      swal("Debe seleccionar al menos el tipo de operación");
    }
  };

  return (
    <>
      <div
        className="contenedor-foto container d-flex justify-content-center"
        style={{ backgroundImage: `url(${casa})` }}
      >
        <div className="plantilla container rounded-3 bg-light">
          <div className="titulo container ps-4 pt-3 pb-2">
            <h3>Elige tu propiedad</h3>
          </div>

          {/*--------------------------------------------- INICIO DE LOS FILTROS SELECT ----------------------------------------------*/}
          <div className="filtros container d-xl-flex justify-content-evenly pt-3 pb-2">
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
            <div className="selector mx-3 mb-3">
              <div className="pb-2 text-center">
                <span className="">Rango de Precio</span>
              </div>
              {store.operacion == "todas" || store.operacion == "alquiler" ? (
                <div className="d-flex">
                  <select
                    onChange={actions.updatePreciomin}
                    className="form-select me-1 mb-3"
                    aria-label="Default select example"
                    value={store.preciomin == 0 ? "Mín" : store.preciomin}
                  >
                    <option className="">Mín</option>
                    <option className="">1000</option>
                    <option className="">2000</option>
                    <option className="">3000</option>
                    <option className="">4000</option>
                    <option className="">5000</option>
                  </select>
                  <select
                    onChange={actions.updatePreciomax}
                    className="form-select ms-1 mb-3"
                    aria-label="Default select example"
                    value={
                      store.preciomax == 999999999 ? "Máx" : store.preciomax
                    }
                  >
                    <option className="">Máx</option>
                    <option className="">1000</option>
                    <option className="">2000</option>
                    <option className="">3000</option>
                    <option className="">4000</option>
                    <option className="">5000</option>
                  </select>
                </div>
              ) : (
                <div className="d-flex">
                  <select
                    onChange={actions.updatePreciomin}
                    className="form-select me-1 mb-3"
                    aria-label="Default select example"
                    value={store.preciomin == 0 ? "Mín" : store.preciomin}
                  >
                    <option className="">Mín</option>
                    <option className="">100000</option>
                    <option className="">200000</option>
                    <option className="">500000</option>
                    <option className="">750000</option>
                    <option className="">1000000</option>
                  </select>
                  <select
                    onChange={actions.updatePreciomax}
                    className="form-select ms-1 mb-3"
                    aria-label="Default select example"
                    value={
                      store.preciomax == 999999999 ? "Máx" : store.preciomax
                    }
                  >
                    <option className="">Máx</option>
                    <option className="">100000</option>
                    <option className="">200000</option>
                    <option className="">500000</option>
                    <option className="">750000</option>
                    <option className="">1000000</option>
                  </select>
                </div>
              )}
            </div>
            {/*--------------------------------------------- FIN DE LOS FILTROS SELECT ----------------------------------------------*/}

            {/*--------------------------------------------- BOTON DE PASE AL DASHBOARD----------------------------------------------*/}
            <div className="row align-items-end text-center">
              <div className="mb-3">
                <button
                  onClick={handleClick}
                  type="button"
                  className="btn btn-primary mb-3"
                >
                  Ver propiedades
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
>>>>>>> develop
  );
};
