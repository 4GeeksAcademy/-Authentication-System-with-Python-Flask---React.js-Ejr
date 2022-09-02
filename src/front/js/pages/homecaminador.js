import React, { useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import Carousel from "../component/carousel";
import Shape from "../component/shape";
import "../../styles/innerhomes.css";
import MapApi from "../component/mapApi";
import Temperatura from "../component/temperatura";

export const HomeCaminador = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid">
      <div className="container m-auto">
        <div className="row text-center pt-4">
          <h1>¡Bienvenido de vuelta, {store.user.first_name}!</h1>
        </div>
        <div className="row text-center pb-5">
          <p>Hoy es un buen dia para tener un buen dia!</p>
        </div>

        <Temperatura />

        <div className="row  pb-3">
          <h2>Tus perros en ruta:</h2>
        </div>
        <Carousel />

        <div className="row  pt-5">
          <h1>Ruta sugerida:</h1>
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

HomeCaminador.propTypes = {
  match: PropTypes.object,
};
