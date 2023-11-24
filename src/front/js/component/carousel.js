import React from "react";
import "../../styles/home.css";

const Carousel = () => {
  return (
    <div className="carousel-oficios">
      <h1>
        <strong>...Nuestros Oficios...</strong>
      </h1>

      <div className="carousel-container">
        <div className="carousel-box">Slide 1</div>
        <div className="carousel-box">Slide 2</div>
        <div className="carousel-box">Slide 3</div>
      </div>
    </div>
  );
};

export default Carousel;
