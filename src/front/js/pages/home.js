import React, { useContext } from "react";
import { Context } from "../store/appContext";
import mapImage from "../../img/imagen_mapa.jpg";
import dog1 from "../../img/Dog_line.png";
import dogswalker from "../../img/dogger.png";
import dogleash from "../../img/dog_leash.png";
import "../../styles/home.css";

const cardStyle = {
  width: "auto",
  justifyContent: "center",
  height: "auto",
};

const images = {
  height: "200px",
  width: "auto",
  color: "black",
};

const centeredRow = {
  alignItems: "center",
};

const btns = {
  backgroundColor: "#C88B7D",
  color: "white",
  width: "20rem",
};

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid">
      <div className="container m-auto">
        <br></br>
        <br></br>
        <div className="row pt-5 pb-5">
          <div className="col-sm-12 col-lg-6">
            <div className="row h-100 pb-5" style={{ marginRight: "5rem" }}>
              <div className="col my-auto text-justify">
                <h1>Encuentra paseadores de perros cerca de ti al instante.</h1>
                <h4>
                  El app que te ayuda a conectar con personas de confianza que
                  pasean a tu perro en el horario que mejor te funcione.
                </h4>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12">
            <div class="col" style={{ borderRadius: "50px" }}>
              <div className="card" id="mapStyle" style={cardStyle}>
                <img src={mapImage} />
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5 mb-5">
          <div className="col-12 text-center">
            <h2>¿Cómo funciona?</h2>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-lg-4">
            <div className="card align-items-center " id="dogCard">
              <img
                src={dog1}
                className="card-img-top"
                alt="..."
                style={images}
              ></img>
              <div class="card-body">
                <p class="card-text" style={{ color: "black" }}>
                  Registras a tu perro
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card align-items-center" id="dogCard">
              <img
                src={dogswalker}
                className="card-img-top"
                alt="..."
                style={images}
              ></img>
              <div class="card-body">
                <p class="card-text" style={{ color: "black" }}>
                  Selecciona el caminador disponible mas cercano
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card align-items-center" id="dogCard">
              <img
                src={dogleash}
                className="card-img-top"
                alt="..."
                style={images}
              ></img>
              <div class="card-body">
                <p class="card-text" style={{ color: "black" }}>
                  Alista a tu perro para el camino.
                </p>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-12 text-center pb-3 pt-5">
            <button className="btn rounded-pill pt-2" style={btns}>
              <h5>Comenzemos!</h5>
            </button>
          </div>
        </div>
        <br></br>
        <br></br>

        <div class="custom-shape-divider-bottom-1659915776">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
        <div className="custom-shape-divider-bottom-1659915273">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};
