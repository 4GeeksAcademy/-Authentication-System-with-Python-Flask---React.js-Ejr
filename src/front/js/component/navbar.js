import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/Logo2SinLupa.png";

export const Navbar = () => {
	return (
		<nav className="navbar bg-dark mb-3 ">
			<Link className="navbar-brand" to="/">
				<img className="w-50" src={logo} />
			</Link>
			<div className="ml-auto">
				<Link to="/registropymes">
					<button className=" bg-dark text-white-50 navbar-brand mb-0 h1"> Acceso PYMES</button>
				</Link>
			</div>
		</nav>
	);
};
