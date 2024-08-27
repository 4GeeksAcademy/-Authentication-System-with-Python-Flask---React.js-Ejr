import React, { Component } from "react";
import "../../styles/footer.css";
import { ContactModal } from "../component/contactModal.jsx";

export const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 text-center">
      <div className="container-fluid">
        <div className="row p-5 text-white">
          {/* Contacto */}
          <div className="col-12 col-md-6 col-lg-4">
            <h3>Contacto</h3>
            <br />
            <div className="ml-auto">
              <button
                className="btn btn-outline rounded-pill px-5 text-white fs-5"
                data-bs-toggle="modal"
                data-bs-target="#contactModal"
              >
                Rellenar fomulario
              </button>
            </div>
            <ContactModal />
            <br />
            <div
              type="button"
              className="btn btn-success rounded-pill px-5 text-white fs-5 phone"
            >
              {" "}
              + 34 666 555 444{" "}
            </div>
          </div>

          {/* Sobre Nosotros */}
          <div className="col-12 col-md-6 col-lg-4 text-center about">
            <h3>Sobre Nosotros</h3>
            <ul className="list p-0">
              <li className="fs-5">
                <a href="">ShareTrips</a>
              </li>
              <li className="fs-5">
                <a href="">Política de privacidad</a>
              </li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div className="col-12 col-md-6 col-lg-4 media">
            <h3>Síguenos</h3>
            <br />
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-3"
            >
              <i className="fa-brands fa-facebook fa-2x"></i>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-3"
            >
              <i className="fa-brands fa-x-twitter fa-2x"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-3"
            >
              <i className="fa-brands fa-instagram fa-2x"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-3"
            >
              <i className="fa-brands fa-linkedin fa-2x"></i>
            </a>
          </div>

          {/* Copyright */}
          <p className="mt-4 mb-0"> Copyright &copy; 2024 ShareTrips.</p>
        </div>
      </div>
    </footer>
  );
};
