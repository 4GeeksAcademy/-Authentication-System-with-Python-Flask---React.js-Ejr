import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Dropdown, DropdownButton } from "react-bootstrap";

export const Navbar1 = () => {
	return (
		<Navbar collapseOnSelect expand="lg" bg="black" variant="dark" text="white">
			<Navbar.Brand href="#home">
				<img src="https://www.global-retail.com/wp-content/uploads/2017/11/Global_Market.png" width="150px" />
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="ml-auto mx-5">
					<Nav.Link href="#home" text="white">
						Inicio
					</Nav.Link>
					<Nav.Link href="#features">Categorias</Nav.Link>
					<Nav.Link href="#pricing">Cupones</Nav.Link>
					<Nav.Link href="#deets">Registro</Nav.Link>
					<Nav.Link href="#memes">Ingresar</Nav.Link>
					<div className="mb-2">
						{["left"].map(direction => (
							<DropdownButton
								key={direction}
								id={`dropdown-button-drop-${direction}`}
								drop={direction}
								variant="black"
								title={` Drop ${direction} `}
								text="white">
								<Dropdown.Item eventKey="1">Alcancia</Dropdown.Item>
								<Dropdown.Item eventKey="2">Another action</Dropdown.Item>
								<Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
							</DropdownButton>
						))}
					</div>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};
