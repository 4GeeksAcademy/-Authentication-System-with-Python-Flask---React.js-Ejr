import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png"
import "../../styles/navbar-registro.css";

export const NavbarRegistro = () => {
	return (
		<nav id="estilo-navbar" className="navbar navbar-light fixed-top">
			<div className="container-fluid">
				<Link to="/">
					<img id="logo" src={logo} alt="Logo Casa de Cambio" style={{width:"60px"}} />
					<span id="titulo" className="navbar-brand mx-2 my-2 h1">CACHA EL CAMBIO</span>
				</Link>
				<div className="ml-auto">
					<Link to="/landing-page">
						<button className="boton mx-2">Salir</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};