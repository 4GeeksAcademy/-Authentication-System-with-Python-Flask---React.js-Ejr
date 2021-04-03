import React from "react";
import logo from "/workspace/canchapp2/src/front/img/logo_navbar.png";
import "../styles/navbar.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light">
				<div className="container-fluid">
					<a className="navbar-brand" href="#">
						<img src={logo} alt="" width="150" />
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<button type="button" className="btn btn-primary">
								<Link to="/home">Home</Link>
							</button>
							<button type="button" className="btn btn-info">
								<Link to="/login">Login</Link>
							</button>
							<button type="button" className="btn btn-success">
								<Link to="/registrate">Registrate</Link>
							</button>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};
