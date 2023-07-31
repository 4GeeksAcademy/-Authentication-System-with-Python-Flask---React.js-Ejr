import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";

export const MyNavbar = () => {
	return (
		<Navbar bg="light" expand="lg">
			<Container>
				<Navbar.Brand>
					<Link to="/">
						<span className="navbar-brand mb-0 h1">Travel Website</span>
					</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
						<Link to="/"><Nav.Item href="#/action-1">Login</Nav.Item></Link>
						<Link to="/"><Nav.Item href="#/action-1">Register</Nav.Item></Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
