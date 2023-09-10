import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar">
      <div className="container my-4">
        <div className="d-flex align-items-center">
          <Link to="/">
            <img className="logo" src="https://i.imgur.com/J6XQNp5.png" />
          </Link>
          <Link to="/">
            <h1 className="title">Bexplora</h1>
          </Link>
        </div>
        <div className="d-inline-flex ml-auto align-items-center">
          <Link to="/nosotros">
            <button className="button-regular mx-1">Nosotros</button>
          </Link>
          <Link to="/preguntas-frecuentes">
            <button className="button-regular mx-1">
              Preguntas Frecuentes
            </button>
          </Link>
          <Link to="/tracker">
            <button className="button-regular mx-1">Mis Aplicaciones</button>
          </Link>
          <Link to="/perfil_institucional">
            {store.insLoged ? (
              <button className="button-regular mx-1" onClick={() => actions.changeMyInstitutionalProfileStatus()}>
                Mi Perfil Institucional
              </button>
            ) : null}
          </Link>

          <Link to="/perfil">
            {store.isloged ? (
              <button className="button-regular mx-1" onClick={() => actions.changeMyProfileStatus()}>Mi Perfil</button>
            ) : null}
          </Link>

          <div className="buttons-right mx-2">
                <Link to="/iniciarsesionEleccion">
                {!store.isloged && !store.insLoged && (
                  <button className="button-login" onClick={() => actions.changeLogInStatus()}>Iniciar sesión</button>
                  )}
                </Link>

              
                <Link to="/registroEleccion">
                {!store.isloged && !store.insLoged && (

                  <button className="button-signup" onClick={() => actions.changeSignUpStatus()}>Registrarse</button>
                  )}
                </Link>

            <Link to="/">
              <button className="button-login" hidden={store.hiddenLogout} onClick={() => actions.logout()}>Cerrar sesión</button>
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
};
