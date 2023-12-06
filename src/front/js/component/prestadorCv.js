import React from "react";
import "../../styles/prestadorCv.css";

const PrestadorCv = () => {
  return (
    <div className="prestadores-cv-container">
      <button type="button" className="btn btn-primary btn-lg">
        Aseo
      </button>
      <button type="button" className="btn btn-primary btn-lg">
        Carpintería
      </button>
      <button type="button" className="btn btn-primary btn-lg">
        Electricista
      </button>
      <button type="button" className="btn btn-primary btn-lg">
        Gasfitería
      </button>
      <button type="button" className="btn btn-primary btn-lg">
        Maestro Pintor
      </button>
    </div>
  );
};

export default PrestadorCv;
