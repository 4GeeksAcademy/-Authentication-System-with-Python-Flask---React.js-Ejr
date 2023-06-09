import React from "react";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import navbarlogo from "../../img/NavBarLogo.png"
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">
					<img src={navbarlogo} alt="Adoptabuelo Logo" style={{ width: 270, height: 45 }} />
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto">
						<li className="nav-item me-3">
							<a className="nav-link" href="/login">
								<h5>Login</h5>
							</a>
						</li>
						<li className="nav-item me-3">
							<a className="btn btn-primary" href="/signupvoluntario">
								<h5>Hazte Voluntario</h5>
							</a>
						</li>
						<li className="nav-item me-5">
							<a className="btn btn-primary" href="/signupabuelo">
								<h5>Registrate Abuelo</h5>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};