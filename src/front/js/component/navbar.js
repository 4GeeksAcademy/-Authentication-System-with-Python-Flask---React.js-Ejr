import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.jpeg";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-verde mb-3 verde">
			<Link to="/">
				<img src={"logo.jpeg"} style={{ width: "80px", height: "40px" }} />
			</Link>
			<div className="ml-auto">
				<Link to="/RegisterUserIn">
					<button style={{ color: "white", background: "#859240", fontFamily: "Roboto" }}>
						Crear Cuenta
					</button>
				</Link>
				<Link to="/logUserIn">
					<button style={{ color: "white", background: "#859240", fontFamily: "Roboto" }}>Ingresar</button>
				</Link>
				<Link to="/demo">
					<button style={{ color: "white", background: "#859240", fontFamily: "Roboto" }}>Contacto</button>
				</Link>
			</div>
		</nav>
	);
};
