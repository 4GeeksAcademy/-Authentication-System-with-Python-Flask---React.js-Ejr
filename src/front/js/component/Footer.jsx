import React, { useState, useEffect, useContext } from "react"; // Importación de React y algunos hooks
import styles from "./Footer.module.css"; // Importación de estilos CSS
import { Link } from "react-router-dom"; // Importación de Link para la navegación
import { Context } from "../store/appContext"; // Importación del contexto
import { useNavigate } from "react-router-dom"; // Importación de useNavigate para la navegación programática


const Footer = () => {
  return (
    <footer className="text-center text-lg-start bg-body-tertiary text-muted">

    <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">

      <div className="me-5 d-none d-lg-block">
        <span>Siguenos en nuestras redes sociales:</span>
      </div>

      <div>
        <a href="" className="me-4 text-reset">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="" className="me-4 text-reset">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="" className="me-4 text-reset">
          <i className="fab fa-google"></i>
        </a>
        <a href="" className="me-4 text-reset">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="" className="me-4 text-reset">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="" className="me-4 text-reset">
          <i className="fab fa-github"></i>
        </a>
      </div>

    </section>



    <section className="">
      <div className="container text-center text-md-start mt-5">

        <div className="row mt-3">

          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

            <h6 className="text-uppercase fw-bold mb-4">
              <i className="fas fa-gem me-3"></i>Momentum 360 ®
            </h6>
            <p>
              El orgullo de pertenecer a una comunidad con identidad propia, con una imagen y estética diferente.
            </p>
          </div>

          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">


            <h6 className="text-uppercase fw-bold mb-4">
              Products
            </h6>
            <p>
              <a href="#!" className="text-reset">Reservar clase</a>
            </p>
            <p>
              <a href="#!" className="text-reset">Notificaciones</a>
            </p>
            <p>
              <a href="#!" className="text-reset">Rutinas</a>
            </p>
            <p>
              <a href="#!" className="text-reset">Herramientas Administrativas</a>
            </p>
          </div>

          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">

            <h6 className="text-uppercase fw-bold mb-4">
              Useful links
            </h6>
            <p>
              <a href="#!" className="text-reset">Planes</a>
            </p>
            <p>
              <a href="#!" className="text-reset">Calendario</a>
            </p>
            <p>
              <a href="#!" className="text-reset">Reservas</a>
            </p>
          </div>

          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

            <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
            <p><i className="fas fa-home me-3"></i> Valencia, 2001, VE</p>
            <p>
              <i className="fas fa-envelope me-3"></i>
              Usuariomaster@gmail.com
            </p>
            <p><i className="fas fa-phone me-3"></i> + 58 0241 800 00 00</p>
            <p><i className="fas fa-print me-3"></i> + 58 0241 500 00 01</p>
          </div>

        </div>

      </div>
    </section>

    <div className="text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
      © 2024 Copyright:
      <a className="text-reset fw-bold" >Hecho con ❤ desde Venezuela</a>
    </div>

  </footer>

);
};

export default Footer;

