import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";

export const Navbar = () => {

  const { store, actions } = useContext(Context)

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark">
      <div className="container-fluid">
        <div className="ms-5">
          <img className="logo" src={logo} alt="Logo" />
          <Link className="navbar-brand text-light ms-3" to="/">HablemosUY</Link>
        </div>

        <button className="navbar-toggler text-dark me-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <Link className="nav-link active mx-4 text-light" aria-current="page" to="/">Preguntas frecuentes</Link>
         
            <Link className="nav-link mx-4 text-light" to="/profesionales">Profesionales</Link>
           
            <Link className="nav-link mx-4 text-light" to="/">Precios</Link>
            <Link to="/vista-login">
              <button type="button" className="btn btn-outline-light me-5">Iniciar sesión</button>
            </Link>
            {/* {store.logged ?  : null} */}
          </div>
        </div>
      </div>
    </nav>
  );
};
