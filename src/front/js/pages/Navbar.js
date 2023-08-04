import React from "react";
import Moviestar from "../../img/Moviestar.png";
import "../../styles/Navbar.css";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><img id="imagenb" src={Moviestar} /></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <form class="d-flex">
    <input class="form-control me-2" id="searchInput" type="search" placeholder="Buscar pelicula o serie" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">GO</button>
      </form> 
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Menu
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Peliculas</a></li>
            <li><a class="dropdown-item" href="#">Series</a></li>
            <li><a class="dropdown-item" href="#">Acores y Directores</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Login</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            ID
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" value="es" href="#">Español</a></li>
            <li><a class="dropdown-item" value="en" href="#">Inglés</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>

	);
};








// {/* <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
// <div class="container-fluid">
//   <a class="navbar-brand" href="#"><img id="imagenb" src={Moviestar} /></a>
//   <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
//     <span class="navbar-toggler-icon"></span>
//   </button>
//   <input type="text" id="searchInput" placeholder="Buscar una peliculo o serie" aria-label="Search"/>
//   <div class="collapse navbar-collapse" id="navbarSupportedContent">
//     <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//       <li class="nav-item">
//         <a class="nav-link active" aria-current="page" href="#">Es</a>
//         <ul id="itemList">
//           <li>Español</li>
//           <li>Inglés</li>
//         </ul>
//       </li>
//     </ul>
//   </div>
// </div>
// </nav> *


//   <select>
//                 <option value="es">Español</option>
//                 <option value="en">English</option>
//               </select>
//               /}