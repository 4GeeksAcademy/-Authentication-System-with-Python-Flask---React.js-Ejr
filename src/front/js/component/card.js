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
            <h5 className="card-title">{`${props.tipovivienda} en ${props.direccion}, ${props.provincia}, ${props.comunidad}`}</h5>
            <h2 className="card-title">{`${props.precio} ${props.periodo}`}</h2>
            <div className="características d-lg-flex wrap justify-content-start pt-4">
              <div className="pe-4">{`Habitaciones: ${props.habitaciones}`}</div>
              <div className="pe-4">{`Baños: ${props.baños}`}</div>
              {props.piscina ? <div className="pe-4">Piscina</div> : ""}
              {props.terraza ? <div className="pe-4">Terraza</div> : ""}
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
