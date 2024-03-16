import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from './Logo';
import SearchBar from './SearchBar';
import '../../styles/navbar.css';

const NavBar = () => {
  let navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary align-items-center">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/"><Logo /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/recomendaciones">Recomendaciones</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/autores">Autores</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/generos">Géneros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/mas-buscados">Más Buscados</Link>
            </li>
          </ul>
          <SearchBar />
          <div className="d-flex justify-content-end align-items-center flex-nowrap">
            <button onClick={() => navigate('/signup')} className="btn btn-primary me-1">
              Sign Up
            </button>
            <button onClick={() => navigate('/login')} className="btn btn-secondary ms-1">
              Log In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
