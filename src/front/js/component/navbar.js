import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png"

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary navbar-transparent">
  <div className="container-fluid">
	<div className="ms-5">
	<img className="logo" src={logo} />
    <a className="navbar-brand text-light ms-3" href="#">HablemosUY</a>
	</div>
	
    <button className="navbar-toggler text-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav ms-auto">
        <a className="nav-link active mx-4 text-light" aria-current="page" href="#">Preguntas frecuentes</a>
        <a className="nav-link mx-4 text-light" href="#">Profesionales</a>
		<a className="nav-link mx-4 me-5 pe-5 text-light" href="#">Precios</a>
      </div>
    </div>
  </div>
</nav>

	);
};
