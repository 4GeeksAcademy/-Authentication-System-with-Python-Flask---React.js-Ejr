import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import carrusel1 from "../../img/carrusel1.png";
import carrusel2 from "../../img/carrusel2.png";
import carrusel3 from "../../img/carrusel3.png";
import card1 from "../../img/card1.png";
import card2 from "../../img/card2.png";
import card3 from "../../img/card3.png";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
	  <h1>Encuentra la mejor tasa.</h1>
      <img src={carrusel1} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
	<h1>Podrás enviar dinero alredor del mundo.</h1>
      <img src={carrusel2}  className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
	<h1>Encuentra la divisa que necesitas.</h1>
      <img src={carrusel3} className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
<div className="card-group">
  <div className="card">
    <img src={card1} className="card-img-top" alt="..."/>
    <div className="card-body">
      <h5 className="card-title">Envía de forma segura.</h5>
      <p className="card-text">Nuestros afiliados ofrecen la mayor seguridad para el envío de tu dinero, son empresas confiables y reconocidas a nivel nacional.</p>
    </div>
  </div>
  <div className="card">
    <img src={card2} className="card-img-top" alt="..."/>
    <div className="card-body">
      <h5 className="card-title">Ahorra dinero y consígue la mejor tasa.</h5>
      <p className="card-text">Compara las tasas de forma rápida y fácil, elije el mejor y no pagues de más.</p>
    </div>
  </div>
  <div className="card">
    <img src={card3} className="card-img-top" alt="..."/>
    <div className="card-body">
      <h5 className="card-title">Revisa la cotización en timpo real.</h5>
      <p className="card-text">Obtén la cotización de tu divisa actualizada, para que puedas tomar la mejore decisión.</p>
    </div>
  </div>
</div>
</div>
	);
};
