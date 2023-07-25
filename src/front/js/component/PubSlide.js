import React from "react";

const PubSlide = () => {
  return (
    <div className="pub-slide">
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Cidade_Maravilhosa.jpg/800px-Cidade_Maravilhosa.jpg"
              className="d-block w-100"
              alt="First Slide"
            />
            <div className="carousel-caption d-none d-md-block">
              <h2 className = 'title-slide'>Brasil</h2>
              <p className = 'trip-desc'>
                Come relax on the beaches of Brazil or dance to the rhythm of the
                waves
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://www.marcovasco.fr/blog/wp-content/uploads/2017/07/Machu-Picchu-Perou-1014x487.jpg"
              className="d-block w-100"
              alt="Second Slide"
            />
            <div className="carousel-caption d-none d-md-block">
              <h2 className = 'title-slide'>Peru</h2>
              <p className = 'trip-desc'>
                Come and discover the mysteries of the Inca civilization and the
                immeasurable beauty of the Peruvian land
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://mma.prnewswire.com/media/1918859/ProColombia.jpg?p=facebook"
              className="d-block w-100"
              alt="Third Slide"
            />
            <div className="carousel-caption d-none d-md-block">
              <h2 className = 'title-slide'>Colombia</h2>
              <p className = 'trip-desc'>Some representative placeholder content for the third slide.</p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default PubSlide;
