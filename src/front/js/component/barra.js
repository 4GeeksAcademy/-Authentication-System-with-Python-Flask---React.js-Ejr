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
				<Button style={{ marginRight: 10 }} variant="outline-light">
					<Navbar.Text>
						<Link to="/register">
							<a style={{ color: "orange" }} href="#login">
								Regístrate
							</a>
						</Link>
					</Navbar.Text>
				</Button>
				<Button variant="outline-lights">
					<Navbar.Text>
						<Link to="/">
							<a style={{ color: "#090a" }} href="#login">
								About Us
							</a>
						</Link>
					</Navbar.Text>
				</Button>
				<Button style={{ marginLeft: 10 }} variant="outline-light">
					<Navbar.Text>
						<Link to="/viewPassport">
							<a style={{ color: "#090a" }} href="#login">
								MyPassport
							</a>
						</Link>
					</Navbar.Text>
				</Button>
				<Button style={{ marginLeft: 10 }} variant="outline-light">
					<Navbar.Text>
						<Link to="/login">
							<a style={{ color: "#090a" }} href="#login">
								Log In
							</a>
						</Link>
					</Navbar.Text>
				</Button>
				<Button style={{ marginLeft: 10 }} variant="outline-light">
					<Navbar.Text>
						<Link to="/login">
							<a style={{ color: "#090a" }} href="#login">
								Logout
							</a>
						</Link>
					</Navbar.Text>
				</Button>
			</Navbar.Collapse>
		</Navbar>
	);
}
