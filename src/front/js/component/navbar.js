import React from "react";
import { Nav, Button, Form, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";

export const MyNavbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<Link to="/">
				<div className="d-flex align-items-center"> 
					<span className="text-primary" style={{marginLeft: '10px'}}>Group2 Travel Site</span>
					<div className="divider-custom">
						<hr className="bg-dark" />
					</div>
				</div>
			</Link>

			<Navbar bg="light" expand="lg">
				<Navbar.Toggle aria-controls="navbarSupportedContent" />
				<Navbar.Collapse id="navbarSupportedContent">
					<Nav className="mr-auto">
						<Nav.Link href="/destinations">Destinations</Nav.Link>
						<Nav.Link href="/activities">Activities</Nav.Link>
						<Nav.Link href="/deals">Deals</Nav.Link>
						<Nav.Dropdown data-toggle="dropdown">
							<Nav.Dropdown.Toggle id="navbarDropdown" title="Dropdown">
								<span>Dropdown</span>
							</Nav.Dropdown.Toggle>
							<Nav.Dropdown.Menu>
								<Nav.Dropdown.Item href="#">Action</Nav.Dropdown.Item>
								<Nav.Dropdown.Item href="#">Another action</Nav.Dropdown.Item>
								<Nav.Dropdown.Item href="#">Something else here</Nav.Dropdown.Item>
							</Nav.Dropdown.Menu>
						</Nav.Dropdown>
					</Nav>
					<Form inline>
						<Button variant="primary" href="/login">Login</Button>
						<Button variant="primary" href="/register">Register</Button>
					</Form>
				</Navbar.Collapse>
			</Navbar>
		</nav>
	);
};