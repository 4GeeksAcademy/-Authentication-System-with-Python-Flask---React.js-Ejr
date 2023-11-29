import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import  Carrousel  from "../component/carrousel.js";

export const Navbar = () => {
  const scrollToSection = () => {
    const destination = document.getElementById('carrousel');
    if (destination) {
      destination.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container text-center">
        <span className="navbar-brand mb-0 h1 navbar-brand-custom">
          <strong>EasyJob</strong>
        </span>
       
          <span onClick={scrollToSection} style={{ cursor: 'pointer' }} className="navbar-brand mb-0 h1 navbar-brand-custom">
            Trabajos
          </span>
        
        <span className="navbar-brand mb-0 h1 navbar-brand-custom">
          Nosotros
        </span>
        <span className="navbar-brand mb-0 h1 navbar-brand-custom">
          Experiencias
        </span>
        <div className="ml-auto">
          <Link to="/login">
            <button className="btn btn-primary">Entrar</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
