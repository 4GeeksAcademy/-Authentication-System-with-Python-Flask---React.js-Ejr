import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav class="navbar navbar-expand-lg bg-body-tertiary bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand ms-5" href="#">HablemosUY</a>
    <button class="navbar-toggler text-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav ms-auto">
        <a class="nav-link active mx-4" aria-current="page" href="#">Preguntas frecuentes</a>
        <a class="nav-link mx-4" href="#">Profesionales</a>
		<a class="nav-link mx-4 me-5 pe-5" href="#">Precios</a>
      </div>
    </div>
  </div>
</nav>

	);
};
