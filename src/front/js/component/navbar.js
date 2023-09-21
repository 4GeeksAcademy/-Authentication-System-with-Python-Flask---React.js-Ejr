
import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (<div>
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
      <div className="container-fluid">
        <div className="col d-flex">
          <a className="navbar-brand text-white" href="#">Books Market</a>
          <Link to="/" className="nav-link active text-white" aria-current="page">Home</Link>
        </div>
        <div className="col">
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-light" type="submit">Search</button>
          </form>
        </div>
        <div className="col">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-end">
            <li className="nav-item">
              <a className="nav-link active text-white" aria-current="page" href="#">Cart</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">Wish List</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Iniciar sesión/ Registrarse
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/" className="dropdown-item">Iniciar sesión</Link>                  
                </li>
                <li>
                  <Link to="/formularioRegistro" className="dropdown-item" >Registrar</Link>                  
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

    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
      <div className="container-fluid d-flex justify-content-around">
        <div className="">
          <Link to="/libroVenta" className="nav-link active text-white" aria-current="page">Libros en Venta</Link>
        </div>
        <div className="">
          <Link to="/librosIntercambio" className="nav-link active text-white" aria-current="page">Libros para intercambio</Link>
        </div>
        <div className="">
          <Link to="/masVendidos" className="nav-link active text-white" aria-current="page">Libros más vendidos</Link>
        </div>
        <div className="">
          <Link to="/donacionesRalizadas" className="nav-link active text-white" aria-current="page">Donaciones realizadas</Link>
        </div>
      </div>
    </nav>

  </div>
  );
};

