import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import  Carrousel  from "../component/carrousel.js";

export const Navbar = () => {

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container text-center">
        <Link to="/" className="navbar-brand mb-0 h1 navbar-brand-custom">
          <strong>EasyJob</strong>
        </Link>

        <Link
          to="/Buscador"
          className="navbar-brand mb-0 h1 navbar-brand-custom"
        > Trabajos
        </Link>
      

        <Link
          to="/nosotros"
          className="navbar-brand mb-0 h1 navbar-brand-custom"
        >

          Nosotros
        </Link>
        <Link
          to="/experiencias"
          className="navbar-brand mb-0 h1 navbar-brand-custom"
        >
          Experiencias
        </Link>
        <div className="ml-auto">
          <Link to="/login">
            <button className="btn btn-primary">Entrar</button>
          </Link>          
        </div>
      </div>
    </nav>
  );
};
