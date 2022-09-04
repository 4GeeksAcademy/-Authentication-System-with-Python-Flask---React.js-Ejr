import React from "react";
import casino from "../../img/casino.jpg";
import entrega from "../../img/entrega.jpg";
import frutas from "../../img/frutas.jpg";

function SlideCarousel() {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src={casino}
            className="d-block w-100 border border-success"
            alt="casino"
          />
        </div>
        <div className="carousel-item">
          <img
            src={entrega}
            className="d-block w-100 border border-success"
            alt="entrega"
          />
        </div>
        <div className="carousel-item">
          <img
            src={frutas}
            className="d-block w-100 border border-success"
            alt="frutas"
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default SlideCarousel;
