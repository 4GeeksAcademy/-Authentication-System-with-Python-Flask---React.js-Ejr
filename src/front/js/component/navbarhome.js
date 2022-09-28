import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";

export const Navbarhome = () => {
	return (
		<nav className="navbar">
			<div className="header container-fluid">
				<div className="brand">
				<Link to="/">
					<img className="logo_ph" src={logo}/>
				</Link>
				<span className="nombre_pagina-home">CoinChange</span>
				</div>
				<div className="ml-auto">
					<Link to="/perfil">
						<button className="buttonNavbar_ph">Perfil/Usuario</button>
					</Link>
					<Link to="/casas-de-cambio">
						<button className="buttonNavbar_ph">Casa de Cambio</button>
					</Link>
					<Link to="/">
						<button className="buttonNavbar_ph">Salir</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};