import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">				
					<span className="navbar-brand mb-0 h1">EasyJob</span>
					<span className="navbar-brand mb-0 h1">Trabajos</span>
					<span className="navbar-brand mb-0 h1">Nosotros</span>
					<span className="navbar-brand mb-0 h1">Experiencias</span>		
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Entrar</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
