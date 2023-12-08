import React from "react";
import "../../styles/generadorPublicacion.css";



const GeneradorPublicacion = () => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Nombre
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Nombre y Apellido"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Descripción
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput2" className="form-label">
          Fecha de Nacimiento
        </label>
        <input
          type="date"
          className="form-control"
          id="exampleFormControlInput2"
        />
      </div>
      <div>
        <button>
          <p>
            Publicar
          </p>

        </button>
      </div>
    </>
  );
};

export default GeneradorPublicacion;
