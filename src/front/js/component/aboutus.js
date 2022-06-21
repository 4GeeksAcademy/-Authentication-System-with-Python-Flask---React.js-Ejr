import React from "react";
import "../../styles/home.css";

export const Aboutus = () => {
  return (
    <div className="container">
      <div class="row">
        <div class="col-6">
          <h4 className="antetitulo2">QUÉ ES INFLUERE</h4>

          <h1 className="tituloabout">
            LA UNIÓN ENTRE EMPRESAS E INFLUENCERS{" "}
          </h1>
          <br></br>
          <p>
            <span className="texto1">
              SI NO TE VEN, NO EXISTES. Influĕre un directorio de Influencers y
              Marcas. Crea tu perfil GRATIS y encuentra tus Marcas e Influencers
              favoritos. Encuentra influencers con los que colaborar, crear
              campañas de marketing y dar visibilidad a tu marca. Y si eres
              influencer ¡únete!
            </span>
          </p>

          <br></br>
          <a
            className="btn btn-danger rounded-pill btn-lg"
            href=""
            role="button"
          >
            DESCUBRE MÁS
          </a>
        </div>
        <div class="col-6">
          <img
            className="aboutus"
            src="https://columnadigital.com/wp-content/uploads/2022/02/pasos-para-encontrar-y-elegir-a-influencers.jpg"
          />
          <br></br>
          <br></br>
        </div>
      </div>
    </div>
  );
};
