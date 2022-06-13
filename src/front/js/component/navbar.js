import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-dark">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1 text-white">Influĕre</span>
				</Link>
				<div className="ml-auto">
						<span className="navbar-item mx-2 text-white">Influencers</span>
						<span className="navbar-item mx-3 text-white">Registrate</span>
						<button className="btn btn-primary">Iniciar Sesión</button>
						
				</div>
			</div>
		</nav>
	);
};
