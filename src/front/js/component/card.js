import React from "react";
import "../../styles/card.css";

export const Card = (props) => {
  return (
    <div className="tarjeta card rounded-0 mt-4">
      <div className="row g-0">
        <div
          className="main-imagen col-md-4"
          style={{ backgroundImage: `url(${props.foto})` }}
        >
          {/* <img
            src={props.foto}
            className="img-fluid rounded-0"
            alt="main image"
          /> */}
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{`${props.tipovivienda} en ${props.direccion}, ${props.provincia}`}</h5>
            <h2 className="card-title">{`${props.precio} Euros`}</h2>
            <div className="características d-flex justify-content-between">
              <span>{`Habitaciones: ${props.habitaciones}`}</span>
              <span>{`Baños: ${props.baños}`}</span>
              {props.piscina ? <span>Piscina</span> : ""}
              {props.terraza ? <span>Terraza</span> : ""}
            </div>
            <div>
              <p className="card-text">{props.descripcion}</p>
            </div>
            <div className="características d-flex justify-content-between">
              {/* <span>{`Teléfono: ${props.telefono}`}</span> */}
              <span>Contactar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
