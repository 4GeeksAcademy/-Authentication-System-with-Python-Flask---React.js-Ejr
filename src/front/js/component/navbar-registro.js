import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";

export const NavbarRegistro= () => {
	return (
		<nav className="navbar">
			<div className="container-fluid">
				<div className="brand">
				<Link to="/">
				<a class="navbar-brand" href="#"/>
				<img className="logo" src={logo} />
                <span className="nombre">Cacha el cambio</span>
				</Link>
				</div>
				<div className="ml-auto">
					<Link to="/">
						<button className="buttonNavbar">Salir</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
