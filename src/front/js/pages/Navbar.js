import React, { useContext } from "react";
import Moviestar from "../../img/Moviestar.png";
import "../../styles/Navbar.css";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";



export const Navbar = () => {
  const { store, actions } = useContext(Context);

const logged = store.logged 

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div id="custom-navbar" className="container-fluid">
        <Link to={"/"} id="logo" className="navbar-brand" ><img id="imagenb" src={Moviestar} /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="search-container">
          <input type="text" id="search-input" placeholder="Search for a movie or series..." />
          <button className="btn bg-light" id="search-button"><i className="fas fa-search text-black bg-light"></i></button>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Menu
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#">Movies</a></li>
                <li><a className="dropdown-item" href="#">Series</a></li>
                <li><a className="dropdown-item" href="#">Actors and Directors</a></li>
              </ul>
            </li>

            {!logged ? (<li className="nav-item">
              <Link to={"/login"} className="nav-link text-white">Log in</Link>
            </li>)
            :
            (<div>
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link text-white">Sign off</Link>
                </li>
                <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown button
              </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                </div>
            </div>
            </div>
            )}

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                EN
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" value="es" href="#">ES</a></li>
                <li><a className="dropdown-item" value="en" href="#">EN</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  );
};








//  <form className="d-flex">
//  <input className="form-control me-2" id="searchInput" type="search" placeholder="Buscar pelicula o serie" aria-label="Search"/>
//  <button className="btn btn-outline-success" type="submit">GO</button>
//  </form> 