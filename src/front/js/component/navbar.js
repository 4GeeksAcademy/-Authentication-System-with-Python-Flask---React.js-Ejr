import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar bg-dark mb-3 ">
			<Link to="/">
				<button className=" bg-dark text-white-50 navbar-brand mb-0 h1"> Inicio</button>
			</Link>
			<div className="ml-auto">
				<Link to="/registropymes">
					<button className=" bg-dark text-white-50 navbar-brand mb-0 h1"> Acceso Pymes</button>
				</Link>
			</div>
		</nav>
	);
};
