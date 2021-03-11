import React from "react";
import { Link } from "react-router-dom";
import { Login } from "./popUpsLandingPage/login";
import { SignUp } from "./popUpsLandingPage/signUp";
import { NewCostumer } from "./newCostumer";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3 border border-dark">
			<Link to="/">
				<i className="fas fa-book-open text-dark ml-2" />
				<span className="navbar-brand mb-0 h1 ml-1">PlanificApp</span>
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
				<Link to="/contacto">
					<a className="ml-2 text-dark">Contacto</a>
				</Link>
				<Link to="/caracteristicas">
					<a className="ml-2 text-dark">Características</a>
				</Link>
				<Link to="/precios">
					<a className="ml-2 text-dark">Precios</a>
				</Link>
				<Link to="/">
					<button type="button" className="btn btn-light border-secondary text-secondary ml-2">
						Iniciar Sesión
					</button>
				</Link>
				<Link to="/">
					<button type="button" className="btn btn-light bg-secondary text-white ml-2">
						Registrarse
					</button>
				</Link>
			</div>
		</nav>
	);
};
