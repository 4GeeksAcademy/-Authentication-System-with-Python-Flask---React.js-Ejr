import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Navbar = () => {

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container text-center">
        <span className="navbar-brand mb-0 h1 navbar-brand-custom">
          <strong>EasyJob</strong>
        </span>
        <span className="navbar-brand mb-0 h1 navbar-brand-custom">
          Trabajos
        </span>
        <span className="navbar-brand mb-0 h1 navbar-brand-custom">
          Nosotros
        </span>
        <span className="navbar-brand mb-0 h1 navbar-brand-custom">
          Experiencias
        </span>
        <div className="ml-auto">
          <Link to="/demo">
            <button className="btn btn-primary">Entrar</button>
          </Link>

        </div>
      </div>
    </nav>
  );
  }
