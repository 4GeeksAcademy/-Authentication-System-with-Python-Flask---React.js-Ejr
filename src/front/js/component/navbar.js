import React from "react";
import logo from "../component/tickeate.png";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#d3d3d3' }}>
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href="#"
          style={{
            backgroundImage: `url(${logo})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            height: '40px',
            width: '155px',
            display: 'block',
            textIndent: '-9999px',
            marginLeft: '-3px'
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
              <a className="nav-link active" aria-current="page" href="#" style={{ color: 'black' }}>
                Discover events
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ color: 'black' }}>
                Gallery
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: 'black' }}>
                Registrarse
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="#">Registrarse como usuario</a></li>
                <li><a className="dropdown-item" href="#">Registrarse como partner</a></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: 'black' }}>
                Iniciar sesión
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="#">Iniciar sesión como usuario</a></li>
                <li><a className="dropdown-item" href="#">Iniciar sesión como partner</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
