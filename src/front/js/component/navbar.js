import React, { useState, useEffect } from "react";
import logo from "../component/tickeate.png";
import { useNavigate } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    setIsAuthenticated(!!token); // pasa a true si el token está
  }, []);

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
              <a className="nav-link active" aria-current="page" href="/events" style={{ color: 'white' }}> {/* Cambiado a blanco para contraste */}
                Descubre eventos
              </a>
            </li>
            <li className="nav-item">
              <a href="/galeria" className="nav-link" style={{ color: 'white' }}> {/* Cambiado a blanco para contraste */}
                Galería
              </a>
            </li>
            <li className="nav-item">
              <a onClick={() => navigate("/contact-us")} className="nav-link" style={{ color: 'white', cursor: 'pointer' }}> {/* Cambiado a blanco para contraste */}
                Contáctanos
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <li className="nav-item">
                <a onClick={handleLogout} className="nav-link" style={{ color: 'white', cursor: 'pointer' }}> {/* Cambiado a blanco para contraste */}
                  <i className="fas fa-user"></i> Cerrar sesión
                </a>
              </li>
            ) : (
              <li className="nav-item">
                <a href="/register" className="nav-link" style={{ color: 'white' }}> {/* Cambiado a blanco para contraste */}
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
