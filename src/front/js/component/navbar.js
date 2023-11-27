import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
<<<<<<< HEAD
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">4Geeks</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Bienvenido</button>
=======
			<div className="container">				
					<span className="navbar-brand mb-0 h1">EasyJob</span>
					<span className="navbar-brand mb-0 h1">Trabajos</span>
					<span className="navbar-brand mb-0 h1">Nosotros</span>
					<span className="navbar-brand mb-0 h1">Trabajos</span>		
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Entrar</button>
>>>>>>> catalina
					</Link>
				</div>
			</div>
		</nav>
	);
};
