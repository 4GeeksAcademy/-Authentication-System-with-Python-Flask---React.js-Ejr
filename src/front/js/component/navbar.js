import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../../styles/MyNavbar.css"; // Importing the CSS file

export const MyNavbar = () => {
	return (
		<Navbar bg="light" expand="lg" className="my-navbar">
			<Container>
				<Navbar.Brand >
					<Link to="/">
						<span className="navbar-brand mb-0 h1">Travel Website</span>
					</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav >
						<Nav.Link to="/">Login</Nav.Link>
						<Nav.Link to="/">Register</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
