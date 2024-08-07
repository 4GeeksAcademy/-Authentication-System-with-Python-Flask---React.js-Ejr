
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import imgInicio from "../../img/inicio.png"
import InfoCard from "../component/infoCard.jsx"
import ProfDestacados from "../component/profDestacados.jsx";

export const Inicio = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center row">
      <div className="row w-100">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img src={imgInicio} alt="Placeholder" className="img-fluid" />
        </div>
      </div>
      <div className="container text-center">
        <h2 className="text-light my-5">¿Cómo funciona?</h2>
        <div className="row justify-content-center">
          <InfoCard title={"Regístrate"} description={"Para poder agendar una sesión con uno de nuestros profesionales, primero debes registrarte, sólo toma 1 minuto y es gratis."} icono={"fa-solid fa-arrow-right"} />
          <InfoCard title={"Agendar sesión"} description={"Luego de registrarte, puedes ver la lista de nuestros profesionales y sus especialidades, ver qué días y horarios tienen disponibles y agendar en el que más prefieras."} icono={"fa-regular fa-calendar-days"} />
          <InfoCard title={"Ingresar a la sesión"} description={"Por último, debes acceder al sitio el día agendado, donde tendrá lugar la sesión con el/la profesional."} icono={"fa-regular fa-comments"} />
        </div>
      </div>
      <div className="container text-center">
        <h2 className="text-light my-5">Nuestros Profesionales</h2>
        <div className="row justify-content-center">
         
        </div>
        <ProfDestacados />
      </div>
    </div>
  );
};
