import React from "react";
import "../../styles/CardAppli.css";

const CardAppli = () => {
  return (
    <div className="card-appli">
      <div className="card-body-appli">
        <div className="container-appli row">
          <div className="col">
            <h5 className="card-title-appli">
              Maestría en Ingeniería de Alimentos
            </h5>
            <p className="card-text-appli">
              <i className="fa-regular fa-circle-check" />
              Beca Completa
            </p>

            <p className="card-text-appli">
              <i className="fa-solid fa-location-dot" />
              Universidad de Madrid
            </p>
          </div>
          <div className="col button-container-appli">
            <button className="button-area-appli">Ciencia</button>
            <button className="button-check-appli">Enviada ✔</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAppli;
