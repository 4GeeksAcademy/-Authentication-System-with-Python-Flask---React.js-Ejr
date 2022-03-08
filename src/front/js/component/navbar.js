import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1 text-danger">NoZig Logo Here</span>
				</Link>
				<div className="ml-auto">
					<Link to="/login">
						<button className="btn btn-info text-white">Login/Logout</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
