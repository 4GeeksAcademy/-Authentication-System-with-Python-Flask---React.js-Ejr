import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png"
import "../../styles/navbar-casa-cambio.css";

export const NavbarCasasCambio = () => {
	return (
		<nav className="navbar navbar-light bg-light fixed-top">
			<div className="container-fluid">
				<Link to="/">
					<img id="logo" src={logo} alt="Logo Casa de Cambio" style={{width:"55px"}} />
					<span id="titulo" className="navbar-brand mx-2 my-2 h1">CACHA EL CAMBIO</span>
				</Link>
				<div className="ml-auto">
					<Link to="/perfil">
						<button className="boton mx-2">Perfil</button>
					</Link>
					<Link to="/pagina-home">
						<button className="boton mx-2">Home</button>
					</Link> 
					<Link to="/">
						<button className="boton mx-2">Salir</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
