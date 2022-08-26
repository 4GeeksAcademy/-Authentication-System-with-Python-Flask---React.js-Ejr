import React, { Component } from "react"; // RGB(23,147,209)
import { Link } from "react-router-dom";
import "../../styles/footer.css";

export const Footer = () => (
  <footer
    className="container footer mt-3 py-3 text-center text-white"
    style={{ background: "rgb(23,147,209)" }}
  >
    <div className="container h1 row d-flex py-4 d-flex justify-content-center">
      LOGO
    </div>
    <div className="container row d-flex py-4">
      <Link className="col-4" to="/constr">
        <div className="text-center">¿quiénes somos?</div>
      </Link>
      <Link className="col-4" to="/constr">
        <div className="text-center">trabaja con nosotros</div>
      </Link>
      <Link className="col-4" to="/constr">
        <div className="text-center">integrantes:</div>
      </Link>
    </div>

    <div className="container row d-flex py-4">
      <Link className="col-4" to="/constr">
        <div className="text-center">preguntas frecuentes</div>
      </Link>
      <Link className="col-4" to="/constr">
        <div className="text-center">sugerencias</div>
      </Link>
      <Link className="col-4" to="/constr">
        <div className="text-center">Daniel Guzman</div>
      </Link>
    </div>

    <div className="container row d-flex py-4">
      <Link className="col-4" to="/constr">
        <div className="text-center">condiciones generales</div>
      </Link>
      <Link className="col-4" to="/constr">
        <div className="text-center">próximos proyectos</div>
      </Link>
      <Link className="col-4" to="/constr">
        <div className="text-center">Jose Ingunza</div>
      </Link>
    </div>

    <div className="container row d-flex py-4">
      <Link className="col-4" to="/constr">
        <div className="text-center">prensa</div>
      </Link>
      <Link className="col-4" to="/constr">
        <div className="text-center">certificaciones</div>
      </Link>
    </div>
  </footer>
);
