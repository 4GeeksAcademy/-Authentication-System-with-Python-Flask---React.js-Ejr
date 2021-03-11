import React from "react";
import { Link, withRouter } from "react-router-dom";

const Navbar = props => {
	if (props.location.pathname === "/") {
		return " ";
	} else {
		return (
			<nav className="navbar navbar-light bg-light mb-3">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
			</nav>
		);
	}
};

export default withRouter(Navbar);
