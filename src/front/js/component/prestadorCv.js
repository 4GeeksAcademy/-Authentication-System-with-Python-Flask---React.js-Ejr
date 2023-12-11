import React from "react";
import "../../styles/prestadorCv.css";

const PrestadorCv = () => {
  return (
    <div div className="container" style={{ justifyContent: 'center' }}>
    <div className="prestadores-cv-container">
      <button
        type="button"
        className="btn btn btn-lg"
        style={{
          background: "#3Bd7BA",
          margin: "5px",
          width: "100%",
        }}
      >
        Aseo
      </button>
      <button
        type="button"
        className="btn btn btn-lg"
        style={{
          background: "#3Bd7BA",
          margin: "5px",
          width: "100%",
        }}
      >
        Carpintería
      </button>
      <button
        type="button"
        className="btn btn btn-lg"
        style={{
          background: "#3Bd7BA",
          margin: "5px",
          width: "100%",
        }}
      >
        Electricista
      </button>
      <button
        type="button"
        className="btn btn btn-lg"
        style={{
          background: "#3Bd7BA",
          margin: "5px",
          width: "100%",
        }}
      >
        Gasfitería
      </button>
      <button
        type="button"
        className="btn btn btn-lg"
        style={{
          background: "#3Bd7BA",
          margin: "5px",
          width: "100%",
        }}
      >
        Pintor
      </button>
    </div>
    </div>
  );
};

export default PrestadorCv;
