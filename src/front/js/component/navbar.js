import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Dropdown, DropdownButton } from "react-bootstrap";

export const Navbar1 = () => {
	return (
		<Navbar collapseOnSelect expand="lg" bg="black" variant="dark" text="white">
			<Link to={"/"}>
				<Navbar.Brand href="#home">
					<img
						src="https://www.global-retail.com/wp-content/uploads/2017/11/Global_Market.png"
						width="150px"
					/>
				</Navbar.Brand>
			</Link>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="ml-auto mx-5">
					<Link to={"/"}>
						<Nav.Link href="#home" text="white">
							Inicio
						</Nav.Link>
					</Link>
					<Link to={"/"}>
						<Nav.Link href="#features">Categorias</Nav.Link>
					</Link>
					<Link to={"/"}>
						<Nav.Link href="#pricing">Cupones</Nav.Link>
					</Link>
					<Link to={"/register"}>
						<Nav.Link href="#deets">Registro</Nav.Link>
					</Link>
					<Link to={"/login"}>
						<Nav.Link href="#memes">Ingresar</Nav.Link>
					</Link>
					<div className="mb-2">
						{["left"].map(direction => (
							<DropdownButton
								key={direction}
								id={`dropdown-button-drop-${direction}`}
								drop={direction}
								variant="black"
								title={` Drop ${direction} `}
								text="white">
								<Link to={"/"}>
									<Dropdown.Item eventKey="1">Alcancia</Dropdown.Item>
								</Link>
								<Dropdown.Item eventKey="2">Action</Dropdown.Item>
								<Dropdown.Item eventKey="3">Other Acction</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item eventKey="4">Cerrar secion</Dropdown.Item>
							</DropdownButton>
						))}
					</div>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};
