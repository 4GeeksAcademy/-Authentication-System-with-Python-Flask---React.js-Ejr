import React from "react";
import PropTypes from "prop-types";
import CarouselOwner from "../component/carouselOwner";
import Shape from "../component/shape";
import "../../styles/innerhomes.css";
import mapImage from "../../img/imagen_mapa.jpg";

export const HomeDueno = () => {
  return (
    <div className="container-fluid" id="homedueno">
      <div className="container m-auto">
        <div className="row text-center text-light pt-4">
          <h1>¡Bienvenido de vuelta, Roberto!</h1>
        </div>
        <div className="row text-center pb-5">
          <p>Hoy es un buen dia para tener un buen dia!</p>
        </div>
        <div className="row text-light pb-3">
          <h2>Tus perros:</h2>
        </div>
        <CarouselOwner />

        <div className="row text-light pt-5">
          <h1>Caminadores disponibles cerca de ti:</h1>
        </div>

        <div className="row pt-5 pb-5">
          <div className="col-12">
            <div className="rounded">
              <img
                src={mapImage}
                className="card-img-top"
                alt="..."
                style={{ borderRadius: "15px" }}
              />
            </div>
          </div>
        </div>

        <div className="row pb-5">
          <div className="btn btn-primary btn-lg rounded-pill">Comenzemos!</div>
        </div>
      </div>
      <Shape />
    </div>
  );
};

HomeDueno.propTypes = {
  match: PropTypes.object,
};
