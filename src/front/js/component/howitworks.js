import React from "react";
import "../../styles/home.css";

export const Howitworks = () => {
  return (
    <div className="container">
      <div class="row">
        <div class="col-6">
          <img
            className="aboutus2"
            src="https://chet.com.ar/blog/wp-content/uploads/2019/09/Influencers.jpg"
          />
        </div>
        <div class="col-6">
          <h4 className="antetitulo2">CÓMO FUNCIONA INFLUERE</h4>

          <h1 className="tituloabout">
            DIFUNDE TU MARCA EN TAN SOLO TRES PASOS{" "}
          </h1>
          <br></br>
          <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingOne">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  Registra tu perfil
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                  Completa tu perfil de influencer o de empresa con todos los
                  datos necesarios para conocer el sector en el que trabajas.
                  ¡Cuanto más concreto/a seas, mejor!
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingTwo">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  Pide presupuesto
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingTwo"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                  Accede a nuestro directorio de influencers, filtra según tus
                  intereses, público objetivo y solicita un presupuesto para tu
                  campaña.
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingThree">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseThree"
                  aria-expanded="false"
                  aria-controls="flush-collapseThree"
                >
                  Crea tu campaña
                </button>
              </h2>
              <div
                id="flush-collapseThree"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingThree"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                  Una vez que ya hayas hecho el contacto con tu influencer
                  favorito, ¡solo te queda empezar a diseñar tu campaña y
                  conseguir resultados!
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
    </div>
  );
};
