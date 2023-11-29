import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import easyJobUrl1 from "../../img/electricista.jpg";
import easyJobUrl2 from "../../img/gasfiteria.jpg";
import easyJobUrl3 from "../../img/carpintero.jpg";
import easyJobUrl4 from "../../img/aseo.jpg";
import easyJobUrl5 from "../../img/maestro-pintor.jpg";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < 2 ? prevIndex + 1 : 2));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  return (
    <div className="carousel-oficios">
      <h1>        
          <strong>O f i c i o s</strong>        
      </h1>

      <div className="carousel-container">
        <div
          className="carousel-wrapper"
          style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
        >
          <div className="carousel-box">
            <h2>Electricista</h2>
            <img className="img-fluid" src={easyJobUrl1} />
          </div>
          <div className="carousel-box">
            <h2>Carpintero</h2>
            <img className="img-fluid" src={easyJobUrl3} />
          </div>
          <div className="carousel-box">
            <h2>Aseo</h2>
            <img className="img-fluid" src={easyJobUrl4} />
          </div>
          <div className="carousel-box">
            <h2>Gasfiteria</h2>
            <img className="img-fluid" src={easyJobUrl2} />
          </div>
          <div className="carousel-box">
            <h2>Maestro Pintor</h2>
            <img className="img-fluid" src={easyJobUrl5} />
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

export default Carousel;
