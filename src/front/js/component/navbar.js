import React from "react";
import { Link } from "react-router-dom";
// import { Login } from "../pages/login";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Ocean Of Om</span>
					<p>Yoga Hub</p>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
						<ul class="nav">
							<li class="nav-item">
								<a class="nav-link active" aria-current="page" href="#">Home</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#">Suscriptions</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#">Contact Us</a>
							</li>
						</ul>
					</Link>
				</div>
			</div>
		</nav>
	);
};
