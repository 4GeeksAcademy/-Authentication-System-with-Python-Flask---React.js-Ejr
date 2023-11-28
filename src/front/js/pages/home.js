import React, { useContext } from "react";
import { Context } from "../store/appContext";
import easyJobUrl from "../../img/Easy-Job.jpg";
import "../../styles/home.css";
import Carousel from "../component/carousel";

export const Home = () => {
  const { store, actions } = useContext(Context);

  const handleButtonClick1 = () => {
    // Lógica para el primer botón
    console.log("Botón 1 clickeado");
  };

  const handleButtonClick2 = () => {
    // Lógica para el segundo botón
    console.log("Botón 2 clickeado");
  };

  return (
    <>
      <div className="container">
        <div className="text-container d-flex flex-column">
          <h1>Unete a Easy Job</h1>
          <p className="mb-5">
            Busca de forma sencilla y conecta con Prestadores para encontrar una
            solución a tu medida, siempre tendrás un buen contacto en EasyJob.
          </p>

          <div className="button-container my-5">
            <button onClick={handleButtonClick1}>
              Registrate acá como cliente
            </button>
            <button className="blue" onClick={handleButtonClick2}>
              Conviérte en Prestador
            </button>
          </div>
        </div>
        <div className="image-container">
          <img src={easyJobUrl} />
        </div>
      </div>
      <div className="container">
        <Carousel />
      </div>
    </>
  );
};
