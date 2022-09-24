import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import carrusel1 from "../../img/carrusel1.png";
import carrusel2 from "../../img/carrusel2.png";
import carrusel3 from "../../img/carrusel3.png";
import card1 from "../../img/card1.png";
import card4 from "../../img/card4.png";
import card3 from "../../img/card3.png";
import CoinChange from "../../img/CoinChange.png";
import Stark from "../../img/stark.jpg";
import "../../styles/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Navbarlanding } from "../component/navbarlanding";

export const Landing = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
    <Navbarlanding/>
    <div className=" mt-5">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carrusel carousel-inner">
          <div className="carousel-item active">
            <div class="textocarrusel carousel-caption d-none d-md-block">
              <h1>Encuentra la mejor tasa.</h1>
            </div>
            <img
              src={carrusel1}
              className="imagencarrusel d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <div class="textocarrusel carousel-caption d-none d-md-block">
              <h1>Encuentra la divisa que necesites.</h1>
            </div>
            <img
              src={carrusel2}
              className="imagencarrusel d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <div class="textocarrusel carousel-caption d-none d-md-block">
              <h1>Compara entre las mejores opciones del mercado.</h1>
            </div>
            <img
              src={carrusel3}
              className="imagencarrusel d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="banner elementor-widget-container text-start">
        <div className="banner2 ">
          <h3>Envía dinero de forma segura y con la mejor tasa del mercado.</h3>
          <p>
            Sabemos que quieres seguridad, transparencia y obtener el mejor
            rendieminto posible al cambiar tu dinero. En CoinChange encontrarás
            las mejores opciones del mercado.
          </p>
          <Link to="/registro">
            <button className="buttonregister">Me interesa</button>
          </Link>
        </div>
        <div>
          <img src={CoinChange} className="celular" />
        </div>
      </div>
      <div className="tarjetas card-group">
        <div className="tarjeta1 card">
          <div className="imagencarta">
            <img src={card1} className="cardimage card-img-top" alt="..." />
          </div>
          <div className="textocarta card-body">
            <h5 className="card-title">Envía de forma segura.</h5>
            <p className="card-text">
              Nuestros afiliados ofrecen la mayor seguridad para el envío de tu
              dinero, son empresas confiables y reconocidas a nivel nacional.
            </p>
          </div>
        </div>
        <div className="tarjeta1 card">
          <div className="imagencarta">
            <img src={card4} className="cardimage card-img-top" alt="..." />
          </div>
          <div className="textocarta card-body">
            <h5 className="card-title">
              Ahorra dinero y consígue la mejor tasa.
            </h5>
            <p className="card-text">
              Compara las tasas de forma rápida y fácil, elije el mejor y no
              pagues de más.
            </p>
          </div>
        </div>
        <div className="tarjeta1 card">
          <div className="imagencarta">
            <img src={card3} className="cardimage card-img-top" alt="..." />
          </div>
          <div className="textocarta card-body">
            <h5 className="card-title">Revisa la cotización en timpo real.</h5>
            <p className="card-text">
              Obtén la cotización de tu divisa actualizada, para que puedas
              tomar la mejore decisión.
            </p>
          </div>
        </div>
      </div>
      <div className="newslatter container">
        <form action="">
          <h1>Suscríbete para recibir nuestras novedades.</h1>
          <p>Sólo te enviaremos información relevante y que sea de interés.</p>
          <div className="email-box">
            <FontAwesomeIcon className="mail" icon={faEnvelope}/>
            <input className="email-newsletter"
              type="email"
              name=""
              value=""
              placeholder="Ingrese su email"
            ></input>
            <button className="buttonregister" type="button" name="button">
              Suscribirme
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};
