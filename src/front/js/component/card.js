import React from "react";

export const Card = (props) => {
  return (
    <div class="card mb-3" style="max-width: 540px;">
      <div class="row g-0">
        <div class="col-md-4">
          <img
            src={props.imgurl}
            class="img-fluid rounded-start"
            alt="main image"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{`Piso en ${props.direccion}, ${props.numcalle}`}</h5>
            <p class="card-text">{`${props.provincia}, ${props.comunidad}`}</p>
            <p class="card-text">{props.descripcion}</p>
            <p class="card-text">
              <small class="text-muted">Actualizado hace 1 día</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
