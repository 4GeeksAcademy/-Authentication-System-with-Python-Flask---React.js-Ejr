import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Button } from "react-bootstrap";
import logo from "../../img/logo.png";

export function Barra() {
	return (
		<Navbar bg="light" variant="light">
			<Link to="/">
				<Navbar.Brand href="#home">
					<img style={{ marginLeft: 60 }} src={logo} height="120px" />
				</Navbar.Brand>
			</Link>
			<Navbar.Toggle />
			<Navbar.Collapse className="justify-content-end">
				<Button id="btn" variant="outline-success">
					<Navbar.Text>
						<Link to="/">
							<a href="#login">About Us</a>
						</Link>
					</Navbar.Text>
				</Button>
				<Button id="btn" style={{ marginLeft: 20 }} variant="outline-success">
					<Navbar.Text>
						<Link to="/login">
							<a style={{ color: "green" }} href="#login">
								Log In
							</a>
						</Link>
					</Navbar.Text>
				</Button>
			</Navbar.Collapse>
		</Navbar>
	);
}
