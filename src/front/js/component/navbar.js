import React from "react";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import navbarlogo from "../../img/NavBarLogo.png"
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg" style={{ color: "#ddd", backgroundColor: "white" }}>
			<div className="container-fluid">
				<a className="navbar-brand" href="/">
					<img src={navbarlogo} alt="Adoptabuelo Logo" style={{ width: 270, height: 45, }} />
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
						<li className="nav-item">
							<a className="nav-link" href="/login">
								Login
							</a>
						</li>
						<li className="nav-item">
							<a className="btn btn-primary" href="/signup">
								Sign Up
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};