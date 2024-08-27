import React from "react";
import "../../styles/rutaDestacada.css";

const RutaDestacada = () => {
  return (
    <div className="">
      <div id="rutaDestacada1" className="carousel slide mt-3">
        <div className="carousel-inner  ">
          <div className="carousel-item active">
            <img
              src="https://www.spain.info/.content/imagenes/cabeceras-grandes/andalucia/vistas-cordoba-s158982617.jpg"
              className="d-block home"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://www.spain.info/.content/imagenes/cabeceras-grandes/andalucia/vistas-cordoba-s158982617.jpg"
              className="d-block "
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://www.spain.info/.content/imagenes/cabeceras-grandes/andalucia/vistas-cordoba-s158982617.jpg"
              className="d-block "
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#rutaDestacada1"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#rutaDestacada1"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <h3 className="text-center text-md-start mt-3 mb-4 ms-1">Título de la ruta</h3>
    </div>
  );
};

export default RutaDestacada;