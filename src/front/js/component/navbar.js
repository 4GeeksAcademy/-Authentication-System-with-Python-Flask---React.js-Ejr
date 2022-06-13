import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-dark">
			<div className="container-fluid mx-5">
				<Link to="/">
					<span className="navbar-brand mb-0 h1 text-white">Influĕre</span>
				</Link>
				<div className="ml-auto">
						<Link to="/Directorio">
						<span className="navbar-item mx-2 text-white">Influencers</span>
						</Link>
						<span className="navbar-item mx-3 text-white">Registrate</span>
						<button className="btn btn-primary">Iniciar Sesión</button>
						
				</div>
			</div>
		</nav>
	);
};
