import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light colorNav mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">Pura Vida Mart</span>
			</Link>
			<div className="ml-auto">
				<Link to="/contact-us">
					<button className="btn btn-login">Log In</button>
				</Link>
			</div>
		</nav>
	);
};
