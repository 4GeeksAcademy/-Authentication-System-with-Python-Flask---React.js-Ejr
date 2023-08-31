import React from "react";
import "../../styles/RegistroEleccion.css";

const RegistroEleccion = () => {
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{
        width: "20rem",
        height: "15rem",
        backgroundColor: "#E0EDFF",
        borderRadius: "2rem",
        marginTop: "4rem",
        marginBottom: "5rem",
      }}
    >
      <div className="d-grid gap-2  mx-auto my-5">
        <button className="btn btn-custom mb-4" type="button">
          Registrarse como Usuario
        </button>
        <button className="btn btn-custom" type="button">
          Registrarse como Institución
        </button>
      </div>
    </div>
  );
};

export default RegistroEleccion;
