import React, { useContext } from "react";
import Moviestar from "../../img/Moviestar.png";
import "../../styles/Navbar.css";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";


export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate()

const logged = store.logged 

const handleLogout = () => {

  actions.logout()
  navigate("/")
}

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
                <li><a className="dropdown-item" href="/movie">Movies</a></li>
                <li><a className="dropdown-item" href="#">Series</a></li>
                <li><a className="dropdown-item" href="actors">Actors and Directors</a></li>
              </ul>
            </li>

            {!logged ? (<li className="nav-item">
              <Link to={"/login"} className="nav-link text-white">Log in</Link>
            </li>)
            :
            (<li className="nav-item">
              <button onClick={handleLogout} className="nav-link text-white btn">Sign Off</button>
            </li>)}

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