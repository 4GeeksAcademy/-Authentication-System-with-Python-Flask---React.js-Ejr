import React, { useContext } from "react";
import PropTypes from "prop-types";
import CarouselOwner from "../component/carouselOwner";
import Shape from "../component/shape";
import "../../styles/innerhomes.css";
import mapImage from "../../img/imagen_mapa.jpg";
import { Context } from "../store/appContext";
import Temperatura from "../component/temperatura";
import MapApi from "../component/mapApi";

export const HomeDueno = () => {
  const { store, actions } = useContext(Context);
  return (
    <div className="container-fluid" id="homedueno">
      <div className="container m-auto">
        <div className="row text-center pt-4">
          <h1>¡Bienvenido de vuelta, {store.user.first_name}! Dueno</h1>
        </div>
        <div className="row text-center pb-5">
          <p className="text-dark">
            Hoy es un buen dia para tener un buen dia!
          </p>
        </div>

        <Temperatura />

        <div className="row  pb-3">
          <h2>Tus perros:</h2>
        </div>
        <CarouselOwner />

        <div className="row  pt-5">
          <h1>Caminadores disponibles cerca de ti:</h1>
        </div>

        <div className="row pt-5 pb-5">
          <div className="col-12">
            <div className="mapBox" id="mapBox">
              <MapApi />
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
