import React, { useContext } from "react";
import { Context } from "../store/appContext";
import mapImage from "../../img/imagen_mapa.jpg";
import dog1 from "../../img/Dog_line.png";
import "../../styles/home.css";

const cardStyle = {
  width: "auto",
  justifyContent: "center",
  height: "auto",
};

const smallCards = {
  width: "15rem",
  border: "none",
};

const centeredRow = {
  alignItems: "center",
};

const btns = {
  backgroundColor: "#C88B7D",
  color: "white",
};

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid">
      <div className="container m-auto">
        <br></br>
        <br></br>
        <div className="row">
          <div className="col-lg-6">
            <div className="row"></div>
            <div className="row h-100">
              <div className="col-sm-12 my-auto">
                <h1>Encuentra paseadores de perros cerca de ti al instante.</h1>
                <h4>
                  El app que te ayuda a conectar con personas de confianza que
                  pasean a tu perro en el horario que mejor te funcione.
                </h4>
              </div>
            </div>
            <div className="row"></div>
          </div>
          <div className="col-lg-6 col-sm-12">
            <div class="col">
              <div className="card" id="mapStyle" style={cardStyle}>
                <img src={mapImage} />
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <div className="row"></div>
        <br></br>
        <br></br>
        <br></br>
        <div className="row">
          <div className="col-12 text-center">
            <h2>¿Cómo funciona?</h2>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-lg-4">
            <div className="card align-items-center" id="dogCard">
              <img
                src={dog1}
                className="card-img-top"
                alt="..."
                style={smallCards}
              ></img>
              <div class="card-body">
                <p class="card-text">Registras a tu perro</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card align-items-center" id="dogCard">
              <img
                src={dog1}
                className="card-img-top"
                alt="..."
                style={smallCards}
              ></img>
              <div class="card-body">
                <p class="card-text">
                  Selecciona el caminador disponible mas cercano
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card align-items-center" id="dogCard">
              <img
                src={dog1}
                className="card-img-top"
                alt="..."
                style={smallCards}
              ></img>
              <div class="card-body">
                <p class="card-text">Alista a tu perro para el camino.</p>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-12 text-center">
            <button className="btn rounded-pill" style={btns}>
              <h5>Comenzemos!</h5>
            </button>
          </div>
        </div>
        <br></br>
        <br></br>

        <div className="alert alert-info">
          {store.message ||
            "Loading message from the backend (make sure your python backend is running)..."}
        </div>
        <p>
          This boilerplate comes with lots of documentation:{" "}
          <a href="https://github.com/4GeeksAcademy/react-flask-hello/tree/95e0540bd1422249c3004f149825285118594325/docs">
            Read documentation
          </a>
        </p>
      </div>
    </div>
  );
};
