import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

export const Footer = () => {
  return (
    <div id="footer" className="container-fluid">
      <div className="row">
        <div className="col-4 mt-3">
          <h5>Sobre nosotros</h5>
          <hr className="light" />
          <Link to={"/contacto"}>
            <p>Contacto</p>
          </Link>
          <Link to={"/preguntas"}>
            <p>Preguntas frecuentes</p>
          </Link>
        </div>
        <div className="col-4 mt-3">
          <h5>Países donde estamos</h5>
          <hr className="light" />
          <p>Costa Rica</p>
        </div>
        <div className="d-grid col-4 my-auto">
          <div className="mx-auto">
            <Link to={"/registrocaminador"}>
              <button className="btn rounded-pill">
                Convierte en caminador
              </button>
            </Link>
          </div>
        </div>
      </div>
      <footer className="text-center">
        <p>
          Copyright &copy; 2022.{" "}
          <Link to={"/terminosycondiciones"}>TERMINOS Y CONDICIONES</Link>
        </p>
      </footer>
    </div>
  );
};
