
import React from "react";
import { Link } from "react-router-dom";

export const Navbar2 = () => {
  return (<div>
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
      <div className="container-fluid">
        <div className="col d-flex">          
          <Link to="/" className="navbar-brand text-white">Books Market</Link>
        </div>        
        <div className="col">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-end">            
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Iniciar sesión/ Registrarse
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/" className="dropdown-item">Iniciar sesión</Link>                  
                </li>
                <li>
                  <Link to="/formularioRegistro" className="dropdown-item">Registrar</Link>                  
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">Something else here</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    

  </div>
  );
};

