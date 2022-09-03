import React from "react";
import "../../styles/card.css";

export const Card = (props) => {
  return (
    <div className="tarjeta card rounded-0 mt-4">
      <div className="row g-0">
        <div
          className="main-imagen col-md-4"
          style={{ backgroundImage: `url(${props.foto})` }}
        ></div>
        <div className="col-md-8 p-3">
          <div className="card-body">
            <h5 className="card-title">{`${props.tipovivienda} en ${props.direccion}, ${props.provincia}`}</h5>
            <h2 className="card-title">{`${props.precio} Euros ${props.periodo}`}</h2>
            <div className="características d-flex justify-content-start pt-4">
              <span className="pe-4 me-5">{`Habitaciones: ${props.habitaciones}`}</span>
              <span className="pe-4 me-5">{`Baños: ${props.baños}`}</span>
              {props.piscina ? <span className="pe-4 me-5">Piscina</span> : ""}
              {props.terraza ? <span className="pe-4 me-5">Terraza</span> : ""}
            </div>
            <div className="pt-4">
              <p className="card-text">{props.descripcion}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
