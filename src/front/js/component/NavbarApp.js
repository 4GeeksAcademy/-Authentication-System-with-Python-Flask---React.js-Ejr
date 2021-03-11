import React from "react";
import { Link } from "react-router-dom";

export const NavbarApp = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">PlanificApp</span>
			</Link>
			<div className="ml-auto">
				<button type="button" className="btn btn-outline-dark rounded-circle">
					<i className="fas fa-user-circle" />
				</button>
				<span> </span>
				<span className="navbar-brand mb-0 h1">user name</span>
			</div>
		</nav>
	);
};
