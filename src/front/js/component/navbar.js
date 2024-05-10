import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-backgroundColor: '#2db734'">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1"></span>
				</Link>
				<div className="ml-auto">
					<Link to="/signIn">
						<button className=""></button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
