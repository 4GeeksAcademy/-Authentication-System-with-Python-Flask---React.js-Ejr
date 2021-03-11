import React from "react";
import { Link } from "react-router-dom";
import { Login } from "./popUpsLandingPage/login";
import { SignUp } from "./popUpsLandingPage/signUp";
import { NewCostumer } from "./newCostumer";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">React Boilerplate</span>
			</Link>
			<div>
				<Login />
			</div>
			<hr />
			<div>
				<SignUp />
			</div>
			<div>
				<NewCostumer />
			</div>

			<div className="ml-auto">
				<Link to="/demo">
					<button className="btn btn-primary">Check the Context in action</button>
				</Link>
			</div>
		</nav>
	);
};
