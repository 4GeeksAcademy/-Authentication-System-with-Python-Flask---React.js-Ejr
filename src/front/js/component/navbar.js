import React from "react";
import { Link } from "react-router-dom";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";

export const Navbar1 = () => {
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Navbar.Brand href="#home">
				<img src="https://www.global-retail.com/wp-content/uploads/2017/11/Global_Market.png" width="150px" />
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href="#features">Inicio</Nav.Link>
					<Nav.Link href="#pricing">Categorias</Nav.Link>
					<Nav.Link href="#pricing">Cupones</Nav.Link>
					<Nav.Link href="#pricing">Registro</Nav.Link>
					<Nav.Link href="#pricing">Ingresar</Nav.Link>
					<NavDropdown title="°°°" id="collasible-nav-dropdown">
						<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
					</NavDropdown>
				</Nav>
				<Nav>
					<Nav.Link href="#deets">More deets</Nav.Link>
					<Nav.Link eventKey={2} href="#memes">
						Dank memes
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};
