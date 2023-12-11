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
    <div className="carousel-oficios mt-30">
      <h2
        style={{
          fontFamily: "fantasy",
          color: "#001F3F", // Azul oscuro
          borderBottom: "2px solid #001F3F", // Línea de subrayado
          marginTop: "3%",
          paddingBottom: "2%", // Espacio entre el texto y el borde inferior
          textAlign: "center",
        }}
      >
        <strong>OFICIOS</strong>
      </h2>
      <div className="carousel-container container-fluid">
        <div
          className="carousel-wrapper"
          style={{
            display: "flex",
            // transition: "transform 0.2s ease-in-out",
            // transform: `translateX(-${currentIndex * 25}%)`,
            // padding: "10px",
          }}
        >
          <div className="carousel-box" style={{ marginRight: "2%" }}>
            <h2 style={{ fontWeight: "bold" }}>Electricista</h2>
            <img
              className="img-fluid"
              style={{ minWidth: "150px", width: "150%" }}
              src={easyJobUrl1}
              alt="Electricista"
            />
          </div>
          <div className="carousel-box" style={{ marginRight: "2%" }}>
            <h2 style={{ fontWeight: "bold" }}>Carpintero</h2>
            <img
              className="img-fluid"
              style={{ minWidth: "150px", width: "150%" }}
              src={easyJobUrl3}
              alt="Carpintero"
            />
          </div>
          <div className="carousel-box" style={{ marginRight: "2%" }}>
            <h2 style={{ fontWeight: "bold" }}>Aseo</h2>
            <img
              className="img-fluid"
              style={{ minWidth: "150px", width: "150%" }}
              src={easyJobUrl4}
              alt="Aseo"
            />
          </div>
          <div className="carousel-box" style={{ marginRight: "2%" }}>
            <h2 style={{ fontWeight: "bold" }}>Gasfitería</h2>
            <img
              className="img-fluid"
              style={{ minWidth: "150px", width: "150%" }}
              src={easyJobUrl2}
              alt="Gasfitería"
            />
          </div>
          <div className="carousel-box" style={{ marginRight: "2%" }}>
            <h2 style={{ fontWeight: "bold" }}>Pintor</h2>
            <img
              className="img-fluid"
              style={{ minWidth: "150px", width: "150%" }}
              src={easyJobUrl5}
              alt="Pintor"
            />
          </div>
        </div>
      </div>

      {/* <div className="carousel-controls">
        <div className="arrow" onClick={handlePrev}>
          &#9664;
        </div>
        <div className="arrow" onClick={handleNext}>
          &#9654;
        </div>
      </div> */}
    </div>
  );
};
export default Carrousel;
