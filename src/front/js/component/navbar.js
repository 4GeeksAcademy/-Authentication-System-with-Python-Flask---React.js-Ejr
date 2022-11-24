import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<div className="col-2">
			<nav className ="navbar bg-light m-2 shadow-lg">
				<ul className ="nav navbar-nav px-3">
					<li className ="nav-item">
						<a className ="nav-link" href="#"> Home </a>
					</li>
					<li className ="nav-item">
						<a className ="nav-link" href="#"> Services </a>
					</li>
					<li className ="nav-item">
						<a className ="nav-link" href="#"> Contact </a>
					</li>
					<li className ="nav-item">
						<a className ="nav-link" href="#"> Blogs </a>
					</li>
				</ul>
			</nav>
		</div>
	);
};
