import React from "react";
import "../../styles/home.css";

export const Aboutus = () => {
  return (
    <div className="container">
      <div class="row">
        <div class="col-6">
          <h4 className="antetitulo2">QUÉ ES INFLUERE</h4>

          <h1 className="tituloabout">FULL-SERVICE COPY & PRINTING CENTER </h1>
          <br></br>
          <p>
            <span className="texto1">
              CopyPress has provided quality printing services to the NYC area
              and beyond since 1896! We specialize in commercial offset printing
              and digital printing services to cover all your needs. From
              brochures to banners, we are your one-stop print shop.
            </span>
          </p>

          <br></br>
          <a
            className="btn btn-danger rounded-pill btn-lg"
            href=""
            role="button"
          >
            DESCUBRE MÁS
          </a>
        </div>
        <div class="col-6">
          <img
            className="aboutus"
            src="https://fotografias-compromiso.atresmedia.com/clipping/cmsimages02/2021/04/22/A4E9091A-3375-47F4-A5A4-638AA79817F8/58.jpg"
          />
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
    </div>
  );
};
