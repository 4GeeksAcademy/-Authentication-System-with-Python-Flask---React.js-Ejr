
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import imgInicio from "../../img/inicio.png"
import { Login } from "../component/login.jsx"

export const Inicio = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center row">
      <div className="row w-100">
        <div className="col-md-6 d-flex align-items-center justify-content-center rectangle-10">
         
         <Login/>
 
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img src={imgInicio} alt="Placeholder" className="img-fluid" />
        </div>
      </div>
      <div className="container text-center">
        <h2 className="text-light my-5">¿Cómo funciona?</h2>
        <div className="row justify-content-center">
          <div className="col-md-3 col-12 mb-3 d-flex justify-content-center ms-md-5">
            <div className="card" style={{ width: "18rem" }}>
            <i class="fa-solid fa-arrow-right fa-4x mt-2"></i>
              <div className="card-body">
                <h5 className="card-title">Regístrate</h5>
                <p className="card-text">Para poder agendar una sesión con uno de nuestros profesionales, primero debes registrarte, sólo toma 1 minuto y es gratis.</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-12 mb-3 d-flex justify-content-center">
            <div className="card" style={{ width: "18rem" }}>
            <i class="fa-regular fa-calendar-days fa-4x mt-2"></i>
              <div className="card-body">
                <h5 className="card-title">Agendar sesión</h5>
                <p className="card-text">Luego de registrarte, puedes ver la lista de nuestros profesionales y sus especialidades, ver qué días y horarios tienen disponibles y agendar en el que más prefieras. </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-12 mb-3 d-flex justify-content-center me-md-5">
            <div className="card" style={{ width: "18rem" }}>
            <i class="fa-regular fa-comments fa-4x mt-2"></i>
              <div className="card-body">
                <h5 className="card-title">Ingresar a la sesión</h5>
                <p className="card-text">Por último, debes acceder al sitio el día agendado, donde tendrá lugar la sesión con el/la profesional.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
