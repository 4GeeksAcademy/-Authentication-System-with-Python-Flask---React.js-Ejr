import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/home" className="custom-link">
					<span className="navbar-brand mb-0 h1 custom-font">ShareTrips</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn custom-button rounded-pill "> <i class="bi bi-person-circle"></i> Iniciar Sesion</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
