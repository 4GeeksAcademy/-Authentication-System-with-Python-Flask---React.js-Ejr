import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="typefloating">
      <div className="brand">
        <img className="icon" alt="" src="/icon.svg" />
        <b className="brandname">PhysioCareSync</b>
      </div>
      <div className="navLinks">
        <nav className="navLinks1">
          <Link to="/dashboard" className="navLink button-like">
            Dashboard
          </Link>
          <Link to="/servicios" className="navLink button-like">
            Servicios
          </Link>
          <Link to="/profesionales" className="navLink button-like">
            Profesionales
          </Link>
          <Link to="/iniciar-sesion" className="button">
            <div className="textContainer">
              <b className="cta">Inciar Sesión</b>
            </div>
          </Link>
          <Link to="/registrarse" className="button1">
            <div className="textContainer">
              <b className="cta">Registrarse</b>
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
