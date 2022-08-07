import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

export const Footer = () => {
  return (
    <div id="footer" className="container-fluid">
      <div className="container m-auto p-2">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4 mt-3 align-items-center">
            <h5>Sobre nosotros</h5>
            <hr className="light" />
            <Link style={{ textDecoration: "none" }} to={"/contacto"}>
              <p>Contacto</p>
            </Link>
            <Link style={{ textDecoration: "none" }} to={"/preguntas"}>
              <p>Preguntas frecuentes</p>
            </Link>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 mt-3 align-items-center">
            <h5>Países donde estamos</h5>
            <hr className="light" />
            <p>Costa Rica</p>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-4 my-auto align-items-center">
            <div className="text-center">
              <Link to={"/registrocaminador"}>
                <button className="btn rounded-pill">
                  Convierte en caminador
                </button>
              </Link>
            </div>
          </div>
        </div>
        <footer className="text-center mt-3">
          <p>
            Copyright &copy; 2022.{" "}
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={"/terminosycondiciones"}
            >
              TERMINOS Y CONDICIONES
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
};
