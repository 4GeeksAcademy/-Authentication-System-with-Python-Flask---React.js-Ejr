import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (<div>
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
      <div className="container-fluid">
        <div className ="col d-flex">
          <a className="navbar-brand text-white" href="#">Books Market</a>
          <a className="nav-link active text-white" aria-current="page" href="#">Home</a>
        </div>
        <div className ="col">
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-light" type="submit">Search</button>
          </form>
        </div>
        <div className ="col">
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
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div className="navbar-expand-lg">
      <div className="row bg-dark text-center">
        <div className="col">
          <a className="nav-link active text-white" aria-current="page" href="#">Libros en Venta</a>
        </div>
        <div className="col-5">
          <a className="nav-link active text-white" aria-current="page" href="#">Libros para intercambio</a>
        </div>
        <div className="col">
          <a className="nav-link active text-white" aria-current="page" href="#">Libros más vendidos</a>
        </div>
      </div>
    </div>
  </div>
  )
}
