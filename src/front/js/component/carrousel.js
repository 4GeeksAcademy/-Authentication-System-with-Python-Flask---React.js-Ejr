import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import easyJobUrl1 from "../../img/electricista.jpg";
import easyJobUrl2 from "../../img/gasfiteria.jpg";
import easyJobUrl3 from "../../img/carpintero.jpg";
import easyJobUrl4 from "../../img/aseo.jpg";
import easyJobUrl5 from "../../img/maestro-pintor.jpg";

export const Carrousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < 2 ? prevIndex + 1 : 2));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  return (
    <div className="carousel-oficios">
      <h1
        style={{
          fontFamily: "fantasy",
          color: "#001F3F", // Azul oscuro
          // Borde inferior // Hace que el borde inferior se ajuste al contenido
          paddingBottom: "5px", // Espacio entre el texto y el borde inferior
        }}
      >
        OFICIOS
      </h1>
      <div className="carousel-container">
        <div
          className="carousel-wrapper"
          style={{
            display: "flex",
            transition: "transform 0.2s ease-in-out",
            transform: `translateX(-${currentIndex * 25}%)`,
            padding: "10px",
          }}
        >
          <div className="carousel-box" style={{ marginRight: "3%" }}>
            <h2 style={{ fontWeight: "bold" }}>Electricista</h2>
            <img
              className="img-fluid"
              style={{ minWidth: "100px", width: "100%" }}
              src={easyJobUrl1}
              alt="Electricista"
            />
          </div>
          <div className="carousel-box" style={{ marginRight: "3%" }}>
            <h2 style={{ fontWeight: "bold" }}>Carpintero</h2>
            <img
              className="img-fluid"
              style={{ minWidth: "100px", width: "100%" }}
              src={easyJobUrl3}
              alt="Carpintero"
            />
          </div>
          <div className="carousel-box" style={{ marginRight: "3%" }}>
            <h2 style={{ fontWeight: "bold" }}>Aseo</h2>
            <img
              className="img-fluid"
              style={{ minWidth: "100px", width: "100%" }}
              src={easyJobUrl4}
              alt="Aseo"
            />
          </div>
          <div className="carousel-box" style={{ marginRight: "3%" }}>
            <h2 style={{ fontWeight: "bold" }}>Gasfiteria</h2>
            <img
              className="img-fluid"
              style={{ minWidth: "100px", width: "100%" }}
              src={easyJobUrl2}
              alt="Gasfiteria"
            />
          </div>
          <div className="carousel-box" style={{ marginRight: "3%" }}>
            <h2 style={{ fontWeight: "bold" }}>Pintor</h2>
            <img
              className="img-fluid"
              style={{ minWidth: "100px", width: "100%" }}
              src={easyJobUrl5}
              alt="Pintor"
            />
          </div>
        </div>
      </div>

      <div className="carousel-controls">
        <div className="arrow" onClick={handlePrev}>
          &#9664;
        </div>
        <div className="arrow" onClick={handleNext}>
          &#9654;
        </div>
      </div>
    </div>
  );
};
export default Carrousel;
