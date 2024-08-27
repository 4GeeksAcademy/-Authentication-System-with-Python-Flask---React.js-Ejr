import React, { useState, useEffect } from "react";
import logo from "../component/tickeateBlanco.png";
import { useNavigate } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    console.log("Token encontrado:", token); 
    setIsAuthenticated(!!token); 
  }, []); 

  const handleLogout = () => {
    localStorage.removeItem("jwtToken"); 
    setIsAuthenticated(false); 
    navigate("/"); 
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'rgba(29, 14, 63, 0.9)', padding: '1rem 0' }}>
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href="/"
          style={{
            backgroundImage: `url(${logo})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            height: '40px',
            width: '155px',
            display: 'block',
            textIndent: '-9999px',
          }}
        >
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/events" style={{ color: 'white' }}>
                Descubre eventos
              </a>
            </li>
            <li className="nav-item">
              <a href="/galeria" className="nav-link" style={{ color: 'white' }}>
                Galería
              </a>
            </li>
            <li className="nav-item">
              <a onClick={() => navigate("/contact-us")} className="nav-link" style={{ color: 'white', cursor: 'pointer' }}>
                Contáctanos
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: 'white' }}>
                  <i className="fas fa-user"></i> {/* Ícono de perfil */}
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="/profile">Perfil</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>Cerrar sesión</a></li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <a href="/register" className="nav-link" style={{ color: 'white' }}>
                  Registrarse / Iniciar sesión
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
