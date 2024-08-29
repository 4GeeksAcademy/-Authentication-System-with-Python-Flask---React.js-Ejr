import React, { useContext } from "react";
import logo from "../component/tickeateBlanco.png";
import { useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  const handleLogout = () => {
    actions.logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'rgba(29, 14, 63, 0.9)', padding: '1rem 0' }}>
      <div className="container-fluid">
        <Link to={"/"}>
          <span
            className="navbar-brand"
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
          </span>
        </Link>
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
            {!localStorage.getItem("jwt-token") ? (
              <li className="nav-item">
                <a href="/register" className="nav-link" style={{ color: 'white' }}>
                  Registrarse / Iniciar sesión
                </a>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <span className="navbar-username">
                    {store.profile ? store.profile.username : ""}
                  </span>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: 'white' }}>
                    <i className="fas fa-user"></i> {/* Ícono de perfil */}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="/app/profile">Perfil</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>Cerrar sesión</a></li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
