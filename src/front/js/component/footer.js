import React, { Component } from "react"; // RGB(23,147,209)
import { Link } from "react-router-dom";
import "../../styles/footer.css";
import logoDown from "../../img/logoDown.jpg";

export const Footer = () => (
  <footer
    className="container-fluid footer mt-2 pt-0 pb-3 text-center text-white"
    style={{ background: "rgb(228,246,253)" }}
  >
    <div className="container h1 d-flex d-flex justify-content-center mb-0">
      <img src={logoDown} style={{ height: "17vh", width: "auto" }} />
    </div>
    <div className="container d-flex py-2">
      <Link className="col-4 text-decoration-none" to="/constr">
        <div className="text-center">¿quiénes somos?</div>
      </Link>
      <Link className="col-4 text-decoration-none" to="/constr">
        <div className="text-center">trabaja con nosotros</div>
      </Link>
      <Link className="col-4 text-decoration-none" to="/constr">
        <div className="text-center">integrantes:</div>
      </Link>
    </div>

    <div className="container d-flex py-2">
      <Link className="col-4 text-decoration-none" to="/constr">
        <div className="text-center">preguntas frecuentes</div>
      </Link>
      <Link className="col-4 text-decoration-none" to="/constr">
        <div className="text-center">sugerencias</div>
      </Link>
      <Link className="col-4 text-decoration-none" to="/constr">
        <div className="text-center">Daniel Guzman</div>
      </Link>
    </div>

    <div className="container d-flex py-2">
      <Link className="col-4 text-decoration-none" to="/constr">
        <div className="text-center">condiciones generales</div>
      </Link>
      <Link className="col-4 text-decoration-none" to="/constr">
        <div className="text-center">próximos proyectos</div>
      </Link>
      <Link className="col-4 text-decoration-none" to="/constr">
        <div className="text-center">Jose Ingunza</div>
      </Link>
    </div>

    <div className="container d-flex py-2">
      <Link className="col-4 text-decoration-none" to="/constr">
        <div className="text-center">prensa</div>
      </Link>
      <Link className="col-4 text-decoration-none" to="/constr">
        <div className="text-center">certificaciones</div>
      </Link>
    </div>
  </footer>
);
