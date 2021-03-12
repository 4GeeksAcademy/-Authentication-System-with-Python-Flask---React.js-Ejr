import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import logo from "../../img/logo.png";

export function Barra() {
	return (
		<Navbar bg="dark" variant="dark">
			<Link to="/">
				<Navbar.Brand href="#home">
					<img src={logo} height="60px" />
				</Navbar.Brand>
			</Link>
			<Navbar.Toggle />
			<Navbar.Collapse className="justify-content-end">
				<Navbar.Text>
					<Link to="/login">
						<a href="#login">Log In</a>
					</Link>
				</Navbar.Text>
			</Navbar.Collapse>
		</Navbar>
	);
}
