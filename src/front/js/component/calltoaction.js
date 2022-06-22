import React from "react";
import "../../styles/home.css";

export const Calltoaction = () => {
  return (
    <div className="py-14">
      <div className="container">
        <div className="row">
          <div className="offset-lg-2 col-lg-8 col-md-12 col-12 text-center">
            <span
              className="antetitulo fs-4 ls-md text-uppercase
         fw-semi-bold"
            >
              <br></br>
              ¿ERES INFLUENCER?
            </span>

            <h2 className="display-3 mt-4 mb-3 text-white fw-bold">
              Los mejores proyectos te esperan aquí.
            </h2>

            <p className="lead text-white-50 px-lg-8 mb-6 subtitulo">
              Tú eliges el proyecto entre los más de 50.000 empresas registradas
              en Influĕre. <br></br>Soporte continuo de nuestra comunidad de
              expertos
            </p>
            <br></br>
            <a
              className="btn btn-danger rounded-pill btn-lg"
              href=""
              role="button"
            >
              DA EL SALTO
            </a>
            <br></br>
            <br></br>
            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
};
