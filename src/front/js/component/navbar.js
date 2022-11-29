import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<div className="col-2">
			<nav className ="navbar bg-light m-2 shadow-lg">
				<ul className ="nav navbar-nav px-3">
					<li className ="nav-item">
						<a className ="nav-link" href="/"> Home </a>
					</li>
					<li className ="nav-item">
						<a className ="nav-link" href="/login"> Login </a>
					</li>
					<li className ="nav-item">
						<a className ="nav-link" href="/create"> Create Account </a>
					</li>
					<li className ="nav-item">
						<a className ="nav-link" href="/about"> About Us </a>
					</li>
					<li className ="nav-item">
						<a className ="nav-link" href="/donate"> Donate </a>
					</li>
				</ul>
			</nav>
		</div>
	);
};
