import React from "react";
import "../../styles/home.css";

export const Howitworks = () => {
  return (
    <div className="container px-4 py-5" id="hanging-icons">
      <h2 className="text-center pb-2 border-bottom">
        {" "}
        <b>Cómo funciona Influĕre</b>
      </h2>
      <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
        <div className="col d-flex align-items-start">
          <div className="icon-square bg-light text-dark d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
            <a href="#" className="btn btn-warning">
              <b>#Step1</b>
            </a>
          </div>
          <div>
            <h2>Registra tu perfil</h2>
            <p>
              Completa tu perfil de influencer o de empresa con todos los datos
              necesarios para conocer el sector en el que trabajas. ¡Cuanto más
              concreto/a seas, mejor!
            </p>
            <a href="#" className="btn btn-primary">
              ¡Empieza ya!
            </a>
          </div>
        </div>
        <div className="col d-flex align-items-start">
          <div className="icon-square bg-light text-dark d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
            <a href="#" className="btn btn-warning">
              <b>#Step2</b>
            </a>
          </div>
          <div>
            <h2>Pide presupuesto</h2>
            <p>
              Accede a nuestro directorio de influencers, filtra según tus
              intereses, público objetivo y solicita un presupuesto para tu
              campaña.
            </p>
            <a href="#" className="btn btn-primary">
              ¡Empieza ya!
            </a>
          </div>
        </div>
        <div className="col d-flex align-items-start">
          <div className="icon-square bg-light text-dark d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
            <a href="#" className="btn btn-warning">
              <b>#Step3</b>
            </a>
          </div>
          <div>
            <h2>Crea tu campaña</h2>
            <p>
              Una vez que ya hayas hecho el contacto con tu influencer favorito,
              ¡solo te queda empezar a diseñar tu campaña y conseguir
              resultados!
            </p>
            <a href="#" className="btn btn-primary">
              ¡Empieza ya!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
