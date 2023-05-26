import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-dark bg-success sticky-top">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand fw-bold fs-2 mb-0">GitLoot</span>
				</Link>
				<div className="ml-auto">
					{/* <Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link> */}
					<button type="button" class="cart-button btn btn-outline-info btn-lg">Tu loot!</button>
				</div>
			</div>
		</nav>
	);
};
