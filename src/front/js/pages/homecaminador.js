import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import Carousel from "../component/carousel";
import Shape from "../component/shape";
import "../../styles/innerhomes.css";
import mapImage from "../../img/imagen_mapa.jpg";
import MapApi from "../component/mapApi";
import Temperatura from "../component/temperatura";

export const HomeCaminador = () => {
  const { store, actions } = useContext(Context);
  const [weather, setWeather] = useState(null);

  const iframe = {
    width: "600",
    height: "450",
    style: "border:0",
    loading: "lazy",
    src: "https://www.google.com/maps/embed/v1/directions?origin=place_id:ChIJ6Q-4_4n8oI8RLUEjx4LH-yQ&destination=...&key=...",
  };

  const weatherApi =
    "https://api.openweathermap.org/data/2.5/weather?lat=9.9199094&lon=-84.1403284&appid=96fe99c4f31628147b370103832da32a";

  useEffect(() => {
    fetch(weatherApi)
      .then((data) => data.json())
      .then((data) => setWeather(data))
      .catch((err) => err);
  }, []);

  return (
    <div className="container-fluid">
      <div className="container m-auto">
        <div className="row text-center pt-4">
          <h1>¡Bienvenido de vuelta, {store.user.first_name}! Caminador</h1>
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
