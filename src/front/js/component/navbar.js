import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {

	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				{store.auth ?
					<div className="ml-auto">
						<Link to="/login">
							<button onClick={() => actions.logout()} className="btn btn-primary">Cerrar sesión</button>
						</Link>
					</div>
					:
					<div className="ml-auto">
						<Link to="/signup">
							<button className="btn btn-primary">Registrate</button>
						</Link>
					</div>
				}</div>
		</nav>
	);
};
