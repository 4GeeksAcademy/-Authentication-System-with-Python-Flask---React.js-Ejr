import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";

export const Navbar = () => {
	return (
		<nav className="navbar fixed-top">
			<div className="header container-fluid">
				<div className="brand">
				<Link to="/">
					<img className="logo" src={logo}/>
				<span className="nombre">CoinChange</span>

				</Link>
				</div>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="buttonNavbar">Iniciar sesión</button>
					</Link>
					<Link to="/demo">
						<button className="buttonNavbar">Registrarse</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
