import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';

export const Navbar = () => {
  return (
    <div className="bubbleContainer">
      <div className="navLinks">
        <button className="navLink">
          <div className="navLabel">Inicio</div>
        </button>
        <button className="navLink">
          <div className="navLabel">Servicios</div>
        </button>
        <button className="navLink">
          <div className="navLabel">Profesionales</div>
        </button>
      </div>
      <div className="navLinks1">
        <button className="navLink">
          <div className="navLabel">Iniciar Sesión</div>
        </button>
        <button className="navLink">
          <div className="navLabel">Registrarse</div>
        </button>
      </div>
      <div className="brand">
        <FontAwesomeIcon icon={faHeartbeat} />
        <div className="brandname">PhysioCareSync</div>
      </div>
    </div>
  );
};
