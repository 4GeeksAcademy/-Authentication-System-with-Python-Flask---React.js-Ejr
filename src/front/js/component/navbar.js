import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";

export const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="header container-fluid">
				<div className="brand">
				<Link to="/">
					<img className="logo" src={logo}/>
				</Link>
				<span className="nombre">CoinChange</span>
				</div>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="buttonNavbar">Perfil/Usuario</button>
					</Link>
					<Link to="/demo">
						<button className="buttonNavbar">Casa de Cambio</button>
					</Link>
					<Link to="/demo">
						<button className="buttonNavbar">Salir</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
