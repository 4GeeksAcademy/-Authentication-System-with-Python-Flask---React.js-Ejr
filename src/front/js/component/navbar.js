
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context)


	return (
		<nav className="navbar navbar-dark mb-3 px-5 d-flex flex-row"> 
		 <div className="container-fluid">
			<Link className="navbar-brand" to="/">

				<p className=" m-1">
					<img src={logo} style={{ height: "40px" }} />
				</p>

			</Link>
			<div className="ml-auto">


			<div class="navbar-nav d-flex flex-row">
			<form class="d-flex" role="search">
      <input class="form-control buscar " type="Search" placeholder="Buscar" aria-label="Search"></input>
      <button class="btn btn-outline me-5" type="submit">Buscar</button>
    </form>
        <a class="nav-link" href="#">Película Semanal</a>
        <a class="nav-link" href="#">Generos</a>
        <a class="nav-link" href="#">Rankings</a>
		<a class="nav-link" href="#">Mi lista</a>
		<Link className="nav-link" to="/crearCuenta">
  <button type="button" className="btn ms-4">
    <i className="fa-solid fa-user me-2"></i> Iniciar Sesión
  </button>
</Link>
      </div>
				

			</div>
			</div>
		</nav>
	);
};