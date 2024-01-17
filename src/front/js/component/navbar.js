import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<div className="container-full nav-container">
			<nav className="navbar navbar-expand-lg navbar-dark navbar-custom d-flex justify-content-between px-5">

				<div className="site-logo">
				<a className="navbar-brand" href="#">Our Logo</a>
				</div>

				<div className="nav-items">
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ml-auto">
					<li className="nav-item active mx-3">
						<a className="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
					</li>
					<li className="nav-item mx-3">
						<a className="nav-link" href="#">Events</a>
					</li>
					<li className="nav-item mx-3">
						<a className="nav-link" href="#">Contact</a>
					</li>
					</ul>
				</div>
				</div>

				<div className="nav-buttons">
					<button class="btn btn-primary custom-btn" id="signUpBtn">Sign Up</button>
					<button class="btn btn-secondary custom-btn-dark ml-3" id="logInBtn">Log In</button>
				</div>
			</nav>
		</div>
	);
};
