import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {

  const { store, actions } = useContext(Context)
  const navigate = useNavigate();

  const handleLogout = () => {
    actions.cerrarSesion(navigate);
  };

  useEffect(() => {
    actions.validToken();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark nav nav-underline">
      <div className="container-fluid">
        <div className="ms-5">
        <Link className="navbar-brand text-light ms-3" to="/">
          <img className="logo" src={logo} alt="Logo" />
          </Link>
          <Link className="navbar-brand text-light ms-3" to="/">
          <span className="fs-4">HablemosUY</span>
          </Link>
        </div>

        <button className="navbar-toggler text-dark me-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
          <Link className="nav-link mx-4 text-light" aria-current="page" to="/emergencias">Emergencias</Link>
            <Link className="nav-link mx-4 text-light" aria-current="page" to="/preguntas-frecuentes">Preguntas frecuentes</Link>
            {store.logged && (<Link className="nav-link mx-4 text-light" to="/profesionales">Profesionales</Link>
            )}
             {store.logged && (<Link className="nav-link mx-4 text-light" to="/perfil">Perfil</Link>
            )}


            {/* <Link className="nav-link mx-4 text-light" to="/">Precios</Link> */}
            {!store.logged && (
              <Link to="/vista-login">
                <button type="button" className="btn btn-outline-light ms-4 me-5">
                  Iniciar sesión
                </button>
              </Link>
            )}
            {store.logged && (<Link to="/"> <button type="button" className="btn btn-outline-light  ms-4 me-5" onClick={handleLogout}>
              Cerrar sesión
            </button></Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
